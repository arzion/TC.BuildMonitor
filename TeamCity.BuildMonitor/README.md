### Quick start

```bash
# install the dependencies with npm
$ npm install

# compile files to public
$ npm run build

# dist files places to public/dist
```

## Dependencies

What you need to run this app:

* `node` and `npm` (Use [NVM](https://github.com/creationix/nvm))
* Ensure you're running Node (`v4.1.x`+) and NPM (`2.14.x`+)

# Overview

Settings of the application placed in **frontend/settings.json** file

#### API settings:

```json
"api": {
    "tcUser": "userName",
    "tcPassword": "passord",
    "apiEndpoint": "http://tcApiEndpoint"
}
```

#### TC Jobs to monitor:

* Specify **name** that will be visible on UI as group name
* Specify the list of **jobs** to show in scope of the group with **name** (for UI) and **id** (that is TC job id)

```json
"groups": [{
    "name": "First group",
    "jobs": [
        {
            "id": "Job1Id",
            "name": "Super API"
        },
        {
            "id": "Job2Id",
            "name": "Some other API"
        }
    ]
}]
```

#### Branches settings:

* Specify **mainBranches** that will be on top of the branches list and **count** of branches to display and monitor

```json
"branches": {
    "mainBranches": ["development", "master"],
    "count": 5
}
```

#### UI settings:

* **showOverallStatus** defines whether to show BIG combined status of all branches
* **colorJobName** defines whether the job names should be with the *status* color
* **visibleStates** defines the list of states that are shown on UI

```json
"ui": {
    "showOverallStatus": false,
    "colorJobName": true,
    "visibleStates": ["failure", "running"]
}
```

#### Polling period:

* **pollingPeriod** defines how often to poll tc api to get the state

```json
"pollingPeriod": 10000
```

# Examples

* **All-in version** Show 5 branches with development and master first with and with overall status

![picture](https://s28.postimg.org/nw5sj3v7h/All_In.png)

* **Minimalistic version** Show only *running* and *failed* state, without overall status but colorize the job name

![picture](https://s28.postimg.org/ff6a86qil/Min.png)