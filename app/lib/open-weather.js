/**
 * Created by Rusak Oleg on 22.02.2016.
 */

/**
 * Interface receive data from openweathermap
 * @exports DSOpenWeather
 * @author Oleg Rusak
 * */
class DSOpenWeather {
    /**
     * Return supported name source data API
     * @static
     * @return {string} - name source data API*/
    static get nameAPI (){
        return "openweathermap";
    }

    /**
     * Return description supported method API
     * @static
     * @return {object} - description supported method API*/
    static get API (){
        return  {
            URL: 'http://api.openweathermap.org/data/2.5/',
            forecast: {
                method: 'forecast/daily',

                map: DSOpenWeather.mapDataForecast
            },
            weather: {
                method: 'weather',
                map: DSOpenWeather.mapDataWeather
            }
        };
    }

    /**
     * return data request method API
     * @public
     * @param {object} options - name method, param method
     * @return {object} - method weather data*/
    async getDataMethod (options){
        let {method, param} = options;
        let ctx =   this;
        let map = DSOpenWeather.API[method].map;

        return await timeout(500, fetch (this.getRequestAPIMethod(method, param)))
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return data.cod==200 ? map(data) : data;
            })
            .catch((err) => {console.error(err)});
    }

    /**
     * return URL request method API
     * @public
     * @param {string} methodAPI - name method
     * @param {object} parameter - parameters method
     * @return {string} - URL request*/
    getRequestAPIMethod (methodAPI, parameter){
        let weatherDataAPI = DSOpenWeather.API;
        let method = weatherDataAPI[methodAPI].method;

        if (!method) {
            throw new Error(`Not support method [${methodAPI}]`);
        }

        parameter = parameter ? parameter : {};

        let data = Object.keys(parameter).map((k, index, array) => {
            return k + "=" + parameter[k];
        });

        return weatherDataAPI.URL + method + '?' +  data.join('&');
    }

    /**
     * map data method "weather" API to app state
     * @static
     * @param {object} data - data method API
     * @return {object} - data formatted to app state*/
    static mapDataWeather (data){
        let model = {};
        model.id = data.id;
        model.name = data.name;
        model.country = data.sys.country;
        model.loc = {
            lon: data.coord.lon,
            lat: data.coord.lat
        };
        model.code = data.cod;

        let dataWeather = data.weather[0];
        model.weather = {};

        let date = getDateWithoutTime(parseInt(data.dt)*1000);

        //todo: date.getTime() change on +date
        model.weather[date.getTime()] = {
            date: date,
            mode_id: dataWeather.id,
            name: dataWeather.main,
            description: dataWeather.description,
            icon: dataWeather.icon,
            temperature: {
                avr: data.main.temp,
                min: data.main.temp_min,
                max: data.main.temp_max
            },
            pressure: {
                avr: data.main.pressure,
                sea_level: null,
                ground_level: null
            },
            humidity: data.main.humidity,
            precipitation: DSOpenWeather.getPrecipitation (data),
            clouds: DSOpenWeather.getCloud (data['clouds']),
            wind: {
                speed: data.wind.speed,
                deg: data.wind.deg
            },
            sun: {
                rise: new Date(parseInt(data.sys.sunrise)*1000),
                set: new Date(parseInt(data.sys.sunset)*1000)
            }
        };

        return model;
    }

    /**
     * Precipitation data to format app state
     * @static
     * @param {object} data - data method API
     * @return {object} - data precipitation formatted to app state*/
    static getPrecipitation (data){
        let modelData = {};
        for (let p in data){
            if (p == 'snow' || p == 'rain' || p == 'no'){
                modelData.mode = p;
                modelData.value = data[p];
            }
        }

        return modelData;
    }

    /**
     * Cloud data to format app state
     * @static
     * @param {object} cloudData - data part method API for cloud
     * @return {object} - data cloud formatted to app state*/
    static getCloud (cloudData){
        let modelData = {};
        for (let k in cloudData){
            modelData.mode = k;
            modelData.value = cloudData[k];

            //считаем что больше одного значения облачности прийти не может
            break;
        }

        return modelData;
    }

    /**
     * map data method "forecast" API to app state
     * @static
     * @param {object} data - data method API
     * @return {object} - data formatted to app state*/
    static mapDataForecast (data){
        let model = {};

        model.id = data.city.id;
        model.name = data.city.name;
        model.country = data.city.country;
        model.loc = {
            lon: data.city.coord.lon,
            lat: data.city.coord.lat
        };
        model.code = data.cod;

        model.weather = {};

        //todo: bug with timezone offset
        //at 00:00 data not display. required create date with offset API
        let today = getDateWithoutTime(new Date());
        //console.log(today.getTimezoneOffset() / 60);

        let millsToday = +today;

        for (let dataDayWeather of data.list){

            let dataWeather = dataDayWeather.weather[0];

            let date = getDateWithoutTime (parseInt(dataDayWeather.dt)*1000);

            //сегодняшний день получаем через запрос к weather. он более подробный
            if (date.getTime() == millsToday) continue;

            model.weather[date.getTime()] = {
                mode_id: dataWeather.id,
                date: date,
                name: dataWeather.main,
                description: dataWeather.description,
                icon: dataWeather.icon,
                temperature: {
                    avr: dataDayWeather.temp.day,
                    min: dataDayWeather.temp.min,
                    max: dataDayWeather.temp.max
                },
                pressure: {
                    avr: dataDayWeather.pressure,
                    sea_level: null,
                    ground_level: null
                },
                humidity: dataDayWeather.humidity,
                precipitation: DSOpenWeather.getPrecipitation (dataDayWeather),
                clouds: {
                    value: dataDayWeather.clouds
                },
                wind: {
                    speed: dataDayWeather.speed,
                    deg: dataDayWeather.deg
                },
                sun: {

                }
            };
        }

        return model;
    }
}

/**
 * round date without time
 * @param string|Date представление даты
 * @return Date дата с нулевым временем
 * */
function getDateWithoutTime (d){
    let date = new Date(d);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * set timeout request to API
 * @param {number} ms - delay timeout
 * @param {object} promise - promise what you want to run with a delay
*/
function timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
        setTimeout(()=> {
            promise.then(resolve, reject)
        }, ms);
    })
}

export default DSOpenWeather;