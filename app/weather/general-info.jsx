/**
 * Created by Rusak Oleg on 10.02.2016.
 */

import cssWeather from './weather.styl';

/**
 * Component display city today general weather data
 * @exports GeneralInfo
 * @author Oleg Rusak
 * */
class GeneralInfo extends React.Component {
    //todo: http://cssload.net/ru/spinners
    render (){
        let precipitationMode = this.props.weather.precipitation.mode;
        let precipitationDecryption = precipitationMode ? `(${precipitationMode})`:'';
        let cityInfo = `${this.props.name} (${this.props.country})`;

        let handlerNextCity = this.changeShowCity.bind(this, true);
        let handlerPrevCity = this.changeShowCity.bind(this, false);

        return (
            <div className={cssWeather.general}>
                <div className={cssWeather.next_city} onClick={handlerNextCity}><i className="fa fa-arrow-right"></i></div>
                <div className={cssWeather.prev_city} onClick={handlerPrevCity}><i className="fa fa-arrow-left"></i></div>

                <img className={cssWeather.general__icon} src={`http://openweathermap.org/img/w/${this.props.weather.icon}.png`}/>
                <div className={cssWeather.description}>
                    <div className={cssWeather.description__weather}>{this.props.weather.description + precipitationDecryption}</div>
                    <div className={cssWeather.description__container}>
                        <div className={cssWeather.description__temp}>{this.props.weather.temperature.avr}</div>
                        <div className={cssWeather.description__place}>
                            <div className={cssWeather.description__date}>{this.props.weather.date}</div>
                            <div className={cssWeather.description__city}>{cityInfo}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * handler event change display city. invoke parent handler
     * @protected
     * @param {boolean} nextCity - mark direction bypass list cities. true - next, false - prev
     */
    changeShowCity (nextCity){
        this.props.changeShowCity(nextCity);
    }
}

GeneralInfo.defaultProps = {
    weather: {
        icon: "01d",
        name: "current weather?",
        temperature: {
            avr: "Temp?"
        },
        precipitation: {
        },
        description: 'Weather?'
    },
    name: 'City?',
    country: 'Country?'
};

export default GeneralInfo;