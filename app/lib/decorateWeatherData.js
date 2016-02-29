/**
 * Created by Rusak Oleg on 28.02.2016.
 */
import windrose from 'windrose';

const DEGREE_CHAR_CODE = 176;
const DEGREE_CHAR = String.fromCharCode(DEGREE_CHAR_CODE);

class DecorateWeatherData {
    static getDecorateData (data, units){
        data.loc.lon = data.loc.lon + DEGREE_CHAR;
        data.loc.lat = data.loc.lat + DEGREE_CHAR;

        let dateWeather = Object.keys(data.weather);

        for (let key of dateWeather) {
            let weather = data.weather[key];

            weather.date = DecorateWeatherData.getFormattedDate(weather.date, {
                day: "2-digit",
                month: "short"
            });

            weather.temperature.avr = DecorateWeatherData.getFormattedTemperature(weather.temperature.avr, units);
            weather.temperature.min = DecorateWeatherData.getFormattedTemperature(weather.temperature.min);
            weather.temperature.max = DecorateWeatherData.getFormattedTemperature(weather.temperature.max);

            weather.pressure.avr = Math.round(parseFloat(weather.pressure.avr)) + units.pressure;

            weather.humidity = weather.humidity + '%';

            let precipitation = weather.precipitation.mode;
            weather.precipitation.mode = precipitation ? weather.precipitation.mode : '';
            weather.precipitation.value = precipitation ? weather.precipitation.value + units.precipitation: '';

            weather.clouds.value = weather.clouds.value + '%';

            weather.wind.speed = Math.round(parseFloat(weather.wind.speed)) + units.wind;
            if (weather.wind.deg) {
                weather.wind.direction = windrose.getPoint(parseFloat(weather.wind.deg), {depth: 0}).symbol;
                weather.wind.deg = weather.wind.deg + DEGREE_CHAR;
            }

            weather.sun.rise = DecorateWeatherData.getFormattedDate(weather.sun.rise, {
                hour: "2-digit",
                minute: "2-digit"
            });

            weather.sun.set = DecorateWeatherData.getFormattedDate(weather.sun.set, {
                hour: "2-digit",
                minute: "2-digit"
            });
        }

        return data;
    }

    /**
     * getFormattedDate
     * @param string|Date представление даты
     * @option object настройки формата
     * @return string форматированное представление даты
     * */
    static getFormattedDate(date, option) {
        if (date && date!='-') {
            let formatter = new Intl.DateTimeFormat("en-US", option);
            return formatter.format(date);
        }

        return '';
    }

    static getFormattedTemperature(temperature, units) {
        let unit = units ? units.temperature.letter : '';
        return `${Math.round(parseFloat(temperature))}${DEGREE_CHAR}${unit}`;
    }
}

export default DecorateWeatherData;