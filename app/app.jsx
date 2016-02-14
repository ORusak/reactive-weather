/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import React from 'react';

import css from './style.styl';
import Weather from './weather/weather.jsx';

class WeatherApp extends React.Component {
    constructor (props){
        super (props);

        this.state = {
            settings: {
                unit_measure: {
                    unit: "metric",
                    unit_symbol: "C"
                },
                city: "Saint-Peterburg",
                country: "ru",
                lang: 'en',
                API: {
                    key: '7aaf25e81ae02f237ad79998501b8fe0',
                    URL: 'http://api.openweathermap.org/data/2.5/',
                    forecast: {
                        method: 'forecast/daily',
                        parametr: {
                            cnt: 3
                        }
                    },
                    weather: {
                        method: 'weather'
                    },
                    history: {
                        method: 'history/city',
                        parametr: {
                            cnt: 1,
                            type: 'daily'
                        }
                    }
                }
            },
            weather: {
                weather: [],
                sys: {},
                wind: {},
                clouds: {},
                main: {}
            },
            forecast: {
                list: []
            },
            history: {}
        };
    }

    getRequest (methodAPI){
        let data = [];
        let settings = this.state.settings;
        let parametr = settings.API[methodAPI].parametr;
        let method = settings.API[methodAPI].method;

        if (!method) {
            throw new Error(`Not support method [${methodAPI}]`);
        }

        parametr = parametr ? parametr : {};

        parametr = Array.from(parametr, (v, k) => [k, v]);

        let param = new Map([
            ['q',  settings.city + ',' + settings.country],
            ['APPID', settings.API.key],
            ['lang', settings.lang],
            ['units', settings.unit_measure.unit]
        ].concat(parametr));

        param.forEach((value, key) => {
            data.push(key + '='+ value);
        });

        return method + '?' +  data.join('&');
    }

    getDataAPI (method, time){
        let ctx =   this;
        setTimeout(() => fetch (this.state.settings.API.URL + this.getRequest(method))
            .then((response) => response.json())
            .then((data) => {
                let obj = {};
                obj[method] = data;
                ctx.setState(obj);
            })
            .catch(console.error), time);
    }

    componentDidMount (){
        this.getDataAPI('weather');
        this.getDataAPI('forecast', 1000);

        //not in free subscription
        //this.getDataAPI('history', 1000);
        //this.getDataAPI('uvi', 1000);
    }

    render (){
        return (
            <div className={css.weather_container}>
                <div className="tabs">
                    <div className="tab" onClick={this.showWeather}>Weather</div>
                    <div className="tab" onClick={this.showС}>Cities</div>
                    <div className="tab" onClick={this.showWeather}>Settings</div>
                </div>
                <Weather weather={this.state.weather} forecast={this.state.forecast} settings={this.state.settings}/>
            </div>
        )
    }
}

export default WeatherApp;