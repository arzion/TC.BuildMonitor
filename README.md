### Team City Build Monitor

### Tested with TC API 9.*

* TeamCity.BuildMonitor - JS TeamCity Build Monitor project
* TeamCity.Proxy - *ASP.NET WEB.API* project that can be used as TeamCity API proxy (if not possible to set CORS origins to TC ([TC CORS Support](https://confluence.jetbrains.com/display/TCD9/REST+API#RESTAPI-CORSSupport))

#### Installation guides

* Clone project to your local machine
* Go to the TeamCity.BuildMonitor/frontend/settings.json and set-up your build monitor according to settings that described ([here](https://github.com/arzion/TC.BuildMonitor/tree/master/TeamCity.BuildMonitor))
* Go to the TeamCity.BuildMonitor and build the JS project:
```
npm install
npm run build
```
* As result you will get the dist files places in public/dist
* On webserver associate TeamCity build monitor web site with public/dist folder
* TeamCity prevents CORS requests, so you have some options:
  * configure TC CORS as described ([here](https://confluence.jetbrains.com/display/TCD9/REST+API#RESTAPI-CORSSupport))
  * use TC.Proxy (ASP.NET Web.API project), publish and specify TC url to it. Also configure real TC url in .config file of TC.Proxy.
  * Create your own simple proxy server.
