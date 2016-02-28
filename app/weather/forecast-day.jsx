/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import React from 'react';

import css from './../style.styl';

class ForecastDay extends React.Component {
    getTitle() {
        let precipitationMode = this.props.weather.precipitation.mode;
        let precipitationDecryption = precipitationMode ? `(${precipitationMode})`:'';
        return `${this.props.weather.description}${precipitationDecryption}`;
    }

    render() {
        let title = this.getTitle();

        return (
            <div className={css.forecast_day}>
                <div>{this.props.weather.date}</div>
                <img alt={title} title={title}
                     src={`http://openweathermap.org/img/w/${this.props.weather.icon}.png`}/>
                <div>{this.props.weather.temperature.min}/{this.props.weather.temperature.max}</div>
            </div>
        )
    }
}

ForecastDay.defaultProps = {
    weather: {
        icon: "01d",
        temperature: {
            min: '-',
            max: '-'
        }
    }
};

export default ForecastDay;