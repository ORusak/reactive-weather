/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import React from 'react';

import css from './../style.styl';

class ForecastDay extends React.Component {
    getTitle() {
        return `${this.props.weather.name} (${this.props.weather.description})`;
    }

    getFormattedDay() {
        let date = this.props.weather.date;
        let formatter = new Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            month: "short"
        });
        return formatter.format(date);
    }

    render() {
        let day = this.getFormattedDay();
        let title = this.getTitle();

        let tmin = `${Math.round(parseFloat(this.props.weather.temperature.min))}${String.fromCharCode(176)}`;
        let tmax = `${Math.round(parseFloat(this.props.weather.temperature.max))}${String.fromCharCode(176)}`;

        return (
            <div className={css.forecast_day}>
                <div>{day}</div>
                <img alt={title} title={title}
                     src={`http://openweathermap.org/img/w/${this.props.weather.icon}.png`}/>
                <div>{tmin} / {tmax}</div>
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