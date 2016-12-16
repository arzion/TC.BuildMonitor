'use strict';

let defaultSettings = {
    onError: function(state) {
        console.log('Error happened!', state);
    },
    onSuccess: function() {}
};

let ajax = {
    configure: (settings) => {
        defaultSettings = Object.assign(defaultSettings, settings || {});
    },

    get: (settings) => {
        let defaults = {
            url: '',
            data: {},
            credentials: {},
            success: null,
            onError: null
        };
        settings = Object.assign(defaults, settings || {});
        var xhr = new XMLHttpRequest();
        var queryString = toQueryString(settings.data);

        xhr.open('GET', settings.url + (queryString ? `?${queryString}` : ''));

        if (settings.credentials !== null) {
            xhr.setRequestHeader(
                "Authorization", "Basic " + btoa(settings.credentials.username + ":" + settings.credentials.password));
        }
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send();

        xhr.onreadystatechange = function() {
            if (this.readyState != 4) {
                return;
            }
            if (this.status != 200) {
                if(typeof settings.error === 'function') {
                    settings.onError();
                }
                defaultSettings.onError();
                return;
            }
            if (typeof settings.success == 'function') {
                let response;
                try {
                    response = JSON.parse(this.responseText);
                } catch(Error) {
                    response = this.responseText;
                }
                settings.success(response);
                defaultSettings.onSuccess(response);
            }
        };

        function toQueryString(obj) {
            var str = [];
            for(var p in obj)
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return str.join("&");
        }
    },

    post: (url, data, callback) => {
        // TODO: implement sending post requests
        if (typeof callback == 'function') {
            callback('Ajax_Response_POST');
        }
    }
};

export default ajax;