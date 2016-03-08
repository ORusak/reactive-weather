/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import css from './../style.styl';
import css_cities from './cities.styl';

import DSOpenWeather from './../lib/open-weather.js';
import DecorateWeatherData from './../lib/decorateWeatherData';

const KEY_CODE_ENTER = 13;

/**
 * Component control list cities
 * @exports Cities
 * @author Oleg Rusak
 * */
class Cities extends React.Component {
    componentWillReceiveProps (nextProps){
        if (nextProps.point.isUpdate || !nextProps.point.name) {
            this.updateCityDataByPosition();
        }
    }

    componentWillUnmount (){
        navigator.geolocation.clearWatch(this.props.point.watchID);
    }

    componentDidMount (){
        this.updateGeolocation();
    }

    render() {
        //todo: message on disabled geolocaton
        //todo: message on key API not exist
        //todo: add display mini map by coord

        let classTabContent = css.tab_container + (this.props.settings.showTab == 'cities' ? '' : " " + css.hide_tab);

        let handlerClick = this.handlerFindCityByName.bind(this);
        let handlerRemove = (event) => {
            this.props.changeCitiesList(event.currentTarget.parentNode.id, true);
        };

        let saveCities = this.props.cities;
        let citiesList = Object.keys(saveCities).map(cityId => {
            let city = saveCities[cityId];
            let cityDescription = `${city.name} (${city.country})`;

            return (
                <li className={css_cities.city} id={cityId} key={cityId}>
                    <div className={css_cities.city__name}>{cityDescription}</div>
                    <span className={css_cities.button} onClick={handlerRemove}><i className="fa fa-times"></i></span>
                </li>
            )
        });

        let updateDate = DecorateWeatherData.getFormattedDate(this.props.point.updateDate, {
            hour: "2-digit",
            minute: "2-digit"
        });

        return (
            <div className={classTabContent}>
                <div className={css.field}>
                    <label className={css.field__label}>Weather from current position</label>
                    <div className={css.field__control}>
                        <div>
                            {`${this.props.point.name || "City?"} (${this.props.point.country || "Country?"})`}
                        </div>
                        <div>
                            Latitude {this.props.point.lat} Longitude {this.props.point.lon}
                        </div>
                        <div>
                            Update {updateDate}
                        </div>
                    </div>
                </div>
                <div className={css.field}>
                    <label className={css.field__label}>Enter the name of the city, where the weather is interested</label>
                    <div className={css.field__control}>
                        <input className={css_cities.search} type="text" ref="city" onKeyDown={handlerClick}/>
                        <span className={css_cities.button + " " + css_cities.search__button} onClick={handlerClick}><i className="fa fa-search"></i></span>
                    </div>
                </div>
                <div className={css.field}>
                    <label className={css.field__label}>Selected cities</label>
                    <div className={css.field__control}>
                        <ul className={css_cities.cities}>
                            {citiesList}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * handler event find city by name. invoke parent handler update state.
     * @protected
     * @param {object} event - React event
     * @return {boolean} - mark successful find city
     */
    async handlerFindCityByName (event){
        if (event.type=='keydown' && event.nativeEvent.keyCode!=KEY_CODE_ENTER){
            event.stopPropagation();
            return false;
        }

        if (!this.props.settings.API.openweathermap.key)
            return false;

        let data = await this.findCity ({
            q: this.refs.city.value,
            appid: this.props.settings.API.openweathermap.key,
            units: this.props.settings.unit_measure,
            lang: this.props.settings.lang
        });

        if (data.code==200){
            this.props.changeCitiesList(data.id, false);
        }else{
            console.log(data.code==404 ? "City not found" : data.message);
        }

        return true;
    }

    /**
     * find city by coord current geolocation. register watchPosition to update geolocation data.
     * @protected
     */
    updateGeolocation (){

        if ("geolocation" in navigator) {
            //console.log("geolocation is available");

            /*if (!this.props.settings.API.openweathermap.key)
                return false;*/

            let geo_success = (position) => {
                let lat = position.coords.latitude.toFixed(3);
                let lon = position.coords.longitude.toFixed(3);

                this.props.changeGeoPoint ({
                    lat: lat,
                    lon: lon,
                    updateDate: new Date(),
                    isUpdate:   this.props.point.lat!=lat ||
                                this.props.point.lon!=lon
                });
            };

            let geo_error = () => {
                //console.log("Sorry, no position available.");
            };

            var geo_options = {
                enableHighAccuracy: false,
                maximumAge        : 30000,
                timeout           : 27000
            };

            let watchID = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);

            this.props.changeGeoPoint ({
                watchID: watchID
            });
        } else {
            console.log("geolocation IS NOT available");
        }
    }

    /**
     * update city weather data by geo coord. invoke parent handler update city state.
     * @protected
     * @param {object} position - React event
     */
    async updateCityDataByPosition (){
        if (!this.props.settings.API.openweathermap.key || !this.props.point.lon || !this.props.point.lat) return;

        let data = await this.findCity ({
            lon: this.props.point.lon,
            lat: this.props.point.lat,
            appid: this.props.settings.API.openweathermap.key,
            units: this.props.settings.unit_measure,
            lang: this.props.settings.lang
        });

        if (data) {
            if (data.code == 200) {
                this.props.changeCitiesList(data.id, false);

                this.props.changeGeoPoint ({
                    id: data.id,
                    name: data.name,
                    country: data.country,
                    isUpdate: false
                });
            } else {
                //update new cycle watchPosition
                this.props.changeGeoPoint ({
                    lat: '',
                    lon: ''
                });

                console.log(data.code == 404 ? "City not found" : data.message);
            }
        }else{
            //update new cycle watchPosition
            this.props.changeGeoPoint ({
                lat: '',
                lon: ''
            });

            console.log("Data not receive");
        }
    }

    /**
     * request method weather API
     * @protected
     * @param {object} options - method parameter request in API
     * @return {object} - weather data from API
     */
    async findCity (options){
        let dataSource = new DSOpenWeather ();
        let data = await dataSource.getDataMethod({
            method: 'weather',
            param: options,
            delay: 2000
        });

        return data;
    }
}


//todo: add preview find city before add in app cities list
/**
 * (draft) Stateless component display find data city before confirm user
 * @exports Cities
 * @author Oleg Rusak
 * */
let SearchResult = (props) => {
    /*, Saint Barts  light intensity shower rain
     24.6°С  temperature from 24 to 25°С, wind 4.1m/s. clouds 75%, 1017 hpa
     Geo coords [ -62.8498, 17.8978 ]*/

    let city = props.city;
    let weather = city.weather;
    return (
        <div className={css_cities.result}>
            <div className={css_cities.result_city_name}>{`city.name (city.country)`}</div>
            <div className={css_cities.result_weather_description}>{weather.description}</div>
            <div className={css_cities.result_weather_temperature}>{weather.temperature.avr}</div>
        </div>
    );
}

export default Cities;