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

import London from './../data/weather.js';
import Moscow from './../data/weather_moscow.js';

//todo: ленивую подгрузку остальных табов, webpack hot reload

//todo: поддержку мультиязычности

//todo: специальный город текущее местоположение

//todo: вывод осадков

class WeatherApp extends React.Component {
    constructor (props){
        super (props);

        this.state = this.setSettingFromLocalOrDefault();
    }

    componentDidMount (){
        this.resumeSetting();

        this.updateCitiesWeatherData ();
    }

    shouldComponentUpdate (nextProps, nextState){
        this.saveSettings (nextState);

        //todo: отменять обновление при изменении единиц измерения
        //чтобы при выборе пользователем настроек не запрашивать постоянно данные
        //обновлять только при переключении вкладки на погодную

        return true;
    }

    render (){
        let showTabContent = (event) => {
            let activeClass = css.active;
            let activeTab = document.querySelector('.' + activeClass);
            activeTab.classList.remove(activeClass);
            event.target.classList.add(activeClass);
            let idContent = event.target.id;

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

        let changeCitiesList = (city) => {
            this.setState ((previousState) => {
                previousState.cities[city.id] = city;
                return previousState;
            });

            this.updateCityWeatherData (city.id, 1000);
        };

        let updateSettings = this.updateSettings.bind(this);

        let showTab = this.state.settings.showTab;
        let tabs = ["weather", "cities", "settings"].map((tabName) => {
            let classTab = css.tab  + (showTab==tabName ? " " + css.active : '');
            return (
                <div id={tabName} className={classTab} key={tabName} onClick={showTabContent}>{tabName}</div>
            );
        });

        return (
            <div className={css.weather_container}>
                <div className="tabs">
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
        let citiesKey = Object.keys(this.state.cities).sort((a, b) => {
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

            let cityWeather = city.weather;
            Object.keys (data.weather).forEach((k) => {
                cityWeather [k] = data.weather[k];
            });

            return previousState;
        });
    }

    saveSettings (state) {
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
        }, () => this.updateCitiesWeatherData());
    }

    setSettingFromLocalOrDefault (){
        let storageData = this.resumeSetting();
        let state = {};

        if (storageData){
            //восстанавливаем блок units
            let unitMeasure = storageData.settings.unit_measure;
            let units = {};
            units.temperature = UnitMeasure.type[unitMeasure].temperature;
            units.wind = UnitMeasure.type[unitMeasure].wind;
            units.pressure =  UnitMeasure.pressure;
            units.precipitation =  UnitMeasure.precipitation;
            state.units = units;

            //восстанавливаем блок cities
            let cities = {};
            storageData.cities.forEach((idCity) => {
                cities [idCity] = {
                    id: idCity,
                    weather: {}
                }
            });
            state.cities = cities;

            //восстанавливаем блок settings
            let settings = storageData.settings;

            //нет настроек подключения по умолчанию просим их заполнить
            if (!settings.API.openweathermap.key)
                settings.showTab = "settings";

            state.settings = settings;
        }else{

        }

        return state;
        /*this.state = {
            units: {
                temperature: {
                    name: "Celsius",
                    letter: "С"
                },
                wind: "m/s",
                pressure: "hPa",
                precipitation: "mm"
            },
            settings: {
                unit_measure: "metric",
                lang: 'en',
                API: {
                    openweathermap: {
                        key: '7aaf25e81ae02f237ad79998501b8fe0'
                    }
                },
                showTab: "weather",
                id_display_city: "519690"
            },

            cities: {
                519690: {
                    id: "519690",
                    name: "Saint-Peterburg",
                    country: "RU",
                    weather: {}
                },
                2643743: {
                    id: "2643743",
                    name: "London",
                    country: "GB",
                    weather: {}
                }
            }
        };*/
    }
}

export default WeatherApp;