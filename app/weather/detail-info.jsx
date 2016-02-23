/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import React from 'react';
import windrose from 'windrose';

import css from './../style.styl';
import Parametr from './parametr-info.jsx';

class DetailInfo extends React.Component {
    //todo: Current UV Index
    //http://openweathermap.org/api_uv
    render (){
        let settings = this.props.settings;

        let pressure = Math.round(parseFloat(this.props.weather.pressure.avr)) +
                settings.units.pressure;

        let humidity = this.props.weather.humidity + '%'

        let sunrise = getFormattedDate(this.props.weather.sun.rise, {
            hour: "2-digit",
            minute: "2-digit"
        });
        let sunset = getFormattedDate(this.props.weather.sun.set, {
            hour: "2-digit",
            minute: "2-digit"
        });

        let cloudiness = this.props.weather.clouds.value + '%';

        let windSpeed = this.props.weather.wind.speed;
        let windDirection;
        if (windSpeed != '-') {
            windSpeed = Math.round(parseFloat(this.props.weather.wind.speed)) +
                settings.units.type[settings.unit_measure].wind;
            windDirection = windrose.getPoint (parseFloat(this.props.weather.wind.deg), {depth: 0}).symbol;
        }
        let windDescription = `${windSpeed}, ${windDirection}`;

        return (
            <div className={css.detail}>
                <Parametr name="Pressure" value={pressure}/>
                <Parametr name="Humidity" value={humidity}/>
                <Parametr name="Wind" value={windDescription}/>
                <Parametr name="Clouds" value={cloudiness}/>
                <Parametr name="Sunrise" value={sunrise}/>
                <Parametr name="Sunset" value={sunset}/>
            </div>
        )
    }
}

DetailInfo.defaultProps = {
    weather: {
        pressure: {
            avr: '-'
        },
        wind: {
            speed: '-'
        },
        clouds: {
            value: '-'
        },
        sun: {
            rise: '-',
            set: '-'
        }
    },
    settings: {}
};

/**
 * getDateWithoutTime
 * @param string|Date представление даты
 * @return Date дата с нулевым временем
 * */
function getFormattedDate(date, option) {
    if (date && date!='-') {
        let formatter = new Intl.DateTimeFormat("en-US", option);
        return formatter.format(date);
    }

    return '';
}

export default DetailInfo;