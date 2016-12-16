'use strict';

import Job from 'job';
import moment from 'moment';
import settings from 'settings.json';

import appHbs from './app.hbs';
import lastUpdateHbs from './lastUpdate.hbs';
import './app.less';

var indexModel = {
    groups: settings.groups,
    year: new Date().getFullYear()
};

var indexHtml = appHbs(indexModel);
document.body.insertAdjacentHTML('afterbegin', indexHtml);

var jobsContainers = document.querySelectorAll('.job');
jobsContainers.forEach(container => {
    var job = new Job(
        container.querySelectorAll('.job-info-container')[0],
        container.dataset.jobId);
    job.startMonitoring(settings.pollingPeriod, function() {
        var currentDate = new Date();
        var lastUpdateValue = moment().format('ddd, MMM Do, HH:mm:ss');
        var html = lastUpdateHbs({value: lastUpdateValue});
        document.querySelector('.last-update-container').innerHTML = html;
    });
});