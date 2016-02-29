/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Rusak Oleg on 09.02.2016.
	 */

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _app = __webpack_require__(3);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		_reactDom2.default.render(_react2.default.createElement(_app2.default, null), document.getElementById('container'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(4);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _getIterator2 = __webpack_require__(7);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _keys = __webpack_require__(44);

	var _keys2 = _interopRequireDefault(_keys);

	var _getPrototypeOf = __webpack_require__(49);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(52);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(53);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(56);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(68);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _style = __webpack_require__(75);

	var _style2 = _interopRequireDefault(_style);

	var _weather = __webpack_require__(79);

	var _weather2 = _interopRequireDefault(_weather);

	var _settings = __webpack_require__(85);

	var _settings2 = _interopRequireDefault(_settings);

	var _cities = __webpack_require__(89);

	var _cities2 = _interopRequireDefault(_cities);

	var _openWeather = __webpack_require__(92);

	var _openWeather2 = _interopRequireDefault(_openWeather);

	var _decorateWeatherData = __webpack_require__(107);

	var _decorateWeatherData2 = _interopRequireDefault(_decorateWeatherData);

	var _unitMeasure = __webpack_require__(88);

	var _weather3 = __webpack_require__(109);

	var _weather4 = _interopRequireDefault(_weather3);

	var _weather_moscow = __webpack_require__(110);

	var _weather_moscow2 = _interopRequireDefault(_weather_moscow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//todo: ленивую подгрузку остальных табов, webpack hot reload

	//todo: поддержку мультиязычности

	//todo: специальный город текущее местоположение

	//todo: вывод осадков

	var WeatherApp = function (_React$Component) {
	    (0, _inherits3.default)(WeatherApp, _React$Component);

	    function WeatherApp(props) {
	        (0, _classCallCheck3.default)(this, WeatherApp);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(WeatherApp).call(this, props));

	        _this.state = _this.setSettingFromLocalOrDefault();
	        return _this;
	    }

	    (0, _createClass3.default)(WeatherApp, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.resumeSetting();

	            this.updateCitiesWeatherData();
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            this.saveSettings(nextState);

	            //todo: отменять обновление при изменении единиц измерения
	            //чтобы при выборе пользователем настроек не запрашивать постоянно данные
	            //обновлять только при переключении вкладки на погодную

	            return true;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var showTabContent = function showTabContent(event) {
	                var activeClass = _style2.default.active;
	                var activeTab = document.querySelector('.' + activeClass);
	                activeTab.classList.remove(activeClass);
	                event.target.classList.add(activeClass);
	                var idContent = event.target.id;

	                _this2.setState(function (previousState, currentProps) {
	                    previousState.settings.showTab = idContent;
	                    return previousState;
	                });
	            };

	            var changeShowCity = function changeShowCity(idDisplayCity) {
	                _this2.setState(function (previousState) {
	                    previousState.settings.id_display_city = idDisplayCity;
	                    return previousState;
	                });
	            };

	            var changeCitiesList = function changeCitiesList(city) {
	                _this2.setState(function (previousState) {
	                    previousState.cities[city.id] = city;
	                    return previousState;
	                });

	                _this2.updateCityWeatherData(city.id, 1000);
	            };

	            var updateSettings = this.updateSettings.bind(this);

	            var showTab = this.state.settings.showTab;
	            var tabs = ["weather", "cities", "settings"].map(function (tabName) {
	                var classTab = _style2.default.tab + (showTab == tabName ? " " + _style2.default.active : '');
	                return React.createElement(
	                    'div',
	                    { id: tabName, className: classTab, key: tabName, onClick: showTabContent },
	                    tabName
	                );
	            });

	            return React.createElement(
	                'div',
	                { className: _style2.default.weather_container },
	                React.createElement(
	                    'div',
	                    { className: 'tabs' },
	                    tabs
	                ),
	                React.createElement(_weather2.default, { cities: this.state.cities, settings: this.state.settings,
	                    changeShowCity: changeShowCity }),
	                React.createElement(_settings2.default, { settings: this.state.settings, updateSettings: updateSettings }),
	                React.createElement(_cities2.default, { settings: this.state.settings, cities: this.state.cities, changeCitiesList: changeCitiesList })
	            );
	        }
	    }, {
	        key: 'updateCitiesWeatherData',
	        value: function updateCitiesWeatherData() {
	            //первым обновляем город выводимый по умолчанию
	            var indexDisplayCity = this.state.settings.id_display_city;
	            var citiesKey = (0, _keys2.default)(this.state.cities).sort(function (a, b) {
	                return a == indexDisplayCity ? -1 : 1;
	            });

	            //todo: убрать когда состояние не будет сразу обновлятся после поиска нового города
	            var timeout = 1000;

	            var cities = this.state.cities;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = (0, _getIterator3.default)(citiesKey), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var key = _step.value;

	                    var cityId = cities[key].id;
	                    this.updateCityWeatherData(cityId, timeout);

	                    timeout += 2000;
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'updateCityWeatherData',
	        value: function updateCityWeatherData(cityId, timeout) {
	            if (!this.state.settings.API.openweathermap.key) return false;

	            var dataSource = new _openWeather2.default({
	                key: this.state.settings.API.openweathermap.key,
	                unit: this.state.settings.unit_measure,
	                lang: this.state.settings.lang
	            });

	            var handlerUpdateCityWeatherData = this.handlerUpdateCityWeatherData.bind(this);
	            dataSource.getDataMethod({
	                method: 'weather',
	                param: {
	                    id: cityId
	                },
	                handler: handlerUpdateCityWeatherData,
	                timeout: timeout
	            });

	            timeout += 1000;

	            dataSource.getDataMethod({
	                method: 'forecast',
	                param: {
	                    id: cityId,
	                    cnt: 4
	                },
	                handler: handlerUpdateCityWeatherData,
	                timeout: timeout
	            });
	            return true;
	        }
	    }, {
	        key: 'handlerUpdateCityWeatherData',
	        value: function handlerUpdateCityWeatherData(data, dataError) {
	            if (data == null) {
	                if (dataError.cod == 404) console.log("Город не найден");else console.log(data.message);
	            }

	            //console.log(data);

	            data = _decorateWeatherData2.default.getDecorateData(data, this.state.units);

	            this.setState(function (previousState, currentProps) {
	                var city = previousState.cities[data.id];
	                city.name = data.name;
	                city.country = data.country;
	                city.loc = data.loc;

	                var cityWeather = city.weather;
	                (0, _keys2.default)(data.weather).forEach(function (k) {
	                    cityWeather[k] = data.weather[k];
	                });

	                return previousState;
	            });
	        }
	    }, {
	        key: 'saveSettings',
	        value: function saveSettings(state) {
	            var localStorageSupport = 'localStorage' in window && window['localStorage'] !== null;

	            var localStorage = window.localStorage;
	            var settings = {};

	            settings.cities = (0, _keys2.default)(this.state.cities).map(function (key) {
	                return key;
	            });
	            settings.settings = this.state.settings;

	            localStorage.weather_app = (0, _stringify2.default)(settings);
	        }
	    }, {
	        key: 'resumeSetting',
	        value: function resumeSetting() {
	            var localStorage = window.localStorage;
	            var settings = localStorage.weather_app;
	            if (settings) return JSON.parse(settings);else return null;
	        }

	        /**
	        * updateSettings */

	    }, {
	        key: 'updateSettings',
	        value: function updateSettings(event) {
	            var _this3 = this;

	            var nameChangeElement = event.target.name;
	            var valueChangeElement = event.target.value;

	            this.setState(function (previousState, currentProps) {
	                if (nameChangeElement == "keyApi") {
	                    previousState.settings.API.openweathermap.key = valueChangeElement;
	                }

	                if (nameChangeElement == "languages") {
	                    previousState.settings.lang = valueChangeElement;
	                }

	                if (nameChangeElement == "unitMeasure") {
	                    (function () {
	                        var unitMeasure = valueChangeElement;

	                        previousState.settings.unit_measure = unitMeasure;

	                        var unitMeasureType = _unitMeasure.UnitMeasure.type[unitMeasure];
	                        (0, _keys2.default)(unitMeasureType).forEach(function (key) {
	                            previousState.units[key] = unitMeasureType[key];
	                        });
	                    })();
	                }

	                return previousState;
	            }, function () {
	                return _this3.updateCitiesWeatherData();
	            });
	        }
	    }, {
	        key: 'setSettingFromLocalOrDefault',
	        value: function setSettingFromLocalOrDefault() {
	            var storageData = this.resumeSetting();
	            var state = {};

	            if (storageData) {
	                (function () {
	                    //восстанавливаем блок units
	                    var unitMeasure = storageData.settings.unit_measure;
	                    var units = {};
	                    units.temperature = _unitMeasure.UnitMeasure.type[unitMeasure].temperature;
	                    units.wind = _unitMeasure.UnitMeasure.type[unitMeasure].wind;
	                    units.pressure = _unitMeasure.UnitMeasure.pressure;
	                    units.precipitation = _unitMeasure.UnitMeasure.precipitation;
	                    state.units = units;

	                    //восстанавливаем блок cities
	                    var cities = {};
	                    storageData.cities.forEach(function (idCity) {
	                        cities[idCity] = {
	                            id: idCity,
	                            weather: {}
	                        };
	                    });
	                    state.cities = cities;

	                    //восстанавливаем блок settings
	                    var settings = storageData.settings;

	                    //нет настроек подключения по умолчанию просим их заполнить
	                    if (!settings.API.openweathermap.key) settings.showTab = "settings";

	                    state.settings = settings;
	                })();
	            } else {}

	            return state;
	            /*this.state = {
	                units: {
	                    temperature: {
	                        name: "Celsius",
	                        letter: "С"
	                    },
	                    wind: "m/s",
	                    pressure: "hPa",
	                    precipitation: "mm"
	                },
	                settings: {
	                    unit_measure: "metric",
	                    lang: 'en',
	                    API: {
	                        openweathermap: {
	                            key: '7aaf25e81ae02f237ad79998501b8fe0'
	                        }
	                    },
	                    showTab: "weather",
	                    id_display_city: "519690"
	                },
	                  cities: {
	                    519690: {
	                        id: "519690",
	                        name: "Saint-Peterburg",
	                        country: "RU",
	                        weather: {}
	                    },
	                    2643743: {
	                        id: "2643743",
	                        name: "London",
	                        country: "GB",
	                        weather: {}
	                    }
	                }
	            };*/
	        }
	    }]);
	    return WeatherApp;
	}(React.Component); /**
	                     * Created by Rusak Oleg on 09.02.2016.
	                     */

		exports.default = WeatherApp;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(6);
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(8), __esModule: true };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(9);
	__webpack_require__(36);
	module.exports = __webpack_require__(39);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10);
	var Iterators = __webpack_require__(13);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(11)
	  , step             = __webpack_require__(12)
	  , Iterators        = __webpack_require__(13)
	  , toIObject        = __webpack_require__(14);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(18)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(15)
	  , defined = __webpack_require__(17);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(16);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(19)
	  , $export        = __webpack_require__(20)
	  , redefine       = __webpack_require__(24)
	  , hide           = __webpack_require__(25)
	  , has            = __webpack_require__(30)
	  , Iterators      = __webpack_require__(13)
	  , $iterCreate    = __webpack_require__(31)
	  , setToStringTag = __webpack_require__(32)
	  , getProto       = __webpack_require__(26).getProto
	  , ITERATOR       = __webpack_require__(33)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(21)
	  , core      = __webpack_require__(6)
	  , ctx       = __webpack_require__(22)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 21 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(23);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(25);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(26)
	  , createDesc = __webpack_require__(27);
	module.exports = __webpack_require__(28) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(29)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(26)
	  , descriptor     = __webpack_require__(27)
	  , setToStringTag = __webpack_require__(32)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(25)(IteratorPrototype, __webpack_require__(33)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(26).setDesc
	  , has = __webpack_require__(30)
	  , TAG = __webpack_require__(33)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(34)('wks')
	  , uid    = __webpack_require__(35)
	  , Symbol = __webpack_require__(21).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(21)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(37)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(18)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38)
	  , defined   = __webpack_require__(17);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(40)
	  , get      = __webpack_require__(42);
	module.exports = __webpack_require__(6).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(41);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(43)
	  , ITERATOR  = __webpack_require__(33)('iterator')
	  , Iterators = __webpack_require__(13);
	module.exports = __webpack_require__(6).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(16)
	  , TAG = __webpack_require__(33)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(45), __esModule: true };

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(46);
	module.exports = __webpack_require__(6).Object.keys;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(47);

	__webpack_require__(48)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(17);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(20)
	  , core    = __webpack_require__(6)
	  , fails   = __webpack_require__(29);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(50), __esModule: true };

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(51);
	module.exports = __webpack_require__(6).Object.getPrototypeOf;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(47);

	__webpack_require__(48)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 52 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(54);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(55), __esModule: true };

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(26);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(57);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _Symbol === "function" && obj.constructor === _Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;

	var _iterator = __webpack_require__(58);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(60);

	var _symbol2 = _interopRequireDefault(_symbol);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(59), __esModule: true };

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(36);
	__webpack_require__(9);
	module.exports = __webpack_require__(33)('iterator');

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	__webpack_require__(67);
	module.exports = __webpack_require__(6).Symbol;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(26)
	  , global         = __webpack_require__(21)
	  , has            = __webpack_require__(30)
	  , DESCRIPTORS    = __webpack_require__(28)
	  , $export        = __webpack_require__(20)
	  , redefine       = __webpack_require__(24)
	  , $fails         = __webpack_require__(29)
	  , shared         = __webpack_require__(34)
	  , setToStringTag = __webpack_require__(32)
	  , uid            = __webpack_require__(35)
	  , wks            = __webpack_require__(33)
	  , keyOf          = __webpack_require__(63)
	  , $names         = __webpack_require__(64)
	  , enumKeys       = __webpack_require__(65)
	  , isArray        = __webpack_require__(66)
	  , anObject       = __webpack_require__(40)
	  , toIObject      = __webpack_require__(14)
	  , createDesc     = __webpack_require__(27)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });

	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };

	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(19)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});

	setter = true;

	$export($export.G + $export.W, {Symbol: $Symbol});

	$export($export.S, 'Symbol', symbolStatics);

	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(26)
	  , toIObject = __webpack_require__(14);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(14)
	  , getNames  = __webpack_require__(26).getNames
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(26);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(16);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(69);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(73);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(57);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(70), __esModule: true };

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(71);
	module.exports = __webpack_require__(6).Object.setPrototypeOf;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(20);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(72).set});

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(26).getDesc
	  , isObject = __webpack_require__(41)
	  , anObject = __webpack_require__(40);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(22)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(26);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(76);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(78)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?localIdentName=[name]__[local]___[hash:base64:5]!./../node_modules/stylus-loader/index.js!./style.styl", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?localIdentName=[name]__[local]___[hash:base64:5]!./../node_modules/stylus-loader/index.js!./style.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(77)();
	// imports


	// module
	exports.push([module.id, ".style__weather_container___zNkcG {\n  width: 250px;\n  margin: 100px auto;\n  padding: 10px;\n  text-align: left;\n}\n.style__tab_container___38VSm {\n  font-size: 13pt;\n  clear: left;\n}\n.style__general___2H1Hm {\n  border: 1px solid #000;\n}\n.style__general__icon___30EC8 {\n  width: 100%;\n  height: 100%;\n}\n.style__description___nPor8 {\n  display: inline-block;\n  width: 45%;\n}\n.style__parametr___2LB9P {\n  float: left;\n  width: 33%;\n}\n.style__active___y9QiM {\n  border-bottom: 1px solid #000;\n}\n.style__tab___3UiaK {\n  float: left;\n  width: 33%;\n  cursor: pointer;\n}\n.style__hide_tab___3-yL5 {\n  display: none;\n}\n.style__forecast_day___2Dhcs {\n  float: left;\n  width: 25%;\n}\n", ""]);

	// exports
	exports.locals = {
		"weather_container": "style__weather_container___zNkcG",
		"tab_container": "style__tab_container___38VSm",
		"general": "style__general___2H1Hm",
		"general__icon": "style__general__icon___30EC8",
		"description": "style__description___nPor8",
		"parametr": "style__parametr___2LB9P",
		"active": "style__active___y9QiM",
		"tab": "style__tab___3UiaK",
		"hide_tab": "style__hide_tab___3-yL5",
		"forecast_day": "style__forecast_day___2Dhcs"
	};

/***/ },
/* 77 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _keys = __webpack_require__(44);

	var _keys2 = _interopRequireDefault(_keys);

	var _getPrototypeOf = __webpack_require__(49);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(52);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(53);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(56);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(68);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _generalInfo = __webpack_require__(80);

	var _generalInfo2 = _interopRequireDefault(_generalInfo);

	var _detailInfo = __webpack_require__(81);

	var _detailInfo2 = _interopRequireDefault(_detailInfo);

	var _forecast = __webpack_require__(83);

	var _forecast2 = _interopRequireDefault(_forecast);

	var _style = __webpack_require__(75);

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Weather = function (_React$Component) {
	    (0, _inherits3.default)(Weather, _React$Component);

	    function Weather(props) {
	        (0, _classCallCheck3.default)(this, Weather);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Weather).call(this, props));

	        _this.state = {
	            id_display_city: _this.props.settings.id_display_city
	        };
	        return _this;
	    }

	    (0, _createClass3.default)(Weather, [{
	        key: 'render',
	        value: function render() {
	            var classTabContent = _style2.default.tab_container + (this.props.settings.showTab == 'weather' ? '' : " " + _style2.default.hide_tab);
	            var city = this.props.cities[this.props.settings.id_display_city];

	            var today = new Date();
	            today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
	            var weatherToday = city.weather ? city.weather[today.getTime()] : undefined;

	            var handlerNextCity = this.changeShowCity.bind(this, true);
	            var handlerPrevCity = this.changeShowCity.bind(this, false);

	            return _react2.default.createElement(
	                'div',
	                { className: classTabContent },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'prevCity', onClick: handlerNextCity },
	                    '+'
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'nextCity', onClick: handlerPrevCity },
	                    '-'
	                ),
	                _react2.default.createElement(_generalInfo2.default, { weather: weatherToday, name: city.name, country: city.country,
	                    id: city.id, settings: this.props.settings }),
	                _react2.default.createElement(_forecast2.default, { weather: city.weather }),
	                _react2.default.createElement(_detailInfo2.default, { weather: weatherToday })
	            );
	        }
	    }, {
	        key: 'changeShowCity',
	        value: function changeShowCity(nextCity, event) {
	            var keyCities = (0, _keys2.default)(this.props.cities);
	            var index = keyCities.indexOf(this.props.settings.id_display_city);

	            if (index == -1) {
	                this.setState({ id_display_city: keyCities[0] });
	                return;
	            }

	            var indexNext = index + (nextCity ? 1 : -1);

	            indexNext = indexNext < 0 ? keyCities.length - 1 : indexNext;
	            indexNext = indexNext == keyCities.length ? 0 : indexNext;

	            this.props.changeShowCity(keyCities[indexNext]);
	        }
	    }]);
	    return Weather;
	}(_react2.default.Component); /**
	                               * Created by Rusak Oleg on 09.02.2016.
	                               */

		exports.default = Weather;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(49);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(52);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(53);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(56);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(68);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(75);

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by Rusak Oleg on 10.02.2016.
	 */

	var GeneralInfo = function (_React$Component) {
	    (0, _inherits3.default)(GeneralInfo, _React$Component);

	    function GeneralInfo() {
	        (0, _classCallCheck3.default)(this, GeneralInfo);
	        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GeneralInfo).apply(this, arguments));
	    }

	    (0, _createClass3.default)(GeneralInfo, [{
	        key: 'render',

	        //todo: http://cssload.net/ru/spinners
	        value: function render() {
	            var precipitationMode = this.props.weather.precipitation.mode;
	            var precipitationDecryption = precipitationMode ? '(' + precipitationMode + ')' : '';
	            var cityInfo = this.props.name + ' (' + this.props.country + ')';

	            return _react2.default.createElement(
	                'div',
	                { className: _style2.default.general },
	                _react2.default.createElement('img', { className: _style2.default.general__icon, src: 'http://openweathermap.org/img/w/' + this.props.weather.icon + '.png' }),
	                _react2.default.createElement(
	                    'div',
	                    { className: _style2.default.description },
	                    _react2.default.createElement(
	                        'h1',
	                        null,
	                        this.props.weather.description + precipitationDecryption
	                    ),
	                    this.props.weather.temperature.avr,
	                    _react2.default.createElement(
	                        'div',
	                        null,
	                        this.props.weather.date
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        null,
	                        cityInfo
	                    )
	                )
	            );
	        }
	    }]);
	    return GeneralInfo;
	}(_react2.default.Component);

	GeneralInfo.defaultProps = {
	    weather: {
	        icon: "01d",
	        name: "current weather?",
	        temperature: {
	            avr: "-"
	        },
	        precipitation: {
	            mode: '-'
	        }
	    }
	};

		exports.default = GeneralInfo;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(49);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(52);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(53);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(56);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(68);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(75);

	var _style2 = _interopRequireDefault(_style);

	var _parametrInfo = __webpack_require__(82);

	var _parametrInfo2 = _interopRequireDefault(_parametrInfo);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DetailInfo = function (_React$Component) {
	    (0, _inherits3.default)(DetailInfo, _React$Component);

	    function DetailInfo() {
	        (0, _classCallCheck3.default)(this, DetailInfo);
	        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DetailInfo).apply(this, arguments));
	    }

	    (0, _createClass3.default)(DetailInfo, [{
	        key: 'render',

	        //todo: Current UV Index
	        //http://openweathermap.org/api_uv
	        value: function render() {
	            var settings = this.props.settings;

	            var windDescription = this.props.weather.wind.speed;
	            windDescription += this.props.weather.wind.direction ? ', ' + this.props.weather.wind.direction : '';

	            return _react2.default.createElement(
	                'div',
	                { className: _style2.default.detail },
	                _react2.default.createElement(_parametrInfo2.default, { name: 'Pressure', key: 'Pressure', value: this.props.weather.pressure.avr }),
	                _react2.default.createElement(_parametrInfo2.default, { name: 'Humidity', key: 'Humidity', value: this.props.weather.humidity }),
	                _react2.default.createElement(_parametrInfo2.default, { name: 'Wind', key: 'Wind', value: windDescription }),
	                _react2.default.createElement(_parametrInfo2.default, { name: 'Clouds', key: 'Clouds', value: this.props.weather.clouds.value }),
	                _react2.default.createElement(_parametrInfo2.default, { name: 'Sunrise', key: 'Sunrise', value: this.props.weather.sun.rise }),
	                _react2.default.createElement(_parametrInfo2.default, { name: 'Sunset', key: 'Sunset', value: this.props.weather.sun.set })
	            );
	        }
	    }]);
	    return DetailInfo;
	}(_react2.default.Component); /**
	                               * Created by Rusak Oleg on 09.02.2016.
	                               */

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

		exports.default = DetailInfo;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(49);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(52);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(53);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(56);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(68);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(75);

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by Rusak Oleg on 09.02.2016.
	 */

	var Parametr = function (_React$Component) {
	    (0, _inherits3.default)(Parametr, _React$Component);

	    function Parametr(props) {
	        (0, _classCallCheck3.default)(this, Parametr);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Parametr).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    (0, _createClass3.default)(Parametr, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: _style2.default.parametr },
	                _react2.default.createElement(
	                    'div',
	                    null,
	                    this.props.name
	                ),
	                _react2.default.createElement(
	                    'div',
	                    null,
	                    this.props.value
	                )
	            );
	        }
	    }]);
	    return Parametr;
	}(_react2.default.Component);

	Parametr.defaultProps = {
	    value: '-'
	};

		exports.default = Parametr;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _keys = __webpack_require__(44);

	var _keys2 = _interopRequireDefault(_keys);

	var _getPrototypeOf = __webpack_require__(49);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(52);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(53);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(56);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(68);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(75);

	var _style2 = _interopRequireDefault(_style);

	var _forecastDay = __webpack_require__(84);

	var _forecastDay2 = _interopRequireDefault(_forecastDay);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Forecast = function (_React$Component) {
	    (0, _inherits3.default)(Forecast, _React$Component);

	    function Forecast() {
	        (0, _classCallCheck3.default)(this, Forecast);
	        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Forecast).apply(this, arguments));
	    }

	    (0, _createClass3.default)(Forecast, [{
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var forecastDay = [];
	            (0, _keys2.default)(this.props.weather).sort().forEach(function (key) {
	                forecastDay.push(_react2.default.createElement(_forecastDay2.default, { weather: _this2.props.weather[key], key: key }));
	            });
	            return _react2.default.createElement(
	                'div',
	                { className: _style2.default.forecast },
	                forecastDay
	            );
	        }
	    }]);
	    return Forecast;
	}(_react2.default.Component); /**
	                               * Created by Rusak Oleg on 09.02.2016.
	                               */

	Forecast.defaultProps = {
	    weather: {}
	};

		exports.default = Forecast;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(49);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(52);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(53);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(56);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(68);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(75);

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by Rusak Oleg on 09.02.2016.
	 */

	var ForecastDay = function (_React$Component) {
	    (0, _inherits3.default)(ForecastDay, _React$Component);

	    function ForecastDay() {
	        (0, _classCallCheck3.default)(this, ForecastDay);
	        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ForecastDay).apply(this, arguments));
	    }

	    (0, _createClass3.default)(ForecastDay, [{
	        key: 'getTitle',
	        value: function getTitle() {
	            var precipitationMode = this.props.weather.precipitation.mode;
	            var precipitationDecryption = precipitationMode ? '(' + precipitationMode + ')' : '';
	            return '' + this.props.weather.description + precipitationDecryption;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var title = this.getTitle();

	            return _react2.default.createElement(
	                'div',
	                { className: _style2.default.forecast_day },
	                _react2.default.createElement(
	                    'div',
	                    null,
	                    this.props.weather.date
	                ),
	                _react2.default.createElement('img', { alt: title, title: title,
	                    src: 'http://openweathermap.org/img/w/' + this.props.weather.icon + '.png' }),
	                _react2.default.createElement(
	                    'div',
	                    null,
	                    this.props.weather.temperature.min,
	                    '/',
	                    this.props.weather.temperature.max
	                )
	            );
	        }
	    }]);
	    return ForecastDay;
	}(_react2.default.Component);

	ForecastDay.defaultProps = {
	    weather: {
	        icon: "01d",
	        temperature: {
	            min: '-',
	            max: '-'
	        }
	    }
	};

		exports.default = ForecastDay;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _keys = __webpack_require__(44);

	var _keys2 = _interopRequireDefault(_keys);

	var _getPrototypeOf = __webpack_require__(49);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(52);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(53);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(56);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(68);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(75);

	var _style2 = _interopRequireDefault(_style);

	var _settings = __webpack_require__(86);

	var _settings2 = _interopRequireDefault(_settings);

	var _unitMeasure = __webpack_require__(88);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by Rusak Oleg on 15.02.2016.
	 */

	var DEGREE_CHAR_CODE = 176;
	var DEGREE_CHAR = String.fromCharCode(DEGREE_CHAR_CODE);

	var Settings = function (_React$Component) {
	    (0, _inherits3.default)(Settings, _React$Component);

	    function Settings(props) {
	        (0, _classCallCheck3.default)(this, Settings);
	        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Settings).call(this, props));
	    }

	    (0, _createClass3.default)(Settings, [{
	        key: 'render',
	        value: function render() {
	            var classTabContent = _style2.default.tab_container + (this.props.settings.showTab == 'settings' ? '' : " " + _style2.default.hide_tab);
	            var updateSettings = this.props.updateSettings;
	            var currentUnitMeasure = this.props.settings.unit_measure;

	            var listUnits = (0, _keys2.default)(_unitMeasure.UnitMeasure.type).map(function (key) {
	                return { name: key, value: key };
	            });

	            return _react2.default.createElement(
	                'div',
	                { className: classTabContent },
	                _react2.default.createElement(
	                    'div',
	                    { className: _style2.default.field },
	                    _react2.default.createElement(
	                        'label',
	                        null,
	                        'Data Source'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        null,
	                        _react2.default.createElement('input', { type: 'radio', id: 'OpenWeatherMap', name: 'dataSource', value: 'OpenWeatherMap',
	                            defaultChecked: true, readOnly: true }),
	                        _react2.default.createElement(
	                            'label',
	                            { htmlFor: 'OpenWeatherMap' },
	                            'OpenWeatherMap'
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: _style2.default.field },
	                    _react2.default.createElement(
	                        'label',
	                        null,
	                        'API Key (',
	                        _react2.default.createElement(
	                            'a',
	                            { href: 'http://openweathermap.org/appid' },
	                            'get key'
	                        ),
	                        ')'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        null,
	                        _react2.default.createElement('textarea', { name: 'keyApi', defaultValue: this.props.settings.API.openweathermap.key,
	                            onChange: updateSettings })
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: _style2.default.field },
	                    _react2.default.createElement(
	                        'label',
	                        null,
	                        'Data receive languages'
	                    ),
	                    _react2.default.createElement(SelectElement, { name: 'languages', list: _unitMeasure.Languages, current: this.props.settings.lang,
	                        updateSettings: updateSettings })
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: _style2.default.field },
	                    _react2.default.createElement(
	                        'label',
	                        null,
	                        'Unit measure'
	                    ),
	                    _react2.default.createElement(RadioElement, { name: 'unitMeasure', list: listUnits, current: currentUnitMeasure,
	                        updateSettings: updateSettings })
	                ),
	                _react2.default.createElement(UnitExample, { unitType: this.props.settings.unit_measure })
	            );
	        }
	    }]);
	    return Settings;
	}(_react2.default.Component);

	var UnitExample = function UnitExample(props) {
	    var currentUnitMeasure = props.unitType;
	    var measure = _unitMeasure.UnitMeasure.type[currentUnitMeasure];

	    return _react2.default.createElement(
	        'div',
	        { className: _settings2.default.unit_example },
	        _react2.default.createElement(
	            'label',
	            null,
	            'Look like'
	        ),
	        _react2.default.createElement(
	            'div',
	            null,
	            'Temperature: ',
	            measure.temperature.example + DEGREE_CHAR,
	            measure.temperature.letter,
	            '(',
	            measure.temperature.name,
	            ')'
	        ),
	        _react2.default.createElement(
	            'div',
	            null,
	            'Wind: ',
	            measure.wind_example,
	            measure.wind,
	            ', S(South)'
	        ),
	        _react2.default.createElement(
	            'div',
	            null,
	            'Pressure: ',
	            _unitMeasure.UnitMeasure.pressure_example,
	            _unitMeasure.UnitMeasure.pressure
	        ),
	        _react2.default.createElement(
	            'div',
	            null,
	            'Precipitation: ',
	            _unitMeasure.UnitMeasure.precipitation_example,
	            _unitMeasure.UnitMeasure.precipitation
	        )
	    );
	};

	var RadioElement = function RadioElement(props) {
	    var collection = props.list.map(function (elem) {
	        var id = elem.value;
	        var name = elem.name;
	        return _react2.default.createElement(
	            'div',
	            { key: id },
	            _react2.default.createElement('input', { type: 'radio', id: id, name: props.name,
	                value: id, checked: props.current == id, onChange: props.updateSettings }),
	            _react2.default.createElement(
	                'label',
	                { htmlFor: id },
	                name
	            )
	        );
	    });

	    return _react2.default.createElement(
	        'div',
	        null,
	        collection
	    );
	};

	var SelectElement = function SelectElement(props) {
	    var collection = props.list.map(function (elem) {
	        var id = elem.value;
	        var name = elem.name;
	        return _react2.default.createElement(
	            'option',
	            { key: id, value: id },
	            name
	        );
	    });

	    return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	            'select',
	            { name: props.name, onChange: props.updateSettings, defaultValue: props.current },
	            collection
	        )
	    );
	};

		exports.default = Settings;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(87);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(78)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?localIdentName=[name]__[local]___[hash:base64:5]!./../../node_modules/stylus-loader/index.js!./settings.styl", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?localIdentName=[name]__[local]___[hash:base64:5]!./../../node_modules/stylus-loader/index.js!./settings.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(77)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ },
/* 88 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var UnitMeasure = {
	    type: {
	        thermodynamic: {
	            temperature: {
	                name: "Kelvin",
	                letter: "K",
	                example: 264
	            },
	            wind: "m/s",
	            wind_example: 3
	        },
	        metric: {
	            temperature: {
	                name: "Celsius",
	                letter: "C",
	                example: -9
	            },
	            wind: "m/s",
	            wind_example: 3
	        },
	        imperial: {
	            temperature: {
	                name: "Fahrenheit",
	                letter: "F",
	                example: 15
	            },
	            wind: "mph",
	            wind_example: 7
	        }
	    },
	    pressure: "hPa",
	    pressure_example: 978,
	    precipitation: "mm",
	    precipitation_example: 4
	};

	var Languages = [{ name: "English", value: "en" }, { name: "Russian", value: "ru" }, { name: "Italian", value: "it" }, {
	    name: "Spanish",
	    value: "sp"
	}, { name: "Ukrainian", value: "ua" }, { name: "German", value: "de" }, { name: "Portuguese", value: "pt" }, { name: "Romanian", value: "ro" }, { name: "Polish", value: "pl" }, {
	    name: "Finnish",
	    value: "fi"
	}, { name: "Dutch", value: "nl" }, { name: "French", value: "fr" }, { name: "Bulgarian", value: "bg" }, {
	    name: "Swedish",
	    value: "se"
	}, { name: "Chinese Traditional", value: "zh_tw" }, { name: "Chinese Simplified", value: "zh_cn" }, { name: "Turkish", value: "tr" }, {
	    name: "Croatian",
	    value: "hr"
	}, { name: "Catalan", value: "ca" }];

	exports.UnitMeasure = UnitMeasure;
		exports.Languages = Languages;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _keys = __webpack_require__(44);

	var _keys2 = _interopRequireDefault(_keys);

	var _getPrototypeOf = __webpack_require__(49);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(52);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(53);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(56);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(68);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _style = __webpack_require__(75);

	var _style2 = _interopRequireDefault(_style);

	var _cities = __webpack_require__(90);

	var _cities2 = _interopRequireDefault(_cities);

	var _openWeather = __webpack_require__(92);

	var _openWeather2 = _interopRequireDefault(_openWeather);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var KEY_CODE_ENTER = 13; /**
	                          * Created by Rusak Oleg on 09.02.2016.
	                          */

	var Cities = function (_React$Component) {
	    (0, _inherits3.default)(Cities, _React$Component);

	    function Cities(props) {
	        (0, _classCallCheck3.default)(this, Cities);
	        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Cities).call(this, props));
	    }

	    (0, _createClass3.default)(Cities, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.refs.city.focus();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var classTabContent = _style2.default.tab_container + (this.props.settings.showTab == 'cities' ? '' : " " + _style2.default.hide_tab);

	            var dataSource = new _openWeather2.default({
	                key: this.props.settings.API.openweathermap.key,
	                unit: this.props.settings.unit_measure,
	                lang: this.props.settings.lang
	            });

	            var handlerClick = function handlerClick(event) {
	                if (event.type == 'keydown' && event.nativeEvent.keyCode != KEY_CODE_ENTER) {
	                    event.stopPropagation();
	                    return;
	                }

	                if (!_this2.state.settings.API.openweathermap.key) return false;

	                dataSource.getDataMethod({
	                    method: 'weather',
	                    param: {
	                        q: _this2.refs.city.value
	                    },
	                    handler: function handler(data, dataError) {
	                        if (data == null) {
	                            if (dataError.cod == 404) console.log("Город не найден");else console.log(data.message);
	                        } else {
	                            _this2.props.changeCitiesList(data);
	                        }
	                    },
	                    timeout: 1000
	                });

	                return true;
	            };

	            var handlerRemove = function handlerRemove(event) {
	                var cityId = event.currentTarget.parentNode.id;
	                _this2.setState(function (previousState, currentProps) {
	                    delete previousState[cityId];
	                    return previousState;
	                });
	            };

	            var saveCities = this.props.cities;
	            var citiesList = (0, _keys2.default)(saveCities).map(function (cityId) {
	                var city = saveCities[cityId];
	                var cityDescription = city.name + ' (' + city.country + ')';

	                return React.createElement(
	                    'li',
	                    { className: _cities2.default.city, id: cityId, key: cityId },
	                    React.createElement(
	                        'div',
	                        { className: _cities2.default.city_name },
	                        cityDescription
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: _cities2.default.button, onClick: handlerRemove },
	                        React.createElement('i', { className: 'fa fa-times' })
	                    )
	                );
	            });

	            //todo: добавить вывод предупреждения если не заполнен ключ
	            //if (!this.state.settings.API.openweathermap.key)

	            return React.createElement(
	                'div',
	                { className: classTabContent },
	                React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'label',
	                        null,
	                        'Enter the name of the city, where the weather is interested'
	                    ),
	                    React.createElement(
	                        'div',
	                        null,
	                        React.createElement('input', { className: 'search', type: 'text', ref: 'city', onKeyDown: handlerClick }),
	                        React.createElement(
	                            'span',
	                            { className: _cities2.default.button, onClick: handlerClick },
	                            React.createElement('i', { className: 'fa fa-search' })
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'label',
	                        null,
	                        'Select cities'
	                    ),
	                    React.createElement(
	                        'ul',
	                        { className: _cities2.default.cities },
	                        citiesList
	                    )
	                )
	            );
	        }
	    }]);
	    return Cities;
	}(React.Component);

	;

	/*, Saint Barts  light intensity shower rain
	24.6°С  temperature from 24 to 25°С, wind 4.1m/s. clouds 75%, 1017 hpa

	Geo coords [ -62.8498, 17.8978 ]*/

	//todo: добавить посик по текущему местонахождению

	//todo: добавить вывод результата поиска
	var SearchResult = function SearchResult(props) {
	    var city = props.city;
	    var weather = city.weather;
	    return React.createElement(
	        'div',
	        { className: _cities2.default.result },
	        React.createElement(
	            'div',
	            { className: _cities2.default.result_city_name },
	            'city.name (city.country)'
	        ),
	        React.createElement(
	            'div',
	            { className: _cities2.default.result_weather_description },
	            weather.description
	        ),
	        React.createElement(
	            'div',
	            { className: _cities2.default.result_weather_temperature },
	            weather.temperature.avr
	        )
	    );
	};

		exports.default = Cities;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(91);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(78)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?localIdentName=[name]__[local]___[hash:base64:5]!./../../node_modules/stylus-loader/index.js!./cities.styl", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?localIdentName=[name]__[local]___[hash:base64:5]!./../../node_modules/stylus-loader/index.js!./cities.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(77)();
	// imports


	// module
	exports.push([module.id, ".cities__cities___1vp6l {\n  padding-left: 0px;\n  margin: 0px 0px;\n}\n.cities__city___2lt3H {\n  margin: 2px 2px;\n  display: inline-block;\n  border: solid 1px #e5ce8b;\n  border-radius: 5px;\n}\n.cities__city_name___31Umr {\n  display: inline-block;\n  vertical-align: middle;\n  padding: 2px 8px;\n  background-color: #faf3d9;\n  border-radius: 4px 0 0 4px;\n  cursor: text;\n}\n.cities__button___3x-Xz {\n  content: '';\n  vertical-align: middle;\n  padding: 3px 10px;\n  position: relative;\n  background-color: #edd9a4;\n  border-left: solid 1px #e5ce8b;\n  border-radius: 0 4px 4px 0;\n  cursor: pointer;\n}\n", ""]);

	// exports
	exports.locals = {
		"cities": "cities__cities___1vp6l",
		"city": "cities__city___2lt3H",
		"city_name": "cities__city_name___31Umr",
		"button": "cities__button___3x-Xz"
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getIterator2 = __webpack_require__(7);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _map = __webpack_require__(93);

	var _map2 = _interopRequireDefault(_map);

	var _keys = __webpack_require__(44);

	var _keys2 = _interopRequireDefault(_keys);

	var _classCallCheck2 = __webpack_require__(52);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(53);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by Rusak Oleg on 22.02.2016.
	 */

	var DSOpenWeather = function () {
	    (0, _createClass3.default)(DSOpenWeather, null, [{
	        key: 'nameAPI',
	        get: function get() {
	            return "openweathermap";
	        }
	    }, {
	        key: 'API',
	        get: function get() {
	            return {
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
	    }]);

	    function DSOpenWeather(options) {
	        (0, _classCallCheck3.default)(this, DSOpenWeather);

	        this.key = options.key;
	        this.unit = options.unit;
	        this.lang = options.lang;

	        this.data;
	    }

	    (0, _createClass3.default)(DSOpenWeather, [{
	        key: 'getDataMethod',
	        value: function getDataMethod(options) {
	            var _this = this;

	            var method = options.method;
	            var handler = options.handler;
	            var timeout = options.timeout;
	            var param = options.param;

	            var ctx = this;
	            var map = DSOpenWeather.API[method].map;

	            setTimeout(function () {
	                return fetch(_this.getRequestAPIMethod(method, param)).then(function (response) {
	                    return response.json();
	                }).then(function (data) {
	                    if (data.cod == 200) {
	                        handler(map(data));
	                    } else {
	                        handler(null, data);
	                    }
	                }).catch(function (err) {
	                    console.error(err);
	                });
	            }, timeout);
	        }
	    }, {
	        key: 'getRequestAPIMethod',
	        value: function getRequestAPIMethod(methodAPI, parametr) {
	            var data = [];
	            var weatherDataAPI = DSOpenWeather.API;
	            var method = weatherDataAPI[methodAPI].method;

	            if (!method) {
	                throw new Error('Not support method [' + methodAPI + ']');
	            }

	            parametr = parametr ? parametr : {};

	            parametr = (0, _keys2.default)(parametr).map(function (k, index, array) {
	                return [k, parametr[k]];
	            });

	            var param = new _map2.default([['APPID', this.key], ['lang', this.lang], ['units', this.unit]].concat(parametr));

	            param.forEach(function (value, key) {
	                data.push(key + '=' + value);
	            });

	            return weatherDataAPI.URL + method + '?' + data.join('&');
	        }
	    }], [{
	        key: 'mapDataWeather',
	        value: function mapDataWeather(data) {
	            var model = {};
	            model.id = data.id;
	            model.name = data.name;
	            model.country = data.sys.country;
	            model.loc = {
	                lon: data.coord.lon,
	                lat: data.coord.lat
	            };

	            var dataWeather = data.weather[0];
	            model.weather = {};

	            var date = getDateWithoutTime(parseInt(data.dt) * 1000);

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
	                precipitation: DSOpenWeather.getPrecipitation(data),
	                clouds: DSOpenWeather.getCloud(data['clouds']),
	                wind: {
	                    speed: data.wind.speed,
	                    deg: data.wind.deg
	                },
	                sun: {
	                    rise: new Date(parseInt(data.sys.sunrise) * 1000),
	                    set: new Date(parseInt(data.sys.sunset) * 1000)
	                }
	            };

	            return model;
	        }
	    }, {
	        key: 'getPrecipitation',
	        value: function getPrecipitation(data) {
	            var modelData = {};
	            for (var p in data) {
	                if (p == 'snow' || p == 'rain' || p == 'no') {
	                    modelData.mode = p;
	                    modelData.value = data[p];
	                }
	            }

	            return modelData;
	        }
	    }, {
	        key: 'getCloud',
	        value: function getCloud(cloudData) {
	            var modelData = {};
	            for (var k in cloudData) {
	                modelData.mode = k;
	                modelData.value = cloudData[k];

	                //считаем что больше одного значения облачности прийти не может
	                break;
	            }

	            return modelData;
	        }
	    }, {
	        key: 'mapDataForecast',
	        value: function mapDataForecast(data) {
	            var model = {};

	            model.id = data.city.id;
	            model.name = data.city.name;
	            model.country = data.city.country;
	            model.loc = {
	                lon: data.city.coord.lon,
	                lat: data.city.coord.lat
	            };

	            model.weather = {};

	            var today = getDateWithoutTime(new Date());
	            var millsToday = today.getTime();

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = (0, _getIterator3.default)(data.list), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var dataDayWeather = _step.value;


	                    var dataWeather = dataDayWeather.weather[0];

	                    var date = getDateWithoutTime(parseInt(dataDayWeather.dt) * 1000);

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
	                        precipitation: DSOpenWeather.getPrecipitation(dataDayWeather),
	                        clouds: {
	                            value: dataDayWeather.clouds
	                        },
	                        wind: {
	                            speed: dataDayWeather.speed,
	                            deg: dataDayWeather.deg
	                        },
	                        sun: {}
	                    };
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return model;
	        }
	    }]);
	    return DSOpenWeather;
	}();

	/**
	 * getDateWithoutTime
	 * @param string|Date представление даты
	 * @return Date дата с нулевым временем
	 * */


	function getDateWithoutTime(d) {
	    var date = new Date(d);
	    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	}

		exports.default = DSOpenWeather;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(94), __esModule: true };

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67);
	__webpack_require__(36);
	__webpack_require__(9);
	__webpack_require__(95);
	__webpack_require__(105);
	module.exports = __webpack_require__(6).Map;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(96);

	// 23.1 Map Objects
	__webpack_require__(104)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(26)
	  , hide         = __webpack_require__(25)
	  , redefineAll  = __webpack_require__(97)
	  , ctx          = __webpack_require__(22)
	  , strictNew    = __webpack_require__(98)
	  , defined      = __webpack_require__(17)
	  , forOf        = __webpack_require__(99)
	  , $iterDefine  = __webpack_require__(18)
	  , step         = __webpack_require__(12)
	  , ID           = __webpack_require__(35)('id')
	  , $has         = __webpack_require__(30)
	  , isObject     = __webpack_require__(41)
	  , setSpecies   = __webpack_require__(103)
	  , DESCRIPTORS  = __webpack_require__(28)
	  , isExtensible = Object.isExtensible || isObject
	  , SIZE         = DESCRIPTORS ? '_s' : 'size'
	  , id           = 0;

	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!$has(it, ID)){
	    // can't set id to frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add id
	    if(!create)return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	  // return object id with prefix
	  } return 'O' + it[ID];
	};

	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = $.create(null); // index
	      that._f = undefined;      // first entry
	      that._l = undefined;      // last entry
	      that[SIZE] = 0;           // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(24);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 98 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(22)
	  , call        = __webpack_require__(100)
	  , isArrayIter = __webpack_require__(101)
	  , anObject    = __webpack_require__(40)
	  , toLength    = __webpack_require__(102)
	  , getIterFn   = __webpack_require__(42);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(40);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(13)
	  , ITERATOR   = __webpack_require__(33)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(38)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core        = __webpack_require__(6)
	  , $           = __webpack_require__(26)
	  , DESCRIPTORS = __webpack_require__(28)
	  , SPECIES     = __webpack_require__(33)('species');

	module.exports = function(KEY){
	  var C = core[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(26)
	  , global         = __webpack_require__(21)
	  , $export        = __webpack_require__(20)
	  , fails          = __webpack_require__(29)
	  , hide           = __webpack_require__(25)
	  , redefineAll    = __webpack_require__(97)
	  , forOf          = __webpack_require__(99)
	  , strictNew      = __webpack_require__(98)
	  , isObject       = __webpack_require__(41)
	  , setToStringTag = __webpack_require__(32)
	  , DESCRIPTORS    = __webpack_require__(28);

	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	  } else {
	    C = wrapper(function(target, iterable){
	      strictNew(target, C, NAME);
	      target._c = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','),function(KEY){
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
	        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if('size' in proto)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return this._c.size;
	      }
	    });
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);

	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(20);

	$export($export.P, 'Map', {toJSON: __webpack_require__(106)('Map')});

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var forOf   = __webpack_require__(99)
	  , classof = __webpack_require__(43);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    var arr = [];
	    forOf(this, false, arr.push, arr);
	    return arr;
	  };
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getIterator2 = __webpack_require__(7);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _keys = __webpack_require__(44);

	var _keys2 = _interopRequireDefault(_keys);

	var _classCallCheck2 = __webpack_require__(52);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(53);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _windrose = __webpack_require__(108);

	var _windrose2 = _interopRequireDefault(_windrose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DEGREE_CHAR_CODE = 176; /**
	                             * Created by Rusak Oleg on 28.02.2016.
	                             */

	var DEGREE_CHAR = String.fromCharCode(DEGREE_CHAR_CODE);

	var DecorateWeatherData = function () {
	    function DecorateWeatherData() {
	        (0, _classCallCheck3.default)(this, DecorateWeatherData);
	    }

	    (0, _createClass3.default)(DecorateWeatherData, null, [{
	        key: "getDecorateData",
	        value: function getDecorateData(data, units) {
	            data.loc.lon = data.loc.lon + DEGREE_CHAR;
	            data.loc.lat = data.loc.lat + DEGREE_CHAR;

	            var dateWeather = (0, _keys2.default)(data.weather);

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = (0, _getIterator3.default)(dateWeather), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var key = _step.value;

	                    var weather = data.weather[key];

	                    weather.date = DecorateWeatherData.getFormattedDate(weather.date, {
	                        day: "2-digit",
	                        month: "short"
	                    });

	                    weather.temperature.avr = DecorateWeatherData.getFormattedTemperature(weather.temperature.avr, units);
	                    weather.temperature.min = DecorateWeatherData.getFormattedTemperature(weather.temperature.min);
	                    weather.temperature.max = DecorateWeatherData.getFormattedTemperature(weather.temperature.max);

	                    weather.pressure.avr = Math.round(parseFloat(weather.pressure.avr)) + units.pressure;

	                    weather.humidity = weather.humidity + '%';

	                    var precipitation = weather.precipitation.mode;
	                    weather.precipitation.mode = precipitation ? weather.precipitation.mode : '';
	                    weather.precipitation.value = precipitation ? weather.precipitation.value + units.precipitation : '';

	                    weather.clouds.value = weather.clouds.value + '%';

	                    weather.wind.speed = Math.round(parseFloat(weather.wind.speed)) + units.wind;
	                    if (weather.wind.deg) {
	                        weather.wind.direction = _windrose2.default.getPoint(parseFloat(weather.wind.deg), { depth: 0 }).symbol;
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
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return data;
	        }

	        /**
	         * getFormattedDate
	         * @param string|Date представление даты
	         * @option object настройки формата
	         * @return string форматированное представление даты
	         * */

	    }, {
	        key: "getFormattedDate",
	        value: function getFormattedDate(date, option) {
	            if (date && date != '-') {
	                var formatter = new Intl.DateTimeFormat("en-US", option);
	                return formatter.format(date);
	            }

	            return '';
	        }
	    }, {
	        key: "getFormattedTemperature",
	        value: function getFormattedTemperature(temperature, units) {
	            var unit = units ? units.temperature.letter : '';
	            return "" + Math.round(parseFloat(temperature)) + DEGREE_CHAR + unit;
	        }
	    }]);
	    return DecorateWeatherData;
	}();

		exports.default = DecorateWeatherData;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Windrose
	 *
	 * This is a simple module that converts compass degress into compass points
	 * and points to degrees.
	 *
	 * You can pass an { depth: ... } hash to the methods.
	 *
	 * Passing a depth: 0 will limit the search to the 4
	 * main compass points: N, E, S, W.
	 *
	 * Passing a depth: 1 will limit the search to the 8
	 * main compass points: N, NE, E, SE, S, SW, W, NW
	 *
	 * Passing a depth: 2 will limit the search to the 16
	 * main compass points: N, NNE, NE, ENE, E, ESE, SE, SSE,
	 * S, SSW, SW, WSW, W, WNW, NW, NNW.
	 *
	 * Passing a depth: 3 (default) will do the search for the
	 * 32 points of the compass.
	 *
	 * @author rogeriopvl <http://github.com/rogeriopvl>
	 * @license MIT
	 */

	(function (root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory();
	    } else {
	        root.Windrose = factory();
	    }
	} (this, function () {
	    var DEPTHS_AREA = [ 90, 45, 22.5, 11.25 ];
	    var COMPASS_POINTS = [
	        { symbol: 'N', name: 'North', depth: 0 },
	        { symbol: 'NbE', name: 'North by East', depth: 3 },
	        { symbol: 'NNE', name: 'North North East', depth: 2 },
	        { symbol: 'NEbN', name: 'North East by North', depth: 3 },
	        { symbol: 'NE', name: 'North East', depth: 1 },
	        { symbol: 'NEbE', name: 'North East by East', depth: 3 },
	        { symbol: 'ENE', name: 'East North East', depth: 2 },
	        { symbol: 'EbN', name: 'East by North', depth: 3 },
	        { symbol: 'E', name: 'East', depth: 0 },
	        { symbol: 'EbS', name: 'East by South', depth: 3 },
	        { symbol: 'ESE', name: 'East South East', depth: 2 },
	        { symbol: 'SEbE', name: 'South East by East', depth: 3 },
	        { symbol: 'SE', name: 'South East', depth: 1 },
	        { symbol: 'SEbS', name: 'South East by South', depth: 3 },
	        { symbol: 'SSE', name: 'South South East', depth: 2 },
	        { symbol: 'SbE', name: 'South by East', depth: 3 },
	        { symbol: 'S', name: 'South', depth: 0 },
	        { symbol: 'SbW', name: 'South by West', depth: 3 },
	        { symbol: 'SSW', name: 'South South West', depth: 2 },
	        { symbol: 'SWbS', name: 'South West by South', depth: 3 },
	        { symbol: 'SW', name: 'South West', depth: 1 },
	        { symbol: 'SWbW', name: 'South West by West', depth: 3 },
	        { symbol: 'WSW', name: 'West South West', depth: 2 },
	        { symbol: 'WbS', name: 'West by South', depth: 3 },
	        { symbol: 'W', name: 'West', depth: 0 },
	        { symbol: 'WbN', name: 'West by North', depth: 3 },
	        { symbol: 'WNW', name: 'West North West', depth: 2 },
	        { symbol: 'NWbW', name: 'North West by West', depth: 3 },
	        { symbol: 'NW', name: 'North West', depth: 1 },
	        { symbol: 'NWbN', name: 'North West by North', depth: 3 },
	        { symbol: 'NNW', name: 'North North West', depth: 2 },
	        { symbol: 'NbW', name: 'North by West', depth: 3 }
	    ];

	    var Windrose = {
	        /**
	         * Returns a point of the compass, given the degrees
	         * When the degrees do not match directly with a point,
	         * the number is rounded first
	         * @param {number} degrees - the degrees in the compass to convert
	         * @param {object} opts - (optional) hash containing options
	         *                 opts.depth - valid from 0 to 3
	         * @return {object} the compass point of the given degrees. If degrees are
	         *                  invalid (< 0 || > 360), then undefined is returned.
	         */
	        getPoint: function (degrees, opts) {
	            if (degrees < 0 || degrees > 360) { return; }

	            opts = opts || {};
	            opts.depth = opts.hasOwnProperty('depth') ? opts.depth : 3;

	            var idx = Math.round(degrees / DEPTHS_AREA[opts.depth]);
	            var _compass_points = COMPASS_POINTS.filter(function (pt) {
	                return pt.depth <= opts.depth;
	            });

	            // 360 === 0 aka North
	            if (idx === _compass_points.length) {
	                idx = 0;
	            }
	            return _compass_points[idx];
	        },

	        /**
	         * Returns the degrees of a given compass point name or symbol
	         * @param {string} name - the name or symbol of a compass point (case sensitive)
	         * @param {object} opts - (optional) hash containing options
	         *                 opts.depth - valid from 0 to 3
	         * @return {object} the degrees and range of the given compass point
	         *                  (according to the given depth)
	         */
	        getDegrees: function (name, opts) {
	            var found, min, max;
	            opts = opts || {};
	            opts.depth = opts.hasOwnProperty('depth') ? opts.depth : 3;

	            if (opts.depth < 0 || opts.depth > 3) { return; }

	            COMPASS_POINTS.forEach(function (item, idx) {
	                if (name === item.name || name === item.symbol) {
	                    found = idx * DEPTHS_AREA[3];
	                    return;
	                }
	            });

	            min = found - (DEPTHS_AREA[opts.depth] / 2);
	            max = found + (DEPTHS_AREA[opts.depth] / 2);

	            if (typeof found === 'undefined') { return; }

	            return {
	              min: min >= 0 ? min : (360 + min),
	              value: found,
	              max: max <= 360 ? max : (max - 360)
	            };
	        }
	    };
	    return Windrose;
	}));


/***/ },
/* 109 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var London = {
	  coord: {
	    lon: -0.13,
	    lat: 51.51
	  },
	  weather: [{
	    id: 501,
	    main: "Rain",
	    description: "moderate rain",
	    icon: "10d"
	  }],
	  base: "stations",
	  main: {
	    temp: 279.16,
	    pressure: 1013,
	    humidity: 65,
	    temp_min: 277.75,
	    temp_max: 280.55
	  },
	  visibility: 10000,
	  wind: {
	    speed: 4.6,
	    deg: 200
	  },
	  clouds: {
	    all: 90
	  },
	  dt: 1455721328,
	  sys: {
	    type: 1,
	    id: 5091,
	    message: 0.0469,
	    country: "GB",
	    sunrise: 1455693030,
	    sunset: 1455729559
	  },
	  id: 2643743,
	  name: "London",
	  cod: 200
	};

		exports.default = London;

/***/ },
/* 110 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Moscow = {
	  coord: {
	    lon: 37.62,
	    lat: 55.75
	  },
	  weather: [{
	    id: 800,
	    main: "Clear",
	    description: "Sky is Clear",
	    icon: "01n"
	  }],
	  base: "cmc stations",
	  main: {
	    temp: 268.498,
	    pressure: 1023.52,
	    humidity: 83,
	    temp_min: 268.498,
	    temp_max: 268.498,
	    sea_level: 1044.71,
	    grnd_level: 1023.52
	  },
	  wind: {
	    speed: 6.17,
	    deg: 321.503
	  },
	  clouds: {
	    all: 0
	  },
	  dt: 1455721325,
	  sys: {
	    message: 0.0044,
	    country: "RU",
	    sunrise: 1455684583,
	    sunset: 1455719894
	  },
	  id: 524901,
	  name: "Moscow",
	  cod: 200
	};

		exports.default = Moscow;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0MGNhYmMyZjVlMTg2NTNiNmY2MyIsIndlYnBhY2s6Ly8vYXBwL21haW4uanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RET01cIiIsIndlYnBhY2s6Ly8vYXBwL2FwcC5qc3giLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL2pzb24vc3RyaW5naWZ5LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmFkZC10by11bnNjb3BhYmxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItc3RlcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29mLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQubGlicmFyeS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmV4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmdsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmN0eC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmEtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnByb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5kZXNjcmlwdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmZhaWxzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaGFzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLndrcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNoYXJlZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVpZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3RyaW5nLWF0LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmFuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jbGFzc29mLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5vYmplY3Qtc2FwLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQua2V5b2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5nZXQtbmFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5lbnVtLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pcy1hcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2V0LXByb3RvLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3N0eWxlLnN0eWw/NGZjMCIsIndlYnBhY2s6Ly8vLi9hcHAvc3R5bGUuc3R5bCIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vYXBwL3dlYXRoZXIvd2VhdGhlci5qc3giLCJ3ZWJwYWNrOi8vL2FwcC93ZWF0aGVyL2dlbmVyYWwtaW5mby5qc3giLCJ3ZWJwYWNrOi8vL2FwcC93ZWF0aGVyL2RldGFpbC1pbmZvLmpzeCIsIndlYnBhY2s6Ly8vYXBwL3dlYXRoZXIvcGFyYW1ldHItaW5mby5qc3giLCJ3ZWJwYWNrOi8vL2FwcC93ZWF0aGVyL2ZvcmVjYXN0LmpzeCIsIndlYnBhY2s6Ly8vYXBwL3dlYXRoZXIvZm9yZWNhc3QtZGF5LmpzeCIsIndlYnBhY2s6Ly8vYXBwL3NldHRpbmdzL3NldHRpbmdzLmpzeCIsIndlYnBhY2s6Ly8vLi9hcHAvc2V0dGluZ3Mvc2V0dGluZ3Muc3R5bD82ZjAzIiwid2VicGFjazovLy8uL2FwcC9zZXR0aW5ncy9zZXR0aW5ncy5zdHlsIiwid2VicGFjazovLy9hcHAvbGliL3VuaXQtbWVhc3VyZS5qcyIsIndlYnBhY2s6Ly8vYXBwL2NpdGllcy9jaXRpZXMuanN4Iiwid2VicGFjazovLy8uL2FwcC9jaXRpZXMvY2l0aWVzLnN0eWw/ODkzOSIsIndlYnBhY2s6Ly8vLi9hcHAvY2l0aWVzL2NpdGllcy5zdHlsIiwid2VicGFjazovLy9hcHAvbGliL29wZW4td2VhdGhlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYubWFwLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29sbGVjdGlvbi1zdHJvbmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5yZWRlZmluZS1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdHJpY3QtbmV3LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZm9yLW9mLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jYWxsLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXMtYXJyYXktaXRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNldC1zcGVjaWVzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcubWFwLnRvLWpzb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb2xsZWN0aW9uLXRvLWpzb24uanMiLCJ3ZWJwYWNrOi8vL2FwcC9saWIvZGVjb3JhdGVXZWF0aGVyRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9+L3dpbmRyb3NlL3dpbmRyb3NlLmpzIiwid2VicGFjazovLy9kYXRhL3dlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vL2RhdGEvd2VhdGhlcl9tb3Njb3cuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0MGNhYmMyZjVlMTg2NTNiNmY2M1xuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJ1c2FrIE9sZWcgb24gMDkuMDIuMjAxNi5cclxuICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5cclxuaW1wb3J0IFdlYXRoZXJBcHAgZnJvbSAnLi9hcHAuanN4J1xyXG5cclxuUmVhY3RET00ucmVuZGVyKFxyXG4gICAgPFdlYXRoZXJBcHAgLz4sXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJylcclxuKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvbWFpbi5qc3hcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFJlYWN0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJSZWFjdFwiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiUmVhY3RET01cIlxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJ1c2FrIE9sZWcgb24gMDkuMDIuMjAxNi5cclxuICovXHJcblxyXG5pbXBvcnQgY3NzIGZyb20gJy4vc3R5bGUuc3R5bCc7XHJcblxyXG5pbXBvcnQgV2VhdGhlciBmcm9tICcuL3dlYXRoZXIvd2VhdGhlci5qc3gnO1xyXG5pbXBvcnQgU2V0dGluZ3MgZnJvbSAnLi9zZXR0aW5ncy9zZXR0aW5ncy5qc3gnO1xyXG5pbXBvcnQgQ2l0aWVzIGZyb20gJy4vY2l0aWVzL2NpdGllcy5qc3gnO1xyXG5cclxuaW1wb3J0IERTT3BlbldlYXRoZXIgZnJvbSAnLi9saWIvb3Blbi13ZWF0aGVyLmpzJztcclxuaW1wb3J0IERlY29yYXRlV2VhdGhlckRhdGEgZnJvbSAnLi9saWIvZGVjb3JhdGVXZWF0aGVyRGF0YSc7XHJcbmltcG9ydCB7VW5pdE1lYXN1cmV9IGZyb20gJy4vbGliL3VuaXQtbWVhc3VyZSc7XHJcblxyXG5pbXBvcnQgTG9uZG9uIGZyb20gJy4vLi4vZGF0YS93ZWF0aGVyLmpzJztcclxuaW1wb3J0IE1vc2NvdyBmcm9tICcuLy4uL2RhdGEvd2VhdGhlcl9tb3Njb3cuanMnO1xyXG5cclxuLy90b2RvOiDQu9C10L3QuNCy0YPRjiDQv9C+0LTQs9GA0YPQt9C60YMg0L7RgdGC0LDQu9GM0L3Ri9GFINGC0LDQsdC+0LIsIHdlYnBhY2sgaG90IHJlbG9hZFxyXG5cclxuLy90b2RvOiDQv9C+0LTQtNC10YDQttC60YMg0LzRg9C70YzRgtC40Y/Qt9GL0YfQvdC+0YHRgtC4XHJcblxyXG4vL3RvZG86INGB0L/QtdGG0LjQsNC70YzQvdGL0Lkg0LPQvtGA0L7QtCDRgtC10LrRg9GJ0LXQtSDQvNC10YHRgtC+0L/QvtC70L7QttC10L3QuNC1XHJcblxyXG4vL3RvZG86INCy0YvQstC+0LQg0L7RgdCw0LTQutC+0LJcclxuXHJcbmNsYXNzIFdlYXRoZXJBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IgKHByb3BzKXtcclxuICAgICAgICBzdXBlciAocHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5zZXRTZXR0aW5nRnJvbUxvY2FsT3JEZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCl7XHJcbiAgICAgICAgdGhpcy5yZXN1bWVTZXR0aW5nKCk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlQ2l0aWVzV2VhdGhlckRhdGEgKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlIChuZXh0UHJvcHMsIG5leHRTdGF0ZSl7XHJcbiAgICAgICAgdGhpcy5zYXZlU2V0dGluZ3MgKG5leHRTdGF0ZSk7XHJcblxyXG4gICAgICAgIC8vdG9kbzog0L7RgtC80LXQvdGP0YLRjCDQvtCx0L3QvtCy0LvQtdC90LjQtSDQv9GA0Lgg0LjQt9C80LXQvdC10L3QuNC4INC10LTQuNC90LjRhiDQuNC30LzQtdGA0LXQvdC40Y9cclxuICAgICAgICAvL9GH0YLQvtCx0Ysg0L/RgNC4INCy0YvQsdC+0YDQtSDQv9C+0LvRjNC30L7QstCw0YLQtdC70LXQvCDQvdCw0YHRgtGA0L7QtdC6INC90LUg0LfQsNC/0YDQsNGI0LjQstCw0YLRjCDQv9C+0YHRgtC+0Y/QvdC90L4g0LTQsNC90L3Ri9C1XHJcbiAgICAgICAgLy/QvtCx0L3QvtCy0LvRj9GC0Ywg0YLQvtC70YzQutC+INC/0YDQuCDQv9C10YDQtdC60LvRjtGH0LXQvdC40Lgg0LLQutC70LDQtNC60Lgg0L3QsCDQv9C+0LPQvtC00L3Rg9GOXHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlciAoKXtcclxuICAgICAgICBsZXQgc2hvd1RhYkNvbnRlbnQgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgbGV0IGFjdGl2ZUNsYXNzID0gY3NzLmFjdGl2ZTtcclxuICAgICAgICAgICAgbGV0IGFjdGl2ZVRhYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgYWN0aXZlQ2xhc3MpO1xyXG4gICAgICAgICAgICBhY3RpdmVUYWIuY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVDbGFzcyk7XHJcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKGFjdGl2ZUNsYXNzKTtcclxuICAgICAgICAgICAgbGV0IGlkQ29udGVudCA9IGV2ZW50LnRhcmdldC5pZDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZpb3VzU3RhdGUsIGN1cnJlbnRQcm9wcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNTdGF0ZS5zZXR0aW5ncy5zaG93VGFiID0gaWRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzU3RhdGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBjaGFuZ2VTaG93Q2l0eSA9IChpZERpc3BsYXlDaXR5KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUgKChwcmV2aW91c1N0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91c1N0YXRlLnNldHRpbmdzLmlkX2Rpc3BsYXlfY2l0eSA9IGlkRGlzcGxheUNpdHk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldmlvdXNTdGF0ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZUNpdGllc0xpc3QgPSAoY2l0eSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlICgocHJldmlvdXNTdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNTdGF0ZS5jaXRpZXNbY2l0eS5pZF0gPSBjaXR5O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzU3RhdGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaXR5V2VhdGhlckRhdGEgKGNpdHkuaWQsIDEwMDApO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCB1cGRhdGVTZXR0aW5ncyA9IHRoaXMudXBkYXRlU2V0dGluZ3MuYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgbGV0IHNob3dUYWIgPSB0aGlzLnN0YXRlLnNldHRpbmdzLnNob3dUYWI7XHJcbiAgICAgICAgbGV0IHRhYnMgPSBbXCJ3ZWF0aGVyXCIsIFwiY2l0aWVzXCIsIFwic2V0dGluZ3NcIl0ubWFwKCh0YWJOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc1RhYiA9IGNzcy50YWIgICsgKHNob3dUYWI9PXRhYk5hbWUgPyBcIiBcIiArIGNzcy5hY3RpdmUgOiAnJyk7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPXt0YWJOYW1lfSBjbGFzc05hbWU9e2NsYXNzVGFifSBrZXk9e3RhYk5hbWV9IG9uQ2xpY2s9e3Nob3dUYWJDb250ZW50fT57dGFiTmFtZX08L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzcy53ZWF0aGVyX2NvbnRhaW5lcn0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYnNcIj5cclxuICAgICAgICAgICAgICAgICAgICB7dGFic31cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPFdlYXRoZXIgY2l0aWVzPXt0aGlzLnN0YXRlLmNpdGllc30gc2V0dGluZ3M9e3RoaXMuc3RhdGUuc2V0dGluZ3N9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VTaG93Q2l0eT17Y2hhbmdlU2hvd0NpdHl9Lz5cclxuICAgICAgICAgICAgICAgIDxTZXR0aW5ncyBzZXR0aW5ncz17dGhpcy5zdGF0ZS5zZXR0aW5nc30gdXBkYXRlU2V0dGluZ3M9e3VwZGF0ZVNldHRpbmdzfS8+XHJcbiAgICAgICAgICAgICAgICA8Q2l0aWVzIHNldHRpbmdzPXt0aGlzLnN0YXRlLnNldHRpbmdzfSBjaXRpZXM9e3RoaXMuc3RhdGUuY2l0aWVzfSBjaGFuZ2VDaXRpZXNMaXN0PXtjaGFuZ2VDaXRpZXNMaXN0fS8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDaXRpZXNXZWF0aGVyRGF0YSAoKXtcclxuICAgICAgICAvL9C/0LXRgNCy0YvQvCDQvtCx0L3QvtCy0LvRj9C10Lwg0LPQvtGA0L7QtCDQstGL0LLQvtC00LjQvNGL0Lkg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cclxuICAgICAgICBsZXQgaW5kZXhEaXNwbGF5Q2l0eSA9IHRoaXMuc3RhdGUuc2V0dGluZ3MuaWRfZGlzcGxheV9jaXR5O1xyXG4gICAgICAgIGxldCBjaXRpZXNLZXkgPSBPYmplY3Qua2V5cyh0aGlzLnN0YXRlLmNpdGllcykuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYSA9PSBpbmRleERpc3BsYXlDaXR5PyAtMTogMTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy90b2RvOiDRg9Cx0YDQsNGC0Ywg0LrQvtCz0LTQsCDRgdC+0YHRgtC+0Y/QvdC40LUg0L3QtSDQsdGD0LTQtdGCINGB0YDQsNC30YMg0L7QsdC90L7QstC70Y/RgtGB0Y8g0L/QvtGB0LvQtSDQv9C+0LjRgdC60LAg0L3QvtCy0L7Qs9C+INCz0L7RgNC+0LTQsFxyXG4gICAgICAgIGxldCB0aW1lb3V0ID0gMTAwMDtcclxuXHJcbiAgICAgICAgbGV0IGNpdGllcyA9IHRoaXMuc3RhdGUuY2l0aWVzO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBvZiBjaXRpZXNLZXkpIHtcclxuICAgICAgICAgICAgbGV0IGNpdHlJZCA9IGNpdGllc1trZXldLmlkO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNpdHlXZWF0aGVyRGF0YSAoY2l0eUlkLCB0aW1lb3V0KTtcclxuXHJcbiAgICAgICAgICAgIHRpbWVvdXQgKz0gMjAwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ2l0eVdlYXRoZXJEYXRhIChjaXR5SWQsIHRpbWVvdXQpe1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5zZXR0aW5ncy5BUEkub3BlbndlYXRoZXJtYXAua2V5KVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCBkYXRhU291cmNlID0gbmV3IERTT3BlbldlYXRoZXIgKHtcclxuICAgICAgICAgICAga2V5OiB0aGlzLnN0YXRlLnNldHRpbmdzLkFQSS5vcGVud2VhdGhlcm1hcC5rZXksXHJcbiAgICAgICAgICAgIHVuaXQ6IHRoaXMuc3RhdGUuc2V0dGluZ3MudW5pdF9tZWFzdXJlLFxyXG4gICAgICAgICAgICBsYW5nOiB0aGlzLnN0YXRlLnNldHRpbmdzLmxhbmdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGhhbmRsZXJVcGRhdGVDaXR5V2VhdGhlckRhdGEgPSB0aGlzLmhhbmRsZXJVcGRhdGVDaXR5V2VhdGhlckRhdGEuYmluZCh0aGlzKTtcclxuICAgICAgICBkYXRhU291cmNlLmdldERhdGFNZXRob2Qoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICd3ZWF0aGVyJyxcclxuICAgICAgICAgICAgcGFyYW06IHtcclxuICAgICAgICAgICAgICAgIGlkOiBjaXR5SWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGFuZGxlcjogaGFuZGxlclVwZGF0ZUNpdHlXZWF0aGVyRGF0YSxcclxuICAgICAgICAgICAgdGltZW91dDogdGltZW91dFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aW1lb3V0ICs9IDEwMDA7XHJcblxyXG4gICAgICAgIGRhdGFTb3VyY2UuZ2V0RGF0YU1ldGhvZCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2ZvcmVjYXN0JyxcclxuICAgICAgICAgICAgcGFyYW06IHtcclxuICAgICAgICAgICAgICAgIGlkOiBjaXR5SWQsXHJcbiAgICAgICAgICAgICAgICBjbnQ6IDRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGFuZGxlcjogaGFuZGxlclVwZGF0ZUNpdHlXZWF0aGVyRGF0YSxcclxuICAgICAgICAgICAgdGltZW91dDogdGltZW91dFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZXJVcGRhdGVDaXR5V2VhdGhlckRhdGEgKGRhdGEsIGRhdGFFcnJvcil7XHJcbiAgICAgICAgaWYgKGRhdGE9PW51bGwpe1xyXG4gICAgICAgICAgICBpZiAoZGF0YUVycm9yLmNvZD09NDA0KVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLQk9C+0YDQvtC0INC90LUg0L3QsNC50LTQtdC9XCIpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgZGF0YSA9IERlY29yYXRlV2VhdGhlckRhdGEuZ2V0RGVjb3JhdGVEYXRhKGRhdGEsIHRoaXMuc3RhdGUudW5pdHMpO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlICgocHJldmlvdXNTdGF0ZSwgY3VycmVudFByb3BzKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjaXR5ID0gcHJldmlvdXNTdGF0ZS5jaXRpZXNbZGF0YS5pZF07XHJcbiAgICAgICAgICAgIGNpdHkubmFtZSA9IGRhdGEubmFtZTtcclxuICAgICAgICAgICAgY2l0eS5jb3VudHJ5ID0gZGF0YS5jb3VudHJ5O1xyXG4gICAgICAgICAgICBjaXR5LmxvYyA9IGRhdGEubG9jO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNpdHlXZWF0aGVyID0gY2l0eS53ZWF0aGVyO1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyAoZGF0YS53ZWF0aGVyKS5mb3JFYWNoKChrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaXR5V2VhdGhlciBba10gPSBkYXRhLndlYXRoZXJba107XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzU3RhdGU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVNldHRpbmdzIChzdGF0ZSkge1xyXG4gICAgICAgIGxldCBsb2NhbFN0b3JhZ2VTdXBwb3J0ID0gJ2xvY2FsU3RvcmFnZScgaW4gd2luZG93ICYmIHdpbmRvd1snbG9jYWxTdG9yYWdlJ10gIT09IG51bGw7XHJcblxyXG4gICAgICAgIGxldCBsb2NhbFN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IHt9O1xyXG5cclxuICAgICAgICBzZXR0aW5ncy5jaXRpZXMgPSBPYmplY3Qua2V5cyh0aGlzLnN0YXRlLmNpdGllcykubWFwICgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBrZXk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0dGluZ3Muc2V0dGluZ3MgPSB0aGlzLnN0YXRlLnNldHRpbmdzO1xyXG5cclxuICAgICAgICBsb2NhbFN0b3JhZ2Uud2VhdGhlcl9hcHAgPSBKU09OLnN0cmluZ2lmeShzZXR0aW5ncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdW1lU2V0dGluZyAoKXtcclxuICAgICAgICBsZXQgbG9jYWxTdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSBsb2NhbFN0b3JhZ2Uud2VhdGhlcl9hcHA7XHJcbiAgICAgICAgaWYgKHNldHRpbmdzKVxyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzZXR0aW5ncyk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogdXBkYXRlU2V0dGluZ3MgKi9cclxuICAgIHVwZGF0ZVNldHRpbmdzIChldmVudCl7XHJcbiAgICAgICAgbGV0IG5hbWVDaGFuZ2VFbGVtZW50ID0gZXZlbnQudGFyZ2V0Lm5hbWU7XHJcbiAgICAgICAgbGV0IHZhbHVlQ2hhbmdlRWxlbWVudCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSAoKHByZXZpb3VzU3RhdGUsIGN1cnJlbnRQcm9wcykgPT4ge1xyXG4gICAgICAgICAgICBpZiAobmFtZUNoYW5nZUVsZW1lbnQgPT0gXCJrZXlBcGlcIil7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91c1N0YXRlLnNldHRpbmdzLkFQSS5vcGVud2VhdGhlcm1hcC5rZXkgPSB2YWx1ZUNoYW5nZUVsZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChuYW1lQ2hhbmdlRWxlbWVudCA9PSBcImxhbmd1YWdlc1wiKSB7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91c1N0YXRlLnNldHRpbmdzLmxhbmcgPSB2YWx1ZUNoYW5nZUVsZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChuYW1lQ2hhbmdlRWxlbWVudCA9PSBcInVuaXRNZWFzdXJlXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCB1bml0TWVhc3VyZSA9IHZhbHVlQ2hhbmdlRWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgICAgICBwcmV2aW91c1N0YXRlLnNldHRpbmdzLnVuaXRfbWVhc3VyZSA9IHVuaXRNZWFzdXJlO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB1bml0TWVhc3VyZVR5cGUgPSBVbml0TWVhc3VyZS50eXBlW3VuaXRNZWFzdXJlXTtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHVuaXRNZWFzdXJlVHlwZSkuZm9yRWFjaCgoa2V5KT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1N0YXRlLnVuaXRzW2tleV0gPSB1bml0TWVhc3VyZVR5cGVba2V5XTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNTdGF0ZTtcclxuICAgICAgICB9LCAoKSA9PiB0aGlzLnVwZGF0ZUNpdGllc1dlYXRoZXJEYXRhKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNldHRpbmdGcm9tTG9jYWxPckRlZmF1bHQgKCl7XHJcbiAgICAgICAgbGV0IHN0b3JhZ2VEYXRhID0gdGhpcy5yZXN1bWVTZXR0aW5nKCk7XHJcbiAgICAgICAgbGV0IHN0YXRlID0ge307XHJcblxyXG4gICAgICAgIGlmIChzdG9yYWdlRGF0YSl7XHJcbiAgICAgICAgICAgIC8v0LLQvtGB0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INCx0LvQvtC6IHVuaXRzXHJcbiAgICAgICAgICAgIGxldCB1bml0TWVhc3VyZSA9IHN0b3JhZ2VEYXRhLnNldHRpbmdzLnVuaXRfbWVhc3VyZTtcclxuICAgICAgICAgICAgbGV0IHVuaXRzID0ge307XHJcbiAgICAgICAgICAgIHVuaXRzLnRlbXBlcmF0dXJlID0gVW5pdE1lYXN1cmUudHlwZVt1bml0TWVhc3VyZV0udGVtcGVyYXR1cmU7XHJcbiAgICAgICAgICAgIHVuaXRzLndpbmQgPSBVbml0TWVhc3VyZS50eXBlW3VuaXRNZWFzdXJlXS53aW5kO1xyXG4gICAgICAgICAgICB1bml0cy5wcmVzc3VyZSA9ICBVbml0TWVhc3VyZS5wcmVzc3VyZTtcclxuICAgICAgICAgICAgdW5pdHMucHJlY2lwaXRhdGlvbiA9ICBVbml0TWVhc3VyZS5wcmVjaXBpdGF0aW9uO1xyXG4gICAgICAgICAgICBzdGF0ZS51bml0cyA9IHVuaXRzO1xyXG5cclxuICAgICAgICAgICAgLy/QstC+0YHRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0LHQu9C+0LogY2l0aWVzXHJcbiAgICAgICAgICAgIGxldCBjaXRpZXMgPSB7fTtcclxuICAgICAgICAgICAgc3RvcmFnZURhdGEuY2l0aWVzLmZvckVhY2goKGlkQ2l0eSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2l0aWVzIFtpZENpdHldID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZENpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlcjoge31cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHN0YXRlLmNpdGllcyA9IGNpdGllcztcclxuXHJcbiAgICAgICAgICAgIC8v0LLQvtGB0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INCx0LvQvtC6IHNldHRpbmdzXHJcbiAgICAgICAgICAgIGxldCBzZXR0aW5ncyA9IHN0b3JhZ2VEYXRhLnNldHRpbmdzO1xyXG5cclxuICAgICAgICAgICAgLy/QvdC10YIg0L3QsNGB0YLRgNC+0LXQuiDQv9C+0LTQutC70Y7Rh9C10L3QuNGPINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC/0YDQvtGB0LjQvCDQuNGFINC30LDQv9C+0LvQvdC40YLRjFxyXG4gICAgICAgICAgICBpZiAoIXNldHRpbmdzLkFQSS5vcGVud2VhdGhlcm1hcC5rZXkpXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5zaG93VGFiID0gXCJzZXR0aW5nc1wiO1xyXG5cclxuICAgICAgICAgICAgc3RhdGUuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgICAgLyp0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB1bml0czoge1xyXG4gICAgICAgICAgICAgICAgdGVtcGVyYXR1cmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkNlbHNpdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBsZXR0ZXI6IFwi0KFcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHdpbmQ6IFwibS9zXCIsXHJcbiAgICAgICAgICAgICAgICBwcmVzc3VyZTogXCJoUGFcIixcclxuICAgICAgICAgICAgICAgIHByZWNpcGl0YXRpb246IFwibW1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgdW5pdF9tZWFzdXJlOiBcIm1ldHJpY1wiLFxyXG4gICAgICAgICAgICAgICAgbGFuZzogJ2VuJyxcclxuICAgICAgICAgICAgICAgIEFQSToge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW53ZWF0aGVybWFwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJzdhYWYyNWU4MWFlMDJmMjM3YWQ3OTk5ODUwMWI4ZmUwJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzaG93VGFiOiBcIndlYXRoZXJcIixcclxuICAgICAgICAgICAgICAgIGlkX2Rpc3BsYXlfY2l0eTogXCI1MTk2OTBcIlxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgY2l0aWVzOiB7XHJcbiAgICAgICAgICAgICAgICA1MTk2OTA6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCI1MTk2OTBcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlNhaW50LVBldGVyYnVyZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50cnk6IFwiUlVcIixcclxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyOiB7fVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDI2NDM3NDM6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCIyNjQzNzQzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJMb25kb25cIixcclxuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5OiBcIkdCXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlcjoge31cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07Ki9cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgV2VhdGhlckFwcDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvYXBwLmpzeFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9qc29uL3N0cmluZ2lmeVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9qc29uL3N0cmluZ2lmeS5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjb3JlID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLmNvcmUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3RyaW5naWZ5KGl0KXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICByZXR1cm4gKGNvcmUuSlNPTiAmJiBjb3JlLkpTT04uc3RyaW5naWZ5IHx8IEpTT04uc3RyaW5naWZ5KS5hcHBseShKU09OLCBhcmd1bWVudHMpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL2pzb24vc3RyaW5naWZ5LmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMS4yLjYnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNvcmUuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3InKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpO1xuSXRlcmF0b3JzLk5vZGVMaXN0ID0gSXRlcmF0b3JzLkhUTUxDb2xsZWN0aW9uID0gSXRlcmF0b3JzLkFycmF5O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuLyQuYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItc3RlcCcpXG4gICwgSXRlcmF0b3JzICAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmFkZC10by11bnNjb3BhYmxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcbiAgcmV0dXJuIHt2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZX07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItc3RlcC5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXJhdG9ycy5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8taW9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vJC5jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaW9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNvZi5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZGVmaW5lZC5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuLyQubGlicmFyeScpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vJC5yZWRlZmluZScpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGlkZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBJdGVyYXRvcnMgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsICRpdGVyQ3JlYXRlICAgID0gcmVxdWlyZSgnLi8kLml0ZXItY3JlYXRlJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vJC5zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgZ2V0UHJvdG8gICAgICAgPSByZXF1aXJlKCcuLyQnKS5nZXRQcm90b1xuICAsIElURVJBVE9SICAgICAgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgQlVHR1kgICAgICAgICAgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSkgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICAsIEZGX0lURVJBVE9SICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCl7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIGlmKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKXJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyAgICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFU1xuICAgICwgVkFMVUVTX0JVRyA9IGZhbHNlXG4gICAgLCBwcm90byAgICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsICRuYXRpdmUgICAgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsICRkZWZhdWx0ICAgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKVxuICAgICwgbWV0aG9kcywga2V5O1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKCRuYXRpdmUpe1xuICAgIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvKCRkZWZhdWx0LmNhbGwobmV3IEJhc2UpKTtcbiAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgLy8gRkYgZml4XG4gICAgaWYoIUxJQlJBUlkgJiYgaGFzKHByb3RvLCBGRl9JVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgICBpZihERUZfVkFMVUVTICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKXtcbiAgICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgICB9XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKXtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6ICBERUZfVkFMVUVTICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpXG4gICAgfTtcbiAgICBpZihGT1JDRUQpZm9yKGtleSBpbiBtZXRob2RzKXtcbiAgICAgIGlmKCEoa2V5IGluIHByb3RvKSlyZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItZGVmaW5lLmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5saWJyYXJ5LmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuLyQuY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIGtleSBpbiB0YXJnZXQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKHBhcmFtKXtcbiAgICAgICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBDID8gbmV3IEMocGFyYW0pIDogQyhwYXJhbSk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIGlmKElTX1BST1RPKShleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KSlba2V5XSA9IG91dDtcbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgLy8gd3JhcFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmV4cG9ydC5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZ2xvYmFsLmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vJC5hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmN0eC5qc1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hLWZ1bmN0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmhpZGUnKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5yZWRlZmluZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vJC5wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuICQuc2V0RGVzYyhvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhpZGUuanNcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICRPYmplY3QgPSBPYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlOiAgICAgJE9iamVjdC5jcmVhdGUsXG4gIGdldFByb3RvOiAgICRPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gIGlzRW51bTogICAgIHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICBnZXREZXNjOiAgICAkT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgc2V0RGVzYzogICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0eSxcbiAgc2V0RGVzY3M6ICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzLFxuICBnZXRLZXlzOiAgICAkT2JqZWN0LmtleXMsXG4gIGdldE5hbWVzOiAgICRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgZ2V0U3ltYm9sczogJE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gIGVhY2g6ICAgICAgIFtdLmZvckVhY2hcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnByb3BlcnR5LWRlc2MuanNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi8kLmZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlc2NyaXB0b3JzLmpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmZhaWxzLmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhhcy5qc1xuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGRlc2NyaXB0b3IgICAgID0gcmVxdWlyZSgnLi8kLnByb3BlcnR5LWRlc2MnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi8kLnNldC10by1zdHJpbmctdGFnJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi8kLmhpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpe1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSAkLmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwge25leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCl9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItY3JlYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBkZWYgPSByZXF1aXJlKCcuLyQnKS5zZXREZXNjXG4gICwgaGFzID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgVEFHID0gcmVxdWlyZSgnLi8kLndrcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCB0YWcsIHN0YXQpe1xuICBpZihpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKWRlZihpdCwgVEFHLCB7Y29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnfSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNldC10by1zdHJpbmctdGFnLmpzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBzdG9yZSAgPSByZXF1aXJlKCcuLyQuc2hhcmVkJykoJ3drcycpXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpXG4gICwgU3ltYm9sID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpLlN5bWJvbDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFN5bWJvbCAmJiBTeW1ib2xbbmFtZV0gfHwgKFN5bWJvbCB8fCB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQud2tzLmpzXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNoYXJlZC5qc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC51aWQuanNcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuLyQuc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLyQudG8taW50ZWdlcicpXG4gICwgZGVmaW5lZCAgID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3RyaW5nLWF0LmpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1pbnRlZ2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIGdldCAgICAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmNvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgcmV0dXJuIGFuT2JqZWN0KGl0ZXJGbi5jYWxsKGl0KSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDM5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYW4tb2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gNDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pcy1vYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA0MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vJC5jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ICE9IHVuZGVmaW5lZClyZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanNcbiAqKiBtb2R1bGUgaWQgPSA0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuLyQud2tzJykoJ3RvU3RyaW5nVGFnJylcbiAgLy8gRVMzIHdyb25nIGhlcmVcbiAgLCBBUkcgPSBjb2YoZnVuY3Rpb24oKXsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IChPID0gT2JqZWN0KGl0KSlbVEFHXSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNsYXNzb2YuanNcbiAqKiBtb2R1bGUgaWQgPSA0M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJC5jb3JlJykuT2JqZWN0LmtleXM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5cy5qc1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vJC50by1vYmplY3QnKTtcblxucmVxdWlyZSgnLi8kLm9iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uKCRrZXlzKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpe1xuICAgIHJldHVybiAka2V5cyh0b09iamVjdChpdCkpO1xuICB9O1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qc1xuICoqIG1vZHVsZSBpZCA9IDQ2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLW9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDQ3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgY29yZSAgICA9IHJlcXVpcmUoJy4vJC5jb3JlJylcbiAgLCBmYWlscyAgID0gcmVxdWlyZSgnLi8kLmZhaWxzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSwgZXhlYyl7XG4gIHZhciBmbiAgPSAoY29yZS5PYmplY3QgfHwge30pW0tFWV0gfHwgT2JqZWN0W0tFWV1cbiAgICAsIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uKCl7IGZuKDEpOyB9KSwgJ09iamVjdCcsIGV4cCk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLm9iamVjdC1zYXAuanNcbiAqKiBtb2R1bGUgaWQgPSA0OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzXG4gKiogbW9kdWxlIGlkID0gNDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJC5jb3JlJykuT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanNcbiAqKiBtb2R1bGUgaWQgPSA1MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMTkuMS4yLjkgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLyQudG8tb2JqZWN0Jyk7XG5cbnJlcXVpcmUoJy4vJC5vYmplY3Qtc2FwJykoJ2dldFByb3RvdHlwZU9mJywgZnVuY3Rpb24oJGdldFByb3RvdHlwZU9mKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldFByb3RvdHlwZU9mKGl0KXtcbiAgICByZXR1cm4gJGdldFByb3RvdHlwZU9mKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzXG4gKiogbW9kdWxlIGlkID0gNTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanNcbiAqKiBtb2R1bGUgaWQgPSA1MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzXG4gKiogbW9kdWxlIGlkID0gNTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbiAqKiBtb2R1bGUgaWQgPSA1NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICQgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkLnNldERlc2MoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuICoqIG1vZHVsZSBpZCA9IDU1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKCh0eXBlb2YgY2FsbCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoY2FsbCkpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzXG4gKiogbW9kdWxlIGlkID0gNTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBfU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIF9TeW1ib2wkaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBfU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfU3ltYm9sID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2wvaXRlcmF0b3JcIik7XG5cbnZhciBfaXRlcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXRlcmF0b3IpO1xuXG52YXIgX3N5bWJvbCA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbFwiKTtcblxudmFyIF9zeW1ib2wyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3ltYm9sKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mKF9pdGVyYXRvcjIuZGVmYXVsdCkgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YuanNcbiAqKiBtb2R1bGUgaWQgPSA1N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSA1OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLndrcycpKCdpdGVyYXRvcicpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gNTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2xcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzXG4gKiogbW9kdWxlIGlkID0gNjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN5bWJvbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQuY29yZScpLlN5bWJvbDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDYxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4vLyBFQ01BU2NyaXB0IDYgc3ltYm9scyBzaGltXG52YXIgJCAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBERVNDUklQVE9SUyAgICA9IHJlcXVpcmUoJy4vJC5kZXNjcmlwdG9ycycpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vJC5yZWRlZmluZScpXG4gICwgJGZhaWxzICAgICAgICAgPSByZXF1aXJlKCcuLyQuZmFpbHMnKVxuICAsIHNoYXJlZCAgICAgICAgID0gcmVxdWlyZSgnLi8kLnNoYXJlZCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLyQuc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIHVpZCAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpXG4gICwgd2tzICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQud2tzJylcbiAgLCBrZXlPZiAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5rZXlvZicpXG4gICwgJG5hbWVzICAgICAgICAgPSByZXF1aXJlKCcuLyQuZ2V0LW5hbWVzJylcbiAgLCBlbnVtS2V5cyAgICAgICA9IHJlcXVpcmUoJy4vJC5lbnVtLWtleXMnKVxuICAsIGlzQXJyYXkgICAgICAgID0gcmVxdWlyZSgnLi8kLmlzLWFycmF5JylcbiAgLCBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIHRvSU9iamVjdCAgICAgID0gcmVxdWlyZSgnLi8kLnRvLWlvYmplY3QnKVxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi8kLnByb3BlcnR5LWRlc2MnKVxuICAsIGdldERlc2MgICAgICAgID0gJC5nZXREZXNjXG4gICwgc2V0RGVzYyAgICAgICAgPSAkLnNldERlc2NcbiAgLCBfY3JlYXRlICAgICAgICA9ICQuY3JlYXRlXG4gICwgZ2V0TmFtZXMgICAgICAgPSAkbmFtZXMuZ2V0XG4gICwgJFN5bWJvbCAgICAgICAgPSBnbG9iYWwuU3ltYm9sXG4gICwgJEpTT04gICAgICAgICAgPSBnbG9iYWwuSlNPTlxuICAsIF9zdHJpbmdpZnkgICAgID0gJEpTT04gJiYgJEpTT04uc3RyaW5naWZ5XG4gICwgc2V0dGVyICAgICAgICAgPSBmYWxzZVxuICAsIEhJRERFTiAgICAgICAgID0gd2tzKCdfaGlkZGVuJylcbiAgLCBpc0VudW0gICAgICAgICA9ICQuaXNFbnVtXG4gICwgU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC1yZWdpc3RyeScpXG4gICwgQWxsU3ltYm9scyAgICAgPSBzaGFyZWQoJ3N5bWJvbHMnKVxuICAsIHVzZU5hdGl2ZSAgICAgID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJ1xuICAsIE9iamVjdFByb3RvICAgID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0NSSVBUT1JTICYmICRmYWlscyhmdW5jdGlvbigpe1xuICByZXR1cm4gX2NyZWF0ZShzZXREZXNjKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBzZXREZXNjKHRoaXMsICdhJywge3ZhbHVlOiA3fSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbihpdCwga2V5LCBEKXtcbiAgdmFyIHByb3RvRGVzYyA9IGdldERlc2MoT2JqZWN0UHJvdG8sIGtleSk7XG4gIGlmKHByb3RvRGVzYylkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgc2V0RGVzYyhpdCwga2V5LCBEKTtcbiAgaWYocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bylzZXREZXNjKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogc2V0RGVzYztcblxudmFyIHdyYXAgPSBmdW5jdGlvbih0YWcpe1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sLnByb3RvdHlwZSk7XG4gIHN5bS5fayA9IHRhZztcbiAgREVTQ1JJUFRPUlMgJiYgc2V0dGVyICYmIHNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGlmKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHN5bTtcbn07XG5cbnZhciBpc1N5bWJvbCA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKXtcbiAgaWYoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSl7XG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XG4gICAgICBpZighaGFzKGl0LCBISURERU4pKXNldERlc2MoaXQsIEhJRERFTiwgY3JlYXRlRGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSlpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSBfY3JlYXRlKEQsIHtlbnVtZXJhYmxlOiBjcmVhdGVEZXNjKDAsIGZhbHNlKX0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIHNldERlc2MoaXQsIGtleSwgRCk7XG59O1xudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhpdCwgUCl7XG4gIGFuT2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9JT2JqZWN0KFApKVxuICAgICwgaSAgICA9IDBcbiAgICAsIGwgPSBrZXlzLmxlbmd0aFxuICAgICwga2V5O1xuICB3aGlsZShsID4gaSkkZGVmaW5lUHJvcGVydHkoaXQsIGtleSA9IGtleXNbaSsrXSwgUFtrZXldKTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGl0LCBQKXtcbiAgcmV0dXJuIFAgPT09IHVuZGVmaW5lZCA/IF9jcmVhdGUoaXQpIDogJGRlZmluZVByb3BlcnRpZXMoX2NyZWF0ZShpdCksIFApO1xufTtcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShrZXkpe1xuICB2YXIgRSA9IGlzRW51bS5jYWxsKHRoaXMsIGtleSk7XG4gIHJldHVybiBFIHx8ICFoYXModGhpcywga2V5KSB8fCAhaGFzKEFsbFN5bWJvbHMsIGtleSkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW2tleV1cbiAgICA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICB2YXIgRCA9IGdldERlc2MoaXQgPSB0b0lPYmplY3QoaXQpLCBrZXkpO1xuICBpZihEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHZhciBuYW1lcyAgPSBnZXROYW1lcyh0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZighaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIGtleSAhPSBISURERU4pcmVzdWx0LnB1c2goa2V5KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCl7XG4gIHZhciBuYW1lcyAgPSBnZXROYW1lcyh0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkpcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJHN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCl7XG4gIGlmKGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKXJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICB2YXIgYXJncyA9IFtpdF1cbiAgICAsIGkgICAgPSAxXG4gICAgLCAkJCAgID0gYXJndW1lbnRzXG4gICAgLCByZXBsYWNlciwgJHJlcGxhY2VyO1xuICB3aGlsZSgkJC5sZW5ndGggPiBpKWFyZ3MucHVzaCgkJFtpKytdKTtcbiAgcmVwbGFjZXIgPSBhcmdzWzFdO1xuICBpZih0eXBlb2YgcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykkcmVwbGFjZXIgPSByZXBsYWNlcjtcbiAgaWYoJHJlcGxhY2VyIHx8ICFpc0FycmF5KHJlcGxhY2VyKSlyZXBsYWNlciA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgIGlmKCRyZXBsYWNlcil2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgIGlmKCFpc1N5bWJvbCh2YWx1ZSkpcmV0dXJuIHZhbHVlO1xuICB9O1xuICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gIHJldHVybiBfc3RyaW5naWZ5LmFwcGx5KCRKU09OLCBhcmdzKTtcbn07XG52YXIgYnVnZ3lKU09OID0gJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHZhciBTID0gJFN5bWJvbCgpO1xuICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgcmV0dXJuIF9zdHJpbmdpZnkoW1NdKSAhPSAnW251bGxdJyB8fCBfc3RyaW5naWZ5KHthOiBTfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pO1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmKCF1c2VOYXRpdmUpe1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCl7XG4gICAgaWYoaXNTeW1ib2wodGhpcykpdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3InKTtcbiAgICByZXR1cm4gd3JhcCh1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbC5wcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgcmV0dXJuIHRoaXMuX2s7XG4gIH0pO1xuXG4gIGlzU3ltYm9sID0gZnVuY3Rpb24oaXQpe1xuICAgIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG4gIH07XG5cbiAgJC5jcmVhdGUgICAgID0gJGNyZWF0ZTtcbiAgJC5pc0VudW0gICAgID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICAkLmdldERlc2MgICAgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkLnNldERlc2MgICAgPSAkZGVmaW5lUHJvcGVydHk7XG4gICQuc2V0RGVzY3MgICA9ICRkZWZpbmVQcm9wZXJ0aWVzO1xuICAkLmdldE5hbWVzICAgPSAkbmFtZXMuZ2V0ID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gICQuZ2V0U3ltYm9scyA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vJC5saWJyYXJ5Jykpe1xuICAgIHJlZGVmaW5lKE9iamVjdFByb3RvLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xuICB9XG59XG5cbnZhciBzeW1ib2xTdGF0aWNzID0ge1xuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcbiAgJ2Zvcic6IGZ1bmN0aW9uKGtleSl7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihrZXkpe1xuICAgIHJldHVybiBrZXlPZihTeW1ib2xSZWdpc3RyeSwga2V5KTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uKCl7IHNldHRlciA9IGZhbHNlOyB9XG59O1xuLy8gMTkuNC4yLjIgU3ltYm9sLmhhc0luc3RhbmNlXG4vLyAxOS40LjIuMyBTeW1ib2wuaXNDb25jYXRTcHJlYWRhYmxlXG4vLyAxOS40LjIuNCBTeW1ib2wuaXRlcmF0b3Jcbi8vIDE5LjQuMi42IFN5bWJvbC5tYXRjaFxuLy8gMTkuNC4yLjggU3ltYm9sLnJlcGxhY2Vcbi8vIDE5LjQuMi45IFN5bWJvbC5zZWFyY2hcbi8vIDE5LjQuMi4xMCBTeW1ib2wuc3BlY2llc1xuLy8gMTkuNC4yLjExIFN5bWJvbC5zcGxpdFxuLy8gMTkuNC4yLjEyIFN5bWJvbC50b1ByaW1pdGl2ZVxuLy8gMTkuNC4yLjEzIFN5bWJvbC50b1N0cmluZ1RhZ1xuLy8gMTkuNC4yLjE0IFN5bWJvbC51bnNjb3BhYmxlc1xuJC5lYWNoLmNhbGwoKFxuICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLCcgK1xuICAnc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgZnVuY3Rpb24oaXQpe1xuICB2YXIgc3ltID0gd2tzKGl0KTtcbiAgc3ltYm9sU3RhdGljc1tpdF0gPSB1c2VOYXRpdmUgPyBzeW0gOiB3cmFwKHN5bSk7XG59KTtcblxuc2V0dGVyID0gdHJ1ZTtcblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcsIHtTeW1ib2w6ICRTeW1ib2x9KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdTeW1ib2wnLCBzeW1ib2xTdGF0aWNzKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhdXNlTmF0aXZlLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghdXNlTmF0aXZlIHx8IGJ1Z2d5SlNPTiksICdKU09OJywge3N0cmluZ2lmeTogJHN0cmluZ2lmeX0pO1xuXG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzXG4gKiogbW9kdWxlIGlkID0gNjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vJC50by1pb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgZWwpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGtleXMgICA9ICQuZ2V0S2V5cyhPKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobGVuZ3RoID4gaW5kZXgpaWYoT1trZXkgPSBrZXlzW2luZGV4KytdXSA9PT0gZWwpcmV0dXJuIGtleTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQua2V5b2YuanNcbiAqKiBtb2R1bGUgaWQgPSA2M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vJC50by1pb2JqZWN0JylcbiAgLCBnZXROYW1lcyAgPSByZXF1aXJlKCcuLyQnKS5nZXROYW1lc1xuICAsIHRvU3RyaW5nICA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbihpdCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdldE5hbWVzKGl0KTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZ2V0ID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIGlmKHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nKXJldHVybiBnZXRXaW5kb3dOYW1lcyhpdCk7XG4gIHJldHVybiBnZXROYW1lcyh0b0lPYmplY3QoaXQpKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZ2V0LW5hbWVzLmpzXG4gKiogbW9kdWxlIGlkID0gNjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgJCA9IHJlcXVpcmUoJy4vJCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBrZXlzICAgICAgID0gJC5nZXRLZXlzKGl0KVxuICAgICwgZ2V0U3ltYm9scyA9ICQuZ2V0U3ltYm9scztcbiAgaWYoZ2V0U3ltYm9scyl7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KVxuICAgICAgLCBpc0VudW0gID0gJC5pc0VudW1cbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKHN5bWJvbHMubGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSlrZXlzLnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4ga2V5cztcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZW51bS1rZXlzLmpzXG4gKiogbW9kdWxlIGlkID0gNjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG52YXIgY29mID0gcmVxdWlyZSgnLi8kLmNvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKGFyZyl7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pcy1hcnJheS5qc1xuICoqIG1vZHVsZSBpZCA9IDY2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSA2N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKTtcblxudmFyIF9zZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zZXRQcm90b3R5cGVPZik7XG5cbnZhciBfY3JlYXRlID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2NyZWF0ZVwiKTtcblxudmFyIF9jcmVhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlKTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArICh0eXBlb2Ygc3VwZXJDbGFzcyA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoc3VwZXJDbGFzcykpKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9ICgwLCBfY3JlYXRlMi5kZWZhdWx0KShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0ID8gKDAsIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzXG4gKiogbW9kdWxlIGlkID0gNjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qc1xuICoqIG1vZHVsZSBpZCA9IDY5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQuY29yZScpLk9iamVjdC5zZXRQcm90b3R5cGVPZjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzXG4gKiogbW9kdWxlIGlkID0gNzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge3NldFByb3RvdHlwZU9mOiByZXF1aXJlKCcuLyQuc2V0LXByb3RvJykuc2V0fSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qc1xuICoqIG1vZHVsZSBpZCA9IDcxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgZ2V0RGVzYyAgPSByZXF1aXJlKCcuLyQnKS5nZXREZXNjXG4gICwgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uKE8sIHByb3RvKXtcbiAgYW5PYmplY3QoTyk7XG4gIGlmKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24odGVzdCwgYnVnZ3ksIHNldCl7XG4gICAgICB0cnkge1xuICAgICAgICBzZXQgPSByZXF1aXJlKCcuLyQuY3R4JykoRnVuY3Rpb24uY2FsbCwgZ2V0RGVzYyhPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoKGUpeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90byl7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYoYnVnZ3kpTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNldC1wcm90by5qc1xuICoqIG1vZHVsZSBpZCA9IDcyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gNzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZShQLCBEKXtcbiAgcmV0dXJuICQuY3JlYXRlKFAsIEQpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSA3NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bG9jYWxJZGVudE5hbWU9W25hbWVdX19bbG9jYWxdX19fW2hhc2g6YmFzZTY0OjVdIS4vLi4vbm9kZV9tb2R1bGVzL3N0eWx1cy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5zdHlsXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9sb2NhbElkZW50TmFtZT1bbmFtZV1fX1tsb2NhbF1fX19baGFzaDpiYXNlNjQ6NV0hLi8uLi9ub2RlX21vZHVsZXMvc3R5bHVzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLnN0eWxcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bG9jYWxJZGVudE5hbWU9W25hbWVdX19bbG9jYWxdX19fW2hhc2g6YmFzZTY0OjVdIS4vLi4vbm9kZV9tb2R1bGVzL3N0eWx1cy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5zdHlsXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXBwL3N0eWxlLnN0eWxcbiAqKiBtb2R1bGUgaWQgPSA3NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuc3R5bGVfX3dlYXRoZXJfY29udGFpbmVyX19fek5rY0cge1xcbiAgd2lkdGg6IDI1MHB4O1xcbiAgbWFyZ2luOiAxMDBweCBhdXRvO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcbi5zdHlsZV9fdGFiX2NvbnRhaW5lcl9fXzM4VlNtIHtcXG4gIGZvbnQtc2l6ZTogMTNwdDtcXG4gIGNsZWFyOiBsZWZ0O1xcbn1cXG4uc3R5bGVfX2dlbmVyYWxfX18ySDFIbSB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xcbn1cXG4uc3R5bGVfX2dlbmVyYWxfX2ljb25fX18zMEVDOCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuLnN0eWxlX19kZXNjcmlwdGlvbl9fX25Qb3I4IHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiA0NSU7XFxufVxcbi5zdHlsZV9fcGFyYW1ldHJfX18yTEI5UCB7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiAzMyU7XFxufVxcbi5zdHlsZV9fYWN0aXZlX19feTlRaU0ge1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMwMDA7XFxufVxcbi5zdHlsZV9fdGFiX19fM1VpYUsge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICB3aWR0aDogMzMlO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uc3R5bGVfX2hpZGVfdGFiX19fMy15TDUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuLnN0eWxlX19mb3JlY2FzdF9kYXlfX18yRGhjcyB7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiAyNSU7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcIndlYXRoZXJfY29udGFpbmVyXCI6IFwic3R5bGVfX3dlYXRoZXJfY29udGFpbmVyX19fek5rY0dcIixcblx0XCJ0YWJfY29udGFpbmVyXCI6IFwic3R5bGVfX3RhYl9jb250YWluZXJfX18zOFZTbVwiLFxuXHRcImdlbmVyYWxcIjogXCJzdHlsZV9fZ2VuZXJhbF9fXzJIMUhtXCIsXG5cdFwiZ2VuZXJhbF9faWNvblwiOiBcInN0eWxlX19nZW5lcmFsX19pY29uX19fMzBFQzhcIixcblx0XCJkZXNjcmlwdGlvblwiOiBcInN0eWxlX19kZXNjcmlwdGlvbl9fX25Qb3I4XCIsXG5cdFwicGFyYW1ldHJcIjogXCJzdHlsZV9fcGFyYW1ldHJfX18yTEI5UFwiLFxuXHRcImFjdGl2ZVwiOiBcInN0eWxlX19hY3RpdmVfX195OVFpTVwiLFxuXHRcInRhYlwiOiBcInN0eWxlX190YWJfX18zVWlhS1wiLFxuXHRcImhpZGVfdGFiXCI6IFwic3R5bGVfX2hpZGVfdGFiX19fMy15TDVcIixcblx0XCJmb3JlY2FzdF9kYXlcIjogXCJzdHlsZV9fZm9yZWNhc3RfZGF5X19fMkRoY3NcIlxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyP2xvY2FsSWRlbnROYW1lPVtuYW1lXV9fW2xvY2FsXV9fX1toYXNoOmJhc2U2NDo1XSEuL34vc3R5bHVzLWxvYWRlciEuL2FwcC9zdHlsZS5zdHlsXG4gKiogbW9kdWxlIGlkID0gNzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDc3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcclxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0cmV0dXJuIG1lbW87XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcblx0fSksXHJcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHR9KSxcclxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcclxuXHRzaW5nbGV0b25Db3VudGVyID0gMCxcclxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcclxuXHJcblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcFtzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcclxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xyXG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgaGVhZC5maXJzdENoaWxkKTtcclxuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xyXG5cdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcclxuXHRpZihpZHggPj0gMCkge1xyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XHJcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XHJcblx0cmV0dXJuIGxpbmtFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XHJcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcclxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXHJcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGV4dFN0b3JlID0gW107XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XHJcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XHJcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XHJcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdGlmKHNvdXJjZU1hcCkge1xyXG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcclxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcclxuXHR9XHJcblxyXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xyXG5cclxuXHR2YXIgb2xkU3JjID0gbGlua0VsZW1lbnQuaHJlZjtcclxuXHJcblx0bGlua0VsZW1lbnQuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcblxyXG5cdGlmKG9sZFNyYylcclxuXHRcdFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gNzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJ1c2FrIE9sZWcgb24gMDkuMDIuMjAxNi5cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IEdlbmVyYWxJbmZvIGZyb20gJy4vZ2VuZXJhbC1pbmZvLmpzeCc7XHJcbmltcG9ydCBEZXRhaWxJbmZvIGZyb20gJy4vZGV0YWlsLWluZm8uanN4JztcclxuaW1wb3J0IEZvcmVjYXN0IGZyb20gJy4vZm9yZWNhc3QuanN4JztcclxuaW1wb3J0IGNzcyBmcm9tICcuLy4uL3N0eWxlLnN0eWwnO1xyXG5cclxuY2xhc3MgV2VhdGhlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvciAocHJvcHMpe1xyXG4gICAgICAgIHN1cGVyIChwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGlkX2Rpc3BsYXlfY2l0eTogdGhpcy5wcm9wcy5zZXR0aW5ncy5pZF9kaXNwbGF5X2NpdHlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyICgpe1xyXG4gICAgICAgIGxldCBjbGFzc1RhYkNvbnRlbnQgPSBjc3MudGFiX2NvbnRhaW5lciArICh0aGlzLnByb3BzLnNldHRpbmdzLnNob3dUYWI9PSd3ZWF0aGVyJyA/ICcnIDogXCIgXCIgKyBjc3MuaGlkZV90YWIpO1xyXG4gICAgICAgIGxldCBjaXR5ID0gdGhpcy5wcm9wcy5jaXRpZXNbdGhpcy5wcm9wcy5zZXR0aW5ncy5pZF9kaXNwbGF5X2NpdHldO1xyXG5cclxuICAgICAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHRvZGF5ID0gbmV3IERhdGUodG9kYXkuZ2V0RnVsbFllYXIoKSwgdG9kYXkuZ2V0TW9udGgoKSwgdG9kYXkuZ2V0RGF0ZSgpKTtcclxuICAgICAgICBsZXQgd2VhdGhlclRvZGF5ID0gY2l0eS53ZWF0aGVyID8gY2l0eS53ZWF0aGVyW3RvZGF5LmdldFRpbWUoKV06IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgbGV0IGhhbmRsZXJOZXh0Q2l0eSA9IHRoaXMuY2hhbmdlU2hvd0NpdHkuYmluZCh0aGlzLCB0cnVlKTtcclxuICAgICAgICBsZXQgaGFuZGxlclByZXZDaXR5ID0gdGhpcy5jaGFuZ2VTaG93Q2l0eS5iaW5kKHRoaXMsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzVGFiQ29udGVudH0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByZXZDaXR5XCIgb25DbGljaz17aGFuZGxlck5leHRDaXR5fT4rPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5leHRDaXR5XCIgb25DbGljaz17aGFuZGxlclByZXZDaXR5fT4tPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8R2VuZXJhbEluZm8gd2VhdGhlcj17d2VhdGhlclRvZGF5fSBuYW1lPXtjaXR5Lm5hbWV9IGNvdW50cnk9e2NpdHkuY291bnRyeX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17Y2l0eS5pZH0gc2V0dGluZ3M9e3RoaXMucHJvcHMuc2V0dGluZ3N9Lz5cclxuICAgICAgICAgICAgICAgIDxGb3JlY2FzdCB3ZWF0aGVyPXtjaXR5LndlYXRoZXJ9Lz5cclxuICAgICAgICAgICAgICAgIDxEZXRhaWxJbmZvIHdlYXRoZXI9e3dlYXRoZXJUb2RheX0vPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlU2hvd0NpdHkgKG5leHRDaXR5LCBldmVudCl7XHJcbiAgICAgICAgbGV0IGtleUNpdGllcyA9IE9iamVjdC5rZXlzKHRoaXMucHJvcHMuY2l0aWVzKTtcclxuICAgICAgICBsZXQgaW5kZXggPSBrZXlDaXRpZXMuaW5kZXhPZih0aGlzLnByb3BzLnNldHRpbmdzLmlkX2Rpc3BsYXlfY2l0eSk7XHJcblxyXG4gICAgICAgIGlmKGluZGV4PT0tMSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lkX2Rpc3BsYXlfY2l0eToga2V5Q2l0aWVzWzBdfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpbmRleE5leHQgPSBpbmRleCArIChuZXh0Q2l0eT8xOi0xKTtcclxuXHJcbiAgICAgICAgaW5kZXhOZXh0ID0gaW5kZXhOZXh0PDAgPyBrZXlDaXRpZXMubGVuZ3RoLTE6IGluZGV4TmV4dDtcclxuICAgICAgICBpbmRleE5leHQgPSBpbmRleE5leHQ9PWtleUNpdGllcy5sZW5ndGggPyAwOiBpbmRleE5leHQ7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcHMuY2hhbmdlU2hvd0NpdHkoa2V5Q2l0aWVzW2luZGV4TmV4dF0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBXZWF0aGVyO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC93ZWF0aGVyL3dlYXRoZXIuanN4XG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgUnVzYWsgT2xlZyBvbiAxMC4wMi4yMDE2LlxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgY3NzIGZyb20gJy4vLi4vc3R5bGUuc3R5bCc7XHJcblxyXG5jbGFzcyBHZW5lcmFsSW5mbyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICAvL3RvZG86IGh0dHA6Ly9jc3Nsb2FkLm5ldC9ydS9zcGlubmVyc1xyXG4gICAgcmVuZGVyICgpe1xyXG4gICAgICAgIGxldCBwcmVjaXBpdGF0aW9uTW9kZSA9IHRoaXMucHJvcHMud2VhdGhlci5wcmVjaXBpdGF0aW9uLm1vZGU7XHJcbiAgICAgICAgbGV0IHByZWNpcGl0YXRpb25EZWNyeXB0aW9uID0gcHJlY2lwaXRhdGlvbk1vZGUgPyBgKCR7cHJlY2lwaXRhdGlvbk1vZGV9KWA6Jyc7XHJcbiAgICAgICAgbGV0IGNpdHlJbmZvID0gYCR7dGhpcy5wcm9wcy5uYW1lfSAoJHt0aGlzLnByb3BzLmNvdW50cnl9KWA7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjc3MuZ2VuZXJhbH0+XHJcbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzTmFtZT17Y3NzLmdlbmVyYWxfX2ljb259IHNyYz17YGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3cvJHt0aGlzLnByb3BzLndlYXRoZXIuaWNvbn0ucG5nYH0vPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzcy5kZXNjcmlwdGlvbn0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgxPnt0aGlzLnByb3BzLndlYXRoZXIuZGVzY3JpcHRpb24gKyBwcmVjaXBpdGF0aW9uRGVjcnlwdGlvbn08L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLndlYXRoZXIudGVtcGVyYXR1cmUuYXZyfVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+e3RoaXMucHJvcHMud2VhdGhlci5kYXRlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+e2NpdHlJbmZvfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuR2VuZXJhbEluZm8uZGVmYXVsdFByb3BzID0ge1xyXG4gICAgd2VhdGhlcjoge1xyXG4gICAgICAgIGljb246IFwiMDFkXCIsXHJcbiAgICAgICAgbmFtZTogXCJjdXJyZW50IHdlYXRoZXI/XCIsXHJcbiAgICAgICAgdGVtcGVyYXR1cmU6IHtcclxuICAgICAgICAgICAgYXZyOiBcIi1cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJlY2lwaXRhdGlvbjoge1xyXG4gICAgICAgICAgICBtb2RlOiAnLSdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHZW5lcmFsSW5mbztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvd2VhdGhlci9nZW5lcmFsLWluZm8uanN4XG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgUnVzYWsgT2xlZyBvbiAwOS4wMi4yMDE2LlxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgY3NzIGZyb20gJy4vLi4vc3R5bGUuc3R5bCc7XHJcbmltcG9ydCBQYXJhbWV0ciBmcm9tICcuL3BhcmFtZXRyLWluZm8uanN4JztcclxuXHJcbmNsYXNzIERldGFpbEluZm8gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgLy90b2RvOiBDdXJyZW50IFVWIEluZGV4XHJcbiAgICAvL2h0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvYXBpX3V2XHJcbiAgICByZW5kZXIgKCl7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gdGhpcy5wcm9wcy5zZXR0aW5ncztcclxuXHJcbiAgICAgICAgbGV0IHdpbmREZXNjcmlwdGlvbiA9IHRoaXMucHJvcHMud2VhdGhlci53aW5kLnNwZWVkO1xyXG4gICAgICAgIHdpbmREZXNjcmlwdGlvbiArPSB0aGlzLnByb3BzLndlYXRoZXIud2luZC5kaXJlY3Rpb24gPyAnLCAnICsgdGhpcy5wcm9wcy53ZWF0aGVyLndpbmQuZGlyZWN0aW9uOicnO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzLmRldGFpbH0+XHJcbiAgICAgICAgICAgICAgICA8UGFyYW1ldHIgbmFtZT1cIlByZXNzdXJlXCIga2V5PVwiUHJlc3N1cmVcIiB2YWx1ZT17dGhpcy5wcm9wcy53ZWF0aGVyLnByZXNzdXJlLmF2cn0vPlxyXG4gICAgICAgICAgICAgICAgPFBhcmFtZXRyIG5hbWU9XCJIdW1pZGl0eVwiIGtleT1cIkh1bWlkaXR5XCIgdmFsdWU9e3RoaXMucHJvcHMud2VhdGhlci5odW1pZGl0eX0vPlxyXG4gICAgICAgICAgICAgICAgPFBhcmFtZXRyIG5hbWU9XCJXaW5kXCIga2V5PVwiV2luZFwiIHZhbHVlPXt3aW5kRGVzY3JpcHRpb259Lz5cclxuICAgICAgICAgICAgICAgIDxQYXJhbWV0ciBuYW1lPVwiQ2xvdWRzXCIga2V5PVwiQ2xvdWRzXCIgdmFsdWU9e3RoaXMucHJvcHMud2VhdGhlci5jbG91ZHMudmFsdWV9Lz5cclxuICAgICAgICAgICAgICAgIDxQYXJhbWV0ciBuYW1lPVwiU3VucmlzZVwiIGtleT1cIlN1bnJpc2VcIiB2YWx1ZT17dGhpcy5wcm9wcy53ZWF0aGVyLnN1bi5yaXNlfS8+XHJcbiAgICAgICAgICAgICAgICA8UGFyYW1ldHIgbmFtZT1cIlN1bnNldFwiIGtleT1cIlN1bnNldFwiIHZhbHVlPXt0aGlzLnByb3BzLndlYXRoZXIuc3VuLnNldH0vPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbkRldGFpbEluZm8uZGVmYXVsdFByb3BzID0ge1xyXG4gICAgd2VhdGhlcjoge1xyXG4gICAgICAgIHByZXNzdXJlOiB7XHJcbiAgICAgICAgICAgIGF2cjogJy0nXHJcbiAgICAgICAgfSxcclxuICAgICAgICB3aW5kOiB7XHJcbiAgICAgICAgICAgIHNwZWVkOiAnLScsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJy0nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbG91ZHM6IHtcclxuICAgICAgICAgICAgdmFsdWU6ICctJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VuOiB7XHJcbiAgICAgICAgICAgIHJpc2U6ICctJyxcclxuICAgICAgICAgICAgc2V0OiAnLSdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2V0dGluZ3M6IHt9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxJbmZvO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC93ZWF0aGVyL2RldGFpbC1pbmZvLmpzeFxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJ1c2FrIE9sZWcgb24gMDkuMDIuMjAxNi5cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IGNzcyBmcm9tICcuLy4uL3N0eWxlLnN0eWwnO1xyXG5cclxuY2xhc3MgUGFyYW1ldHIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IgKHByb3BzKXtcclxuICAgICAgICBzdXBlciAocHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlciAoKXtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzLnBhcmFtZXRyfT5cclxuICAgICAgICAgICAgICAgIDxkaXY+e3RoaXMucHJvcHMubmFtZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXY+e3RoaXMucHJvcHMudmFsdWV9PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuUGFyYW1ldHIuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdmFsdWU6ICctJ1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYXJhbWV0cjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvd2VhdGhlci9wYXJhbWV0ci1pbmZvLmpzeFxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJ1c2FrIE9sZWcgb24gMDkuMDIuMjAxNi5cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IGNzcyBmcm9tICcuLy4uL3N0eWxlLnN0eWwnO1xyXG5pbXBvcnQgRm9yZWNhc3REYXkgZnJvbSAnLi9mb3JlY2FzdC1kYXkuanN4JztcclxuXHJcbmNsYXNzIEZvcmVjYXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlciAoKXtcclxuICAgICAgICBsZXQgZm9yZWNhc3REYXkgPSBbXTtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnByb3BzLndlYXRoZXIpLnNvcnQoKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgZm9yZWNhc3REYXkucHVzaCg8Rm9yZWNhc3REYXkgd2VhdGhlcj17dGhpcy5wcm9wcy53ZWF0aGVyW2tleV19IGtleT17a2V5fS8+KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzLmZvcmVjYXN0fT5cclxuICAgICAgICAgICAgICAgIHtmb3JlY2FzdERheX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5Gb3JlY2FzdC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICB3ZWF0aGVyOiB7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGb3JlY2FzdDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvd2VhdGhlci9mb3JlY2FzdC5qc3hcbiAqKi8iLCIvKipcclxuICogQ3JlYXRlZCBieSBSdXNhayBPbGVnIG9uIDA5LjAyLjIwMTYuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCBjc3MgZnJvbSAnLi8uLi9zdHlsZS5zdHlsJztcclxuXHJcbmNsYXNzIEZvcmVjYXN0RGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGdldFRpdGxlKCkge1xyXG4gICAgICAgIGxldCBwcmVjaXBpdGF0aW9uTW9kZSA9IHRoaXMucHJvcHMud2VhdGhlci5wcmVjaXBpdGF0aW9uLm1vZGU7XHJcbiAgICAgICAgbGV0IHByZWNpcGl0YXRpb25EZWNyeXB0aW9uID0gcHJlY2lwaXRhdGlvbk1vZGUgPyBgKCR7cHJlY2lwaXRhdGlvbk1vZGV9KWA6Jyc7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMucHJvcHMud2VhdGhlci5kZXNjcmlwdGlvbn0ke3ByZWNpcGl0YXRpb25EZWNyeXB0aW9ufWA7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCB0aXRsZSA9IHRoaXMuZ2V0VGl0bGUoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzcy5mb3JlY2FzdF9kYXl9PlxyXG4gICAgICAgICAgICAgICAgPGRpdj57dGhpcy5wcm9wcy53ZWF0aGVyLmRhdGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aW1nIGFsdD17dGl0bGV9IHRpdGxlPXt0aXRsZX1cclxuICAgICAgICAgICAgICAgICAgICAgc3JjPXtgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvdy8ke3RoaXMucHJvcHMud2VhdGhlci5pY29ufS5wbmdgfS8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2Pnt0aGlzLnByb3BzLndlYXRoZXIudGVtcGVyYXR1cmUubWlufS97dGhpcy5wcm9wcy53ZWF0aGVyLnRlbXBlcmF0dXJlLm1heH08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5Gb3JlY2FzdERheS5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICB3ZWF0aGVyOiB7XHJcbiAgICAgICAgaWNvbjogXCIwMWRcIixcclxuICAgICAgICB0ZW1wZXJhdHVyZToge1xyXG4gICAgICAgICAgICBtaW46ICctJyxcclxuICAgICAgICAgICAgbWF4OiAnLSdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGb3JlY2FzdERheTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvd2VhdGhlci9mb3JlY2FzdC1kYXkuanN4XG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgUnVzYWsgT2xlZyBvbiAxNS4wMi4yMDE2LlxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgY3NzIGZyb20gJy4vLi4vc3R5bGUuc3R5bCc7XHJcbmltcG9ydCBjc3Nfc2V0dGluZ3MgZnJvbSAnLi9zZXR0aW5ncy5zdHlsJztcclxuXHJcbmltcG9ydCB7VW5pdE1lYXN1cmUsIExhbmd1YWdlc30gZnJvbSAnLi8uLi9saWIvdW5pdC1tZWFzdXJlJztcclxuXHJcbmNvbnN0IERFR1JFRV9DSEFSX0NPREUgPSAxNzY7XHJcbmNvbnN0IERFR1JFRV9DSEFSID0gU3RyaW5nLmZyb21DaGFyQ29kZShERUdSRUVfQ0hBUl9DT0RFKTtcclxuXHJcbmNsYXNzIFNldHRpbmdzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG4gICAgY29uc3RydWN0b3IgKHByb3BzKXtcclxuICAgICAgICBzdXBlciAocHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlciAoKXtcclxuICAgICAgICBsZXQgY2xhc3NUYWJDb250ZW50ID0gY3NzLnRhYl9jb250YWluZXIgKyAodGhpcy5wcm9wcy5zZXR0aW5ncy5zaG93VGFiPT0nc2V0dGluZ3MnID8gJycgOiBcIiBcIiArIGNzcy5oaWRlX3RhYik7XHJcbiAgICAgICAgbGV0IHVwZGF0ZVNldHRpbmdzID0gdGhpcy5wcm9wcy51cGRhdGVTZXR0aW5ncztcclxuICAgICAgICBsZXQgY3VycmVudFVuaXRNZWFzdXJlID0gdGhpcy5wcm9wcy5zZXR0aW5ncy51bml0X21lYXN1cmU7XHJcblxyXG4gICAgICAgIGxldCBsaXN0VW5pdHMgPSBPYmplY3Qua2V5cyhVbml0TWVhc3VyZS50eXBlKS5tYXAoKGtleSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge25hbWU6IGtleSwgdmFsdWU6IGtleX07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc1RhYkNvbnRlbnR9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzcy5maWVsZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkRhdGEgU291cmNlPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJPcGVuV2VhdGhlck1hcFwiIG5hbWU9XCJkYXRhU291cmNlXCIgdmFsdWU9XCJPcGVuV2VhdGhlck1hcFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0Q2hlY2tlZCByZWFkT25seS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiT3BlbldlYXRoZXJNYXBcIj5PcGVuV2VhdGhlck1hcDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjc3MuZmllbGR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5BUEkgS2V5ICg8YSBocmVmPVwiaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9hcHBpZFwiPmdldCBrZXk8L2E+KTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIG5hbWU9XCJrZXlBcGlcIiBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuc2V0dGluZ3MuQVBJLm9wZW53ZWF0aGVybWFwLmtleX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt1cGRhdGVTZXR0aW5nc30vPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzLmZpZWxkfT5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+RGF0YSByZWNlaXZlIGxhbmd1YWdlczwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPFNlbGVjdEVsZW1lbnQgbmFtZT1cImxhbmd1YWdlc1wiIGxpc3Q9e0xhbmd1YWdlc30gY3VycmVudD17dGhpcy5wcm9wcy5zZXR0aW5ncy5sYW5nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlU2V0dGluZ3M9e3VwZGF0ZVNldHRpbmdzfS8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjc3MuZmllbGR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5Vbml0IG1lYXN1cmU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxSYWRpb0VsZW1lbnQgbmFtZT1cInVuaXRNZWFzdXJlXCIgbGlzdD17bGlzdFVuaXRzfSBjdXJyZW50PXtjdXJyZW50VW5pdE1lYXN1cmV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVTZXR0aW5ncz17dXBkYXRlU2V0dGluZ3N9Lz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPFVuaXRFeGFtcGxlIHVuaXRUeXBlPXt0aGlzLnByb3BzLnNldHRpbmdzLnVuaXRfbWVhc3VyZX0vPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCBVbml0RXhhbXBsZSA9IChwcm9wcykgPT4ge1xyXG4gICAgbGV0IGN1cnJlbnRVbml0TWVhc3VyZSA9IHByb3BzLnVuaXRUeXBlO1xyXG4gICAgbGV0IG1lYXN1cmUgPSBVbml0TWVhc3VyZS50eXBlW2N1cnJlbnRVbml0TWVhc3VyZV07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzX3NldHRpbmdzLnVuaXRfZXhhbXBsZX0+XHJcbiAgICAgICAgICAgIDxsYWJlbD5Mb29rIGxpa2U8L2xhYmVsPlxyXG4gICAgICAgICAgICA8ZGl2PlRlbXBlcmF0dXJlOiB7bWVhc3VyZS50ZW1wZXJhdHVyZS5leGFtcGxlK0RFR1JFRV9DSEFSfXttZWFzdXJlLnRlbXBlcmF0dXJlLmxldHRlcn0oe21lYXN1cmUudGVtcGVyYXR1cmUubmFtZX0pPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+V2luZDoge21lYXN1cmUud2luZF9leGFtcGxlfXttZWFzdXJlLndpbmR9LCBTKFNvdXRoKTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2PlByZXNzdXJlOiB7VW5pdE1lYXN1cmUucHJlc3N1cmVfZXhhbXBsZX17VW5pdE1lYXN1cmUucHJlc3N1cmV9PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+UHJlY2lwaXRhdGlvbjoge1VuaXRNZWFzdXJlLnByZWNpcGl0YXRpb25fZXhhbXBsZX17VW5pdE1lYXN1cmUucHJlY2lwaXRhdGlvbn08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn07XHJcblxyXG5sZXQgUmFkaW9FbGVtZW50ID0gKHByb3BzKSA9PiB7XHJcbiAgICBsZXQgY29sbGVjdGlvbiA9IHByb3BzLmxpc3QubWFwIChlbGVtID0+IHtcclxuICAgICAgICBsZXQgaWQgPSBlbGVtLnZhbHVlO1xyXG4gICAgICAgIGxldCBuYW1lID0gZWxlbS5uYW1lO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYga2V5PXtpZH0+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9e2lkfSBuYW1lPXtwcm9wcy5uYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtpZH0gY2hlY2tlZD17cHJvcHMuY3VycmVudD09aWR9IG9uQ2hhbmdlPXtwcm9wcy51cGRhdGVTZXR0aW5nc30vPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2lkfT57bmFtZX08L2xhYmVsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2Pntjb2xsZWN0aW9ufTwvZGl2PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmxldCBTZWxlY3RFbGVtZW50ID0gKHByb3BzKSA9PiB7XHJcbiAgICBsZXQgY29sbGVjdGlvbiA9IHByb3BzLmxpc3QubWFwIChlbGVtID0+IHtcclxuICAgICAgICBsZXQgaWQgPSBlbGVtLnZhbHVlO1xyXG4gICAgICAgIGxldCBuYW1lID0gZWxlbS5uYW1lO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxvcHRpb24ga2V5PXtpZH0gdmFsdWU9e2lkfT57bmFtZX08L29wdGlvbj5cclxuICAgICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8c2VsZWN0IG5hbWU9e3Byb3BzLm5hbWV9IG9uQ2hhbmdlPXtwcm9wcy51cGRhdGVTZXR0aW5nc30gZGVmYXVsdFZhbHVlPXtwcm9wcy5jdXJyZW50fT57Y29sbGVjdGlvbn08L3NlbGVjdD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXR0aW5ncztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvc2V0dGluZ3Mvc2V0dGluZ3MuanN4XG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bG9jYWxJZGVudE5hbWU9W25hbWVdX19bbG9jYWxdX19fW2hhc2g6YmFzZTY0OjVdIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWx1cy1sb2FkZXIvaW5kZXguanMhLi9zZXR0aW5ncy5zdHlsXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9sb2NhbElkZW50TmFtZT1bbmFtZV1fX1tsb2NhbF1fX19baGFzaDpiYXNlNjQ6NV0hLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bHVzLWxvYWRlci9pbmRleC5qcyEuL3NldHRpbmdzLnN0eWxcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bG9jYWxJZGVudE5hbWU9W25hbWVdX19bbG9jYWxdX19fW2hhc2g6YmFzZTY0OjVdIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWx1cy1sb2FkZXIvaW5kZXguanMhLi9zZXR0aW5ncy5zdHlsXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYXBwL3NldHRpbmdzL3NldHRpbmdzLnN0eWxcbiAqKiBtb2R1bGUgaWQgPSA4NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyP2xvY2FsSWRlbnROYW1lPVtuYW1lXV9fW2xvY2FsXV9fX1toYXNoOmJhc2U2NDo1XSEuL34vc3R5bHVzLWxvYWRlciEuL2FwcC9zZXR0aW5ncy9zZXR0aW5ncy5zdHlsXG4gKiogbW9kdWxlIGlkID0gODdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImxldCBVbml0TWVhc3VyZSA9IHtcclxuICAgIHR5cGU6IHtcclxuICAgICAgICB0aGVybW9keW5hbWljOiB7XHJcbiAgICAgICAgICAgIHRlbXBlcmF0dXJlOiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIktlbHZpblwiLFxyXG4gICAgICAgICAgICAgICAgbGV0dGVyOiBcIktcIixcclxuICAgICAgICAgICAgICAgIGV4YW1wbGU6IDI2NFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB3aW5kOiBcIm0vc1wiLFxyXG4gICAgICAgICAgICB3aW5kX2V4YW1wbGU6IDNcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldHJpYzoge1xyXG4gICAgICAgICAgICB0ZW1wZXJhdHVyZToge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJDZWxzaXVzXCIsXHJcbiAgICAgICAgICAgICAgICBsZXR0ZXI6IFwiQ1wiLFxyXG4gICAgICAgICAgICAgICAgZXhhbXBsZTogLTlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgd2luZDogXCJtL3NcIixcclxuICAgICAgICAgICAgd2luZF9leGFtcGxlOiAzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbXBlcmlhbDoge1xyXG4gICAgICAgICAgICB0ZW1wZXJhdHVyZToge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJGYWhyZW5oZWl0XCIsXHJcbiAgICAgICAgICAgICAgICBsZXR0ZXI6IFwiRlwiLFxyXG4gICAgICAgICAgICAgICAgZXhhbXBsZTogMTVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgd2luZDogXCJtcGhcIixcclxuICAgICAgICAgICAgd2luZF9leGFtcGxlOiA3XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHByZXNzdXJlOiBcImhQYVwiLFxyXG4gICAgcHJlc3N1cmVfZXhhbXBsZTogOTc4LFxyXG4gICAgcHJlY2lwaXRhdGlvbjogXCJtbVwiLFxyXG4gICAgcHJlY2lwaXRhdGlvbl9leGFtcGxlOiA0XHJcbn07XHJcblxyXG5sZXQgTGFuZ3VhZ2VzID0gW1xyXG4gICAge25hbWU6IFwiRW5nbGlzaFwiLCB2YWx1ZTogXCJlblwifSwge25hbWU6IFwiUnVzc2lhblwiLCB2YWx1ZTogXCJydVwifSwge25hbWU6IFwiSXRhbGlhblwiLCB2YWx1ZTogXCJpdFwifSwge1xyXG4gICAgICAgIG5hbWU6IFwiU3BhbmlzaFwiLFxyXG4gICAgICAgIHZhbHVlOiBcInNwXCJcclxuICAgIH0sIHtuYW1lOiBcIlVrcmFpbmlhblwiLCB2YWx1ZTogXCJ1YVwifSwge25hbWU6IFwiR2VybWFuXCIsIHZhbHVlOiBcImRlXCJ9LFxyXG4gICAge25hbWU6IFwiUG9ydHVndWVzZVwiLCB2YWx1ZTogXCJwdFwifSwge25hbWU6IFwiUm9tYW5pYW5cIiwgdmFsdWU6IFwicm9cIn0sIHtuYW1lOiBcIlBvbGlzaFwiLCB2YWx1ZTogXCJwbFwifSwge1xyXG4gICAgICAgIG5hbWU6IFwiRmlubmlzaFwiLFxyXG4gICAgICAgIHZhbHVlOiBcImZpXCJcclxuICAgIH0sIHtuYW1lOiBcIkR1dGNoXCIsIHZhbHVlOiBcIm5sXCJ9LFxyXG4gICAge25hbWU6IFwiRnJlbmNoXCIsIHZhbHVlOiBcImZyXCJ9LCB7bmFtZTogXCJCdWxnYXJpYW5cIiwgdmFsdWU6IFwiYmdcIn0sIHtcclxuICAgICAgICBuYW1lOiBcIlN3ZWRpc2hcIixcclxuICAgICAgICB2YWx1ZTogXCJzZVwiXHJcbiAgICB9LCB7bmFtZTogXCJDaGluZXNlIFRyYWRpdGlvbmFsXCIsIHZhbHVlOiBcInpoX3R3XCJ9LFxyXG4gICAge25hbWU6IFwiQ2hpbmVzZSBTaW1wbGlmaWVkXCIsIHZhbHVlOiBcInpoX2NuXCJ9LCB7bmFtZTogXCJUdXJraXNoXCIsIHZhbHVlOiBcInRyXCJ9LCB7XHJcbiAgICAgICAgbmFtZTogXCJDcm9hdGlhblwiLFxyXG4gICAgICAgIHZhbHVlOiBcImhyXCJcclxuICAgIH0sIHtuYW1lOiBcIkNhdGFsYW5cIiwgdmFsdWU6IFwiY2FcIn1cclxuXTtcclxuXHJcbmV4cG9ydCB7VW5pdE1lYXN1cmV9O1xyXG5cclxuZXhwb3J0IHtMYW5ndWFnZXN9O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9saWIvdW5pdC1tZWFzdXJlLmpzXG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgUnVzYWsgT2xlZyBvbiAwOS4wMi4yMDE2LlxyXG4gKi9cclxuXHJcbmltcG9ydCBjc3MgZnJvbSAnLi8uLi9zdHlsZS5zdHlsJztcclxuaW1wb3J0IGNzc19jaXRpZXMgZnJvbSAnLi9jaXRpZXMuc3R5bCc7XHJcblxyXG5pbXBvcnQgRFNPcGVuV2VhdGhlciBmcm9tICcuLy4uL2xpYi9vcGVuLXdlYXRoZXIuanMnO1xyXG5cclxuY29uc3QgS0VZX0NPREVfRU5URVIgPSAxMztcclxuXHJcbmNsYXNzIENpdGllcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvciAocHJvcHMpe1xyXG4gICAgICAgIHN1cGVyIChwcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5yZWZzLmNpdHkuZm9jdXMoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IGNsYXNzVGFiQ29udGVudCA9IGNzcy50YWJfY29udGFpbmVyICsgKHRoaXMucHJvcHMuc2V0dGluZ3Muc2hvd1RhYiA9PSAnY2l0aWVzJyA/ICcnIDogXCIgXCIgKyBjc3MuaGlkZV90YWIpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YVNvdXJjZSA9IG5ldyBEU09wZW5XZWF0aGVyKHtcclxuICAgICAgICAgICAga2V5OiB0aGlzLnByb3BzLnNldHRpbmdzLkFQSS5vcGVud2VhdGhlcm1hcC5rZXksXHJcbiAgICAgICAgICAgIHVuaXQ6IHRoaXMucHJvcHMuc2V0dGluZ3MudW5pdF9tZWFzdXJlLFxyXG4gICAgICAgICAgICBsYW5nOiB0aGlzLnByb3BzLnNldHRpbmdzLmxhbmdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGhhbmRsZXJDbGljayA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZT09J2tleWRvd24nICYmIGV2ZW50Lm5hdGl2ZUV2ZW50LmtleUNvZGUhPUtFWV9DT0RFX0VOVEVSKXtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGUuc2V0dGluZ3MuQVBJLm9wZW53ZWF0aGVybWFwLmtleSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2UuZ2V0RGF0YU1ldGhvZCAoe1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnd2VhdGhlcicsXHJcbiAgICAgICAgICAgICAgICBwYXJhbToge1xyXG4gICAgICAgICAgICAgICAgICAgIHE6IHRoaXMucmVmcy5jaXR5LnZhbHVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogKGRhdGEsIGRhdGFFcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhPT1udWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFFcnJvci5jb2Q9PTQwNClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi0JPQvtGA0L7QtCDQvdC1INC90LDQudC00LXQvVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGFuZ2VDaXRpZXNMaXN0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0aW1lb3V0OiAxMDAwXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IGhhbmRsZXJSZW1vdmUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNpdHlJZCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5pZDtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldmlvdXNTdGF0ZSwgY3VycmVudFByb3BzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgcHJldmlvdXNTdGF0ZVtjaXR5SWRdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzU3RhdGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBzYXZlQ2l0aWVzID0gdGhpcy5wcm9wcy5jaXRpZXM7XHJcbiAgICAgICAgbGV0IGNpdGllc0xpc3QgPSBPYmplY3Qua2V5cyhzYXZlQ2l0aWVzKS5tYXAoY2l0eUlkID0+IHtcclxuICAgICAgICAgICAgbGV0IGNpdHkgPSBzYXZlQ2l0aWVzW2NpdHlJZF07XHJcbiAgICAgICAgICAgIGxldCBjaXR5RGVzY3JpcHRpb24gPSBgJHtjaXR5Lm5hbWV9ICgke2NpdHkuY291bnRyeX0pYDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtjc3NfY2l0aWVzLmNpdHl9IGlkPXtjaXR5SWR9IGtleT17Y2l0eUlkfT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzX2NpdGllcy5jaXR5X25hbWV9PntjaXR5RGVzY3JpcHRpb259PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjc3NfY2l0aWVzLmJ1dHRvbn0gb25DbGljaz17aGFuZGxlclJlbW92ZX0+PGkgY2xhc3NOYW1lPVwiZmEgZmEtdGltZXNcIj48L2k+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL3RvZG86INC00L7QsdCw0LLQuNGC0Ywg0LLRi9Cy0L7QtCDQv9GA0LXQtNGD0L/RgNC10LbQtNC10L3QuNGPINC10YHQu9C4INC90LUg0LfQsNC/0L7Qu9C90LXQvSDQutC70Y7Rh1xyXG4gICAgICAgIC8vaWYgKCF0aGlzLnN0YXRlLnNldHRpbmdzLkFQSS5vcGVud2VhdGhlcm1hcC5rZXkpXHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc1RhYkNvbnRlbnR9PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+RW50ZXIgdGhlIG5hbWUgb2YgdGhlIGNpdHksIHdoZXJlIHRoZSB3ZWF0aGVyIGlzIGludGVyZXN0ZWQ8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJzZWFyY2hcIiB0eXBlPVwidGV4dFwiIHJlZj1cImNpdHlcIiBvbktleURvd249e2hhbmRsZXJDbGlja30vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Nzc19jaXRpZXMuYnV0dG9ufSBvbkNsaWNrPXtoYW5kbGVyQ2xpY2t9PjxpIGNsYXNzTmFtZT1cImZhIGZhLXNlYXJjaFwiPjwvaT48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlNlbGVjdCBjaXRpZXM8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPXtjc3NfY2l0aWVzLmNpdGllc30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y2l0aWVzTGlzdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn07XHJcblxyXG4vKiwgU2FpbnQgQmFydHMgIGxpZ2h0IGludGVuc2l0eSBzaG93ZXIgcmFpblxyXG4yNC42wrDQoSAgdGVtcGVyYXR1cmUgZnJvbSAyNCB0byAyNcKw0KEsIHdpbmQgNC4xbS9zLiBjbG91ZHMgNzUlLCAxMDE3IGhwYVxyXG5cclxuR2VvIGNvb3JkcyBbIC02Mi44NDk4LCAxNy44OTc4IF0qL1xyXG5cclxuLy90b2RvOiDQtNC+0LHQsNCy0LjRgtGMINC/0L7RgdC40Log0L/QviDRgtC10LrRg9GJ0LXQvNGDINC80LXRgdGC0L7QvdCw0YXQvtC20LTQtdC90LjRjlxyXG5cclxuLy90b2RvOiDQtNC+0LHQsNCy0LjRgtGMINCy0YvQstC+0LQg0YDQtdC30YPQu9GM0YLQsNGC0LAg0L/QvtC40YHQutCwXHJcbmxldCBTZWFyY2hSZXN1bHQgPSAocHJvcHMpID0+IHtcclxuICAgIGxldCBjaXR5ID0gcHJvcHMuY2l0eTtcclxuICAgIGxldCB3ZWF0aGVyID0gY2l0eS53ZWF0aGVyO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzX2NpdGllcy5yZXN1bHR9PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzX2NpdGllcy5yZXN1bHRfY2l0eV9uYW1lfT57YGNpdHkubmFtZSAoY2l0eS5jb3VudHJ5KWB9PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjc3NfY2l0aWVzLnJlc3VsdF93ZWF0aGVyX2Rlc2NyaXB0aW9ufT57d2VhdGhlci5kZXNjcmlwdGlvbn08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzc19jaXRpZXMucmVzdWx0X3dlYXRoZXJfdGVtcGVyYXR1cmV9Pnt3ZWF0aGVyLnRlbXBlcmF0dXJlLmF2cn08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENpdGllcztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvY2l0aWVzL2NpdGllcy5qc3hcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9sb2NhbElkZW50TmFtZT1bbmFtZV1fX1tsb2NhbF1fX19baGFzaDpiYXNlNjQ6NV0hLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bHVzLWxvYWRlci9pbmRleC5qcyEuL2NpdGllcy5zdHlsXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9sb2NhbElkZW50TmFtZT1bbmFtZV1fX1tsb2NhbF1fX19baGFzaDpiYXNlNjQ6NV0hLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bHVzLWxvYWRlci9pbmRleC5qcyEuL2NpdGllcy5zdHlsXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP2xvY2FsSWRlbnROYW1lPVtuYW1lXV9fW2xvY2FsXV9fX1toYXNoOmJhc2U2NDo1XSEuLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsdXMtbG9hZGVyL2luZGV4LmpzIS4vY2l0aWVzLnN0eWxcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvY2l0aWVzL2NpdGllcy5zdHlsXG4gKiogbW9kdWxlIGlkID0gOTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmNpdGllc19fY2l0aWVzX19fMXZwNmwge1xcbiAgcGFkZGluZy1sZWZ0OiAwcHg7XFxuICBtYXJnaW46IDBweCAwcHg7XFxufVxcbi5jaXRpZXNfX2NpdHlfX18ybHQzSCB7XFxuICBtYXJnaW46IDJweCAycHg7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBib3JkZXI6IHNvbGlkIDFweCAjZTVjZThiO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG4uY2l0aWVzX19jaXR5X25hbWVfX18zMVVtciB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgcGFkZGluZzogMnB4IDhweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmYWYzZDk7XFxuICBib3JkZXItcmFkaXVzOiA0cHggMCAwIDRweDtcXG4gIGN1cnNvcjogdGV4dDtcXG59XFxuLmNpdGllc19fYnV0dG9uX19fM3gtWHoge1xcbiAgY29udGVudDogJyc7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgcGFkZGluZzogM3B4IDEwcHg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWRkOWE0O1xcbiAgYm9yZGVyLWxlZnQ6IHNvbGlkIDFweCAjZTVjZThiO1xcbiAgYm9yZGVyLXJhZGl1czogMCA0cHggNHB4IDA7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcImNpdGllc1wiOiBcImNpdGllc19fY2l0aWVzX19fMXZwNmxcIixcblx0XCJjaXR5XCI6IFwiY2l0aWVzX19jaXR5X19fMmx0M0hcIixcblx0XCJjaXR5X25hbWVcIjogXCJjaXRpZXNfX2NpdHlfbmFtZV9fXzMxVW1yXCIsXG5cdFwiYnV0dG9uXCI6IFwiY2l0aWVzX19idXR0b25fX18zeC1YelwiXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXI/bG9jYWxJZGVudE5hbWU9W25hbWVdX19bbG9jYWxdX19fW2hhc2g6YmFzZTY0OjVdIS4vfi9zdHlsdXMtbG9hZGVyIS4vYXBwL2NpdGllcy9jaXRpZXMuc3R5bFxuICoqIG1vZHVsZSBpZCA9IDkxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcclxuICogQ3JlYXRlZCBieSBSdXNhayBPbGVnIG9uIDIyLjAyLjIwMTYuXHJcbiAqL1xyXG5cclxuY2xhc3MgRFNPcGVuV2VhdGhlciB7XHJcbiAgICBzdGF0aWMgZ2V0IG5hbWVBUEkgKCl7XHJcbiAgICAgICAgcmV0dXJuIFwib3BlbndlYXRoZXJtYXBcIjtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IEFQSSAoKXtcclxuICAgICAgICByZXR1cm4gIHtcclxuICAgICAgICAgICAgVVJMOiAnaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvJyxcclxuICAgICAgICAgICAgZm9yZWNhc3Q6IHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2ZvcmVjYXN0L2RhaWx5JyxcclxuXHJcbiAgICAgICAgICAgICAgICBtYXA6IERTT3BlbldlYXRoZXIubWFwRGF0YUZvcmVjYXN0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHdlYXRoZXI6IHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3dlYXRoZXInLFxyXG4gICAgICAgICAgICAgICAgbWFwOiBEU09wZW5XZWF0aGVyLm1hcERhdGFXZWF0aGVyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yIChvcHRpb25zKXtcclxuICAgICAgICB0aGlzLmtleSA9IG9wdGlvbnMua2V5O1xyXG4gICAgICAgIHRoaXMudW5pdCA9IG9wdGlvbnMudW5pdDtcclxuICAgICAgICB0aGlzLmxhbmcgPSBvcHRpb25zLmxhbmc7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREYXRhTWV0aG9kIChvcHRpb25zKXtcclxuICAgICAgICBsZXQge21ldGhvZCwgaGFuZGxlciwgdGltZW91dCwgcGFyYW19ID0gb3B0aW9ucztcclxuICAgICAgICBsZXQgY3R4ID0gICB0aGlzO1xyXG4gICAgICAgIGxldCBtYXAgPSBEU09wZW5XZWF0aGVyLkFQSVttZXRob2RdLm1hcDtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBmZXRjaCAodGhpcy5nZXRSZXF1ZXN0QVBJTWV0aG9kKG1ldGhvZCwgcGFyYW0pKVxyXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5jb2Q9PTIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIobWFwKGRhdGEpKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIobnVsbCwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7Y29uc29sZS5lcnJvcihlcnIpfSksIHRpbWVvdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlcXVlc3RBUElNZXRob2QgKG1ldGhvZEFQSSwgcGFyYW1ldHIpe1xyXG4gICAgICAgIGxldCBkYXRhID0gW107XHJcbiAgICAgICAgbGV0IHdlYXRoZXJEYXRhQVBJID0gRFNPcGVuV2VhdGhlci5BUEk7XHJcbiAgICAgICAgbGV0IG1ldGhvZCA9IHdlYXRoZXJEYXRhQVBJW21ldGhvZEFQSV0ubWV0aG9kO1xyXG5cclxuICAgICAgICBpZiAoIW1ldGhvZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0IG1ldGhvZCBbJHttZXRob2RBUEl9XWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGFyYW1ldHIgPSBwYXJhbWV0ciA/IHBhcmFtZXRyIDoge307XHJcblxyXG4gICAgICAgIHBhcmFtZXRyID0gT2JqZWN0LmtleXMocGFyYW1ldHIpLm1hcCgoaywgaW5kZXgsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBbaywgcGFyYW1ldHJba11dO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgcGFyYW0gPSBuZXcgTWFwKFtcclxuICAgICAgICAgICAgWydBUFBJRCcsIHRoaXMua2V5XSxcclxuICAgICAgICAgICAgWydsYW5nJywgdGhpcy5sYW5nXSxcclxuICAgICAgICAgICAgWyd1bml0cycsIHRoaXMudW5pdF1cclxuICAgICAgICBdLmNvbmNhdChwYXJhbWV0cikpO1xyXG5cclxuICAgICAgICBwYXJhbS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEucHVzaChrZXkgKyAnPScrIHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHdlYXRoZXJEYXRhQVBJLlVSTCArIG1ldGhvZCArICc/JyArICBkYXRhLmpvaW4oJyYnKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgbWFwRGF0YVdlYXRoZXIgKGRhdGEpe1xyXG4gICAgICAgIGxldCBtb2RlbCA9IHt9O1xyXG4gICAgICAgIG1vZGVsLmlkID0gZGF0YS5pZDtcclxuICAgICAgICBtb2RlbC5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgICAgIG1vZGVsLmNvdW50cnkgPSBkYXRhLnN5cy5jb3VudHJ5O1xyXG4gICAgICAgIG1vZGVsLmxvYyA9IHtcclxuICAgICAgICAgICAgbG9uOiBkYXRhLmNvb3JkLmxvbixcclxuICAgICAgICAgICAgbGF0OiBkYXRhLmNvb3JkLmxhdFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBkYXRhV2VhdGhlciA9IGRhdGEud2VhdGhlclswXTtcclxuICAgICAgICBtb2RlbC53ZWF0aGVyID0ge307XHJcblxyXG4gICAgICAgIGxldCBkYXRlID0gZ2V0RGF0ZVdpdGhvdXRUaW1lKHBhcnNlSW50KGRhdGEuZHQpKjEwMDApO1xyXG5cclxuICAgICAgICAvL3RvZG86IGRhdGUuZ2V0VGltZSgpIGNoYW5nZSBvbiArZGF0ZVxyXG4gICAgICAgIG1vZGVsLndlYXRoZXJbZGF0ZS5nZXRUaW1lKCldID0ge1xyXG4gICAgICAgICAgICBkYXRlOiBkYXRlLFxyXG4gICAgICAgICAgICBtb2RlX2lkOiBkYXRhV2VhdGhlci5pZCxcclxuICAgICAgICAgICAgbmFtZTogZGF0YVdlYXRoZXIubWFpbixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGRhdGFXZWF0aGVyLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICBpY29uOiBkYXRhV2VhdGhlci5pY29uLFxyXG4gICAgICAgICAgICB0ZW1wZXJhdHVyZToge1xyXG4gICAgICAgICAgICAgICAgYXZyOiBkYXRhLm1haW4udGVtcCxcclxuICAgICAgICAgICAgICAgIG1pbjogZGF0YS5tYWluLnRlbXBfbWluLFxyXG4gICAgICAgICAgICAgICAgbWF4OiBkYXRhLm1haW4udGVtcF9tYXhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHJlc3N1cmU6IHtcclxuICAgICAgICAgICAgICAgIGF2cjogZGF0YS5tYWluLnByZXNzdXJlLFxyXG4gICAgICAgICAgICAgICAgc2VhX2xldmVsOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgZ3JvdW5kX2xldmVsOiBudWxsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGh1bWlkaXR5OiBkYXRhLm1haW4uaHVtaWRpdHksXHJcbiAgICAgICAgICAgIHByZWNpcGl0YXRpb246IERTT3BlbldlYXRoZXIuZ2V0UHJlY2lwaXRhdGlvbiAoZGF0YSksXHJcbiAgICAgICAgICAgIGNsb3VkczogRFNPcGVuV2VhdGhlci5nZXRDbG91ZCAoZGF0YVsnY2xvdWRzJ10pLFxyXG4gICAgICAgICAgICB3aW5kOiB7XHJcbiAgICAgICAgICAgICAgICBzcGVlZDogZGF0YS53aW5kLnNwZWVkLFxyXG4gICAgICAgICAgICAgICAgZGVnOiBkYXRhLndpbmQuZGVnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1bjoge1xyXG4gICAgICAgICAgICAgICAgcmlzZTogbmV3IERhdGUocGFyc2VJbnQoZGF0YS5zeXMuc3VucmlzZSkqMTAwMCksXHJcbiAgICAgICAgICAgICAgICBzZXQ6IG5ldyBEYXRlKHBhcnNlSW50KGRhdGEuc3lzLnN1bnNldCkqMTAwMClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBtb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0UHJlY2lwaXRhdGlvbiAoZGF0YSl7XHJcbiAgICAgICAgbGV0IG1vZGVsRGF0YSA9IHt9O1xyXG4gICAgICAgIGZvciAobGV0IHAgaW4gZGF0YSl7XHJcbiAgICAgICAgICAgIGlmIChwID09ICdzbm93JyB8fCBwID09ICdyYWluJyB8fCBwID09ICdubycpe1xyXG4gICAgICAgICAgICAgICAgbW9kZWxEYXRhLm1vZGUgPSBwO1xyXG4gICAgICAgICAgICAgICAgbW9kZWxEYXRhLnZhbHVlID0gZGF0YVtwXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1vZGVsRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0Q2xvdWQgKGNsb3VkRGF0YSl7XHJcbiAgICAgICAgbGV0IG1vZGVsRGF0YSA9IHt9O1xyXG4gICAgICAgIGZvciAobGV0IGsgaW4gY2xvdWREYXRhKXtcclxuICAgICAgICAgICAgbW9kZWxEYXRhLm1vZGUgPSBrO1xyXG4gICAgICAgICAgICBtb2RlbERhdGEudmFsdWUgPSBjbG91ZERhdGFba107XHJcblxyXG4gICAgICAgICAgICAvL9GB0YfQuNGC0LDQtdC8INGH0YLQviDQsdC+0LvRjNGI0LUg0L7QtNC90L7Qs9C+INC30L3QsNGH0LXQvdC40Y8g0L7QsdC70LDRh9C90L7RgdGC0Lgg0L/RgNC40LnRgtC4INC90LUg0LzQvtC20LXRglxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtb2RlbERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIG1hcERhdGFGb3JlY2FzdCAoZGF0YSl7XHJcbiAgICAgICAgbGV0IG1vZGVsID0ge307XHJcblxyXG4gICAgICAgIG1vZGVsLmlkID0gZGF0YS5jaXR5LmlkO1xyXG4gICAgICAgIG1vZGVsLm5hbWUgPSBkYXRhLmNpdHkubmFtZTtcclxuICAgICAgICBtb2RlbC5jb3VudHJ5ID0gZGF0YS5jaXR5LmNvdW50cnk7XHJcbiAgICAgICAgbW9kZWwubG9jID0ge1xyXG4gICAgICAgICAgICBsb246IGRhdGEuY2l0eS5jb29yZC5sb24sXHJcbiAgICAgICAgICAgIGxhdDogZGF0YS5jaXR5LmNvb3JkLmxhdFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG1vZGVsLndlYXRoZXIgPSB7fTtcclxuXHJcbiAgICAgICAgbGV0IHRvZGF5ID0gZ2V0RGF0ZVdpdGhvdXRUaW1lKG5ldyBEYXRlKCkpO1xyXG4gICAgICAgIGxldCBtaWxsc1RvZGF5ID0gdG9kYXkuZ2V0VGltZSgpXHJcblxyXG4gICAgICAgIGZvciAobGV0IGRhdGFEYXlXZWF0aGVyIG9mIGRhdGEubGlzdCl7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF0YVdlYXRoZXIgPSBkYXRhRGF5V2VhdGhlci53ZWF0aGVyWzBdO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGUgPSBnZXREYXRlV2l0aG91dFRpbWUgKHBhcnNlSW50KGRhdGFEYXlXZWF0aGVyLmR0KSoxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIC8v0YHQtdCz0L7QtNC90Y/RiNC90LjQuSDQtNC10L3RjCDQv9C+0LvRg9GH0LDQtdC8INGH0LXRgNC10Lcg0LfQsNC/0YDQvtGBINC6IHdlYXRoZXIuINC+0L0g0LHQvtC70LXQtSDQv9C+0LTRgNC+0LHQvdGL0LlcclxuICAgICAgICAgICAgaWYgKGRhdGUuZ2V0VGltZSgpID09IG1pbGxzVG9kYXkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgbW9kZWwud2VhdGhlcltkYXRlLmdldFRpbWUoKV0gPSB7XHJcbiAgICAgICAgICAgICAgICBtb2RlX2lkOiBkYXRhV2VhdGhlci5pZCxcclxuICAgICAgICAgICAgICAgIGRhdGU6IGRhdGUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBkYXRhV2VhdGhlci5tYWluLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGRhdGFXZWF0aGVyLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogZGF0YVdlYXRoZXIuaWNvbixcclxuICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZyOiBkYXRhRGF5V2VhdGhlci50ZW1wLmRheSxcclxuICAgICAgICAgICAgICAgICAgICBtaW46IGRhdGFEYXlXZWF0aGVyLnRlbXAubWluLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heDogZGF0YURheVdlYXRoZXIudGVtcC5tYXhcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwcmVzc3VyZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGF2cjogZGF0YURheVdlYXRoZXIucHJlc3N1cmUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhX2xldmVsOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VuZF9sZXZlbDogbnVsbFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGh1bWlkaXR5OiBkYXRhRGF5V2VhdGhlci5odW1pZGl0eSxcclxuICAgICAgICAgICAgICAgIHByZWNpcGl0YXRpb246IERTT3BlbldlYXRoZXIuZ2V0UHJlY2lwaXRhdGlvbiAoZGF0YURheVdlYXRoZXIpLFxyXG4gICAgICAgICAgICAgICAgY2xvdWRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGFEYXlXZWF0aGVyLmNsb3Vkc1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHdpbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogZGF0YURheVdlYXRoZXIuc3BlZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVnOiBkYXRhRGF5V2VhdGhlci5kZWdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdW46IHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbW9kZWw7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBnZXREYXRlV2l0aG91dFRpbWVcclxuICogQHBhcmFtIHN0cmluZ3xEYXRlINC/0YDQtdC00YHRgtCw0LLQu9C10L3QuNC1INC00LDRgtGLXHJcbiAqIEByZXR1cm4gRGF0ZSDQtNCw0YLQsCDRgSDQvdGD0LvQtdCy0YvQvCDQstGA0LXQvNC10L3QtdC8XHJcbiAqICovXHJcbmZ1bmN0aW9uIGdldERhdGVXaXRob3V0VGltZSAoZCl7XHJcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGQpO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERTT3BlbldlYXRoZXI7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2xpYi9vcGVuLXdlYXRoZXIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vbWFwXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL21hcC5qc1xuICoqIG1vZHVsZSBpZCA9IDkzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYubWFwJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5tYXAudG8tanNvbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzLyQuY29yZScpLk1hcDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL21hcC5qc1xuICoqIG1vZHVsZSBpZCA9IDk0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24tc3Ryb25nJyk7XG5cbi8vIDIzLjEgTWFwIE9iamVjdHNcbnJlcXVpcmUoJy4vJC5jb2xsZWN0aW9uJykoJ01hcCcsIGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBNYXAoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7IH07XG59LCB7XG4gIC8vIDIzLjEuMy42IE1hcC5wcm90b3R5cGUuZ2V0KGtleSlcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoa2V5KXtcbiAgICB2YXIgZW50cnkgPSBzdHJvbmcuZ2V0RW50cnkodGhpcywga2V5KTtcbiAgICByZXR1cm4gZW50cnkgJiYgZW50cnkudjtcbiAgfSxcbiAgLy8gMjMuMS4zLjkgTWFwLnByb3RvdHlwZS5zZXQoa2V5LCB2YWx1ZSlcbiAgc2V0OiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSl7XG4gICAgcmV0dXJuIHN0cm9uZy5kZWYodGhpcywga2V5ID09PSAwID8gMCA6IGtleSwgdmFsdWUpO1xuICB9XG59LCBzdHJvbmcsIHRydWUpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYubWFwLmpzXG4gKiogbW9kdWxlIGlkID0gOTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGhpZGUgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oaWRlJylcbiAgLCByZWRlZmluZUFsbCAgPSByZXF1aXJlKCcuLyQucmVkZWZpbmUtYWxsJylcbiAgLCBjdHggICAgICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBzdHJpY3ROZXcgICAgPSByZXF1aXJlKCcuLyQuc3RyaWN0LW5ldycpXG4gICwgZGVmaW5lZCAgICAgID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKVxuICAsIGZvck9mICAgICAgICA9IHJlcXVpcmUoJy4vJC5mb3Itb2YnKVxuICAsICRpdGVyRGVmaW5lICA9IHJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpXG4gICwgc3RlcCAgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItc3RlcCcpXG4gICwgSUQgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLnVpZCcpKCdpZCcpXG4gICwgJGhhcyAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgaXNPYmplY3QgICAgID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgc2V0U3BlY2llcyAgID0gcmVxdWlyZSgnLi8kLnNldC1zcGVjaWVzJylcbiAgLCBERVNDUklQVE9SUyAgPSByZXF1aXJlKCcuLyQuZGVzY3JpcHRvcnMnKVxuICAsIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgaXNPYmplY3RcbiAgLCBTSVpFICAgICAgICAgPSBERVNDUklQVE9SUyA/ICdfcycgOiAnc2l6ZSdcbiAgLCBpZCAgICAgICAgICAgPSAwO1xuXG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYoISRoYXMoaXQsIElEKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IGlkIHRvIGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIGlkXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG9iamVjdCBpZFxuICAgIGhpZGUoaXQsIElELCArK2lkKTtcbiAgLy8gcmV0dXJuIG9iamVjdCBpZCB3aXRoIHByZWZpeFxuICB9IHJldHVybiAnTycgKyBpdFtJRF07XG59O1xuXG52YXIgZ2V0RW50cnkgPSBmdW5jdGlvbih0aGF0LCBrZXkpe1xuICAvLyBmYXN0IGNhc2VcbiAgdmFyIGluZGV4ID0gZmFzdEtleShrZXkpLCBlbnRyeTtcbiAgaWYoaW5kZXggIT09ICdGJylyZXR1cm4gdGhhdC5faVtpbmRleF07XG4gIC8vIGZyb3plbiBvYmplY3QgY2FzZVxuICBmb3IoZW50cnkgPSB0aGF0Ll9mOyBlbnRyeTsgZW50cnkgPSBlbnRyeS5uKXtcbiAgICBpZihlbnRyeS5rID09IGtleSlyZXR1cm4gZW50cnk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDb25zdHJ1Y3RvcjogZnVuY3Rpb24od3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUil7XG4gICAgdmFyIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRoYXQsIGl0ZXJhYmxlKXtcbiAgICAgIHN0cmljdE5ldyh0aGF0LCBDLCBOQU1FKTtcbiAgICAgIHRoYXQuX2kgPSAkLmNyZWF0ZShudWxsKTsgLy8gaW5kZXhcbiAgICAgIHRoYXQuX2YgPSB1bmRlZmluZWQ7ICAgICAgLy8gZmlyc3QgZW50cnlcbiAgICAgIHRoYXQuX2wgPSB1bmRlZmluZWQ7ICAgICAgLy8gbGFzdCBlbnRyeVxuICAgICAgdGhhdFtTSVpFXSA9IDA7ICAgICAgICAgICAvLyBzaXplXG4gICAgICBpZihpdGVyYWJsZSAhPSB1bmRlZmluZWQpZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGhhdFtBRERFUl0sIHRoYXQpO1xuICAgIH0pO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyAyMy4xLjMuMSBNYXAucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIC8vIDIzLjIuMy4yIFNldC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCl7XG4gICAgICAgIGZvcih2YXIgdGhhdCA9IHRoaXMsIGRhdGEgPSB0aGF0Ll9pLCBlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pe1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKGVudHJ5LnApZW50cnkucCA9IGVudHJ5LnAubiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZWxldGUgZGF0YVtlbnRyeS5pXTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Ll9mID0gdGhhdC5fbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhhdFtTSVpFXSA9IDA7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjMgTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuICAgICAgLy8gMjMuMi4zLjQgU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgdmFyIHRoYXQgID0gdGhpc1xuICAgICAgICAgICwgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xuICAgICAgICBpZihlbnRyeSl7XG4gICAgICAgICAgdmFyIG5leHQgPSBlbnRyeS5uXG4gICAgICAgICAgICAsIHByZXYgPSBlbnRyeS5wO1xuICAgICAgICAgIGRlbGV0ZSB0aGF0Ll9pW2VudHJ5LmldO1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKHByZXYpcHJldi5uID0gbmV4dDtcbiAgICAgICAgICBpZihuZXh0KW5leHQucCA9IHByZXY7XG4gICAgICAgICAgaWYodGhhdC5fZiA9PSBlbnRyeSl0aGF0Ll9mID0gbmV4dDtcbiAgICAgICAgICBpZih0aGF0Ll9sID09IGVudHJ5KXRoYXQuX2wgPSBwcmV2O1xuICAgICAgICAgIHRoYXRbU0laRV0tLTtcbiAgICAgICAgfSByZXR1cm4gISFlbnRyeTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4yLjMuNiBTZXQucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIC8vIDIzLjEuMy41IE1hcC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICAgICAgdmFyIGYgPSBjdHgoY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQsIDMpXG4gICAgICAgICAgLCBlbnRyeTtcbiAgICAgICAgd2hpbGUoZW50cnkgPSBlbnRyeSA/IGVudHJ5Lm4gOiB0aGlzLl9mKXtcbiAgICAgICAgICBmKGVudHJ5LnYsIGVudHJ5LmssIHRoaXMpO1xuICAgICAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxuICAgICAgICAgIHdoaWxlKGVudHJ5ICYmIGVudHJ5LnIpZW50cnkgPSBlbnRyeS5wO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjcgTWFwLnByb3RvdHlwZS5oYXMoa2V5KVxuICAgICAgLy8gMjMuMi4zLjcgU2V0LnByb3RvdHlwZS5oYXModmFsdWUpXG4gICAgICBoYXM6IGZ1bmN0aW9uIGhhcyhrZXkpe1xuICAgICAgICByZXR1cm4gISFnZXRFbnRyeSh0aGlzLCBrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmKERFU0NSSVBUT1JTKSQuc2V0RGVzYyhDLnByb3RvdHlwZSwgJ3NpemUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBkZWZpbmVkKHRoaXNbU0laRV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBkZWY6IGZ1bmN0aW9uKHRoYXQsIGtleSwgdmFsdWUpe1xuICAgIHZhciBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSlcbiAgICAgICwgcHJldiwgaW5kZXg7XG4gICAgLy8gY2hhbmdlIGV4aXN0aW5nIGVudHJ5XG4gICAgaWYoZW50cnkpe1xuICAgICAgZW50cnkudiA9IHZhbHVlO1xuICAgIC8vIGNyZWF0ZSBuZXcgZW50cnlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5fbCA9IGVudHJ5ID0ge1xuICAgICAgICBpOiBpbmRleCA9IGZhc3RLZXkoa2V5LCB0cnVlKSwgLy8gPC0gaW5kZXhcbiAgICAgICAgazoga2V5LCAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGtleVxuICAgICAgICB2OiB2YWx1ZSwgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gdmFsdWVcbiAgICAgICAgcDogcHJldiA9IHRoYXQuX2wsICAgICAgICAgICAgIC8vIDwtIHByZXZpb3VzIGVudHJ5XG4gICAgICAgIG46IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAvLyA8LSBuZXh0IGVudHJ5XG4gICAgICAgIHI6IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSByZW1vdmVkXG4gICAgICB9O1xuICAgICAgaWYoIXRoYXQuX2YpdGhhdC5fZiA9IGVudHJ5O1xuICAgICAgaWYocHJldilwcmV2Lm4gPSBlbnRyeTtcbiAgICAgIHRoYXRbU0laRV0rKztcbiAgICAgIC8vIGFkZCB0byBpbmRleFxuICAgICAgaWYoaW5kZXggIT09ICdGJyl0aGF0Ll9pW2luZGV4XSA9IGVudHJ5O1xuICAgIH0gcmV0dXJuIHRoYXQ7XG4gIH0sXG4gIGdldEVudHJ5OiBnZXRFbnRyeSxcbiAgc2V0U3Ryb25nOiBmdW5jdGlvbihDLCBOQU1FLCBJU19NQVApe1xuICAgIC8vIGFkZCAua2V5cywgLnZhbHVlcywgLmVudHJpZXMsIFtAQGl0ZXJhdG9yXVxuICAgIC8vIDIzLjEuMy40LCAyMy4xLjMuOCwgMjMuMS4zLjExLCAyMy4xLjMuMTIsIDIzLjIuMy41LCAyMy4yLjMuOCwgMjMuMi4zLjEwLCAyMy4yLjMuMTFcbiAgICAkaXRlckRlZmluZShDLCBOQU1FLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gICAgICB0aGlzLl90ID0gaXRlcmF0ZWQ7ICAvLyB0YXJnZXRcbiAgICAgIHRoaXMuX2sgPSBraW5kOyAgICAgIC8vIGtpbmRcbiAgICAgIHRoaXMuX2wgPSB1bmRlZmluZWQ7IC8vIHByZXZpb3VzXG4gICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgIHZhciB0aGF0ICA9IHRoaXNcbiAgICAgICAgLCBraW5kICA9IHRoYXQuX2tcbiAgICAgICAgLCBlbnRyeSA9IHRoYXQuX2w7XG4gICAgICAvLyByZXZlcnQgdG8gdGhlIGxhc3QgZXhpc3RpbmcgZW50cnlcbiAgICAgIHdoaWxlKGVudHJ5ICYmIGVudHJ5LnIpZW50cnkgPSBlbnRyeS5wO1xuICAgICAgLy8gZ2V0IG5leHQgZW50cnlcbiAgICAgIGlmKCF0aGF0Ll90IHx8ICEodGhhdC5fbCA9IGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhhdC5fdC5fZikpe1xuICAgICAgICAvLyBvciBmaW5pc2ggdGhlIGl0ZXJhdGlvblxuICAgICAgICB0aGF0Ll90ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gc3RlcCgxKTtcbiAgICAgIH1cbiAgICAgIC8vIHJldHVybiBzdGVwIGJ5IGtpbmRcbiAgICAgIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgZW50cnkuayk7XG4gICAgICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIGVudHJ5LnYpO1xuICAgICAgcmV0dXJuIHN0ZXAoMCwgW2VudHJ5LmssIGVudHJ5LnZdKTtcbiAgICB9LCBJU19NQVAgPyAnZW50cmllcycgOiAndmFsdWVzJyAsICFJU19NQVAsIHRydWUpO1xuXG4gICAgLy8gYWRkIFtAQHNwZWNpZXNdLCAyMy4xLjIuMiwgMjMuMi4yLjJcbiAgICBzZXRTcGVjaWVzKE5BTUUpO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNvbGxlY3Rpb24tc3Ryb25nLmpzXG4gKiogbW9kdWxlIGlkID0gOTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vJC5yZWRlZmluZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0YXJnZXQsIHNyYyl7XG4gIGZvcih2YXIga2V5IGluIHNyYylyZWRlZmluZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5yZWRlZmluZS1hbGwuanNcbiAqKiBtb2R1bGUgaWQgPSA5N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgQ29uc3RydWN0b3IsIG5hbWUpe1xuICBpZighKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKXRocm93IFR5cGVFcnJvcihuYW1lICsgXCI6IHVzZSB0aGUgJ25ldycgb3BlcmF0b3IhXCIpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnN0cmljdC1uZXcuanNcbiAqKiBtb2R1bGUgaWQgPSA5OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgY2FsbCAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vJC5pcy1hcnJheS1pdGVyJylcbiAgLCBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi8kLnRvLWxlbmd0aCcpXG4gICwgZ2V0SXRlckZuICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQpe1xuICB2YXIgaXRlckZuID0gZ2V0SXRlckZuKGl0ZXJhYmxlKVxuICAgICwgZiAgICAgID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yO1xuICBpZih0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZihpc0FycmF5SXRlcihpdGVyRm4pKWZvcihsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICB9IGVsc2UgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7ICl7XG4gICAgY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZm9yLW9mLmpzXG4gKiogbW9kdWxlIGlkID0gOTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaChlKXtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmKHJldCAhPT0gdW5kZWZpbmVkKWFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWNhbGwuanNcbiAqKiBtb2R1bGUgaWQgPSAxMDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pcy1hcnJheS1pdGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMTAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLyQudG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8tbGVuZ3RoLmpzXG4gKiogbW9kdWxlIGlkID0gMTAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgY29yZSAgICAgICAgPSByZXF1aXJlKCcuLyQuY29yZScpXG4gICwgJCAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi8kLmRlc2NyaXB0b3JzJylcbiAgLCBTUEVDSUVTICAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSl7XG4gIHZhciBDID0gY29yZVtLRVldO1xuICBpZihERVNDUklQVE9SUyAmJiBDICYmICFDW1NQRUNJRVNdKSQuc2V0RGVzYyhDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNldC1zcGVjaWVzLmpzXG4gKiogbW9kdWxlIGlkID0gMTAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCBmYWlscyAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5mYWlscycpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGlkZScpXG4gICwgcmVkZWZpbmVBbGwgICAgPSByZXF1aXJlKCcuLyQucmVkZWZpbmUtYWxsJylcbiAgLCBmb3JPZiAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5mb3Itb2YnKVxuICAsIHN0cmljdE5ldyAgICAgID0gcmVxdWlyZSgnLi8kLnN0cmljdC1uZXcnKVxuICAsIGlzT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLyQuc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi8kLmRlc2NyaXB0b3JzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSwgd3JhcHBlciwgbWV0aG9kcywgY29tbW9uLCBJU19NQVAsIElTX1dFQUspe1xuICB2YXIgQmFzZSAgPSBnbG9iYWxbTkFNRV1cbiAgICAsIEMgICAgID0gQmFzZVxuICAgICwgQURERVIgPSBJU19NQVAgPyAnc2V0JyA6ICdhZGQnXG4gICAgLCBwcm90byA9IEMgJiYgQy5wcm90b3R5cGVcbiAgICAsIE8gICAgID0ge307XG4gIGlmKCFERVNDUklQVE9SUyB8fCB0eXBlb2YgQyAhPSAnZnVuY3Rpb24nIHx8ICEoSVNfV0VBSyB8fCBwcm90by5mb3JFYWNoICYmICFmYWlscyhmdW5jdGlvbigpe1xuICAgIG5ldyBDKCkuZW50cmllcygpLm5leHQoKTtcbiAgfSkpKXtcbiAgICAvLyBjcmVhdGUgY29sbGVjdGlvbiBjb25zdHJ1Y3RvclxuICAgIEMgPSBjb21tb24uZ2V0Q29uc3RydWN0b3Iod3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUik7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIG1ldGhvZHMpO1xuICB9IGVsc2Uge1xuICAgIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRhcmdldCwgaXRlcmFibGUpe1xuICAgICAgc3RyaWN0TmV3KHRhcmdldCwgQywgTkFNRSk7XG4gICAgICB0YXJnZXQuX2MgPSBuZXcgQmFzZTtcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0YXJnZXRbQURERVJdLCB0YXJnZXQpO1xuICAgIH0pO1xuICAgICQuZWFjaC5jYWxsKCdhZGQsY2xlYXIsZGVsZXRlLGZvckVhY2gsZ2V0LGhhcyxzZXQsa2V5cyx2YWx1ZXMsZW50cmllcycuc3BsaXQoJywnKSxmdW5jdGlvbihLRVkpe1xuICAgICAgdmFyIElTX0FEREVSID0gS0VZID09ICdhZGQnIHx8IEtFWSA9PSAnc2V0JztcbiAgICAgIGlmKEtFWSBpbiBwcm90byAmJiAhKElTX1dFQUsgJiYgS0VZID09ICdjbGVhcicpKWhpZGUoQy5wcm90b3R5cGUsIEtFWSwgZnVuY3Rpb24oYSwgYil7XG4gICAgICAgIGlmKCFJU19BRERFUiAmJiBJU19XRUFLICYmICFpc09iamVjdChhKSlyZXR1cm4gS0VZID09ICdnZXQnID8gdW5kZWZpbmVkIDogZmFsc2U7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9jW0tFWV0oYSA9PT0gMCA/IDAgOiBhLCBiKTtcbiAgICAgICAgcmV0dXJuIElTX0FEREVSID8gdGhpcyA6IHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmKCdzaXplJyBpbiBwcm90bykkLnNldERlc2MoQy5wcm90b3R5cGUsICdzaXplJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5fYy5zaXplO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0VG9TdHJpbmdUYWcoQywgTkFNRSk7XG5cbiAgT1tOQU1FXSA9IEM7XG4gICRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GLCBPKTtcblxuICBpZighSVNfV0VBSyljb21tb24uc2V0U3Ryb25nKEMsIE5BTUUsIElTX01BUCk7XG5cbiAgcmV0dXJuIEM7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNvbGxlY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAxMDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAsICdNYXAnLCB7dG9KU09OOiByZXF1aXJlKCcuLyQuY29sbGVjdGlvbi10by1qc29uJykoJ01hcCcpfSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5tYXAudG8tanNvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDEwNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxudmFyIGZvck9mICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcbiAgLCBjbGFzc29mID0gcmVxdWlyZSgnLi8kLmNsYXNzb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSl7XG4gIHJldHVybiBmdW5jdGlvbiB0b0pTT04oKXtcbiAgICBpZihjbGFzc29mKHRoaXMpICE9IE5BTUUpdGhyb3cgVHlwZUVycm9yKE5BTUUgKyBcIiN0b0pTT04gaXNuJ3QgZ2VuZXJpY1wiKTtcbiAgICB2YXIgYXJyID0gW107XG4gICAgZm9yT2YodGhpcywgZmFsc2UsIGFyci5wdXNoLCBhcnIpO1xuICAgIHJldHVybiBhcnI7XG4gIH07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNvbGxlY3Rpb24tdG8tanNvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDEwNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgUnVzYWsgT2xlZyBvbiAyOC4wMi4yMDE2LlxyXG4gKi9cclxuaW1wb3J0IHdpbmRyb3NlIGZyb20gJ3dpbmRyb3NlJztcclxuXHJcbmNvbnN0IERFR1JFRV9DSEFSX0NPREUgPSAxNzY7XHJcbmNvbnN0IERFR1JFRV9DSEFSID0gU3RyaW5nLmZyb21DaGFyQ29kZShERUdSRUVfQ0hBUl9DT0RFKTtcclxuXHJcbmNsYXNzIERlY29yYXRlV2VhdGhlckRhdGEge1xyXG4gICAgc3RhdGljIGdldERlY29yYXRlRGF0YSAoZGF0YSwgdW5pdHMpe1xyXG4gICAgICAgIGRhdGEubG9jLmxvbiA9IGRhdGEubG9jLmxvbiArIERFR1JFRV9DSEFSO1xyXG4gICAgICAgIGRhdGEubG9jLmxhdCA9IGRhdGEubG9jLmxhdCArIERFR1JFRV9DSEFSO1xyXG5cclxuICAgICAgICBsZXQgZGF0ZVdlYXRoZXIgPSBPYmplY3Qua2V5cyhkYXRhLndlYXRoZXIpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrZXkgb2YgZGF0ZVdlYXRoZXIpIHtcclxuICAgICAgICAgICAgbGV0IHdlYXRoZXIgPSBkYXRhLndlYXRoZXJba2V5XTtcclxuXHJcbiAgICAgICAgICAgIHdlYXRoZXIuZGF0ZSA9IERlY29yYXRlV2VhdGhlckRhdGEuZ2V0Rm9ybWF0dGVkRGF0ZSh3ZWF0aGVyLmRhdGUsIHtcclxuICAgICAgICAgICAgICAgIGRheTogXCIyLWRpZ2l0XCIsXHJcbiAgICAgICAgICAgICAgICBtb250aDogXCJzaG9ydFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgd2VhdGhlci50ZW1wZXJhdHVyZS5hdnIgPSBEZWNvcmF0ZVdlYXRoZXJEYXRhLmdldEZvcm1hdHRlZFRlbXBlcmF0dXJlKHdlYXRoZXIudGVtcGVyYXR1cmUuYXZyLCB1bml0cyk7XHJcbiAgICAgICAgICAgIHdlYXRoZXIudGVtcGVyYXR1cmUubWluID0gRGVjb3JhdGVXZWF0aGVyRGF0YS5nZXRGb3JtYXR0ZWRUZW1wZXJhdHVyZSh3ZWF0aGVyLnRlbXBlcmF0dXJlLm1pbik7XHJcbiAgICAgICAgICAgIHdlYXRoZXIudGVtcGVyYXR1cmUubWF4ID0gRGVjb3JhdGVXZWF0aGVyRGF0YS5nZXRGb3JtYXR0ZWRUZW1wZXJhdHVyZSh3ZWF0aGVyLnRlbXBlcmF0dXJlLm1heCk7XHJcblxyXG4gICAgICAgICAgICB3ZWF0aGVyLnByZXNzdXJlLmF2ciA9IE1hdGgucm91bmQocGFyc2VGbG9hdCh3ZWF0aGVyLnByZXNzdXJlLmF2cikpICsgdW5pdHMucHJlc3N1cmU7XHJcblxyXG4gICAgICAgICAgICB3ZWF0aGVyLmh1bWlkaXR5ID0gd2VhdGhlci5odW1pZGl0eSArICclJztcclxuXHJcbiAgICAgICAgICAgIGxldCBwcmVjaXBpdGF0aW9uID0gd2VhdGhlci5wcmVjaXBpdGF0aW9uLm1vZGU7XHJcbiAgICAgICAgICAgIHdlYXRoZXIucHJlY2lwaXRhdGlvbi5tb2RlID0gcHJlY2lwaXRhdGlvbiA/IHdlYXRoZXIucHJlY2lwaXRhdGlvbi5tb2RlIDogJyc7XHJcbiAgICAgICAgICAgIHdlYXRoZXIucHJlY2lwaXRhdGlvbi52YWx1ZSA9IHByZWNpcGl0YXRpb24gPyB3ZWF0aGVyLnByZWNpcGl0YXRpb24udmFsdWUgKyB1bml0cy5wcmVjaXBpdGF0aW9uOiAnJztcclxuXHJcbiAgICAgICAgICAgIHdlYXRoZXIuY2xvdWRzLnZhbHVlID0gd2VhdGhlci5jbG91ZHMudmFsdWUgKyAnJSc7XHJcblxyXG4gICAgICAgICAgICB3ZWF0aGVyLndpbmQuc3BlZWQgPSBNYXRoLnJvdW5kKHBhcnNlRmxvYXQod2VhdGhlci53aW5kLnNwZWVkKSkgKyB1bml0cy53aW5kO1xyXG4gICAgICAgICAgICBpZiAod2VhdGhlci53aW5kLmRlZykge1xyXG4gICAgICAgICAgICAgICAgd2VhdGhlci53aW5kLmRpcmVjdGlvbiA9IHdpbmRyb3NlLmdldFBvaW50KHBhcnNlRmxvYXQod2VhdGhlci53aW5kLmRlZyksIHtkZXB0aDogMH0pLnN5bWJvbDtcclxuICAgICAgICAgICAgICAgIHdlYXRoZXIud2luZC5kZWcgPSB3ZWF0aGVyLndpbmQuZGVnICsgREVHUkVFX0NIQVI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHdlYXRoZXIuc3VuLnJpc2UgPSBEZWNvcmF0ZVdlYXRoZXJEYXRhLmdldEZvcm1hdHRlZERhdGUod2VhdGhlci5zdW4ucmlzZSwge1xyXG4gICAgICAgICAgICAgICAgaG91cjogXCIyLWRpZ2l0XCIsXHJcbiAgICAgICAgICAgICAgICBtaW51dGU6IFwiMi1kaWdpdFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgd2VhdGhlci5zdW4uc2V0ID0gRGVjb3JhdGVXZWF0aGVyRGF0YS5nZXRGb3JtYXR0ZWREYXRlKHdlYXRoZXIuc3VuLnNldCwge1xyXG4gICAgICAgICAgICAgICAgaG91cjogXCIyLWRpZ2l0XCIsXHJcbiAgICAgICAgICAgICAgICBtaW51dGU6IFwiMi1kaWdpdFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRGb3JtYXR0ZWREYXRlXHJcbiAgICAgKiBAcGFyYW0gc3RyaW5nfERhdGUg0L/RgNC10LTRgdGC0LDQstC70LXQvdC40LUg0LTQsNGC0YtcclxuICAgICAqIEBvcHRpb24gb2JqZWN0INC90LDRgdGC0YDQvtC50LrQuCDRhNC+0YDQvNCw0YLQsFxyXG4gICAgICogQHJldHVybiBzdHJpbmcg0YTQvtGA0LzQsNGC0LjRgNC+0LLQsNC90L3QvtC1INC/0YDQtdC00YHRgtCw0LLQu9C10L3QuNC1INC00LDRgtGLXHJcbiAgICAgKiAqL1xyXG4gICAgc3RhdGljIGdldEZvcm1hdHRlZERhdGUoZGF0ZSwgb3B0aW9uKSB7XHJcbiAgICAgICAgaWYgKGRhdGUgJiYgZGF0ZSE9Jy0nKSB7XHJcbiAgICAgICAgICAgIGxldCBmb3JtYXR0ZXIgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcImVuLVVTXCIsIG9wdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXR0ZXIuZm9ybWF0KGRhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRGb3JtYXR0ZWRUZW1wZXJhdHVyZSh0ZW1wZXJhdHVyZSwgdW5pdHMpIHtcclxuICAgICAgICBsZXQgdW5pdCA9IHVuaXRzID8gdW5pdHMudGVtcGVyYXR1cmUubGV0dGVyIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIGAke01hdGgucm91bmQocGFyc2VGbG9hdCh0ZW1wZXJhdHVyZSkpfSR7REVHUkVFX0NIQVJ9JHt1bml0fWA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERlY29yYXRlV2VhdGhlckRhdGE7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2xpYi9kZWNvcmF0ZVdlYXRoZXJEYXRhLmpzXG4gKiovIiwiLyoqXG4gKiBXaW5kcm9zZVxuICpcbiAqIFRoaXMgaXMgYSBzaW1wbGUgbW9kdWxlIHRoYXQgY29udmVydHMgY29tcGFzcyBkZWdyZXNzIGludG8gY29tcGFzcyBwb2ludHNcbiAqIGFuZCBwb2ludHMgdG8gZGVncmVlcy5cbiAqXG4gKiBZb3UgY2FuIHBhc3MgYW4geyBkZXB0aDogLi4uIH0gaGFzaCB0byB0aGUgbWV0aG9kcy5cbiAqXG4gKiBQYXNzaW5nIGEgZGVwdGg6IDAgd2lsbCBsaW1pdCB0aGUgc2VhcmNoIHRvIHRoZSA0XG4gKiBtYWluIGNvbXBhc3MgcG9pbnRzOiBOLCBFLCBTLCBXLlxuICpcbiAqIFBhc3NpbmcgYSBkZXB0aDogMSB3aWxsIGxpbWl0IHRoZSBzZWFyY2ggdG8gdGhlIDhcbiAqIG1haW4gY29tcGFzcyBwb2ludHM6IE4sIE5FLCBFLCBTRSwgUywgU1csIFcsIE5XXG4gKlxuICogUGFzc2luZyBhIGRlcHRoOiAyIHdpbGwgbGltaXQgdGhlIHNlYXJjaCB0byB0aGUgMTZcbiAqIG1haW4gY29tcGFzcyBwb2ludHM6IE4sIE5ORSwgTkUsIEVORSwgRSwgRVNFLCBTRSwgU1NFLFxuICogUywgU1NXLCBTVywgV1NXLCBXLCBXTlcsIE5XLCBOTlcuXG4gKlxuICogUGFzc2luZyBhIGRlcHRoOiAzIChkZWZhdWx0KSB3aWxsIGRvIHRoZSBzZWFyY2ggZm9yIHRoZVxuICogMzIgcG9pbnRzIG9mIHRoZSBjb21wYXNzLlxuICpcbiAqIEBhdXRob3Igcm9nZXJpb3B2bCA8aHR0cDovL2dpdGh1Yi5jb20vcm9nZXJpb3B2bD5cbiAqIEBsaWNlbnNlIE1JVFxuICovXG5cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290LldpbmRyb3NlID0gZmFjdG9yeSgpO1xuICAgIH1cbn0gKHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgREVQVEhTX0FSRUEgPSBbIDkwLCA0NSwgMjIuNSwgMTEuMjUgXTtcbiAgICB2YXIgQ09NUEFTU19QT0lOVFMgPSBbXG4gICAgICAgIHsgc3ltYm9sOiAnTicsIG5hbWU6ICdOb3J0aCcsIGRlcHRoOiAwIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnTmJFJywgbmFtZTogJ05vcnRoIGJ5IEVhc3QnLCBkZXB0aDogMyB9LFxuICAgICAgICB7IHN5bWJvbDogJ05ORScsIG5hbWU6ICdOb3J0aCBOb3J0aCBFYXN0JywgZGVwdGg6IDIgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdORWJOJywgbmFtZTogJ05vcnRoIEVhc3QgYnkgTm9ydGgnLCBkZXB0aDogMyB9LFxuICAgICAgICB7IHN5bWJvbDogJ05FJywgbmFtZTogJ05vcnRoIEVhc3QnLCBkZXB0aDogMSB9LFxuICAgICAgICB7IHN5bWJvbDogJ05FYkUnLCBuYW1lOiAnTm9ydGggRWFzdCBieSBFYXN0JywgZGVwdGg6IDMgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdFTkUnLCBuYW1lOiAnRWFzdCBOb3J0aCBFYXN0JywgZGVwdGg6IDIgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdFYk4nLCBuYW1lOiAnRWFzdCBieSBOb3J0aCcsIGRlcHRoOiAzIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnRScsIG5hbWU6ICdFYXN0JywgZGVwdGg6IDAgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdFYlMnLCBuYW1lOiAnRWFzdCBieSBTb3V0aCcsIGRlcHRoOiAzIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnRVNFJywgbmFtZTogJ0Vhc3QgU291dGggRWFzdCcsIGRlcHRoOiAyIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnU0ViRScsIG5hbWU6ICdTb3V0aCBFYXN0IGJ5IEVhc3QnLCBkZXB0aDogMyB9LFxuICAgICAgICB7IHN5bWJvbDogJ1NFJywgbmFtZTogJ1NvdXRoIEVhc3QnLCBkZXB0aDogMSB9LFxuICAgICAgICB7IHN5bWJvbDogJ1NFYlMnLCBuYW1lOiAnU291dGggRWFzdCBieSBTb3V0aCcsIGRlcHRoOiAzIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnU1NFJywgbmFtZTogJ1NvdXRoIFNvdXRoIEVhc3QnLCBkZXB0aDogMiB9LFxuICAgICAgICB7IHN5bWJvbDogJ1NiRScsIG5hbWU6ICdTb3V0aCBieSBFYXN0JywgZGVwdGg6IDMgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdTJywgbmFtZTogJ1NvdXRoJywgZGVwdGg6IDAgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdTYlcnLCBuYW1lOiAnU291dGggYnkgV2VzdCcsIGRlcHRoOiAzIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnU1NXJywgbmFtZTogJ1NvdXRoIFNvdXRoIFdlc3QnLCBkZXB0aDogMiB9LFxuICAgICAgICB7IHN5bWJvbDogJ1NXYlMnLCBuYW1lOiAnU291dGggV2VzdCBieSBTb3V0aCcsIGRlcHRoOiAzIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnU1cnLCBuYW1lOiAnU291dGggV2VzdCcsIGRlcHRoOiAxIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnU1diVycsIG5hbWU6ICdTb3V0aCBXZXN0IGJ5IFdlc3QnLCBkZXB0aDogMyB9LFxuICAgICAgICB7IHN5bWJvbDogJ1dTVycsIG5hbWU6ICdXZXN0IFNvdXRoIFdlc3QnLCBkZXB0aDogMiB9LFxuICAgICAgICB7IHN5bWJvbDogJ1diUycsIG5hbWU6ICdXZXN0IGJ5IFNvdXRoJywgZGVwdGg6IDMgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdXJywgbmFtZTogJ1dlc3QnLCBkZXB0aDogMCB9LFxuICAgICAgICB7IHN5bWJvbDogJ1diTicsIG5hbWU6ICdXZXN0IGJ5IE5vcnRoJywgZGVwdGg6IDMgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdXTlcnLCBuYW1lOiAnV2VzdCBOb3J0aCBXZXN0JywgZGVwdGg6IDIgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdOV2JXJywgbmFtZTogJ05vcnRoIFdlc3QgYnkgV2VzdCcsIGRlcHRoOiAzIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnTlcnLCBuYW1lOiAnTm9ydGggV2VzdCcsIGRlcHRoOiAxIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnTldiTicsIG5hbWU6ICdOb3J0aCBXZXN0IGJ5IE5vcnRoJywgZGVwdGg6IDMgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdOTlcnLCBuYW1lOiAnTm9ydGggTm9ydGggV2VzdCcsIGRlcHRoOiAyIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnTmJXJywgbmFtZTogJ05vcnRoIGJ5IFdlc3QnLCBkZXB0aDogMyB9XG4gICAgXTtcblxuICAgIHZhciBXaW5kcm9zZSA9IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgYSBwb2ludCBvZiB0aGUgY29tcGFzcywgZ2l2ZW4gdGhlIGRlZ3JlZXNcbiAgICAgICAgICogV2hlbiB0aGUgZGVncmVlcyBkbyBub3QgbWF0Y2ggZGlyZWN0bHkgd2l0aCBhIHBvaW50LFxuICAgICAgICAgKiB0aGUgbnVtYmVyIGlzIHJvdW5kZWQgZmlyc3RcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZ3JlZXMgLSB0aGUgZGVncmVlcyBpbiB0aGUgY29tcGFzcyB0byBjb252ZXJ0XG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRzIC0gKG9wdGlvbmFsKSBoYXNoIGNvbnRhaW5pbmcgb3B0aW9uc1xuICAgICAgICAgKiAgICAgICAgICAgICAgICAgb3B0cy5kZXB0aCAtIHZhbGlkIGZyb20gMCB0byAzXG4gICAgICAgICAqIEByZXR1cm4ge29iamVjdH0gdGhlIGNvbXBhc3MgcG9pbnQgb2YgdGhlIGdpdmVuIGRlZ3JlZXMuIElmIGRlZ3JlZXMgYXJlXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgaW52YWxpZCAoPCAwIHx8ID4gMzYwKSwgdGhlbiB1bmRlZmluZWQgaXMgcmV0dXJuZWQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXRQb2ludDogZnVuY3Rpb24gKGRlZ3JlZXMsIG9wdHMpIHtcbiAgICAgICAgICAgIGlmIChkZWdyZWVzIDwgMCB8fCBkZWdyZWVzID4gMzYwKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgICAgIG9wdHMuZGVwdGggPSBvcHRzLmhhc093blByb3BlcnR5KCdkZXB0aCcpID8gb3B0cy5kZXB0aCA6IDM7XG5cbiAgICAgICAgICAgIHZhciBpZHggPSBNYXRoLnJvdW5kKGRlZ3JlZXMgLyBERVBUSFNfQVJFQVtvcHRzLmRlcHRoXSk7XG4gICAgICAgICAgICB2YXIgX2NvbXBhc3NfcG9pbnRzID0gQ09NUEFTU19QT0lOVFMuZmlsdGVyKGZ1bmN0aW9uIChwdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwdC5kZXB0aCA8PSBvcHRzLmRlcHRoO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIDM2MCA9PT0gMCBha2EgTm9ydGhcbiAgICAgICAgICAgIGlmIChpZHggPT09IF9jb21wYXNzX3BvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZHggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF9jb21wYXNzX3BvaW50c1tpZHhdO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBkZWdyZWVzIG9mIGEgZ2l2ZW4gY29tcGFzcyBwb2ludCBuYW1lIG9yIHN5bWJvbFxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIHRoZSBuYW1lIG9yIHN5bWJvbCBvZiBhIGNvbXBhc3MgcG9pbnQgKGNhc2Ugc2Vuc2l0aXZlKVxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0cyAtIChvcHRpb25hbCkgaGFzaCBjb250YWluaW5nIG9wdGlvbnNcbiAgICAgICAgICogICAgICAgICAgICAgICAgIG9wdHMuZGVwdGggLSB2YWxpZCBmcm9tIDAgdG8gM1xuICAgICAgICAgKiBAcmV0dXJuIHtvYmplY3R9IHRoZSBkZWdyZWVzIGFuZCByYW5nZSBvZiB0aGUgZ2l2ZW4gY29tcGFzcyBwb2ludFxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIChhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIGRlcHRoKVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0RGVncmVlczogZnVuY3Rpb24gKG5hbWUsIG9wdHMpIHtcbiAgICAgICAgICAgIHZhciBmb3VuZCwgbWluLCBtYXg7XG4gICAgICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgICAgIG9wdHMuZGVwdGggPSBvcHRzLmhhc093blByb3BlcnR5KCdkZXB0aCcpID8gb3B0cy5kZXB0aCA6IDM7XG5cbiAgICAgICAgICAgIGlmIChvcHRzLmRlcHRoIDwgMCB8fCBvcHRzLmRlcHRoID4gMykgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgQ09NUEFTU19QT0lOVFMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaWR4KSB7XG4gICAgICAgICAgICAgICAgaWYgKG5hbWUgPT09IGl0ZW0ubmFtZSB8fCBuYW1lID09PSBpdGVtLnN5bWJvbCkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IGlkeCAqIERFUFRIU19BUkVBWzNdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1pbiA9IGZvdW5kIC0gKERFUFRIU19BUkVBW29wdHMuZGVwdGhdIC8gMik7XG4gICAgICAgICAgICBtYXggPSBmb3VuZCArIChERVBUSFNfQVJFQVtvcHRzLmRlcHRoXSAvIDIpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGZvdW5kID09PSAndW5kZWZpbmVkJykgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgbWluOiBtaW4gPj0gMCA/IG1pbiA6ICgzNjAgKyBtaW4pLFxuICAgICAgICAgICAgICB2YWx1ZTogZm91bmQsXG4gICAgICAgICAgICAgIG1heDogbWF4IDw9IDM2MCA/IG1heCA6IChtYXggLSAzNjApXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gV2luZHJvc2U7XG59KSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi93aW5kcm9zZS93aW5kcm9zZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibGV0IExvbmRvbiA9IHtcclxuICBjb29yZDoge1xyXG4gICAgbG9uOiAtMC4xMyxcclxuICAgIGxhdDogNTEuNTFcclxuICB9LFxyXG4gIHdlYXRoZXI6IFtcclxuICAgIHtcclxuICAgICAgaWQ6IDUwMSxcclxuICAgICAgbWFpbjogXCJSYWluXCIsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBcIm1vZGVyYXRlIHJhaW5cIixcclxuICAgICAgaWNvbjogXCIxMGRcIlxyXG4gICAgfVxyXG4gIF0sXHJcbiAgYmFzZTogXCJzdGF0aW9uc1wiLFxyXG4gIG1haW46IHtcclxuICAgIHRlbXA6IDI3OS4xNixcclxuICAgIHByZXNzdXJlOiAxMDEzLFxyXG4gICAgaHVtaWRpdHk6IDY1LFxyXG4gICAgdGVtcF9taW46IDI3Ny43NSxcclxuICAgIHRlbXBfbWF4OiAyODAuNTVcclxuICB9LFxyXG4gIHZpc2liaWxpdHk6IDEwMDAwLFxyXG4gIHdpbmQ6IHtcclxuICAgIHNwZWVkOiA0LjYsXHJcbiAgICBkZWc6IDIwMFxyXG4gIH0sXHJcbiAgY2xvdWRzOiB7XHJcbiAgICBhbGw6IDkwXHJcbiAgfSxcclxuICBkdDogMTQ1NTcyMTMyOCxcclxuICBzeXM6IHtcclxuICAgIHR5cGU6IDEsXHJcbiAgICBpZDogNTA5MSxcclxuICAgIG1lc3NhZ2U6IDAuMDQ2OSxcclxuICAgIGNvdW50cnk6IFwiR0JcIixcclxuICAgIHN1bnJpc2U6IDE0NTU2OTMwMzAsXHJcbiAgICBzdW5zZXQ6IDE0NTU3Mjk1NTlcclxuICB9LFxyXG4gIGlkOiAyNjQzNzQzLFxyXG4gIG5hbWU6IFwiTG9uZG9uXCIsXHJcbiAgY29kOiAyMDBcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvbmRvbjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBkYXRhL3dlYXRoZXIuanNcbiAqKi8iLCJsZXQgTW9zY293ID0ge1xyXG4gIGNvb3JkOiB7XHJcbiAgICBsb246IDM3LjYyLFxyXG4gICAgbGF0OiA1NS43NVxyXG4gIH0sXHJcbiAgd2VhdGhlcjogW1xyXG4gICAge1xyXG4gICAgICBpZDogODAwLFxyXG4gICAgICBtYWluOiBcIkNsZWFyXCIsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlNreSBpcyBDbGVhclwiLFxyXG4gICAgICBpY29uOiBcIjAxblwiXHJcbiAgICB9XHJcbiAgXSxcclxuICBiYXNlOiBcImNtYyBzdGF0aW9uc1wiLFxyXG4gIG1haW46IHtcclxuICAgIHRlbXA6IDI2OC40OTgsXHJcbiAgICBwcmVzc3VyZTogMTAyMy41MixcclxuICAgIGh1bWlkaXR5OiA4MyxcclxuICAgIHRlbXBfbWluOiAyNjguNDk4LFxyXG4gICAgdGVtcF9tYXg6IDI2OC40OTgsXHJcbiAgICBzZWFfbGV2ZWw6IDEwNDQuNzEsXHJcbiAgICBncm5kX2xldmVsOiAxMDIzLjUyXHJcbiAgfSxcclxuICB3aW5kOiB7XHJcbiAgICBzcGVlZDogNi4xNyxcclxuICAgIGRlZzogMzIxLjUwM1xyXG4gIH0sXHJcbiAgY2xvdWRzOiB7XHJcbiAgICBhbGw6IDBcclxuICB9LFxyXG4gIGR0OiAxNDU1NzIxMzI1LFxyXG4gIHN5czoge1xyXG4gICAgbWVzc2FnZTogMC4wMDQ0LFxyXG4gICAgY291bnRyeTogXCJSVVwiLFxyXG4gICAgc3VucmlzZTogMTQ1NTY4NDU4MyxcclxuICAgIHN1bnNldDogMTQ1NTcxOTg5NFxyXG4gIH0sXHJcbiAgaWQ6IDUyNDkwMSxcclxuICBuYW1lOiBcIk1vc2Nvd1wiLFxyXG4gIGNvZDogMjAwXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb3Njb3c7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogZGF0YS93ZWF0aGVyX21vc2Nvdy5qc1xuICoqLyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNsQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBS0E7Ozs7OztBQ1ZBOzs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3lCQTs7O0FBQ0E7QUFEQTtBQUNBO0FBREE7QUFDQTtBQUdBOztBQUhBO0FBQ0E7QUFGQTs7QUFPQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUdBO0FBQ0E7QUFDQTs7Ozs7QUFGQTs7OztBQVVBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBUEE7QUFDQTtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFEQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFOQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQUE7QUFEQTtBQUZBO0FBQ0E7QUFNQTs7QUFDQTtBQUNBOztBQUFBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7Ozs7QUFhQTs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUNBOztBQUpBO0FBQ0E7QUFTQTs7Ozs7O0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTs7Ozs7Ozs7Ozs7Ozs7QUFYQTs7OztBQW1CQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBTkE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBUEE7QUFTQTs7OztBQUdBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7OztBQUZBO0FBQ0E7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFYQTs7OztBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTs7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQURBO0FBQ0E7QUFHQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBTkE7QUFBQTtBQUNBO0FBVUE7QUFwQkE7QUFxQkE7QUFBQTs7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBREE7QUFNQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUVBO0FBM0JBO0FBQUE7QUFDQTtBQStCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXBDQTs7QUFqTkE7QUFBQTs7OztBQThSQTs7Ozs7O0FDdlRBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDSEE7QUFDQTs7Ozs7O0FDREE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTs7Ozs7O0FDRkE7QUFDQTtBQUNBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDakNBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7Ozs7OztBQ0ZBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDakVBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0hBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0pBO0FBQ0E7QUFDQTs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2ZBOzs7Ozs7QUNBQTtBQUNBOzs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDVEE7Ozs7OztBQ0FBO0FBQ0E7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMxQkE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNwQkE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTs7Ozs7O0FDRkE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDbE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDSkE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaENBOzs7Ozs7QUNBQTtBQUNBOzs7Ozs7QUNEQTtBQUNBO0FBQ0E7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3pCQTs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNU9BOzs7QUFDQTtBQURBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQURBOztBQUhBO0FBQ0E7QUFGQTs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFBQTs7QUFEQTtBQUVBOztBQUFBOztBQUZBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTs7OztBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBOUNBO0FBQUE7Ozs7QUFrREE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyREE7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQUE7QUFDQTs7O0FBQUE7QUFEQTtBQUVBO0FBQ0E7OztBQUFBO0FBSEE7QUFJQTs7O0FBQUE7QUFKQTtBQUZBO0FBREE7OztBQVBBO0FBQUE7QUFDQTtBQW9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFEQTtBQU5BO0FBREE7QUFDQTtBQVlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakNBOzs7Ozs7Ozs7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTs7O0FBVEE7QUFBQTs7OztBQXNCQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFGQTtBQVhBO0FBZ0JBO0FBakJBO0FBQ0E7QUFtQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQ0E7OztBQUNBO0FBREE7QUFDQTtBQURBO0FBQ0E7QUFHQTs7QUFIQTtBQUNBO0FBRkE7O0FBUUE7OztBQUlBO0FBQ0E7O0FBQ0E7QUFDQTs7O0FBQUE7QUFEQTtBQUVBOzs7QUFBQTtBQUZBO0FBREE7OztBQWJBO0FBQUE7QUFDQTtBQXFCQTtBQUNBO0FBREE7QUFDQTtBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCQTs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOztBQUNBO0FBQ0E7QUFGQTs7O0FBTkE7QUFBQTs7OztBQWNBO0FBQ0E7QUFEQTtBQUNBO0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQkE7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7OztBQUFBO0FBREE7QUFFQTtBQUNBO0FBQ0E7OztBQUFBO0FBQUE7QUFBQTtBQUpBO0FBREE7OztBQVZBO0FBQUE7QUFDQTtBQW9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBREE7QUFDQTtBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQUZBOztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBOztBQUNBO0FBQ0E7O0FBQUE7QUFDQTs7OztBQURBO0FBRUE7OztBQUNBO0FBQ0E7QUFDQTs7QUFBQTs7QUFIQTtBQUZBO0FBREE7QUFTQTs7QUFBQTtBQUNBOzs7O0FBQUE7O0FBQUE7O0FBQUE7O0FBREE7QUFFQTs7O0FBQ0E7QUFDQTtBQUpBO0FBVEE7QUFnQkE7O0FBQUE7QUFDQTs7OztBQURBO0FBRUE7QUFDQTtBQW5CQTtBQXFCQTs7QUFBQTtBQUNBOzs7O0FBREE7QUFFQTtBQUNBO0FBeEJBO0FBMEJBO0FBM0JBOzs7QUFkQTtBQUFBO0FBQ0E7QUE4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBOzs7O0FBREE7QUFFQTs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGQTtBQUdBOzs7O0FBQUE7QUFBQTtBQUFBO0FBSEE7QUFJQTs7OztBQUFBO0FBQUE7QUFKQTtBQUtBOzs7O0FBQUE7QUFBQTtBQUxBO0FBREE7QUFKQTtBQUNBO0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUFBO0FBSEE7QUFEQTtBQUhBO0FBQ0E7QUFXQTs7O0FBQ0E7QUFEQTtBQWJBO0FBQ0E7QUFpQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUFBO0FBREE7QUFIQTtBQUNBO0FBT0E7OztBQUVBOztBQUFBO0FBQUE7QUFEQTtBQURBO0FBVEE7QUFDQTtBQWVBOzs7Ozs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFQQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFQQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFQQTtBQW5CQTtBQTZCQTtBQUNBO0FBQ0E7QUFDQTtBQWpDQTtBQUNBO0FBbUNBO0FBRUE7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQVBBO0FBVUE7QUFDQTtBQVhBO0FBY0E7QUFDQTtBQWZBO0FBQ0E7QUFrQkE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoREE7Ozs7QUFFQTs7O0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQUZBOztBQUtBO0FBQ0E7Ozs7QUFHQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBREE7QUFNQTtBQU5BO0FBREE7QUFVQTtBQWZBO0FBQ0E7QUFpQkE7QUEzQkE7QUFDQTtBQTZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQUE7QUFBQTtBQURBO0FBRUE7O0FBQUE7QUFBQTtBQUZBO0FBREE7QUFKQTtBQUNBOzs7O0FBakRBOztBQWdFQTtBQUNBOzs7QUFDQTs7OztBQURBO0FBRUE7OztBQUNBO0FBQ0E7O0FBQUE7QUFBQTtBQUZBO0FBRkE7QUFEQTtBQVFBOzs7QUFDQTs7OztBQURBO0FBRUE7O0FBQUE7QUFDQTtBQUhBO0FBUkE7QUFEQTs7O0FBeEVBO0FBQUE7QUFDQTtBQXlGQTtBQUNBOzs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUFBOztBQURBO0FBRUE7O0FBQUE7QUFBQTtBQUZBO0FBR0E7O0FBQUE7QUFBQTtBQUhBO0FBREE7QUFIQTtBQUNBO0FBV0E7Ozs7OztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1RBOzs7QUFDQTtBQUNBOzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUZBO0FBUEE7Ozs7QUFjQTtBQXBCQTtBQUNBO0FBb0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBckJBOztBQTRCQTs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQURBO0FBSUE7QUFDQTtBQURBO0FBR0E7QUFIQTtBQURBO0FBT0E7QUFBQTtBQVhBOzs7O0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUtBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBZEE7QUFpQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQXZCQTtBQUNBO0FBNEJBOzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFEQTtBQUNBO0FBTUE7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSEE7QUFBQTtBQUNBO0FBT0E7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFMQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQXpCQTtBQVRBOzs7Ozs7Ozs7Ozs7OztBQWhCQTtBQUNBO0FBdURBOzs7QUE1TUE7Ozs7Ozs7Ozs7QUFxTkE7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBOzs7Ozs7QUM5TkE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDOUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3REQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xBOzs7O0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFqQ0E7Ozs7Ozs7Ozs7Ozs7O0FBTkE7QUFDQTtBQTRDQTs7Ozs7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7Ozs7QUFHQTtBQUNBO0FBQ0E7OztBQWxFQTs7O0FBc0VBOzs7Ozs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQUNBO0FBeENBO0FBQ0E7QUEwQ0E7Ozs7Ozs7Ozs7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUF2Q0E7QUFDQTtBQXlDQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==