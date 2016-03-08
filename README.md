# Description
Status: release candidate.

One page application for show forecast weather.

* ReactJS
* webpack
* mocha/enzyme/should
* gulp
* babel

Demo: https://harebrown.herokuapp.com

Install: 
set NODE_ENV=production
```
git clone https://github.com/ORusak/reactive-weather.git
cd /reactive-weather
npm install
npm start
```

Application start:
```
public/index.html
```

Test:
set NODE_ENV=test
```
npm test
```

Note: environment tested only os windows.

# Requirement

* Source data API openweathermap.org 
* Add/remove cities
* Settings to save local
* Auto request weather in city by geo position user (default city).

Original requirement: https://gist.github.com/beshkenadze/3e3cfc70a9411d54ecd4

# Application

* Features
    * Weather
        * weather show to selected cities
        * switch display city
        * display by city
          * general weather info on today
          * detail weather info on today
          * short forecast on 3 days
        * select display city
    * Cities
        * add city by name
        * auto add city by geo coordinate
        * remove city
    * Settings
        * type source data API (while openweathermap.org)
        * settings source data API 
        * language receive from API information
        * type display metric with preview
        * settings save in local storage browser 
    * Layout
        * responsive with some adapt by landscape
        * icon weather state from openweathermap.org
    * application development
        * add basic autotest
    
* Roadmap
    * common
        * add display user app event messages (set settings, errors and other)
        * add progress receive data
    * weather
        * add graph change temp
        * add graph sun rise/set
        * add auto update weather data
        * add "quick" select display city
    * city
        * add autocomplite city name in search
        * add preview find city before add in app cities list
        * add search by zipcode, value coordinate, country
    * settings
        * add some source weather data (yahoo.com)
    * layout
        * add design and color
        * icon weather state use local, vector
    * application development
        * add advanced autotest for all component
        * refactor to redux
        * lazy load tabs content
        * multi languages
        * link font-awesome through webpack
        * bug with timezone offset on 00:00
    