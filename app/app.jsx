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

//todo: ленивую подгрузку остальных табов, webpack hot reload

//todo: поддержку мультиязычности

//todo: специальный город текущее местоположение

//todo: вывод осадков

class WeatherApp extends React.Component {
    constructor (props){
        super (props);

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
                lang: '',
                API: {
                    openweathermap: {
                        key: ''
                    }
                },
                showTab: "",
                id_display_city: ""
            },

            cities: {
            }
        };

        this.state = this.setSettingFromLocalOrDefault(stateStruct);
    }

    componentDidMount (){
        this.resumeSetting();

        this.updateCitiesWeatherData ();
    }

    render (){
        let showTabContent = (event) => {
            let activeClass = css.active;
            let activeTab = document.querySelector('.' + activeClass);
            activeTab.classList.remove(activeClass);

            let tab = event.currentTarget;
            tab.classList.add(activeClass);
            let idContent = tab.id;

            this.setState((previousState, currentProps) => {
                previousState.settings.showTab = idContent;
                return previousState;
            });
        };

        let changeShowCity = (idDisplayCity) => {
            this.setState ((previousState) => {
                previousState.settings.id_display_city = idDisplayCity;
                return previousState;
            });
        };

        let changeCitiesList = (cityId, removeCityId) => {
            this.setState ((previousState) => {
                if (cityId) {
                    previousState.cities[cityId] = {id: cityId};
                }else{
                    delete previousState.cities[removeCityId];

                    //обновляем указатель на выводимый город
                    if (this.state.settings.id_display_city==removeCityId){
                        //берем первый в списке или пустой
                        previousState.settings.id_display_city = Object.keys(this.state.cities)[0];
                    }
                }

                return previousState;
            }, () => {
                if (cityId) {
                    this.updateCityWeatherData(cityId, 1000);
                }
                this.saveSettings ();
            });
        };

        let updateSettings = this.updateSettings.bind(this);

        let showTab = this.state.settings.showTab;
        let tabs = [{
            name: "weather",
            icon: "fa-sun-o"
        }, {
            name: "cities",
            icon: "fa-map-marker"
        }, {
            name: "settings",
            icon: "fa-cogs"
        }].map((tab) => {
            let classTab = css.tab  + (showTab==tab.name ? " " + css.active : '');
            classTab += (tab.name=="cities" ? " " + css.tab_cities:"");

            let classIcon = "fa " + tab.icon;
            return (
                <div id={tab.name} className={classTab} key={tab.name} onClick={showTabContent}>
                    <i className={classIcon}></i>{tab.name}
                </div>
            );
        });

        return (
            <div className={css.weather_container}>
                <div className={css.tabs}>
                    {tabs}
                </div>
                <Weather cities={this.state.cities} settings={this.state.settings}
                         changeShowCity={changeShowCity}/>
                <Settings settings={this.state.settings} updateSettings={updateSettings}/>
                <Cities settings={this.state.settings} cities={this.state.cities} changeCitiesList={changeCitiesList}/>
            </div>
        )
    }

    updateCitiesWeatherData (){
        //первым обновляем город выводимый по умолчанию
        let indexDisplayCity = this.state.settings.id_display_city;
        let citiesKey = Object.keys(this.state.cities);

        citiesKey.sort((a, b) => {
            return a == indexDisplayCity? -1: 1;
        });

        //todo: убрать когда состояние не будет сразу обновлятся после поиска нового города
        let timeout = 1000;
        let cities = this.state.cities;
        for (let key of citiesKey) {
            let cityId = cities[key].id;
            this.updateCityWeatherData (cityId, timeout);

            timeout += 2000;
        }
    }

    updateCityWeatherData (cityId, timeout){
        if (!this.state.settings.API.openweathermap.key)
            return false;

        //если выводимый город не задан, берем первый обновляемый
        if (!this.state.settings.id_display_city) {
            this.setState((previousState) => {
                previousState.settings.id_display_city = cityId;
                return previousState
            });
        }

        let dataSource = new DSOpenWeather ({
            key: this.state.settings.API.openweathermap.key,
            unit: this.state.settings.unit_measure,
            lang: this.state.settings.lang
        });

        let handlerUpdateCityWeatherData = this.handlerUpdateCityWeatherData.bind(this);
        dataSource.getDataMethod({
            method: 'weather',
            param: {
                id: cityId
            },
            handler: handlerUpdateCityWeatherData,
            timeout: timeout
        });

        timeout += 1000;

        dataSource.getDataMethod({
            method: 'forecast',
            param: {
                id: cityId,
                cnt: 4
            },
            handler: handlerUpdateCityWeatherData,
            timeout: timeout
        });
        return true;
    }

    handlerUpdateCityWeatherData (data, dataError){
        if (data==null){
            if (dataError.cod==404)
                console.log("Город не найден");
            else
                console.log(data.message);
        }

        //console.log(data);

        data = DecorateWeatherData.getDecorateData(data, this.state.units);

        this.setState ((previousState, currentProps) => {
            let city = previousState.cities[data.id];
            city.name = data.name;
            city.country = data.country;
            city.loc = data.loc;

            if (!city.weather)
                city.weather = {};

            Object.keys (data.weather).forEach((k) => {
                city.weather [k] = data.weather[k];
            });

            return previousState;
        });
    }

    saveSettings () {
        let localStorageSupport = 'localStorage' in window && window['localStorage'] !== null;

        let localStorage = window.localStorage;
        let settings = {};

        settings.cities = Object.keys(this.state.cities).map ((key) => {
            return key;
        });
        settings.settings = this.state.settings;

        localStorage.weather_app = JSON.stringify(settings);
    }

    resumeSetting (){
        let localStorage = window.localStorage;
        let settings = localStorage.weather_app;
        if (settings)
            return JSON.parse(settings);
        else
            return null;
    }

    /**
    * updateSettings */
    updateSettings (event){
        let nameChangeElement = event.target.name;
        let valueChangeElement = event.target.value;

        this.setState ((previousState, currentProps) => {
            if (nameChangeElement == "keyApi"){
                previousState.settings.API.openweathermap.key = valueChangeElement;
            }

            if (nameChangeElement == "languages") {
                previousState.settings.lang = valueChangeElement;
            }

            if (nameChangeElement == "unitMeasure") {
                let unitMeasure = valueChangeElement;

                previousState.settings.unit_measure = unitMeasure;

                let unitMeasureType = UnitMeasure.type[unitMeasure];
                Object.keys(unitMeasureType).forEach((key)=> {
                    previousState.units[key] = unitMeasureType[key];
                });
            }

            return previousState;
        }, () => {
            this.saveSettings ();
            this.updateCitiesWeatherData();
        });
    }

    setSettingFromLocalOrDefault (stateDefault){
        let storageData = this.resumeSetting();

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