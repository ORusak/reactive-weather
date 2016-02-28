/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import React from 'react';

import GeneralInfo from './general-info.jsx';
import DetailInfo from './detail-info.jsx';
import Forecast from './forecast.jsx';
import css from './../style.styl';

class Weather extends React.Component {
    constructor (props){
        super (props);

        this.state = {
            id_display_city: this.props.settings.id_display_city
        }
    }

    render (){
        let classTabContent = css.tab_container + (this.props.settings.showTab=='weather' ? '' : " " + css.hide_tab);
        let city = this.props.cities[this.props.settings.id_display_city];

        let today = new Date();
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        let weatherToday = city.weather ? city.weather[today.getTime()]: undefined;

        let handlerNextCity = this.changeShowCity.bind(this, true);
        let handlerPrevCity = this.changeShowCity.bind(this, false);

        return (
            <div className={classTabContent}>
                <div className="prevCity" onClick={handlerNextCity}>+</div>
                <div className="nextCity" onClick={handlerPrevCity}>-</div>
                <GeneralInfo weather={weatherToday} name={city.name} country={city.country}
                             id={city.id} settings={this.props.settings}/>
                <Forecast weather={city.weather}/>
                <DetailInfo weather={weatherToday}/>
            </div>
        )
    }

    changeShowCity (nextCity, event){
        let keyCities = Object.keys(this.props.cities);
        let index = keyCities.indexOf(this.props.settings.id_display_city);

        if(index==-1){
            this.setState({id_display_city: keyCities[0]});
            return;
        }

        let indexNext = index + (nextCity?1:-1);

        indexNext = indexNext<0 ? keyCities.length-1: indexNext;
        indexNext = indexNext==keyCities.length ? 0: indexNext;

        this.props.changeShowCity(keyCities[indexNext]);
    }
}

export default Weather;