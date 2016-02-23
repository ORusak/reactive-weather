/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import React from 'react';

import GeneralInfo from './general-info.jsx';
import CityInfo from './city-info.jsx';
import DetailInfo from './detail-info.jsx';
import Forecast from './forecast.jsx';
import css from './../style.styl';

class Weather extends React.Component {
    constructor (props){
        super (props);
        
    }

    componentDidMount (){

    }

    render (){
        let classTabContent = css.weather + (this.props.showTab=='weather' ? '' : " " + css.hide_tab);
        let today = new Date();
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        let weatherToday = this.props.city.weather ? this.props.city.weather[today.getTime()]: undefined;

        return (
            <div className={classTabContent}>
                <CityInfo name={this.props.city.name} country={this.props.city.country}
                          id={this.props.city.id} />
                <GeneralInfo weather={weatherToday} settings={this.props.settings}/>
                <Forecast weather={this.props.city.weather}/>
                <DetailInfo weather={weatherToday} settings={this.props.settings}/>
            </div>
        )
    }
}

export default Weather;