/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import React from 'react';

import css from './../style.styl';
import ForecastDay from './forecast-day.jsx';

class Forecast extends React.Component {
    render (){
        let forecastDay = [];
        Object.keys(this.props.weather).sort().forEach((key) => {
            forecastDay.push(<ForecastDay weather={this.props.weather[key]} key={key}/>);
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
    }
};

export default Forecast;