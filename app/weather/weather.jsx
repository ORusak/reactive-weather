/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import GeneralInfo from './general-info.jsx';
import DetailInfo from './detail-info.jsx';
import Forecast from './forecast.jsx';

import css from './../style.styl';
import cssWeather from './weather.styl';

/**
 * Component display data weather city
 * @exports Weather
 * @author Oleg Rusak
 * */
class Weather extends React.Component {
    render (){
        let classTabContent = css.tab_container + (this.props.settings.showTab=='weather' ? '' : " " + css.hide_tab);
        let city = this.props.cities[this.props.settings.id_display_city];

        let weatherToday;
        if (city) {
            let today = new Date();
            today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            weatherToday = city.weather ? city.weather[today.getTime()] : undefined;
        }else{
            city = {};
        }

        let changeShowCity = this.handlerChangeShowCity.bind(this);

        return (
            <div className={classTabContent}>
                <GeneralInfo weather={weatherToday} name={city.name} country={city.country}
                             id={city.id} settings={this.props.settings} changeShowCity={changeShowCity}/>
                <Forecast weather={city.weather}/>
                <DetailInfo weather={weatherToday}/>
            </div>
        )
    }

    /**
     * handler event change display city
     * @protected
     * @param {boolean} nextCity - mark direction bypass list cities. true - next, false - prev
     */
    handlerChangeShowCity (nextCity){
        let keyCities = Object.keys(this.props.cities);
        let index = keyCities.indexOf(this.props.settings.id_display_city);

        let indexNext = index + (nextCity?1:-1);

        indexNext = indexNext<0 ? keyCities.length-1: indexNext;
        indexNext = indexNext==keyCities.length ? 0: indexNext;

        this.props.changeShowCity(keyCities[indexNext]);
    }
}

export default Weather;