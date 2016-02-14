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

        this.state = {
            weather: this.props.weather,
            settings: this.props.settings,
            forecast: this.props.forecast
        };
    }

    componentDidMount (){

    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            weather: this.props.weather,
            settings: this.props.settings,
            forecast: this.props.forecast
        });
    }

    render (){
        return (
            <div>
                <div>
                    <CityInfo name={this.state.weather.name} country={this.state.weather.sys.country}
                              id={this.state.weather.id} />
                    <GeneralInfo weather={this.state.weather.weather[0]} temperature={this.state.weather.main.temp}
                                 settings={this.state.settings}/>
                    <Forecast weather={this.state.forecast}/>
                    <DetailInfo detail={this.state.weather}/>
                </div>
            </div>
        )
    }
}

export default Weather;