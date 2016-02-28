/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import React from 'react';

import css from './../style.styl';
import Parametr from './parametr-info.jsx';

class DetailInfo extends React.Component {
    //todo: Current UV Index
    //http://openweathermap.org/api_uv
    render (){
        let settings = this.props.settings;

        let windDescription = `${this.props.weather.wind.speed}, ${this.props.weather.wind.direction}`;

        return (
            <div className={css.detail}>
                <Parametr name="Pressure" key="Pressure" value={this.props.weather.pressure.avr}/>
                <Parametr name="Humidity" key="Humidity" value={this.props.weather.humidity}/>
                <Parametr name="Wind" key="Wind" value={windDescription}/>
                <Parametr name="Clouds" key="Clouds" value={this.props.weather.clouds.value}/>
                <Parametr name="Sunrise" key="Sunrise" value={this.props.weather.sun.rise}/>
                <Parametr name="Sunset" key="Sunset" value={this.props.weather.sun.set}/>
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
            speed: '-',
            direction: '-'
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

export default DetailInfo;