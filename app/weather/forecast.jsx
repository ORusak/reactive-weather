/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import React from 'react';

import css from './../style.styl';
import ForecastDay from './forecast-day.jsx';

class Forecast extends React.Component {
    constructor (props){
        super (props);

        this.state = {
        };
    }

    componentDidMount (){

    }

    render (){
        let forecastDay = [];
        this.props.weather.list.forEach((day) => {
            forecastDay.push(<ForecastDay day={day}/>);
        });
        return (
            <div className={css.forecast}>
                {forecastDay}
            </div>
        )
    }
}

Forecast.defaultProps = {
    weather: {
        list: []
    }
};

export default Forecast;