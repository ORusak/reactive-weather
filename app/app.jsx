/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import css from './style.styl';

import Weather from './weather/weather.jsx';
import Settings from './settings/settings.jsx';
import Cities from './cities/cities.jsx';

import DSOpenWeather from './lib/open-weather.js';
import DecorateWeatherData from './lib/decorateWeatherData';
import {UnitMeasure} from './lib/unit-measure';

//todo: lazy load tabs, webpack hot reload
//todo: add support multi languages app interface

/**
 * Component general logic weather app
 * @exports WeatherApp
 * @author Oleg Rusak
 * */
class WeatherApp extends React.Component {
    constructor (props){
        super (props);

        this.tabsStruct = [
            {name: "weather",icon: "fa-sun-o"},
            {name: "cities",icon: "fa-map-marker"},
            {name: "settings",icon: "fa-cogs"}
        ];

        let stateStruct = {
            units: {
                temperature: {
                    name: "",
                    letter: ""
                },
                wind: "",
                pressure: "",
                precipitation: ""
            },
            settings: {
                unit_measure: "metric",
                lang: 'en',
                API: {
                    openweathermap: {
                        key: ''
                    }
                },
                showTab: "",
                id_display_city: ""
            },
            cities: {
            },
            point: {
                name: '',
                country: '',
                lat: '',
                lon: '',
                watchID: '',
                updateDate: '',
                isUpdate: false
            }
        };

        this.state = this.setSettingFromLocalOrDefault(stateStruct);
    }

    async componentDidMount (){
        let cities = await this.updateDisplayCityWeatherData (this.state);
        this.setState({cities: cities});

        //todo: update other cities without display city
        cities = await this.updateCitiesWeatherData (this.state);
        this.setState({cities: cities});
    }

    render (){
        let changeShowCity = this.handlerChangeShowCity.bind(this);
        let changeCitiesList = this.handlerChangeCitiesList.bind(this);
        let updateSettings = this.handlerUpdateSettings.bind(this);
        let changeGeoPoint = this.handlerChangeGeoPoint.bind(this);

        return (
            <div className={css.weather_container}>
                <div className={css.tabs}>
                    {this.getElementTabs()}
                </div>
                <Weather cities={this.state.cities} settings={this.state.settings}
                         changeShowCity={changeShowCity}/>
                <Settings settings={this.state.settings} updateSettings={updateSettings}/>
                <Cities settings={this.state.settings} cities={this.state.cities} point={this.state.point}
                        changeCitiesList={changeCitiesList} changeGeoPoint={changeGeoPoint}/>
            </div>
        )
    }

    /**
     * generate tabs react element
     * @protected
     * @return {object[]} tabs react element*/
    getElementTabs (){
        let showTabContent = this.handlerShowTabContent.bind(this);

        let showTab = this.state.settings.showTab;
        return this.tabsStruct.map((tab) => {
            let classTab = css.tab  + (showTab==tab.name ? " " + css.active : '');
            classTab += (tab.name=="cities" ? " " + css.tab_cities:"");

            let classIcon = "fa " + tab.icon;
            return (
                <div id={tab.name} className={classTab} key={tab.name} onClick={showTabContent}>
                    <i className={classIcon}></i>{tab.name}
                </div>
            );
        });
    }

    /**
     * update all cities from source data API
     * @protected
     * @param {object} prevState - previous state
     * @return {object} new update cities data*/
    async updateCitiesWeatherData (prevState){
        //todo: return state with message miss API key
        if (!prevState.settings.API.openweathermap.key)
            return prevState.cities;

        let indexDisplayCity = prevState.settings.id_display_city;
        let cities = Object.assign({}, prevState.cities);
        let citiesKey = Object.keys(cities);

        for (let key of citiesKey) {
            let cityId = cities[key].id;
            let cityData = await this.updateCityWeatherData ({
                appid: prevState.settings.API.openweathermap.key,
                units: prevState.settings.unit_measure,
                lang: prevState.settings.lang,
                id: cityId

            }, prevState.units);
            cities[cityId] = cityData;
        }

        return cities;
    }

    /**
     * update display city from source data API
     * @protected
     * @param {object} prevState - previous state
     * @return {object} new update city data*/
    async updateDisplayCityWeatherData (prevState){
        //todo: return state with message miss API key
        if (!prevState.settings.API.openweathermap.key)
            return prevState.cities;

        let indexDisplayCity = prevState.settings.id_display_city;
        let cities = Object.assign({}, prevState.cities);

        let cityData = await this.updateCityWeatherData ({
                appid: prevState.settings.API.openweathermap.key,
                units: prevState.settings.unit_measure,
                lang: prevState.settings.lang,
                id: indexDisplayCity

            }, prevState.units);
        cities[indexDisplayCity] = cityData;

        return cities;
    }

    /**
     * update city from source data API
     * @protected
     * @param {number} cityId - previous state
     * @param {number} [timeout] - previous state
     * @return {object} update city data*/
    async updateCityWeatherData (options, units){
        let dataSource = new DSOpenWeather ();

        let data = await dataSource.getDataMethod({
            method: 'weather',
            param: options
        });
        data = DecorateWeatherData.getDecorateData(data, units);

        //console.log(data);

        options.cnt = 4;
        let dataForecast = await dataSource.getDataMethod({
            method: 'forecast',
            param: options
        });
        dataForecast = DecorateWeatherData.getDecorateData(dataForecast, units);

        data.weather = Object.assign(data.weather, dataForecast.weather);
        return data;
    }

    /**
     * handler event change app tab
     * @protected
     * @param {object} event - previous state
     */
    handlerShowTabContent(event) {
        let activeClass = css.active;
        let activeTab = document.querySelector('.' + activeClass);
        activeTab.classList.remove(activeClass);

        let tab = event.currentTarget;
        tab.classList.add(activeClass);

        let settings = Object.assign({}, this.state.settings);
        settings.showTab = tab.id;

        this.setState({settings: settings});
    };

    /**
     * handler event change display city weather
     * @protected
     * @param {number} idDisplayCity - id city
     */
    handlerChangeShowCity (idDisplayCity) {
        let settings = Object.assign({}, this.state.settings);
        settings.id_display_city = idDisplayCity;

        this.setState ({settings: settings});
    };

    /**
     * handler event change list city (add or remove)
     * @protected
     * @param {number} cityId - id city
     * @param {boolean} isRemove - mark type operation under city add or remove
     */
    async handlerChangeCitiesList (cityId, isRemove) {
        let cities = Object.assign({}, this.state.cities);
        let settings = Object.assign({}, this.state.settings);

        if (isRemove) {
            delete cities[cityId];

            //update ref on display cities
            if (this.state.settings.id_display_city==cityId){
                settings.id_display_city = Object.keys(cities)[0];
            }
        }else{
            if (cities[cityId]) return;

            cities[cityId] = await this.updateCityWeatherData({
                appid: this.state.settings.API.openweathermap.key,
                units: this.state.settings.unit_measure,
                lang: this.state.settings.lang,
                id: cityId

            }, this.state.units);

            //update ref on display cities
            if (!this.state.settings.id_display_city){
                settings.id_display_city = Object.keys(cities)[0];
            }
        }

        this.setState ({cities: cities, settings: settings}, () => this.saveSettingsToStorage ());
    };

    /**
     * handler event update value settings
     * @protected
     * @param {object} event - event object
     */
    async handlerUpdateSettings (event){
        let nameChangeElement = event.target.name;
        let valueChangeElement = event.target.value;

        let settings = Object.assign({}, this.state.settings);

        if (nameChangeElement == "keyApi"){
            settings.API.openweathermap.key = valueChangeElement;
        }

        if (nameChangeElement == "languages") {
            settings.lang = valueChangeElement;
        }

        if (nameChangeElement == "unitMeasure") {
            settings.unit_measure = valueChangeElement;

            let units = Object.assign({}, this.state.units);
            let unitMeasureType = UnitMeasure.type[valueChangeElement];
            Object.keys(unitMeasureType).forEach((key)=> {
                units[key] = unitMeasureType[key];
            });
            this.setState ({units: units});
        }

        this.setState ({settings: settings}, async ()=> {
            this.saveSettingsToStorage();

            let cities = await this.updateCitiesWeatherData(this.state);
            let listCities = Object.keys(cities);
            if(listCities.length==0){
                return;
            }

            //update ref id_display_city
            let newSettings = Object.assign({}, this.state.settings);
            if(!this.state.settings.id_display_city && listCities.length!=0){
                newSettings.id_display_city = listCities[0].id;
            }

            this.setState ({cities: cities, settings: newSettings}, () => this.saveSettingsToStorage() );
        });
    }

    /**
     * handler event update point geo location
     * @protected
     * @param {object} newPoint - data point
     */
    handlerChangeGeoPoint (newPoint){
        let point = Object.assign({}, this.state.point, newPoint);
        this.setState ({point: point});
    }

    /**
     * save app settings to browser localStorage
     * @protected
     * @param {object} event - event object
     */
    saveSettingsToStorage () {
        let localStorageSupport = 'localStorage' in window && window['localStorage'] !== null;
        //todo: show user message
        if (!localStorageSupport)
            return;

        let localStorage = window.localStorage;
        let settings = {};

        settings.cities = Object.keys(this.state.cities).map ((key) => {
            return key;
        });
        settings.settings = this.state.settings;

        localStorage.weather_app = JSON.stringify(settings);
    }

    /**
     * resume app settings from browser localStorage
     * @protected
     * @param {object} event - event object
     * @return {object} - settings from localStorage
     */
    resumeSettingFromStorage (){
        let localStorageSupport = 'localStorage' in window && window['localStorage'] !== null;
        //todo: show user message
        if (!localStorageSupport)
            return;

        let localStorage = window.localStorage;
        let settings = localStorage.weather_app;
        if (settings)
            return JSON.parse(settings);
        else
            return null;
    }

    /**
     * set settings on create app
     * @protected
     * @param {object} stateDefault - default state struct
     * @return {object} - settings from localStorage or default
     */
    setSettingFromLocalOrDefault (stateDefault){
        let storageData = this.resumeSettingFromStorage();

        if (storageData){
            //восстанавливаем блок units
            let unitMeasure = storageData.settings.unit_measure;
            let units = {};
            units.temperature = UnitMeasure.type[unitMeasure].temperature;
            units.wind = UnitMeasure.type[unitMeasure].wind;
            units.pressure =  UnitMeasure.pressure;
            units.precipitation =  UnitMeasure.precipitation;
            stateDefault.units = units;

            //восстанавливаем блок settings
            let settings = storageData.settings;


            stateDefault.settings = settings;

            //восстанавливаем блок cities
            let cities = {};
            storageData.cities.forEach((idCity) => {
                cities [idCity] = {
                    id: idCity,
                    weather: {}
                }
            });
            stateDefault.cities = cities;

            settings.showTab = "weather";
            //нет городов просим заполнить
            if (Object.keys(cities).length==0)
                settings.showTab = "cities";

            //нет настроек подключения по умолчанию просим их заполнить
            if (!settings.API.openweathermap.key)
                settings.showTab = "settings";

        }else{
            //восстанавливаем блок units
            let unitMeasure = "metric";
            let units = {};
            units.temperature = UnitMeasure.type[unitMeasure].temperature;
            units.wind = UnitMeasure.type[unitMeasure].wind;
            units.pressure =  UnitMeasure.pressure;
            units.precipitation =  UnitMeasure.precipitation;
            stateDefault.units = units;

            stateDefault.cities = {};

            stateDefault.settings.showTab = "settings";
        }

        return stateDefault;
    }
}

export default WeatherApp;