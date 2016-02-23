/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import React from 'react';

import css from './style.styl';
import Weather from './weather/weather.jsx';
import Settings from './settings/settings.jsx';

import DSOpenWeather from './weather/lib/open-weather.js';

//todo: ленивую подгрузку остальных табов, webpack hot reload

class WeatherApp extends React.Component {
    constructor (props){
        super (props);

        this.state = {
            showTab: "weather",
            settings: {
                unit_measure: "metric",
                units: {
                    type: {
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
                    },
                    pressure: "hPa"
                },
                lang: 'en',
                index_API: 0,
                API: {
                    "openweathermap": {
                        key: '7aaf25e81ae02f237ad79998501b8fe0'
                    }
                }
            },
            index_display_city: 519690,
            cities: {
                '519690': {
                    id: 519690,
                    name: "Saint-Peterburg",
                    country: "ru",
                    weather: {}
                }
            }
        };
    }

    componentDidMount (){
        //
        let dataSource = new DSOpenWeather ({
            key: this.state.settings.API.openweathermap.key,
            unit: this.state.settings.unit_measure,
            lang: this.state.settings.lang,
            city: this.state.cities[this.state.index_display_city]
        });

        dataSource.requestData((data) => {
            this.setState ((previousState, currentProps) => {

                let cityWeather = previousState.cities[data.id].weather;
                //console.log(cityWeather);

                Object.keys (data.weather).forEach((k) => {
                    cityWeather [k] = data.weather[k];
                });

                return previousState;
            });
        });
    }

    render (){
        let showTabContent = (event) => {
            let activeClass = css.active;
            let activeTab = document.querySelector('.' + activeClass);
            activeTab.classList.remove(activeClass);
            event.target.classList.add(activeClass);
            let idContent = event.target.id;

            this.setState(function(previousState, currentProps) {
                return previousState.showTab = idContent;
            });
        };

        let city = this.state.cities[this.state.index_display_city];
        return (
            <div className={css.weather_container}>
                <div className="tabs">
                    <div id="weather" className={css.tab + " " + css.active} onClick={showTabContent}>Weather</div>
                    <div id="cities" className={css.tab} onClick={showTabContent}>Cities</div>
                    <div id="settings" className={css.tab} onClick={showTabContent}>Settings</div>
                </div>
                <Weather city={city} settings={this.state.settings} showTab={this.state.showTab}/>
                <Settings settings={this.state.settings} showTab={this.state.showTab}/>
            </div>
        )
    }
}

export default WeatherApp;