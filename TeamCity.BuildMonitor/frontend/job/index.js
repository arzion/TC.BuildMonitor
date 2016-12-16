'use strict';

import tcApi from 'tcApi';
import BuildInfo from 'buildInfo';
import settings from 'settings.json';

import branchesHbs from './branches.hbs';
import './branch.less';

function Job(container, jobId) {
    this.container = container;
    this.jobId = jobId;
    var _self = this;

    this.startMonitoring = (period, onUpdate) => {
        var timer;

        _self._updateState(() => {
            _self._callCallback(onUpdate);
            timer = setTimeout(() => timerFunc(onUpdate), period);
        });

        function timerFunc(onUpdate) {
            _self._updateState(() => {
                _self._callCallback(onUpdate);
                timer = setTimeout(() => timerFunc(onUpdate), period);
            });
        }
    };

    this._updateState = (onUpdate) => {
        tcApi.getBuilds(_self.jobId, (result) => {
            var filtered = _self._filterDuplicatesByName(result.build);
            var sorted = _self._sortByPriorities(filtered);

            var branchesModel = _self._buildBranchedModel(sorted);

            if(settings.ui.colorJobName) {
                _self._addClassToParentJob(branchesModel);
            }

            var html = branchesHbs(branchesModel);
            var branchesContainer = document.createElement('div');
            branchesContainer.innerHTML = html;

            var buildInfos = branchesContainer.querySelectorAll('.build-info');
            var buildInfosLength = buildInfos.length;
            if(buildInfosLength === 0) {
                _self.container.innerHTML = branchesContainer.innerHTML;
                _self._callCallback(onUpdate);
            }

            var buildInfoLoadedCount = 0;
            buildInfos.forEach(buildInfoContainer => {
                var buildInfo = new BuildInfo(buildInfoContainer, buildInfoContainer.dataset.branchId);
                buildInfo.init(() => {
                    buildInfoLoadedCount++;
                    if(buildInfoLoadedCount === buildInfosLength) {
                        _self.container.innerHTML = branchesContainer.innerHTML;
                        _self._callCallback(onUpdate);
                    }
                });
            });
        });
    };

    this._callCallback = (callback) => {
        if(typeof callback === 'function') {
            callback();
        }
    };

    this._filterDuplicatesByName = (builds) => {
        return builds.filter((item, position) => {
            return builds.indexOf(builds.find(el => el.branchName === item.branchName)) === position;
        });
    };

    this._sortByPriorities = (builds) => {
        // TODO: optimize algorithm
        var branches = [];
        settings.branches.mainBranches.forEach(mainBranch => {
            var found = builds.find(it => it.branchName.toUpperCase() == mainBranch.toUpperCase());
            if(found) {
                branches.push(found);
            }
        });

        var mainBranchesLength = branches.length;
        for(var i = 0; i < settings.branches.count - mainBranchesLength; i++) {
            var notAddedBranch = builds.find(build => branches.indexOf(build) === -1);
            if(notAddedBranch) {
                branches.push(notAddedBranch);
            }
        }

        return branches;
    };

    this._buildBranchedModel = (branches) => {
        var branchesModel = {
            branches: branches.map(branch => {
                return {
                    branchId: branch.id,
                    status: branch.running ? 'running' : branch.status.toLowerCase(),
                    name: branch.branchName
                };
            })
        };

        branchesModel.overallStatus = !!branchesModel.branches.find(branch => branch.status === 'failure')
            ? 'failed'
            : 'ok';
        branchesModel.showOverallStatus = !!settings.ui.showOverallStatus;


        if(settings.ui.visibleStates) {
            branchesModel.branches = branchesModel.branches
                .filter(branch => settings.ui.visibleStates.indexOf(branch.status) !== -1);
        }

        return branchesModel;
    };

    this._addClassToParentJob = (model) => {
        var jobElement = _self.container.closest('.job');
        jobElement.classList.remove('ok', 'failed');
        jobElement.classList.add(model.overallStatus);
    }
}

export default Job;