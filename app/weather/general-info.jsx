/**
 * Created by Rusak Oleg on 10.02.2016.
 */

import React from 'react';

import css from './../style.styl';

class GeneralInfo extends React.Component {
    //todo: http://cssload.net/ru/spinners
    render (){
        let precipitationMode = this.props.weather.precipitation.mode;
        let precipitationDecryption = precipitationMode ? `(${precipitationMode})`:'';

        return (
            <div className={css.general}>
                <img className={css.general__icon} src={`http://openweathermap.org/img/w/${this.props.weather.icon}.png`}/>
                <div className={css.description}>
                    <h1>{this.props.weather.description + precipitationDecryption}</h1>
                    {this.props.weather.temperature.avr}
                    <p>{this.props.weather.date}</p>
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
        },
        precipitation: {
            mode: '-'
        }
    }
};

export default GeneralInfo;