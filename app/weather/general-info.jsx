/**
 * Created by Rusak Oleg on 10.02.2016.
 */

import React from 'react';

import css from './../style.styl';

const DEGREE_CHAR_CODE = 176;

class GeneralInfo extends React.Component {
    constructor (props){
        super (props);
    }

    //todo: http://cssload.net/ru/spinners
    render (){
        let temperature = this.props.weather.temperature.avr;
        if (temperature!="-"){
            let settings = this.props.settings;

            temperature = `${Math.round(parseFloat(this.props.weather.temperature.avr))}${String.fromCharCode(DEGREE_CHAR_CODE)}${settings.units.type[settings.unit_measure].temperature.letter}`;
        }

        return (
            <div className={css.general}>
                <img className={css.general__icon} src={`http://openweathermap.org/img/w/${this.props.weather.icon}.png`}/>
                <div className={css.description}>
                    <h1>{`${this.props.weather.name} ${temperature}`} </h1>
                    <p>{this.props.weather.description}</p>
                </div>
            </div>
        )
    }
}

GeneralInfo.defaultProps = {
    weather: {
        icon: "01d",
        name: "current weather?",
        temperature: {
            avr: "-"
        }
    }
};

export default GeneralInfo;