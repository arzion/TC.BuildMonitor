'use stricts';

import ajax from './common/js/ajax';
import settings from 'settings.json';

let urls = {
    teamcity_api_builds: `${settings.api.apiEndpoint}/httpAuth/app/rest/builds?locator=running:any,buildType:{id},branch:default:any`,
    teamcity_api_get_build_info: `${settings.api.apiEndpoint}/httpAuth/app/rest/builds/id:{id}`
};

let api = {
    getBuilds: (id, callback) => {
        ajax.get({
            url: urls.teamcity_api_builds.replace('{id}', id),
            credentials: {
                username: settings.api.tcUser,
                password: settings.api.tcPassword
            },
            success: (result) => {
                if (typeof callback == 'function') {
                    callback(result);
                }
            }
        });
    },

    getBuildInfo: (id, callback) => {
        ajax.get({
            url: urls.teamcity_api_get_build_info.replace('{id}', id),
            credentials: {
                username: settings.api.tcUser,
                password: settings.api.tcPassword
            },
            success: (result) => {
                if (typeof callback == 'function') {
                    callback(result);
                }
            }
        });
    },
};

export default api;