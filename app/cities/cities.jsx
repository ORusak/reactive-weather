/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import css from './../style.styl';
import css_cities from './cities.styl';

import DSOpenWeather from './../lib/open-weather.js';

const KEY_CODE_ENTER = 13;

class Cities extends React.Component {
    constructor (props){
        super (props);
    }

    componentDidMount() {
        this.refs.city.focus();
    }

    render() {
        let classTabContent = css.tab_container + (this.props.settings.showTab == 'cities' ? '' : " " + css.hide_tab);

        let dataSource = new DSOpenWeather({
            key: this.props.settings.API.openweathermap.key,
            unit: this.props.settings.unit_measure,
            lang: this.props.settings.lang
        });

        let handlerClick = (event) => {
            if (event.type=='keydown' && event.nativeEvent.keyCode!=KEY_CODE_ENTER){
                event.stopPropagation();
                return;
            }

            if (!this.state.settings.API.openweathermap.key)
                return false;

            dataSource.getDataMethod ({
                method: 'weather',
                param: {
                    q: this.refs.city.value
                },
                handler: (data, dataError) => {
                    if (data==null){
                        if (dataError.cod==404)
                            console.log("Город не найден");
                        else
                            console.log(data.message);
                    }else{
                        this.props.changeCitiesList(data);
                    }
                },
                timeout: 1000
            });

            return true;
        };

        let handlerRemove = (event) => {
            let cityId = event.currentTarget.parentNode.id;
            this.setState((previousState, currentProps) => {
                delete previousState[cityId];
                return previousState;
            });
        };

        let saveCities = this.props.cities;
        let citiesList = Object.keys(saveCities).map(cityId => {
            let city = saveCities[cityId];
            let cityDescription = `${city.name} (${city.country})`;

            return (
                <li className={css_cities.city} id={cityId} key={cityId}>
                    <div className={css_cities.city_name}>{cityDescription}</div>
                    <span className={css_cities.button} onClick={handlerRemove}><i className="fa fa-times"></i></span>
                </li>
            )
        });

        //todo: добавить вывод предупреждения если не заполнен ключ
        //if (!this.state.settings.API.openweathermap.key)

        return (
            <div className={classTabContent}>
                <div>
                    <label>Enter the name of the city, where the weather is interested</label>
                    <div>
                        <input className="search" type="text" ref="city" onKeyDown={handlerClick}/>
                        <span className={css_cities.button} onClick={handlerClick}><i className="fa fa-search"></i></span>
                    </div>
                </div>
                <div>
                    <label>Select cities</label>
                        <ul className={css_cities.cities}>
                            {citiesList}
                        </ul>
                </div>
            </div>
        )
    }
};

/*, Saint Barts  light intensity shower rain
24.6°С  temperature from 24 to 25°С, wind 4.1m/s. clouds 75%, 1017 hpa

Geo coords [ -62.8498, 17.8978 ]*/

//todo: добавить посик по текущему местонахождению

//todo: добавить вывод результата поиска
let SearchResult = (props) => {
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