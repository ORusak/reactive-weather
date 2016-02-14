/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import React from 'react';

import css from './../style.styl';

class ForecastDay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    getTitle() {
        let weather = this.props.day.weather[0];
        return `${weather.main} (${weather.description})`;
    }

    getFormattedDay() {
        let millisecond = parseInt(this.props.day.dt, 10);
        if (!millisecond){
            return "?";
        }

        let date = new Date(millisecond * 1000);
        let formatter = new Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            month: "short"
        });
        return formatter.format(date);
    }

    render() {
        let day = this.getFormattedDay();
        let title = this.getTitle();

        return (
            <div className={css.forecast_day}>
                <div>{day}</div>
                <img alt={title} title={title}
                     src={`http://openweathermap.org/img/w/${this.props.day.weather[0].icon}.png`}/>
                <div>{this.props.day.temp.day} / {this.props.day.temp.night}</div>
            </div>
        )
    }
}

ForecastDay.defaultProps = {
    day: {
        weather: [
            {}
        ],
        temp: {}
    }
};

export default ForecastDay;