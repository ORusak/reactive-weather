/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import React from 'react';

import cssWeather from './weather.styl';

class Forecast extends React.Component {
    render (){
        let forecastDay = [];
        Object.keys(this.props.weather).sort().forEach((key) => {
            forecastDay.push(<ForecastDay weather={this.props.weather[key]} key={key}/>);
        });
        return (
            <div className={cssWeather.forecast}>
                {forecastDay}
            </div>
        )
    }
}

Forecast.defaultProps = {
    weather: {
    }
};

let ForecastDay = (props) => {
    let precipitationMode = props.weather.precipitation.mode;
    let precipitationDecryption = precipitationMode ? `(${precipitationMode})`:'';

    let title = props.weather.description + precipitationDecryption;

    return (
        <div className={cssWeather.forecast_day}>
            <div className={cssWeather.forecast_day__date}>{props.weather.date}</div>
            <img alt={title} title={title}
                 src={`http://openweathermap.org/img/w/${props.weather.icon}.png`}/>
            <div className={cssWeather.forecast_day__temp}>{props.weather.temperature.min}/{props.weather.temperature.max}</div>
        </div>
    );
};

export default Forecast;