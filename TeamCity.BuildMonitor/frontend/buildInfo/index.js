import tcApi from 'tcApi';
import TimeAgo from 'javascript-time-ago';
import moment from 'moment';

import buildInfoHbs from './buildInfo.hbs';
import './buildInfo.less';

TimeAgo.locale(require('javascript-time-ago/locales/en'));
let timeAgo = new TimeAgo('en-US');

var cache = {};

function BuildInfo(container, buildId) {
    this.container = container;
    this.buildId = buildId;

    var _self = this;

    this.init = (callback) => {
        if(cache[buildId] && cache[buildId].state !== 'running') {
            updateBuildInfo(cache[buildId]);
            return;
        }
        tcApi.getBuildInfo(buildId, buildInfo => {
            var cacheModel = buildCacheModel(buildInfo);
            cache[buildId] = cacheModel;
            updateBuildInfo(cacheModel);
        });

        function updateBuildInfo(cachedModel) {
            var model = buildModel(cachedModel);
            var buildInfoHtml = buildInfoHbs(model);
            _self.container.innerHTML = buildInfoHtml;

            if(typeof callback === 'function') {
                callback();
            }
        }

        function buildCacheModel(buildInfo) {
            return {
                last: !!buildInfo.triggered.user
                    ? buildInfo.triggered.user.name
                    : buildInfo.lastChanges.count > 0
                        ? buildInfo.lastChanges.change[0].username
                        : '',
                timeAgoFrom: moment(buildInfo.finishDate || buildInfo.startDate).toDate(),
                state: buildInfo.state,
                progress: buildInfo.percentageComplete
            }
        }

        function buildModel(cachedModel) {
            return {
                last: cachedModel.last,
                timeAgo: timeAgo.format(cachedModel.timeAgoFrom),
                state: cachedModel.state,
                progress: cachedModel.progress
            };
        }
    }
}

export default  BuildInfo;