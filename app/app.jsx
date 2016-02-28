/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import css from './style.styl';

import Weather from './weather/weather.jsx';
import Settings from './settings/settings.jsx';
import Cities from './cities/cities.jsx';

import DSOpenWeather from './lib/open-weather.js';
import DecorateWeatherData from './lib/decorateWeatherData';

import London from './../data/weather.js';
import Moscow from './../data/weather_moscow.js';

//todo: ленивую подгрузку остальных табов, webpack hot reload

//todo: поддержку мультиязычности

//todo: специальный город текущее местоположение

//todo: вывод осадков

const unitType = {
    default: {
        temperature: {
            name: "Kelvin",
            letter: "K"
        },
        wind: "m/s"
    },
    metric: {
        temperature: {
            name: "Celsius",
            letter: "C"
        },
        wind: "m/s"
    },
    imperial: {
        temperature: {
            name: "Fahrenheit",
            letter: "F"
        },
        wind: "mph"
    }
};

class WeatherApp extends React.Component {
    constructor (props){
        super (props);

        this.state = {
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
        };
    }

    componentDidMount (){
        this.updateCitiesWeatherData ();
    }

    shouldComponentUpdate (nextProps, nextState){
        console.log("WeatherApp - shouldComponentUpdate");

        let localStorageSupport = 'localStorage' in window && window['localStorage'] !== null
        console.log("localStorageSupport " + localStorageSupport);

        this.saveSettings (nextState);

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

            console.log(this.state);
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


        return (
            <div className={css.weather_container}>
                <div className="tabs">
                    <div id="weather" className={css.tab  + " " + css.active} onClick={showTabContent}>Weather</div>
                    <div id="cities" className={css.tab} onClick={showTabContent}>Cities</div>
                    <div id="settings" className={css.tab} onClick={showTabContent}>Settings</div>
                </div>
                <Weather cities={this.state.cities} settings={this.state.settings}
                         changeShowCity={changeShowCity}/>
                <Settings settings={this.state.settings}/>
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
            console.log((indexDisplayCity==key? '*':'') + 'get data' + key);

            let cityId = cities[key].id;
            this.updateCityWeatherData (cityId, timeout);

            timeout += 2000;
        }
    }

    updateCityWeatherData (cityId, timeout){
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
    }

    handlerUpdateCityWeatherData (data, dataError){
        console.log("WeatherApp - handlerUpdateCityWeatherData");

        if (data==null){
            if (dataError.cod==404)
                console.log("Город не найден");
            else
                console.log(data.message);
        }

        console.log("WeatherApp - handlerUpdateCityWeatherData - receive data");
        console.log(data);

        data = DecorateWeatherData.getDecorateData(data, this.state.units);

        console.log("WeatherApp - handlerUpdateCityWeatherData - DecorateWeatherData");
        console.log(data);

        this.setState ((previousState, currentProps) => {
            let cityWeather = previousState.cities[data.id].weather;

            Object.keys (data.weather).forEach((k) => {
                cityWeather [k] = data.weather[k];
            });

            return previousState;
        });
    }

    saveSettings (state) {
        console.log("WeatherApp - saveSettings");

        let localStorage = window.localStorage;

        localStorage.cities = Object.keys(this.state).map ((key) => {
            return key;
        });

        localStorage.settings = state.settings;

        console.log(localStorage);
    }

    resumeSetting (){

    }

    updateUnitSettings (){
        console.log("WeatherApp - updateUnitSettings");

        this.setState ((previousState, currentProps) => {
            Object.assign(previousState.units, unitType[this.state.settings.unit_measure]);

            return previousState;
        });
    }
}

export default WeatherApp;