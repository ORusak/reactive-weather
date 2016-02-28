/**
 * Created by Rusak Oleg on 22.02.2016.
 */

class DSOpenWeather {
    static get nameAPI (){
        return "openweathermap";
    }

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

    constructor (options){
        this.key = options.key;
        this.unit = options.unit;
        this.lang = options.lang;

        this.data;
    }

    getDataMethod (options){
        let {method, handler, timeout, param} = options;
        let ctx =   this;
        let map = DSOpenWeather.API[method].map;

        setTimeout(() => fetch (this.getRequestAPIMethod(method, param))
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.cod==200) {
                    handler(map(data));
                }else{
                    handler(null, data);
                }
            })
            .catch((err) => {console.error(err)}), timeout);
    }

    getRequestAPIMethod (methodAPI, parametr){
        let data = [];
        let weatherDataAPI = DSOpenWeather.API;
        let method = weatherDataAPI[methodAPI].method;

        if (!method) {
            throw new Error(`Not support method [${methodAPI}]`);
        }

        parametr = parametr ? parametr : {};

        parametr = Object.keys(parametr).map((k, index, array) => {
            return [k, parametr[k]];
        });

        let param = new Map([
            ['APPID', this.key],
            ['lang', this.lang],
            ['units', this.unit]
        ].concat(parametr));

        param.forEach((value, key) => {
            data.push(key + '='+ value);
        });

        return weatherDataAPI.URL + method + '?' +  data.join('&');
    }

    static mapDataWeather (data){
        let model = {};
        model.id = data.id;
        model.name = data.name;
        model.country = data.sys.country;
        model.loc = {
            lon: data.coord.lon,
            lat: data.coord.lat
        };

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

    static mapDataForecast (data){
        let model = {};

        model.id = data.city.id;
        model.name = data.city.name;
        model.country = data.city.country;
        model.loc = {
            lon: data.city.coord.lon,
            lat: data.city.coord.lat
        };

        model.weather = {};

        let today = getDateWithoutTime(new Date());
        let millsToday = today.getTime()

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
 * getDateWithoutTime
 * @param string|Date представление даты
 * @return Date дата с нулевым временем
 * */
function getDateWithoutTime (d){
    let date = new Date(d);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export default DSOpenWeather;