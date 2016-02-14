/**
 * Created by Rusak Oleg on 10.02.2016.
 */

import React from 'react';

import css from './../style.styl';

class GeneralInfo extends React.Component {
    constructor (props){
        super (props);
    }

    //todo: http://cssload.net/ru/spinners
    render (){
        return (
            <div className={css.general}>
                <img className={css.general__icon} src={`http://openweathermap.org/img/w/${this.props.weather.icon}.png`}/>
                <div className={css.description}>
                    <h1>{`${this.props.weather.main} ${this.props.temperature} ${this.props.settings.unit_measure.unit_symbol}`}</h1>
                    <p>{this.props.weather.description}</p>
                </div>
            </div>
        )
    }
}

GeneralInfo.defaultProps = {
    weather: {
        icon: "01d",
        main: "current weather?"
    },
    temperature: "?"
};

export default GeneralInfo;