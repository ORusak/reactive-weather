/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import cssWeather from './weather.styl';

/**
 * Component display city today detail weather data
 * @exports DetailInfo
 * @author Oleg Rusak
 * */
class DetailInfo extends React.Component {
    //todo: Current UV Index
    //http://openweathermap.org/api_uv
    render() {
        let settings = this.props.settings;

        let windDescription = this.props.weather.wind.speed;
        windDescription += this.props.weather.wind.direction ? ', ' + this.props.weather.wind.direction : '';

        return (
            <div className={cssWeather.detail}>
                <div className={cssWeather.detail__column}>
                    <Parametr name="Pressure" key="Pressure" value={this.props.weather.pressure.avr}/>
                    <Parametr name="Humidity" key="Humidity" value={this.props.weather.humidity}/>
                    <Parametr name="Wind" key="Wind" value={windDescription}/>

                </div>
                <div className={cssWeather.detail__column}>
                    <Parametr name="Clouds" key="Clouds" value={this.props.weather.clouds.value}/>
                    <Parametr name="Sunrise" key="Sunrise" value={this.props.weather.sun.rise}/>
                    <Parametr name="Sunset" key="Sunset" value={this.props.weather.sun.set}/>
                </div>
            </div>
        )
    }
}

DetailInfo.defaultProps = {
    weather: {
        pressure: {
            avr: '-'
        },
        wind: {
            speed: '-',
            direction: '-'
        },
        clouds: {
            value: '-'
        },
        sun: {
            rise: '-',
            set: '-'
        }
    },
    settings: {}
};

/**
 * Stateless component display city today one parameter weather data
 * @exports Parametr
 * @author Oleg Rusak
 * */
let Parametr = (props) => {
    return (
        <div className={cssWeather.parametr}>
            <div className={cssWeather.parametr__name}>{props.name}</div>
            <div className={cssWeather.parametr__value}>{props.value}</div>
        </div>
    );
};

export default DetailInfo;