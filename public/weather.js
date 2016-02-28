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

	var _stringify = __webpack_require__(113);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _getIterator2 = __webpack_require__(19);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _keys = __webpack_require__(47);

	var _keys2 = _interopRequireDefault(_keys);

	var _getPrototypeOf = __webpack_require__(51);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(54);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(55);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(58);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(70);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _style = __webpack_require__(77);

	var _style2 = _interopRequireDefault(_style);

	var _weather = __webpack_require__(81);

	var _weather2 = _interopRequireDefault(_weather);

	var _settings = __webpack_require__(88);

	var _settings2 = _interopRequireDefault(_settings);

	var _cities = __webpack_require__(91);

	var _cities2 = _interopRequireDefault(_cities);

	var _openWeather = __webpack_require__(94);

	var _openWeather2 = _interopRequireDefault(_openWeather);

	var _decorateWeatherData = __webpack_require__(109);

	var _decorateWeatherData2 = _interopRequireDefault(_decorateWeatherData);

	var _unitMeasure = __webpack_require__(115);

	var _unitMeasure2 = _interopRequireDefault(_unitMeasure);

	var _weather3 = __webpack_require__(111);

	var _weather4 = _interopRequireDefault(_weather3);

	var _weather_moscow = __webpack_require__(112);

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

	            var updateUnitSettings = this.updateUnitSettings.bind(this);

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
	                React.createElement(_settings2.default, { settings: this.state.settings, updateUnitSettings: updateUnitSettings }),
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
	        * updateUnitSettings */

	    }, {
	        key: 'updateUnitSettings',
	        value: function updateUnitSettings(event) {
	            var _this3 = this;

	            var unitMeasure = event.target.id;

	            this.setState(function (previousState, currentProps) {
	                previousState.settings.unit_measure = unitMeasure;

	                var unitMeasureType = _unitMeasure2.default.type[unitMeasure];
	                (0, _keys2.default)(unitMeasureType).forEach(function (key) {
	                    previousState.units[key] = unitMeasureType[key];
	                });

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
	                    units.temperature = _unitMeasure2.default.type[unitMeasure].temperature;
	                    units.wind = _unitMeasure2.default.type[unitMeasure].wind;
	                    units.pressure = _unitMeasure2.default.pressure;
	                    units.precipitation = _unitMeasure2.default.precipitation;
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
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(8)
	  , core      = __webpack_require__(9)
	  , ctx       = __webpack_require__(10)
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
/* 8 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(11);
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
/* 11 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 12 */,
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(15);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(17);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(20), __esModule: true };

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(21);
	__webpack_require__(39);
	module.exports = __webpack_require__(42);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(22);
	var Iterators = __webpack_require__(25);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(23)
	  , step             = __webpack_require__(24)
	  , Iterators        = __webpack_require__(25)
	  , toIObject        = __webpack_require__(26);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(27)(Array, 'Array', function(iterated, kind){
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
/* 23 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(16)
	  , defined = __webpack_require__(15);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(28)
	  , $export        = __webpack_require__(7)
	  , redefine       = __webpack_require__(29)
	  , hide           = __webpack_require__(30)
	  , has            = __webpack_require__(33)
	  , Iterators      = __webpack_require__(25)
	  , $iterCreate    = __webpack_require__(34)
	  , setToStringTag = __webpack_require__(35)
	  , getProto       = __webpack_require__(13).getProto
	  , ITERATOR       = __webpack_require__(36)('iterator')
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
/* 28 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(30);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(13)
	  , createDesc = __webpack_require__(31);
	module.exports = __webpack_require__(32) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 31 */
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(18)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 33 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(13)
	  , descriptor     = __webpack_require__(31)
	  , setToStringTag = __webpack_require__(35)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(30)(IteratorPrototype, __webpack_require__(36)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(13).setDesc
	  , has = __webpack_require__(33)
	  , TAG = __webpack_require__(36)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(37)('wks')
	  , uid    = __webpack_require__(38)
	  , Symbol = __webpack_require__(8).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(8)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(40)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(27)(String, 'String', function(iterated){
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(41)
	  , defined   = __webpack_require__(15);
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
/* 41 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(43)
	  , get      = __webpack_require__(45);
	module.exports = __webpack_require__(9).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(44);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(46)
	  , ITERATOR  = __webpack_require__(36)('iterator')
	  , Iterators = __webpack_require__(25);
	module.exports = __webpack_require__(9).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(17)
	  , TAG = __webpack_require__(36)('toStringTag')
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(48), __esModule: true };

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(49);
	module.exports = __webpack_require__(9).Object.keys;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(14);

	__webpack_require__(50)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(7)
	  , core    = __webpack_require__(9)
	  , fails   = __webpack_require__(18);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(52), __esModule: true };

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(53);
	module.exports = __webpack_require__(9).Object.getPrototypeOf;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(14);

	__webpack_require__(50)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 54 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(56);

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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(13);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(59);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _Symbol === "function" && obj.constructor === _Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;

	var _iterator = __webpack_require__(60);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(62);

	var _symbol2 = _interopRequireDefault(_symbol);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(39);
	__webpack_require__(21);
	module.exports = __webpack_require__(36)('iterator');

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64);
	__webpack_require__(69);
	module.exports = __webpack_require__(9).Symbol;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(13)
	  , global         = __webpack_require__(8)
	  , has            = __webpack_require__(33)
	  , DESCRIPTORS    = __webpack_require__(32)
	  , $export        = __webpack_require__(7)
	  , redefine       = __webpack_require__(29)
	  , $fails         = __webpack_require__(18)
	  , shared         = __webpack_require__(37)
	  , setToStringTag = __webpack_require__(35)
	  , uid            = __webpack_require__(38)
	  , wks            = __webpack_require__(36)
	  , keyOf          = __webpack_require__(65)
	  , $names         = __webpack_require__(66)
	  , enumKeys       = __webpack_require__(67)
	  , isArray        = __webpack_require__(68)
	  , anObject       = __webpack_require__(43)
	  , toIObject      = __webpack_require__(26)
	  , createDesc     = __webpack_require__(31)
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

	  if(DESCRIPTORS && !__webpack_require__(28)){
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(13)
	  , toIObject = __webpack_require__(26);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(26)
	  , getNames  = __webpack_require__(13).getNames
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
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(13);
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
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(17);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 69 */
/***/ function(module, exports) {

	

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(71);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(75);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(59);

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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(72), __esModule: true };

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(73);
	module.exports = __webpack_require__(9).Object.setPrototypeOf;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(7);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(74).set});

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(13).getDesc
	  , isObject = __webpack_require__(44)
	  , anObject = __webpack_require__(43);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(10)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(13);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(78);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(80)(content, {});
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
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(79)();
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
/* 79 */
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
/* 80 */
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _keys = __webpack_require__(47);

	var _keys2 = _interopRequireDefault(_keys);

	var _getPrototypeOf = __webpack_require__(51);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(54);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(55);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(58);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(70);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _generalInfo = __webpack_require__(82);

	var _generalInfo2 = _interopRequireDefault(_generalInfo);

	var _detailInfo = __webpack_require__(84);

	var _detailInfo2 = _interopRequireDefault(_detailInfo);

	var _forecast = __webpack_require__(86);

	var _forecast2 = _interopRequireDefault(_forecast);

	var _style = __webpack_require__(77);

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
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(51);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(54);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(55);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(58);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(70);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(77);

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
/* 83 */,
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(51);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(54);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(55);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(58);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(70);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(77);

	var _style2 = _interopRequireDefault(_style);

	var _parametrInfo = __webpack_require__(85);

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

	            var windDescription = this.props.weather.wind.speed + ', ' + this.props.weather.wind.direction;

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
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(51);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(54);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(55);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(58);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(70);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(77);

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
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _keys = __webpack_require__(47);

	var _keys2 = _interopRequireDefault(_keys);

	var _getPrototypeOf = __webpack_require__(51);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(54);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(55);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(58);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(70);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(77);

	var _style2 = _interopRequireDefault(_style);

	var _forecastDay = __webpack_require__(87);

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
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(51);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(54);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(55);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(58);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(70);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(77);

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
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _keys = __webpack_require__(47);

	var _keys2 = _interopRequireDefault(_keys);

	var _getPrototypeOf = __webpack_require__(51);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(54);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(55);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(58);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(70);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(77);

	var _style2 = _interopRequireDefault(_style);

	var _settings = __webpack_require__(89);

	var _settings2 = _interopRequireDefault(_settings);

	var _unitMeasure = __webpack_require__(115);

	var _unitMeasure2 = _interopRequireDefault(_unitMeasure);

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

	        /*
	        * English - en, Russian - ru, Italian - it, Spanish - es (or sp), Ukrainian - uk (or ua),
	        * German - de, Portuguese - pt, Romanian - ro, Polish - pl, Finnish - fi, Dutch - nl,
	        * French - fr, Bulgarian - bg, Swedish - sv (or se), Chinese Traditional - zh_tw,
	        * Chinese Simplified - zh (or zh_cn), Turkish - tr, Croatian - hr, Catalan - ca */
	    }

	    (0, _createClass3.default)(Settings, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var classTabContent = _style2.default.tab_container + (this.props.settings.showTab == 'settings' ? '' : " " + _style2.default.hide_tab);

	            var currentUnitMeasure = this.props.settings.unit_measure;
	            var measure = (0, _keys2.default)(_unitMeasure2.default.type).map(function (unitTypeId) {
	                var unitType = _unitMeasure2.default.type[unitTypeId];
	                var checked = currentUnitMeasure == unitTypeId ? "defaultChecked" : '';
	                return _react2.default.createElement(
	                    'div',
	                    { key: unitTypeId },
	                    _react2.default.createElement('input', { type: 'radio', id: unitTypeId, name: 'unitMeasure', ref: 'unitMeasure',
	                        value: unitTypeId, checked: checked, onChange: _this2.props.updateUnitSettings }),
	                    _react2.default.createElement(
	                        'label',
	                        { htmlFor: unitTypeId },
	                        unitTypeId
	                    )
	                );
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
	                        _react2.default.createElement('input', { type: 'radio', id: 'OpenWeatherMap', name: 'dataSource', ref: 'dataSource', value: 'OpenWeatherMap',
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
	                        _react2.default.createElement('textarea', { ref: 'keyApi', defaultValue: this.props.settings.API.openweathermap.key })
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
	                    _react2.default.createElement(
	                        'div',
	                        null,
	                        _react2.default.createElement('input', { type: 'radio', id: 'OpenWeatherMap', name: 'dataSource', ref: 'dataSource', value: 'OpenWeatherMap',
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
	                        'Unit measure'
	                    ),
	                    measure
	                ),
	                _react2.default.createElement(UnitExample, { unitType: this.props.settings.unit_measure })
	            );
	        }
	    }]);
	    return Settings;
	}(_react2.default.Component);

	var UnitExample = function UnitExample(props) {
	    var currentUnitMeasure = props.unitType;
	    var measure = _unitMeasure2.default.type[currentUnitMeasure];

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
	            _unitMeasure2.default.pressure_example,
	            _unitMeasure2.default.pressure
	        ),
	        _react2.default.createElement(
	            'div',
	            null,
	            'Precipitation: ',
	            _unitMeasure2.default.precipitation_example,
	            _unitMeasure2.default.precipitation
	        )
	    );
	};

		exports.default = Settings;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(90);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(80)(content, {});
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
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(79)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _keys = __webpack_require__(47);

	var _keys2 = _interopRequireDefault(_keys);

	var _getPrototypeOf = __webpack_require__(51);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(54);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(55);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(58);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(70);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _style = __webpack_require__(77);

	var _style2 = _interopRequireDefault(_style);

	var _cities = __webpack_require__(92);

	var _cities2 = _interopRequireDefault(_cities);

	var _openWeather = __webpack_require__(94);

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
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(93);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(80)(content, {});
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
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(79)();
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
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getIterator2 = __webpack_require__(19);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _map = __webpack_require__(95);

	var _map2 = _interopRequireDefault(_map);

	var _keys = __webpack_require__(47);

	var _keys2 = _interopRequireDefault(_keys);

	var _classCallCheck2 = __webpack_require__(54);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(55);

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
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(96), __esModule: true };

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(69);
	__webpack_require__(39);
	__webpack_require__(21);
	__webpack_require__(97);
	__webpack_require__(107);
	module.exports = __webpack_require__(9).Map;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(98);

	// 23.1 Map Objects
	__webpack_require__(106)('Map', function(get){
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
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(13)
	  , hide         = __webpack_require__(30)
	  , redefineAll  = __webpack_require__(99)
	  , ctx          = __webpack_require__(10)
	  , strictNew    = __webpack_require__(100)
	  , defined      = __webpack_require__(15)
	  , forOf        = __webpack_require__(101)
	  , $iterDefine  = __webpack_require__(27)
	  , step         = __webpack_require__(24)
	  , ID           = __webpack_require__(38)('id')
	  , $has         = __webpack_require__(33)
	  , isObject     = __webpack_require__(44)
	  , setSpecies   = __webpack_require__(105)
	  , DESCRIPTORS  = __webpack_require__(32)
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
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(29);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 100 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(10)
	  , call        = __webpack_require__(102)
	  , isArrayIter = __webpack_require__(103)
	  , anObject    = __webpack_require__(43)
	  , toLength    = __webpack_require__(104)
	  , getIterFn   = __webpack_require__(45);
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
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(43);
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
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(25)
	  , ITERATOR   = __webpack_require__(36)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(41)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core        = __webpack_require__(9)
	  , $           = __webpack_require__(13)
	  , DESCRIPTORS = __webpack_require__(32)
	  , SPECIES     = __webpack_require__(36)('species');

	module.exports = function(KEY){
	  var C = core[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(13)
	  , global         = __webpack_require__(8)
	  , $export        = __webpack_require__(7)
	  , fails          = __webpack_require__(18)
	  , hide           = __webpack_require__(30)
	  , redefineAll    = __webpack_require__(99)
	  , forOf          = __webpack_require__(101)
	  , strictNew      = __webpack_require__(100)
	  , isObject       = __webpack_require__(44)
	  , setToStringTag = __webpack_require__(35)
	  , DESCRIPTORS    = __webpack_require__(32);

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
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(7);

	$export($export.P, 'Map', {toJSON: __webpack_require__(108)('Map')});

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var forOf   = __webpack_require__(101)
	  , classof = __webpack_require__(46);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    var arr = [];
	    forOf(this, false, arr.push, arr);
	    return arr;
	  };
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getIterator2 = __webpack_require__(19);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _keys = __webpack_require__(47);

	var _keys2 = _interopRequireDefault(_keys);

	var _classCallCheck2 = __webpack_require__(54);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(55);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _windrose = __webpack_require__(110);

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
	                    weather.wind.direction = _windrose2.default.getPoint(parseFloat(weather.wind.deg), { depth: 0 }).symbol;
	                    weather.wind.deg = weather.wind.deg + DEGREE_CHAR;

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
/* 110 */
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
/* 111 */
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
/* 112 */
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

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(9);
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
	};

/***/ },
/* 115 */
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

		exports.default = UnitMeasure;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhNmQxZWNiMWZkYmNiYWRkN2NhMCIsIndlYnBhY2s6Ly8vYXBwL21haW4uanN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RET01cIiIsIndlYnBhY2s6Ly8vYXBwL2FwcC5qc3giLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb3JlLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY3R4LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmFkZC10by11bnNjb3BhYmxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItc3RlcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmxpYnJhcnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5oYXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnNldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQud2tzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2hhcmVkLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudWlkLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdHJpbmctYXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1pbnRlZ2VyLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNsYXNzb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLm9iamVjdC1zYXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5rZXlvZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmdldC1uYW1lcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmVudW0ta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLWFycmF5LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zZXQtcHJvdG8uanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc3R5bGUuc3R5bD80ZmMwIiwid2VicGFjazovLy8uL2FwcC9zdHlsZS5zdHlsIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy9hcHAvd2VhdGhlci93ZWF0aGVyLmpzeCIsIndlYnBhY2s6Ly8vYXBwL3dlYXRoZXIvZ2VuZXJhbC1pbmZvLmpzeCIsIndlYnBhY2s6Ly8vYXBwL3dlYXRoZXIvZGV0YWlsLWluZm8uanN4Iiwid2VicGFjazovLy9hcHAvd2VhdGhlci9wYXJhbWV0ci1pbmZvLmpzeCIsIndlYnBhY2s6Ly8vYXBwL3dlYXRoZXIvZm9yZWNhc3QuanN4Iiwid2VicGFjazovLy9hcHAvd2VhdGhlci9mb3JlY2FzdC1kYXkuanN4Iiwid2VicGFjazovLy9hcHAvc2V0dGluZ3Mvc2V0dGluZ3MuanN4Iiwid2VicGFjazovLy8uL2FwcC9zZXR0aW5ncy9zZXR0aW5ncy5zdHlsPzZmMDMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NldHRpbmdzL3NldHRpbmdzLnN0eWwiLCJ3ZWJwYWNrOi8vL2FwcC9jaXRpZXMvY2l0aWVzLmpzeCIsIndlYnBhY2s6Ly8vLi9hcHAvY2l0aWVzL2NpdGllcy5zdHlsPzg5MzkiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NpdGllcy9jaXRpZXMuc3R5bCIsIndlYnBhY2s6Ly8vYXBwL2xpYi9vcGVuLXdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvbWFwLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9mbi9tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm1hcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNvbGxlY3Rpb24tc3Ryb25nLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQucmVkZWZpbmUtYWxsLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3RyaWN0LW5ldy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmZvci1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItY2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLWFycmF5LWl0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zZXQtc3BlY2llcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3Lm1hcC50by1qc29uLmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29sbGVjdGlvbi10by1qc29uLmpzIiwid2VicGFjazovLy9hcHAvbGliL2RlY29yYXRlV2VhdGhlckRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vfi93aW5kcm9zZS93aW5kcm9zZS5qcyIsIndlYnBhY2s6Ly8vZGF0YS93ZWF0aGVyLmpzIiwid2VicGFjazovLy9kYXRhL3dlYXRoZXJfbW9zY293LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9mbi9qc29uL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly8vYXBwL2xpYi91bml0LW1lYXN1cmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBhNmQxZWNiMWZkYmNiYWRkN2NhMFxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJ1c2FrIE9sZWcgb24gMDkuMDIuMjAxNi5cclxuICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5cclxuaW1wb3J0IFdlYXRoZXJBcHAgZnJvbSAnLi9hcHAuanN4J1xyXG5cclxuUmVhY3RET00ucmVuZGVyKFxyXG4gICAgPFdlYXRoZXJBcHAgLz4sXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJylcclxuKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvbWFpbi5qc3hcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFJlYWN0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJSZWFjdFwiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiUmVhY3RET01cIlxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJ1c2FrIE9sZWcgb24gMDkuMDIuMjAxNi5cclxuICovXHJcblxyXG5pbXBvcnQgY3NzIGZyb20gJy4vc3R5bGUuc3R5bCc7XHJcblxyXG5pbXBvcnQgV2VhdGhlciBmcm9tICcuL3dlYXRoZXIvd2VhdGhlci5qc3gnO1xyXG5pbXBvcnQgU2V0dGluZ3MgZnJvbSAnLi9zZXR0aW5ncy9zZXR0aW5ncy5qc3gnO1xyXG5pbXBvcnQgQ2l0aWVzIGZyb20gJy4vY2l0aWVzL2NpdGllcy5qc3gnO1xyXG5cclxuaW1wb3J0IERTT3BlbldlYXRoZXIgZnJvbSAnLi9saWIvb3Blbi13ZWF0aGVyLmpzJztcclxuaW1wb3J0IERlY29yYXRlV2VhdGhlckRhdGEgZnJvbSAnLi9saWIvZGVjb3JhdGVXZWF0aGVyRGF0YSc7XHJcbmltcG9ydCBVbml0TWVhc3VyZSBmcm9tICcuL2xpYi91bml0LW1lYXN1cmUnO1xyXG5cclxuaW1wb3J0IExvbmRvbiBmcm9tICcuLy4uL2RhdGEvd2VhdGhlci5qcyc7XHJcbmltcG9ydCBNb3Njb3cgZnJvbSAnLi8uLi9kYXRhL3dlYXRoZXJfbW9zY293LmpzJztcclxuXHJcbi8vdG9kbzog0LvQtdC90LjQstGD0Y4g0L/QvtC00LPRgNGD0LfQutGDINC+0YHRgtCw0LvRjNC90YvRhSDRgtCw0LHQvtCyLCB3ZWJwYWNrIGhvdCByZWxvYWRcclxuXHJcbi8vdG9kbzog0L/QvtC00LTQtdGA0LbQutGDINC80YPQu9GM0YLQuNGP0LfRi9GH0L3QvtGB0YLQuFxyXG5cclxuLy90b2RvOiDRgdC/0LXRhtC40LDQu9GM0L3Ri9C5INCz0L7RgNC+0LQg0YLQtdC60YPRidC10LUg0LzQtdGB0YLQvtC/0L7Qu9C+0LbQtdC90LjQtVxyXG5cclxuLy90b2RvOiDQstGL0LLQvtC0INC+0YHQsNC00LrQvtCyXHJcblxyXG5jbGFzcyBXZWF0aGVyQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yIChwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIgKHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuc2V0U2V0dGluZ0Zyb21Mb2NhbE9yRGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50ICgpe1xyXG4gICAgICAgIHRoaXMucmVzdW1lU2V0dGluZygpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUNpdGllc1dlYXRoZXJEYXRhICgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZSAobmV4dFByb3BzLCBuZXh0U3RhdGUpe1xyXG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmdzIChuZXh0U3RhdGUpO1xyXG5cclxuICAgICAgICAvL3RvZG86INC+0YLQvNC10L3Rj9GC0Ywg0L7QsdC90L7QstC70LXQvdC40LUg0L/RgNC4INC40LfQvNC10L3QtdC90LjQuCDQtdC00LjQvdC40YYg0LjQt9C80LXRgNC10L3QuNGPXHJcbiAgICAgICAgLy/Rh9GC0L7QsdGLINC/0YDQuCDQstGL0LHQvtGA0LUg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C10Lwg0L3QsNGB0YLRgNC+0LXQuiDQvdC1INC30LDQv9GA0LDRiNC40LLQsNGC0Ywg0L/QvtGB0YLQvtGP0L3QvdC+INC00LDQvdC90YvQtVxyXG4gICAgICAgIC8v0L7QsdC90L7QstC70Y/RgtGMINGC0L7Qu9GM0LrQviDQv9GA0Lgg0L/QtdGA0LXQutC70Y7Rh9C10L3QuNC4INCy0LrQu9Cw0LTQutC4INC90LAg0L/QvtCz0L7QtNC90YPRjlxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIgKCl7XHJcbiAgICAgICAgbGV0IHNob3dUYWJDb250ZW50ID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhY3RpdmVDbGFzcyA9IGNzcy5hY3RpdmU7XHJcbiAgICAgICAgICAgIGxldCBhY3RpdmVUYWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIGFjdGl2ZUNsYXNzKTtcclxuICAgICAgICAgICAgYWN0aXZlVGFiLmNsYXNzTGlzdC5yZW1vdmUoYWN0aXZlQ2xhc3MpO1xyXG4gICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChhY3RpdmVDbGFzcyk7XHJcbiAgICAgICAgICAgIGxldCBpZENvbnRlbnQgPSBldmVudC50YXJnZXQuaWQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2aW91c1N0YXRlLCBjdXJyZW50UHJvcHMpID0+IHtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzU3RhdGUuc2V0dGluZ3Muc2hvd1RhYiA9IGlkQ29udGVudDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1N0YXRlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgY2hhbmdlU2hvd0NpdHkgPSAoaWREaXNwbGF5Q2l0eSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlICgocHJldmlvdXNTdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNTdGF0ZS5zZXR0aW5ncy5pZF9kaXNwbGF5X2NpdHkgPSBpZERpc3BsYXlDaXR5O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzU3RhdGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBjaGFuZ2VDaXRpZXNMaXN0ID0gKGNpdHkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSAoKHByZXZpb3VzU3RhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzU3RhdGUuY2l0aWVzW2NpdHkuaWRdID0gY2l0eTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1N0YXRlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2l0eVdlYXRoZXJEYXRhIChjaXR5LmlkLCAxMDAwKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgdXBkYXRlVW5pdFNldHRpbmdzID0gdGhpcy51cGRhdGVVbml0U2V0dGluZ3MuYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgbGV0IHNob3dUYWIgPSB0aGlzLnN0YXRlLnNldHRpbmdzLnNob3dUYWI7XHJcbiAgICAgICAgbGV0IHRhYnMgPSBbXCJ3ZWF0aGVyXCIsIFwiY2l0aWVzXCIsIFwic2V0dGluZ3NcIl0ubWFwKCh0YWJOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc1RhYiA9IGNzcy50YWIgICsgKHNob3dUYWI9PXRhYk5hbWUgPyBcIiBcIiArIGNzcy5hY3RpdmUgOiAnJyk7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPXt0YWJOYW1lfSBjbGFzc05hbWU9e2NsYXNzVGFifSBrZXk9e3RhYk5hbWV9IG9uQ2xpY2s9e3Nob3dUYWJDb250ZW50fT57dGFiTmFtZX08L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzcy53ZWF0aGVyX2NvbnRhaW5lcn0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYnNcIj5cclxuICAgICAgICAgICAgICAgICAgICB7dGFic31cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPFdlYXRoZXIgY2l0aWVzPXt0aGlzLnN0YXRlLmNpdGllc30gc2V0dGluZ3M9e3RoaXMuc3RhdGUuc2V0dGluZ3N9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VTaG93Q2l0eT17Y2hhbmdlU2hvd0NpdHl9Lz5cclxuICAgICAgICAgICAgICAgIDxTZXR0aW5ncyBzZXR0aW5ncz17dGhpcy5zdGF0ZS5zZXR0aW5nc30gdXBkYXRlVW5pdFNldHRpbmdzPXt1cGRhdGVVbml0U2V0dGluZ3N9Lz5cclxuICAgICAgICAgICAgICAgIDxDaXRpZXMgc2V0dGluZ3M9e3RoaXMuc3RhdGUuc2V0dGluZ3N9IGNpdGllcz17dGhpcy5zdGF0ZS5jaXRpZXN9IGNoYW5nZUNpdGllc0xpc3Q9e2NoYW5nZUNpdGllc0xpc3R9Lz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNpdGllc1dlYXRoZXJEYXRhICgpe1xyXG4gICAgICAgIC8v0L/QtdGA0LLRi9C8INC+0LHQvdC+0LLQu9GP0LXQvCDQs9C+0YDQvtC0INCy0YvQstC+0LTQuNC80YvQuSDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxyXG4gICAgICAgIGxldCBpbmRleERpc3BsYXlDaXR5ID0gdGhpcy5zdGF0ZS5zZXR0aW5ncy5pZF9kaXNwbGF5X2NpdHk7XHJcbiAgICAgICAgbGV0IGNpdGllc0tleSA9IE9iamVjdC5rZXlzKHRoaXMuc3RhdGUuY2l0aWVzKS5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhID09IGluZGV4RGlzcGxheUNpdHk/IC0xOiAxO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL3RvZG86INGD0LHRgNCw0YLRjCDQutC+0LPQtNCwINGB0L7RgdGC0L7Rj9C90LjQtSDQvdC1INCx0YPQtNC10YIg0YHRgNCw0LfRgyDQvtCx0L3QvtCy0LvRj9GC0YHRjyDQv9C+0YHQu9C1INC/0L7QuNGB0LrQsCDQvdC+0LLQvtCz0L4g0LPQvtGA0L7QtNCwXHJcbiAgICAgICAgbGV0IHRpbWVvdXQgPSAxMDAwO1xyXG5cclxuICAgICAgICBsZXQgY2l0aWVzID0gdGhpcy5zdGF0ZS5jaXRpZXM7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIGNpdGllc0tleSkge1xyXG4gICAgICAgICAgICBsZXQgY2l0eUlkID0gY2l0aWVzW2tleV0uaWQ7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2l0eVdlYXRoZXJEYXRhIChjaXR5SWQsIHRpbWVvdXQpO1xyXG5cclxuICAgICAgICAgICAgdGltZW91dCArPSAyMDAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDaXR5V2VhdGhlckRhdGEgKGNpdHlJZCwgdGltZW91dCl7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLnNldHRpbmdzLkFQSS5vcGVud2VhdGhlcm1hcC5rZXkpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGFTb3VyY2UgPSBuZXcgRFNPcGVuV2VhdGhlciAoe1xyXG4gICAgICAgICAgICBrZXk6IHRoaXMuc3RhdGUuc2V0dGluZ3MuQVBJLm9wZW53ZWF0aGVybWFwLmtleSxcclxuICAgICAgICAgICAgdW5pdDogdGhpcy5zdGF0ZS5zZXR0aW5ncy51bml0X21lYXN1cmUsXHJcbiAgICAgICAgICAgIGxhbmc6IHRoaXMuc3RhdGUuc2V0dGluZ3MubGFuZ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgaGFuZGxlclVwZGF0ZUNpdHlXZWF0aGVyRGF0YSA9IHRoaXMuaGFuZGxlclVwZGF0ZUNpdHlXZWF0aGVyRGF0YS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIGRhdGFTb3VyY2UuZ2V0RGF0YU1ldGhvZCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3dlYXRoZXInLFxyXG4gICAgICAgICAgICBwYXJhbToge1xyXG4gICAgICAgICAgICAgICAgaWQ6IGNpdHlJZFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoYW5kbGVyOiBoYW5kbGVyVXBkYXRlQ2l0eVdlYXRoZXJEYXRhLFxyXG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lb3V0XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRpbWVvdXQgKz0gMTAwMDtcclxuXHJcbiAgICAgICAgZGF0YVNvdXJjZS5nZXREYXRhTWV0aG9kKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnZm9yZWNhc3QnLFxyXG4gICAgICAgICAgICBwYXJhbToge1xyXG4gICAgICAgICAgICAgICAgaWQ6IGNpdHlJZCxcclxuICAgICAgICAgICAgICAgIGNudDogNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoYW5kbGVyOiBoYW5kbGVyVXBkYXRlQ2l0eVdlYXRoZXJEYXRhLFxyXG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lb3V0XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlclVwZGF0ZUNpdHlXZWF0aGVyRGF0YSAoZGF0YSwgZGF0YUVycm9yKXtcclxuICAgICAgICBpZiAoZGF0YT09bnVsbCl7XHJcbiAgICAgICAgICAgIGlmIChkYXRhRXJyb3IuY29kPT00MDQpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcItCT0L7RgNC+0LQg0L3QtSDQvdCw0LnQtNC10L1cIik7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xyXG5cclxuICAgICAgICBkYXRhID0gRGVjb3JhdGVXZWF0aGVyRGF0YS5nZXREZWNvcmF0ZURhdGEoZGF0YSwgdGhpcy5zdGF0ZS51bml0cyk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUgKChwcmV2aW91c1N0YXRlLCBjdXJyZW50UHJvcHMpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNpdHkgPSBwcmV2aW91c1N0YXRlLmNpdGllc1tkYXRhLmlkXTtcclxuICAgICAgICAgICAgY2l0eS5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgICAgICAgICBjaXR5LmNvdW50cnkgPSBkYXRhLmNvdW50cnk7XHJcbiAgICAgICAgICAgIGNpdHkubG9jID0gZGF0YS5sb2M7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2l0eVdlYXRoZXIgPSBjaXR5LndlYXRoZXI7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzIChkYXRhLndlYXRoZXIpLmZvckVhY2goKGspID0+IHtcclxuICAgICAgICAgICAgICAgIGNpdHlXZWF0aGVyIFtrXSA9IGRhdGEud2VhdGhlcltrXTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNTdGF0ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlU2V0dGluZ3MgKHN0YXRlKSB7XHJcbiAgICAgICAgbGV0IGxvY2FsU3RvcmFnZVN1cHBvcnQgPSAnbG9jYWxTdG9yYWdlJyBpbiB3aW5kb3cgJiYgd2luZG93Wydsb2NhbFN0b3JhZ2UnXSAhPT0gbnVsbDtcclxuXHJcbiAgICAgICAgbGV0IGxvY2FsU3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0ge307XHJcblxyXG4gICAgICAgIHNldHRpbmdzLmNpdGllcyA9IE9iamVjdC5rZXlzKHRoaXMuc3RhdGUuY2l0aWVzKS5tYXAgKChrZXkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGtleTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZXR0aW5ncy5zZXR0aW5ncyA9IHRoaXMuc3RhdGUuc2V0dGluZ3M7XHJcblxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS53ZWF0aGVyX2FwcCA9IEpTT04uc3RyaW5naWZ5KHNldHRpbmdzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXN1bWVTZXR0aW5nICgpe1xyXG4gICAgICAgIGxldCBsb2NhbFN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xyXG4gICAgICAgIGxldCBzZXR0aW5ncyA9IGxvY2FsU3RvcmFnZS53ZWF0aGVyX2FwcDtcclxuICAgICAgICBpZiAoc2V0dGluZ3MpXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHNldHRpbmdzKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiB1cGRhdGVVbml0U2V0dGluZ3MgKi9cclxuICAgIHVwZGF0ZVVuaXRTZXR0aW5ncyAoZXZlbnQpe1xyXG4gICAgICAgIGxldCB1bml0TWVhc3VyZSA9IGV2ZW50LnRhcmdldC5pZDtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSAoKHByZXZpb3VzU3RhdGUsIGN1cnJlbnRQcm9wcykgPT4ge1xyXG4gICAgICAgICAgICBwcmV2aW91c1N0YXRlLnNldHRpbmdzLnVuaXRfbWVhc3VyZSA9IHVuaXRNZWFzdXJlO1xyXG5cclxuICAgICAgICAgICAgbGV0IHVuaXRNZWFzdXJlVHlwZSA9IFVuaXRNZWFzdXJlLnR5cGVbdW5pdE1lYXN1cmVdO1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh1bml0TWVhc3VyZVR5cGUpLmZvckVhY2goKGtleSk9PiB7XHJcbiAgICAgICAgICAgICAgICBwcmV2aW91c1N0YXRlLnVuaXRzW2tleV0gPSB1bml0TWVhc3VyZVR5cGVba2V5XTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNTdGF0ZTtcclxuICAgICAgICB9LCAoKSA9PiB0aGlzLnVwZGF0ZUNpdGllc1dlYXRoZXJEYXRhKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNldHRpbmdGcm9tTG9jYWxPckRlZmF1bHQgKCl7XHJcbiAgICAgICAgbGV0IHN0b3JhZ2VEYXRhID0gdGhpcy5yZXN1bWVTZXR0aW5nKCk7XHJcbiAgICAgICAgbGV0IHN0YXRlID0ge307XHJcblxyXG4gICAgICAgIGlmIChzdG9yYWdlRGF0YSl7XHJcbiAgICAgICAgICAgIC8v0LLQvtGB0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INCx0LvQvtC6IHVuaXRzXHJcbiAgICAgICAgICAgIGxldCB1bml0TWVhc3VyZSA9IHN0b3JhZ2VEYXRhLnNldHRpbmdzLnVuaXRfbWVhc3VyZTtcclxuICAgICAgICAgICAgbGV0IHVuaXRzID0ge307XHJcbiAgICAgICAgICAgIHVuaXRzLnRlbXBlcmF0dXJlID0gVW5pdE1lYXN1cmUudHlwZVt1bml0TWVhc3VyZV0udGVtcGVyYXR1cmU7XHJcbiAgICAgICAgICAgIHVuaXRzLndpbmQgPSBVbml0TWVhc3VyZS50eXBlW3VuaXRNZWFzdXJlXS53aW5kO1xyXG4gICAgICAgICAgICB1bml0cy5wcmVzc3VyZSA9ICBVbml0TWVhc3VyZS5wcmVzc3VyZTtcclxuICAgICAgICAgICAgdW5pdHMucHJlY2lwaXRhdGlvbiA9ICBVbml0TWVhc3VyZS5wcmVjaXBpdGF0aW9uO1xyXG4gICAgICAgICAgICBzdGF0ZS51bml0cyA9IHVuaXRzO1xyXG5cclxuICAgICAgICAgICAgLy/QstC+0YHRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0LHQu9C+0LogY2l0aWVzXHJcbiAgICAgICAgICAgIGxldCBjaXRpZXMgPSB7fTtcclxuICAgICAgICAgICAgc3RvcmFnZURhdGEuY2l0aWVzLmZvckVhY2goKGlkQ2l0eSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2l0aWVzIFtpZENpdHldID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZENpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlcjoge31cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHN0YXRlLmNpdGllcyA9IGNpdGllcztcclxuXHJcbiAgICAgICAgICAgIC8v0LLQvtGB0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INCx0LvQvtC6IHNldHRpbmdzXHJcbiAgICAgICAgICAgIGxldCBzZXR0aW5ncyA9IHN0b3JhZ2VEYXRhLnNldHRpbmdzO1xyXG5cclxuICAgICAgICAgICAgLy/QvdC10YIg0L3QsNGB0YLRgNC+0LXQuiDQv9C+0LTQutC70Y7Rh9C10L3QuNGPINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC/0YDQvtGB0LjQvCDQuNGFINC30LDQv9C+0LvQvdC40YLRjFxyXG4gICAgICAgICAgICBpZiAoIXNldHRpbmdzLkFQSS5vcGVud2VhdGhlcm1hcC5rZXkpXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5zaG93VGFiID0gXCJzZXR0aW5nc1wiO1xyXG5cclxuICAgICAgICAgICAgc3RhdGUuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICAgICAgLyp0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB1bml0czoge1xyXG4gICAgICAgICAgICAgICAgdGVtcGVyYXR1cmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkNlbHNpdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBsZXR0ZXI6IFwi0KFcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHdpbmQ6IFwibS9zXCIsXHJcbiAgICAgICAgICAgICAgICBwcmVzc3VyZTogXCJoUGFcIixcclxuICAgICAgICAgICAgICAgIHByZWNpcGl0YXRpb246IFwibW1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgdW5pdF9tZWFzdXJlOiBcIm1ldHJpY1wiLFxyXG4gICAgICAgICAgICAgICAgbGFuZzogJ2VuJyxcclxuICAgICAgICAgICAgICAgIEFQSToge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW53ZWF0aGVybWFwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJzdhYWYyNWU4MWFlMDJmMjM3YWQ3OTk5ODUwMWI4ZmUwJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzaG93VGFiOiBcIndlYXRoZXJcIixcclxuICAgICAgICAgICAgICAgIGlkX2Rpc3BsYXlfY2l0eTogXCI1MTk2OTBcIlxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgY2l0aWVzOiB7XHJcbiAgICAgICAgICAgICAgICA1MTk2OTA6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCI1MTk2OTBcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlNhaW50LVBldGVyYnVyZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50cnk6IFwiUlVcIixcclxuICAgICAgICAgICAgICAgICAgICB3ZWF0aGVyOiB7fVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDI2NDM3NDM6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCIyNjQzNzQzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJMb25kb25cIixcclxuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5OiBcIkdCXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2VhdGhlcjoge31cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07Ki9cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgV2VhdGhlckFwcDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvYXBwLmpzeFxuICoqLyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuLyQuY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIGtleSBpbiB0YXJnZXQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKHBhcmFtKXtcbiAgICAgICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBDID8gbmV3IEMocGFyYW0pIDogQyhwYXJhbSk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIGlmKElTX1BST1RPKShleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KSlba2V5XSA9IG91dDtcbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgLy8gd3JhcFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmV4cG9ydC5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5nbG9iYWwuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcxLjIuNid9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29yZS5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vJC5hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmN0eC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hLWZ1bmN0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkT2JqZWN0ID0gT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZTogICAgICRPYmplY3QuY3JlYXRlLFxuICBnZXRQcm90bzogICAkT2JqZWN0LmdldFByb3RvdHlwZU9mLFxuICBpc0VudW06ICAgICB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxcbiAgZ2V0RGVzYzogICAgJE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIHNldERlc2M6ICAgICRPYmplY3QuZGVmaW5lUHJvcGVydHksXG4gIHNldERlc2NzOiAgICRPYmplY3QuZGVmaW5lUHJvcGVydGllcyxcbiAgZ2V0S2V5czogICAgJE9iamVjdC5rZXlzLFxuICBnZXROYW1lczogICAkT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMsXG4gIGdldFN5bWJvbHM6ICRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLFxuICBlYWNoOiAgICAgICBbXS5mb3JFYWNoXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8tb2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5kZWZpbmVkLmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi8kLmNvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pb2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29mLmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmZhaWxzLmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3InKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKTtcbkl0ZXJhdG9ycy5Ob2RlTGlzdCA9IEl0ZXJhdG9ycy5IVE1MQ29sbGVjdGlvbiA9IEl0ZXJhdG9ycy5BcnJheTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4vJC5hZGQtdG8tdW5zY29wYWJsZXMnKVxuICAsIHN0ZXAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpXG4gICwgdG9JT2JqZWN0ICAgICAgICA9IHJlcXVpcmUoJy4vJC50by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLml0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBraW5kICA9IHRoaXMuX2tcbiAgICAsIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYWRkLXRvLXVuc2NvcGFibGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1zdGVwLmpzXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlcmF0b3JzLmpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuLyQuaW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1pb2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vJC5saWJyYXJ5JylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi8kLnJlZGVmaW5lJylcbiAgLCBoaWRlICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oaWRlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsIEl0ZXJhdG9ycyAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpXG4gICwgJGl0ZXJDcmVhdGUgICAgPSByZXF1aXJlKCcuLyQuaXRlci1jcmVhdGUnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi8kLnNldC10by1zdHJpbmctdGFnJylcbiAgLCBnZXRQcm90byAgICAgICA9IHJlcXVpcmUoJy4vJCcpLmdldFByb3RvXG4gICwgSVRFUkFUT1IgICAgICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBCVUdHWSAgICAgICAgICA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKSAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gICwgRkZfSVRFUkFUT1IgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKXtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgaWYoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHICAgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTXG4gICAgLCBWQUxVRVNfQlVHID0gZmFsc2VcbiAgICAsIHByb3RvICAgICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgJG5hdGl2ZSAgICA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxuICAgICwgJGRlZmF1bHQgICA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpXG4gICAgLCBtZXRob2RzLCBrZXk7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoJG5hdGl2ZSl7XG4gICAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8oJGRlZmF1bHQuY2FsbChuZXcgQmFzZSkpO1xuICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAvLyBGRiBmaXhcbiAgICBpZighTElCUkFSWSAmJiBoYXMocHJvdG8sIEZGX0lURVJBVE9SKSloaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICAgIGlmKERFRl9WQUxVRVMgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpe1xuICAgICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICAgIH1cbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpe1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gID0gcmV0dXJuVGhpcztcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogIERFRl9WQUxVRVMgID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJylcbiAgICB9O1xuICAgIGlmKEZPUkNFRClmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKXJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1kZWZpbmUuanNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmxpYnJhcnkuanNcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuaGlkZScpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnJlZGVmaW5lLmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi8kLnByb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmRlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gJC5zZXREZXNjKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaGlkZS5qc1xuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQucHJvcGVydHktZGVzYy5qc1xuICoqIG1vZHVsZSBpZCA9IDMxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuLyQuZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZGVzY3JpcHRvcnMuanNcbiAqKiBtb2R1bGUgaWQgPSAzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaGFzLmpzXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgZGVzY3JpcHRvciAgICAgPSByZXF1aXJlKCcuLyQucHJvcGVydHktZGVzYycpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLyQuc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuLyQuaGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCl7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9ICQuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSAzNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vJCcpLnNldERlc2NcbiAgLCBoYXMgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuLyQud2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpZGVmKGl0LCBUQUcsIHtjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWd9KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2V0LXRvLXN0cmluZy10YWcuanNcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHN0b3JlICA9IHJlcXVpcmUoJy4vJC5zaGFyZWQnKSgnd2tzJylcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuLyQudWlkJylcbiAgLCBTeW1ib2wgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJykuU3ltYm9sO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgU3ltYm9sICYmIFN5bWJvbFtuYW1lXSB8fCAoU3ltYm9sIHx8IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC53a3MuanNcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2hhcmVkLmpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVpZC5qc1xuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ICA9IHJlcXVpcmUoJy4vJC5zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi8kLml0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBpbmRleCA9IHRoaXMuX2lcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4ge3ZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWV9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4ge3ZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2V9O1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vJC50by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAgICwgaSA9IHRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdHJpbmctYXQuanNcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWludGVnZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA0MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgZ2V0ICAgICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuY29yZScpLmdldEl0ZXJhdG9yID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gNDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hbi1vYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA0M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLW9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi8kLmNsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmNvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgIT0gdW5kZWZpbmVkKXJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qc1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vJC53a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gKE8gPSBPYmplY3QoaXQpKVtUQUddKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY2xhc3NvZi5qc1xuICoqIG1vZHVsZSBpZCA9IDQ2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanNcbiAqKiBtb2R1bGUgaWQgPSA0N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmtleXMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLmNvcmUnKS5PYmplY3Qua2V5cztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzXG4gKiogbW9kdWxlIGlkID0gNDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIDE5LjEuMi4xNCBPYmplY3Qua2V5cyhPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpO1xuXG5yZXF1aXJlKCcuLyQub2JqZWN0LXNhcCcpKCdrZXlzJywgZnVuY3Rpb24oJGtleXMpe1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCl7XG4gICAgcmV0dXJuICRrZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzXG4gKiogbW9kdWxlIGlkID0gNDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCBjb3JlICAgID0gcmVxdWlyZSgnLi8kLmNvcmUnKVxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuLyQuZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBleGVjKXtcbiAgdmFyIGZuICA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXVxuICAgICwgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24oKXsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQub2JqZWN0LXNhcC5qc1xuICoqIG1vZHVsZSBpZCA9IDUwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2ZcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanNcbiAqKiBtb2R1bGUgaWQgPSA1MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLmNvcmUnKS5PYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qc1xuICoqIG1vZHVsZSBpZCA9IDUyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAxOS4xLjIuOSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vJC50by1vYmplY3QnKTtcblxucmVxdWlyZSgnLi8kLm9iamVjdC1zYXAnKSgnZ2V0UHJvdG90eXBlT2YnLCBmdW5jdGlvbigkZ2V0UHJvdG90eXBlT2Ype1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpe1xuICAgIHJldHVybiAkZ2V0UHJvdG90eXBlT2YodG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanNcbiAqKiBtb2R1bGUgaWQgPSA1M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qc1xuICoqIG1vZHVsZSBpZCA9IDU0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanNcbiAqKiBtb2R1bGUgaWQgPSA1NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuICoqIG1vZHVsZSBpZCA9IDU2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKXtcbiAgcmV0dXJuICQuc2V0RGVzYyhpdCwga2V5LCBkZXNjKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4gKiogbW9kdWxlIGlkID0gNTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZjIgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAoKHR5cGVvZiBjYWxsID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShjYWxsKSkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanNcbiAqKiBtb2R1bGUgaWQgPSA1OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIF9TeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgX1N5bWJvbCRpdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIF9TeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9TeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pdGVyYXRvciA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvclwiKTtcblxudmFyIF9pdGVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pdGVyYXRvcik7XG5cbnZhciBfc3ltYm9sID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sXCIpO1xuXG52YXIgX3N5bWJvbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW1ib2wpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YoX2l0ZXJhdG9yMi5kZWZhdWx0KSA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qc1xuICoqIG1vZHVsZSBpZCA9IDU5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDYwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQud2tzJykoJ2l0ZXJhdG9yJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSA2MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbFwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanNcbiAqKiBtb2R1bGUgaWQgPSA2MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJC5jb3JlJykuU3ltYm9sO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciAkICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi8kLmRlc2NyaXB0b3JzJylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi8kLnJlZGVmaW5lJylcbiAgLCAkZmFpbHMgICAgICAgICA9IHJlcXVpcmUoJy4vJC5mYWlscycpXG4gICwgc2hhcmVkICAgICAgICAgPSByZXF1aXJlKCcuLyQuc2hhcmVkJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vJC5zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgdWlkICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQudWlkJylcbiAgLCB3a3MgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC53a3MnKVxuICAsIGtleU9mICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmtleW9mJylcbiAgLCAkbmFtZXMgICAgICAgICA9IHJlcXVpcmUoJy4vJC5nZXQtbmFtZXMnKVxuICAsIGVudW1LZXlzICAgICAgID0gcmVxdWlyZSgnLi8kLmVudW0ta2V5cycpXG4gICwgaXNBcnJheSAgICAgICAgPSByZXF1aXJlKCcuLyQuaXMtYXJyYXknKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuLyQucHJvcGVydHktZGVzYycpXG4gICwgZ2V0RGVzYyAgICAgICAgPSAkLmdldERlc2NcbiAgLCBzZXREZXNjICAgICAgICA9ICQuc2V0RGVzY1xuICAsIF9jcmVhdGUgICAgICAgID0gJC5jcmVhdGVcbiAgLCBnZXROYW1lcyAgICAgICA9ICRuYW1lcy5nZXRcbiAgLCAkU3ltYm9sICAgICAgICA9IGdsb2JhbC5TeW1ib2xcbiAgLCAkSlNPTiAgICAgICAgICA9IGdsb2JhbC5KU09OXG4gICwgX3N0cmluZ2lmeSAgICAgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnlcbiAgLCBzZXR0ZXIgICAgICAgICA9IGZhbHNlXG4gICwgSElEREVOICAgICAgICAgPSB3a3MoJ19oaWRkZW4nKVxuICAsIGlzRW51bSAgICAgICAgID0gJC5pc0VudW1cbiAgLCBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5JylcbiAgLCBBbGxTeW1ib2xzICAgICA9IHNoYXJlZCgnc3ltYm9scycpXG4gICwgdXNlTmF0aXZlICAgICAgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nXG4gICwgT2JqZWN0UHJvdG8gICAgPSBPYmplY3QucHJvdG90eXBlO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBfY3JlYXRlKHNldERlc2Moe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHNldERlc2ModGhpcywgJ2EnLCB7dmFsdWU6IDd9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uKGl0LCBrZXksIEQpe1xuICB2YXIgcHJvdG9EZXNjID0gZ2V0RGVzYyhPYmplY3RQcm90bywga2V5KTtcbiAgaWYocHJvdG9EZXNjKWRlbGV0ZSBPYmplY3RQcm90b1trZXldO1xuICBzZXREZXNjKGl0LCBrZXksIEQpO1xuICBpZihwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKXNldERlc2MoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBzZXREZXNjO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uKHRhZyl7XG4gIHZhciBzeW0gPSBBbGxTeW1ib2xzW3RhZ10gPSBfY3JlYXRlKCRTeW1ib2wucHJvdG90eXBlKTtcbiAgc3ltLl9rID0gdGFnO1xuICBERVNDUklQVE9SUyAmJiBzZXR0ZXIgJiYgc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpe1xuICBpZihEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpKXtcbiAgICBpZighRC5lbnVtZXJhYmxlKXtcbiAgICAgIGlmKCFoYXMoaXQsIEhJRERFTikpc2V0RGVzYyhpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZihoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKWl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgRCA9IF9jcmVhdGUoRCwge2VudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzYyhpdCwga2V5LCBEKTtcbiAgfSByZXR1cm4gc2V0RGVzYyhpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKSRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApe1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSl7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5KTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XVxuICAgID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gIHZhciBEID0gZ2V0RGVzYyhpdCA9IHRvSU9iamVjdChpdCksIGtleSk7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSlELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdldE5hbWVzKHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTilyZXN1bHQucHVzaChrZXkpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdldE5hbWVzKHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSlyZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KGl0KXtcbiAgaWYoaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gIHZhciBhcmdzID0gW2l0XVxuICAgICwgaSAgICA9IDFcbiAgICAsICQkICAgPSBhcmd1bWVudHNcbiAgICAsIHJlcGxhY2VyLCAkcmVwbGFjZXI7XG4gIHdoaWxlKCQkLmxlbmd0aCA+IGkpYXJncy5wdXNoKCQkW2krK10pO1xuICByZXBsYWNlciA9IGFyZ3NbMV07XG4gIGlmKHR5cGVvZiByZXBsYWNlciA9PSAnZnVuY3Rpb24nKSRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICBpZigkcmVwbGFjZXIgfHwgIWlzQXJyYXkocmVwbGFjZXIpKXJlcGxhY2VyID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgaWYoJHJlcGxhY2VyKXZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgaWYoIWlzU3ltYm9sKHZhbHVlKSlyZXR1cm4gdmFsdWU7XG4gIH07XG4gIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xufTtcbnZhciBidWdneUpTT04gPSAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoe2E6IFN9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSk7XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYoIXVzZU5hdGl2ZSl7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKXtcbiAgICBpZihpc1N5bWJvbCh0aGlzKSl0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvcicpO1xuICAgIHJldHVybiB3cmFwKHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCkpO1xuICB9O1xuICByZWRlZmluZSgkU3ltYm9sLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgaXNTeW1ib2wgPSBmdW5jdGlvbihpdCl7XG4gICAgcmV0dXJuIGl0IGluc3RhbmNlb2YgJFN5bWJvbDtcbiAgfTtcblxuICAkLmNyZWF0ZSAgICAgPSAkY3JlYXRlO1xuICAkLmlzRW51bSAgICAgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gICQuZ2V0RGVzYyAgICA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICQuc2V0RGVzYyAgICA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgJC5zZXREZXNjcyAgID0gJGRlZmluZVByb3BlcnRpZXM7XG4gICQuZ2V0TmFtZXMgICA9ICRuYW1lcy5nZXQgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgJC5nZXRTeW1ib2xzID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICBpZihERVNDUklQVE9SUyAmJiAhcmVxdWlyZSgnLi8kLmxpYnJhcnknKSl7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cbn1cblxudmFyIHN5bWJvbFN0YXRpY3MgPSB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XG4gICAgcmV0dXJuIGtleU9mKFN5bWJvbFJlZ2lzdHJ5LCBrZXkpO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24oKXsgc2V0dGVyID0gZmFsc2U7IH1cbn07XG4vLyAxOS40LjIuMiBTeW1ib2wuaGFzSW5zdGFuY2Vcbi8vIDE5LjQuMi4zIFN5bWJvbC5pc0NvbmNhdFNwcmVhZGFibGVcbi8vIDE5LjQuMi40IFN5bWJvbC5pdGVyYXRvclxuLy8gMTkuNC4yLjYgU3ltYm9sLm1hdGNoXG4vLyAxOS40LjIuOCBTeW1ib2wucmVwbGFjZVxuLy8gMTkuNC4yLjkgU3ltYm9sLnNlYXJjaFxuLy8gMTkuNC4yLjEwIFN5bWJvbC5zcGVjaWVzXG4vLyAxOS40LjIuMTEgU3ltYm9sLnNwbGl0XG4vLyAxOS40LjIuMTIgU3ltYm9sLnRvUHJpbWl0aXZlXG4vLyAxOS40LjIuMTMgU3ltYm9sLnRvU3RyaW5nVGFnXG4vLyAxOS40LjIuMTQgU3ltYm9sLnVuc2NvcGFibGVzXG4kLmVhY2guY2FsbCgoXG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsJyArXG4gICdzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBmdW5jdGlvbihpdCl7XG4gIHZhciBzeW0gPSB3a3MoaXQpO1xuICBzeW1ib2xTdGF0aWNzW2l0XSA9IHVzZU5hdGl2ZSA/IHN5bSA6IHdyYXAoc3ltKTtcbn0pO1xuXG5zZXR0ZXIgPSB0cnVlO1xuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVywge1N5bWJvbDogJFN5bWJvbH0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1N5bWJvbCcsIHN5bWJvbFN0YXRpY3MpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICF1c2VOYXRpdmUsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi4yIE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gMTkuMS4yLjMgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gMTkuMS4yLjggT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhPKVxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyAyNC4zLjIgSlNPTi5zdHJpbmdpZnkodmFsdWUgWywgcmVwbGFjZXIgWywgc3BhY2VdXSlcbiRKU09OICYmICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCF1c2VOYXRpdmUgfHwgYnVnZ3lKU09OKSwgJ0pTT04nLCB7c3RyaW5naWZ5OiAkc3RyaW5naWZ5fSk7XG5cbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanNcbiAqKiBtb2R1bGUgaWQgPSA2NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICQgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLWlvYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBlbCl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwga2V5cyAgID0gJC5nZXRLZXlzKE8pXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaW5kZXggID0gMFxuICAgICwga2V5O1xuICB3aGlsZShsZW5ndGggPiBpbmRleClpZihPW2tleSA9IGtleXNbaW5kZXgrK11dID09PSBlbClyZXR1cm4ga2V5O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5rZXlvZi5qc1xuICoqIG1vZHVsZSBpZCA9IDY1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLWlvYmplY3QnKVxuICAsIGdldE5hbWVzICA9IHJlcXVpcmUoJy4vJCcpLmdldE5hbWVzXG4gICwgdG9TdHJpbmcgID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uKGl0KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZ2V0TmFtZXMoaXQpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5nZXQgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgaWYod2luZG93TmFtZXMgJiYgdG9TdHJpbmcuY2FsbChpdCkgPT0gJ1tvYmplY3QgV2luZG93XScpcmV0dXJuIGdldFdpbmRvd05hbWVzKGl0KTtcbiAgcmV0dXJuIGdldE5hbWVzKHRvSU9iamVjdChpdCkpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5nZXQtbmFtZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA2NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gYWxsIGVudW1lcmFibGUgb2JqZWN0IGtleXMsIGluY2x1ZGVzIHN5bWJvbHNcbnZhciAkID0gcmVxdWlyZSgnLi8kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIGtleXMgICAgICAgPSAkLmdldEtleXMoaXQpXG4gICAgLCBnZXRTeW1ib2xzID0gJC5nZXRTeW1ib2xzO1xuICBpZihnZXRTeW1ib2xzKXtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpXG4gICAgICAsIGlzRW51bSAgPSAkLmlzRW51bVxuICAgICAgLCBpICAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUoc3ltYm9scy5sZW5ndGggPiBpKWlmKGlzRW51bS5jYWxsKGl0LCBrZXkgPSBzeW1ib2xzW2krK10pKWtleXMucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiBrZXlzO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5lbnVtLWtleXMuanNcbiAqKiBtb2R1bGUgaWQgPSA2N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24oYXJnKXtcbiAgcmV0dXJuIGNvZihhcmcpID09ICdBcnJheSc7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLWFycmF5LmpzXG4gKiogbW9kdWxlIGlkID0gNjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDY5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9zZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpO1xuXG52YXIgX3NldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NldFByb3RvdHlwZU9mKTtcblxudmFyIF9jcmVhdGUgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvY3JlYXRlXCIpO1xuXG52YXIgX2NyZWF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGUpO1xuXG52YXIgX3R5cGVvZjIgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgKHR5cGVvZiBzdXBlckNsYXNzID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShzdXBlckNsYXNzKSkpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gKDAsIF9jcmVhdGUyLmRlZmF1bHQpKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQgPyAoMCwgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0KShzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanNcbiAqKiBtb2R1bGUgaWQgPSA3MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzXG4gKiogbW9kdWxlIGlkID0gNzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJC5jb3JlJykuT2JqZWN0LnNldFByb3RvdHlwZU9mO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanNcbiAqKiBtb2R1bGUgaWQgPSA3MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMTkuMS4zLjE5IE9iamVjdC5zZXRQcm90b3R5cGVPZihPLCBwcm90bylcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7c2V0UHJvdG90eXBlT2Y6IHJlcXVpcmUoJy4vJC5zZXQtcHJvdG8nKS5zZXR9KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzXG4gKiogbW9kdWxlIGlkID0gNzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBnZXREZXNjICA9IHJlcXVpcmUoJy4vJCcpLmdldERlc2NcbiAgLCBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24oTywgcHJvdG8pe1xuICBhbk9iamVjdChPKTtcbiAgaWYoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCl0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbih0ZXN0LCBidWdneSwgc2V0KXtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vJC5jdHgnKShGdW5jdGlvbi5jYWxsLCBnZXREZXNjKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICBzZXQodGVzdCwgW10pO1xuICAgICAgICBidWdneSA9ICEodGVzdCBpbnN0YW5jZW9mIEFycmF5KTtcbiAgICAgIH0gY2F0Y2goZSl7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKXtcbiAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICBpZihidWdneSlPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc2V0LXByb3RvLmpzXG4gKiogbW9kdWxlIGlkID0gNzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSA3NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICQgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlKFAsIEQpe1xuICByZXR1cm4gJC5jcmVhdGUoUCwgRCk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDc2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9sb2NhbElkZW50TmFtZT1bbmFtZV1fX1tsb2NhbF1fX19baGFzaDpiYXNlNjQ6NV0hLi8uLi9ub2RlX21vZHVsZXMvc3R5bHVzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLnN0eWxcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP2xvY2FsSWRlbnROYW1lPVtuYW1lXV9fW2xvY2FsXV9fX1toYXNoOmJhc2U2NDo1XSEuLy4uL25vZGVfbW9kdWxlcy9zdHlsdXMtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuc3R5bFwiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9sb2NhbElkZW50TmFtZT1bbmFtZV1fX1tsb2NhbF1fX19baGFzaDpiYXNlNjQ6NV0hLi8uLi9ub2RlX21vZHVsZXMvc3R5bHVzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLnN0eWxcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvc3R5bGUuc3R5bFxuICoqIG1vZHVsZSBpZCA9IDc3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5zdHlsZV9fd2VhdGhlcl9jb250YWluZXJfX196TmtjRyB7XFxuICB3aWR0aDogMjUwcHg7XFxuICBtYXJnaW46IDEwMHB4IGF1dG87XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxuLnN0eWxlX190YWJfY29udGFpbmVyX19fMzhWU20ge1xcbiAgZm9udC1zaXplOiAxM3B0O1xcbiAgY2xlYXI6IGxlZnQ7XFxufVxcbi5zdHlsZV9fZ2VuZXJhbF9fXzJIMUhtIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XFxufVxcbi5zdHlsZV9fZ2VuZXJhbF9faWNvbl9fXzMwRUM4IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG4uc3R5bGVfX2Rlc2NyaXB0aW9uX19fblBvcjgge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDQ1JTtcXG59XFxuLnN0eWxlX19wYXJhbWV0cl9fXzJMQjlQIHtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDMzJTtcXG59XFxuLnN0eWxlX19hY3RpdmVfX195OVFpTSB7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzAwMDtcXG59XFxuLnN0eWxlX190YWJfX18zVWlhSyB7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiAzMyU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5zdHlsZV9faGlkZV90YWJfX18zLXlMNSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG4uc3R5bGVfX2ZvcmVjYXN0X2RheV9fXzJEaGNzIHtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDI1JTtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwid2VhdGhlcl9jb250YWluZXJcIjogXCJzdHlsZV9fd2VhdGhlcl9jb250YWluZXJfX196TmtjR1wiLFxuXHRcInRhYl9jb250YWluZXJcIjogXCJzdHlsZV9fdGFiX2NvbnRhaW5lcl9fXzM4VlNtXCIsXG5cdFwiZ2VuZXJhbFwiOiBcInN0eWxlX19nZW5lcmFsX19fMkgxSG1cIixcblx0XCJnZW5lcmFsX19pY29uXCI6IFwic3R5bGVfX2dlbmVyYWxfX2ljb25fX18zMEVDOFwiLFxuXHRcImRlc2NyaXB0aW9uXCI6IFwic3R5bGVfX2Rlc2NyaXB0aW9uX19fblBvcjhcIixcblx0XCJwYXJhbWV0clwiOiBcInN0eWxlX19wYXJhbWV0cl9fXzJMQjlQXCIsXG5cdFwiYWN0aXZlXCI6IFwic3R5bGVfX2FjdGl2ZV9fX3k5UWlNXCIsXG5cdFwidGFiXCI6IFwic3R5bGVfX3RhYl9fXzNVaWFLXCIsXG5cdFwiaGlkZV90YWJcIjogXCJzdHlsZV9faGlkZV90YWJfX18zLXlMNVwiLFxuXHRcImZvcmVjYXN0X2RheVwiOiBcInN0eWxlX19mb3JlY2FzdF9kYXlfX18yRGhjc1wiXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXI/bG9jYWxJZGVudE5hbWU9W25hbWVdX19bbG9jYWxdX19fW2hhc2g6YmFzZTY0OjVdIS4vfi9zdHlsdXMtbG9hZGVyIS4vYXBwL3N0eWxlLnN0eWxcbiAqKiBtb2R1bGUgaWQgPSA3OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gNzlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxyXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0dmFyIG1lbW87XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gbWVtbztcclxuXHRcdH07XHJcblx0fSxcclxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSBbNi05XVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuXHR9KSxcclxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdH0pLFxyXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxyXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxyXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XHJcblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xyXG5cclxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xyXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XHJcblx0XHRpZighbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XHJcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xyXG5cdGlmKGlkeCA+PSAwKSB7XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmtFbGVtZW50KTtcclxuXHRyZXR1cm4gbGlua0VsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2UgaWYob2JqLnNvdXJjZU1hcCAmJlxyXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0XHRpZihzdHlsZUVsZW1lbnQuaHJlZilcclxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcclxuXHRcdH07XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcclxuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcclxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xyXG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxpbmsobGlua0VsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwKSB7XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxyXG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XHJcblxyXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xyXG5cclxuXHRsaW5rRWxlbWVudC5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcblx0aWYob2xkU3JjKVxyXG5cdFx0VVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA4MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgUnVzYWsgT2xlZyBvbiAwOS4wMi4yMDE2LlxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgR2VuZXJhbEluZm8gZnJvbSAnLi9nZW5lcmFsLWluZm8uanN4JztcclxuaW1wb3J0IERldGFpbEluZm8gZnJvbSAnLi9kZXRhaWwtaW5mby5qc3gnO1xyXG5pbXBvcnQgRm9yZWNhc3QgZnJvbSAnLi9mb3JlY2FzdC5qc3gnO1xyXG5pbXBvcnQgY3NzIGZyb20gJy4vLi4vc3R5bGUuc3R5bCc7XHJcblxyXG5jbGFzcyBXZWF0aGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yIChwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIgKHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgaWRfZGlzcGxheV9jaXR5OiB0aGlzLnByb3BzLnNldHRpbmdzLmlkX2Rpc3BsYXlfY2l0eVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIgKCl7XHJcbiAgICAgICAgbGV0IGNsYXNzVGFiQ29udGVudCA9IGNzcy50YWJfY29udGFpbmVyICsgKHRoaXMucHJvcHMuc2V0dGluZ3Muc2hvd1RhYj09J3dlYXRoZXInID8gJycgOiBcIiBcIiArIGNzcy5oaWRlX3RhYik7XHJcbiAgICAgICAgbGV0IGNpdHkgPSB0aGlzLnByb3BzLmNpdGllc1t0aGlzLnByb3BzLnNldHRpbmdzLmlkX2Rpc3BsYXlfY2l0eV07XHJcblxyXG4gICAgICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdG9kYXkgPSBuZXcgRGF0ZSh0b2RheS5nZXRGdWxsWWVhcigpLCB0b2RheS5nZXRNb250aCgpLCB0b2RheS5nZXREYXRlKCkpO1xyXG4gICAgICAgIGxldCB3ZWF0aGVyVG9kYXkgPSBjaXR5LndlYXRoZXIgPyBjaXR5LndlYXRoZXJbdG9kYXkuZ2V0VGltZSgpXTogdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICBsZXQgaGFuZGxlck5leHRDaXR5ID0gdGhpcy5jaGFuZ2VTaG93Q2l0eS5iaW5kKHRoaXMsIHRydWUpO1xyXG4gICAgICAgIGxldCBoYW5kbGVyUHJldkNpdHkgPSB0aGlzLmNoYW5nZVNob3dDaXR5LmJpbmQodGhpcywgZmFsc2UpO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NUYWJDb250ZW50fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJldkNpdHlcIiBvbkNsaWNrPXtoYW5kbGVyTmV4dENpdHl9Pis8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmV4dENpdHlcIiBvbkNsaWNrPXtoYW5kbGVyUHJldkNpdHl9Pi08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxHZW5lcmFsSW5mbyB3ZWF0aGVyPXt3ZWF0aGVyVG9kYXl9IG5hbWU9e2NpdHkubmFtZX0gY291bnRyeT17Y2l0eS5jb3VudHJ5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtjaXR5LmlkfSBzZXR0aW5ncz17dGhpcy5wcm9wcy5zZXR0aW5nc30vPlxyXG4gICAgICAgICAgICAgICAgPEZvcmVjYXN0IHdlYXRoZXI9e2NpdHkud2VhdGhlcn0vPlxyXG4gICAgICAgICAgICAgICAgPERldGFpbEluZm8gd2VhdGhlcj17d2VhdGhlclRvZGF5fS8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VTaG93Q2l0eSAobmV4dENpdHksIGV2ZW50KXtcclxuICAgICAgICBsZXQga2V5Q2l0aWVzID0gT2JqZWN0LmtleXModGhpcy5wcm9wcy5jaXRpZXMpO1xyXG4gICAgICAgIGxldCBpbmRleCA9IGtleUNpdGllcy5pbmRleE9mKHRoaXMucHJvcHMuc2V0dGluZ3MuaWRfZGlzcGxheV9jaXR5KTtcclxuXHJcbiAgICAgICAgaWYoaW5kZXg9PS0xKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aWRfZGlzcGxheV9jaXR5OiBrZXlDaXRpZXNbMF19KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGluZGV4TmV4dCA9IGluZGV4ICsgKG5leHRDaXR5PzE6LTEpO1xyXG5cclxuICAgICAgICBpbmRleE5leHQgPSBpbmRleE5leHQ8MCA/IGtleUNpdGllcy5sZW5ndGgtMTogaW5kZXhOZXh0O1xyXG4gICAgICAgIGluZGV4TmV4dCA9IGluZGV4TmV4dD09a2V5Q2l0aWVzLmxlbmd0aCA/IDA6IGluZGV4TmV4dDtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9wcy5jaGFuZ2VTaG93Q2l0eShrZXlDaXRpZXNbaW5kZXhOZXh0XSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlYXRoZXI7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL3dlYXRoZXIvd2VhdGhlci5qc3hcbiAqKi8iLCIvKipcclxuICogQ3JlYXRlZCBieSBSdXNhayBPbGVnIG9uIDEwLjAyLjIwMTYuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCBjc3MgZnJvbSAnLi8uLi9zdHlsZS5zdHlsJztcclxuXHJcbmNsYXNzIEdlbmVyYWxJbmZvIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIC8vdG9kbzogaHR0cDovL2Nzc2xvYWQubmV0L3J1L3NwaW5uZXJzXHJcbiAgICByZW5kZXIgKCl7XHJcbiAgICAgICAgbGV0IHByZWNpcGl0YXRpb25Nb2RlID0gdGhpcy5wcm9wcy53ZWF0aGVyLnByZWNpcGl0YXRpb24ubW9kZTtcclxuICAgICAgICBsZXQgcHJlY2lwaXRhdGlvbkRlY3J5cHRpb24gPSBwcmVjaXBpdGF0aW9uTW9kZSA/IGAoJHtwcmVjaXBpdGF0aW9uTW9kZX0pYDonJztcclxuICAgICAgICBsZXQgY2l0eUluZm8gPSBgJHt0aGlzLnByb3BzLm5hbWV9ICgke3RoaXMucHJvcHMuY291bnRyeX0pYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzcy5nZW5lcmFsfT5cclxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3NOYW1lPXtjc3MuZ2VuZXJhbF9faWNvbn0gc3JjPXtgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvdy8ke3RoaXMucHJvcHMud2VhdGhlci5pY29ufS5wbmdgfS8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzLmRlc2NyaXB0aW9ufT5cclxuICAgICAgICAgICAgICAgICAgICA8aDE+e3RoaXMucHJvcHMud2VhdGhlci5kZXNjcmlwdGlvbiArIHByZWNpcGl0YXRpb25EZWNyeXB0aW9ufTwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMud2VhdGhlci50ZW1wZXJhdHVyZS5hdnJ9XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj57dGhpcy5wcm9wcy53ZWF0aGVyLmRhdGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj57Y2l0eUluZm99PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5HZW5lcmFsSW5mby5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICB3ZWF0aGVyOiB7XHJcbiAgICAgICAgaWNvbjogXCIwMWRcIixcclxuICAgICAgICBuYW1lOiBcImN1cnJlbnQgd2VhdGhlcj9cIixcclxuICAgICAgICB0ZW1wZXJhdHVyZToge1xyXG4gICAgICAgICAgICBhdnI6IFwiLVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcmVjaXBpdGF0aW9uOiB7XHJcbiAgICAgICAgICAgIG1vZGU6ICctJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdlbmVyYWxJbmZvO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC93ZWF0aGVyL2dlbmVyYWwtaW5mby5qc3hcbiAqKi8iLCIvKipcclxuICogQ3JlYXRlZCBieSBSdXNhayBPbGVnIG9uIDA5LjAyLjIwMTYuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCBjc3MgZnJvbSAnLi8uLi9zdHlsZS5zdHlsJztcclxuaW1wb3J0IFBhcmFtZXRyIGZyb20gJy4vcGFyYW1ldHItaW5mby5qc3gnO1xyXG5cclxuY2xhc3MgRGV0YWlsSW5mbyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICAvL3RvZG86IEN1cnJlbnQgVVYgSW5kZXhcclxuICAgIC8vaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9hcGlfdXZcclxuICAgIHJlbmRlciAoKXtcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSB0aGlzLnByb3BzLnNldHRpbmdzO1xyXG5cclxuICAgICAgICBsZXQgd2luZERlc2NyaXB0aW9uID0gYCR7dGhpcy5wcm9wcy53ZWF0aGVyLndpbmQuc3BlZWR9LCAke3RoaXMucHJvcHMud2VhdGhlci53aW5kLmRpcmVjdGlvbn1gO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzLmRldGFpbH0+XHJcbiAgICAgICAgICAgICAgICA8UGFyYW1ldHIgbmFtZT1cIlByZXNzdXJlXCIga2V5PVwiUHJlc3N1cmVcIiB2YWx1ZT17dGhpcy5wcm9wcy53ZWF0aGVyLnByZXNzdXJlLmF2cn0vPlxyXG4gICAgICAgICAgICAgICAgPFBhcmFtZXRyIG5hbWU9XCJIdW1pZGl0eVwiIGtleT1cIkh1bWlkaXR5XCIgdmFsdWU9e3RoaXMucHJvcHMud2VhdGhlci5odW1pZGl0eX0vPlxyXG4gICAgICAgICAgICAgICAgPFBhcmFtZXRyIG5hbWU9XCJXaW5kXCIga2V5PVwiV2luZFwiIHZhbHVlPXt3aW5kRGVzY3JpcHRpb259Lz5cclxuICAgICAgICAgICAgICAgIDxQYXJhbWV0ciBuYW1lPVwiQ2xvdWRzXCIga2V5PVwiQ2xvdWRzXCIgdmFsdWU9e3RoaXMucHJvcHMud2VhdGhlci5jbG91ZHMudmFsdWV9Lz5cclxuICAgICAgICAgICAgICAgIDxQYXJhbWV0ciBuYW1lPVwiU3VucmlzZVwiIGtleT1cIlN1bnJpc2VcIiB2YWx1ZT17dGhpcy5wcm9wcy53ZWF0aGVyLnN1bi5yaXNlfS8+XHJcbiAgICAgICAgICAgICAgICA8UGFyYW1ldHIgbmFtZT1cIlN1bnNldFwiIGtleT1cIlN1bnNldFwiIHZhbHVlPXt0aGlzLnByb3BzLndlYXRoZXIuc3VuLnNldH0vPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbkRldGFpbEluZm8uZGVmYXVsdFByb3BzID0ge1xyXG4gICAgd2VhdGhlcjoge1xyXG4gICAgICAgIHByZXNzdXJlOiB7XHJcbiAgICAgICAgICAgIGF2cjogJy0nXHJcbiAgICAgICAgfSxcclxuICAgICAgICB3aW5kOiB7XHJcbiAgICAgICAgICAgIHNwZWVkOiAnLScsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJy0nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbG91ZHM6IHtcclxuICAgICAgICAgICAgdmFsdWU6ICctJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VuOiB7XHJcbiAgICAgICAgICAgIHJpc2U6ICctJyxcclxuICAgICAgICAgICAgc2V0OiAnLSdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2V0dGluZ3M6IHt9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxJbmZvO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC93ZWF0aGVyL2RldGFpbC1pbmZvLmpzeFxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJ1c2FrIE9sZWcgb24gMDkuMDIuMjAxNi5cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IGNzcyBmcm9tICcuLy4uL3N0eWxlLnN0eWwnO1xyXG5cclxuY2xhc3MgUGFyYW1ldHIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IgKHByb3BzKXtcclxuICAgICAgICBzdXBlciAocHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlciAoKXtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzLnBhcmFtZXRyfT5cclxuICAgICAgICAgICAgICAgIDxkaXY+e3RoaXMucHJvcHMubmFtZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXY+e3RoaXMucHJvcHMudmFsdWV9PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuUGFyYW1ldHIuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdmFsdWU6ICctJ1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYXJhbWV0cjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvd2VhdGhlci9wYXJhbWV0ci1pbmZvLmpzeFxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJ1c2FrIE9sZWcgb24gMDkuMDIuMjAxNi5cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IGNzcyBmcm9tICcuLy4uL3N0eWxlLnN0eWwnO1xyXG5pbXBvcnQgRm9yZWNhc3REYXkgZnJvbSAnLi9mb3JlY2FzdC1kYXkuanN4JztcclxuXHJcbmNsYXNzIEZvcmVjYXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlciAoKXtcclxuICAgICAgICBsZXQgZm9yZWNhc3REYXkgPSBbXTtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnByb3BzLndlYXRoZXIpLnNvcnQoKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgZm9yZWNhc3REYXkucHVzaCg8Rm9yZWNhc3REYXkgd2VhdGhlcj17dGhpcy5wcm9wcy53ZWF0aGVyW2tleV19IGtleT17a2V5fS8+KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzLmZvcmVjYXN0fT5cclxuICAgICAgICAgICAgICAgIHtmb3JlY2FzdERheX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5Gb3JlY2FzdC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICB3ZWF0aGVyOiB7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGb3JlY2FzdDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvd2VhdGhlci9mb3JlY2FzdC5qc3hcbiAqKi8iLCIvKipcclxuICogQ3JlYXRlZCBieSBSdXNhayBPbGVnIG9uIDA5LjAyLjIwMTYuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmltcG9ydCBjc3MgZnJvbSAnLi8uLi9zdHlsZS5zdHlsJztcclxuXHJcbmNsYXNzIEZvcmVjYXN0RGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGdldFRpdGxlKCkge1xyXG4gICAgICAgIGxldCBwcmVjaXBpdGF0aW9uTW9kZSA9IHRoaXMucHJvcHMud2VhdGhlci5wcmVjaXBpdGF0aW9uLm1vZGU7XHJcbiAgICAgICAgbGV0IHByZWNpcGl0YXRpb25EZWNyeXB0aW9uID0gcHJlY2lwaXRhdGlvbk1vZGUgPyBgKCR7cHJlY2lwaXRhdGlvbk1vZGV9KWA6Jyc7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMucHJvcHMud2VhdGhlci5kZXNjcmlwdGlvbn0ke3ByZWNpcGl0YXRpb25EZWNyeXB0aW9ufWA7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCB0aXRsZSA9IHRoaXMuZ2V0VGl0bGUoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzcy5mb3JlY2FzdF9kYXl9PlxyXG4gICAgICAgICAgICAgICAgPGRpdj57dGhpcy5wcm9wcy53ZWF0aGVyLmRhdGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aW1nIGFsdD17dGl0bGV9IHRpdGxlPXt0aXRsZX1cclxuICAgICAgICAgICAgICAgICAgICAgc3JjPXtgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvdy8ke3RoaXMucHJvcHMud2VhdGhlci5pY29ufS5wbmdgfS8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2Pnt0aGlzLnByb3BzLndlYXRoZXIudGVtcGVyYXR1cmUubWlufS97dGhpcy5wcm9wcy53ZWF0aGVyLnRlbXBlcmF0dXJlLm1heH08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5Gb3JlY2FzdERheS5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICB3ZWF0aGVyOiB7XHJcbiAgICAgICAgaWNvbjogXCIwMWRcIixcclxuICAgICAgICB0ZW1wZXJhdHVyZToge1xyXG4gICAgICAgICAgICBtaW46ICctJyxcclxuICAgICAgICAgICAgbWF4OiAnLSdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGb3JlY2FzdERheTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvd2VhdGhlci9mb3JlY2FzdC1kYXkuanN4XG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgUnVzYWsgT2xlZyBvbiAxNS4wMi4yMDE2LlxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgY3NzIGZyb20gJy4vLi4vc3R5bGUuc3R5bCc7XHJcbmltcG9ydCBjc3Nfc2V0dGluZ3MgZnJvbSAnLi9zZXR0aW5ncy5zdHlsJztcclxuXHJcbmltcG9ydCBVbml0TWVhc3VyZSBmcm9tICcuLy4uL2xpYi91bml0LW1lYXN1cmUnO1xyXG5cclxuY29uc3QgREVHUkVFX0NIQVJfQ09ERSA9IDE3NjtcclxuY29uc3QgREVHUkVFX0NIQVIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKERFR1JFRV9DSEFSX0NPREUpO1xyXG5cclxuY2xhc3MgU2V0dGluZ3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgICBjb25zdHJ1Y3RvciAocHJvcHMpe1xyXG4gICAgICAgIHN1cGVyIChwcm9wcyk7XHJcblxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICogRW5nbGlzaCAtIGVuLCBSdXNzaWFuIC0gcnUsIEl0YWxpYW4gLSBpdCwgU3BhbmlzaCAtIGVzIChvciBzcCksIFVrcmFpbmlhbiAtIHVrIChvciB1YSksXHJcbiAgICAgICAgKiBHZXJtYW4gLSBkZSwgUG9ydHVndWVzZSAtIHB0LCBSb21hbmlhbiAtIHJvLCBQb2xpc2ggLSBwbCwgRmlubmlzaCAtIGZpLCBEdXRjaCAtIG5sLFxyXG4gICAgICAgICogRnJlbmNoIC0gZnIsIEJ1bGdhcmlhbiAtIGJnLCBTd2VkaXNoIC0gc3YgKG9yIHNlKSwgQ2hpbmVzZSBUcmFkaXRpb25hbCAtIHpoX3R3LFxyXG4gICAgICAgICogQ2hpbmVzZSBTaW1wbGlmaWVkIC0gemggKG9yIHpoX2NuKSwgVHVya2lzaCAtIHRyLCBDcm9hdGlhbiAtIGhyLCBDYXRhbGFuIC0gY2EgKi9cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCAoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyICgpe1xyXG4gICAgICAgIGxldCBjbGFzc1RhYkNvbnRlbnQgPSBjc3MudGFiX2NvbnRhaW5lciArICh0aGlzLnByb3BzLnNldHRpbmdzLnNob3dUYWI9PSdzZXR0aW5ncycgPyAnJyA6IFwiIFwiICsgY3NzLmhpZGVfdGFiKTtcclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnRVbml0TWVhc3VyZSA9IHRoaXMucHJvcHMuc2V0dGluZ3MudW5pdF9tZWFzdXJlO1xyXG4gICAgICAgIGxldCBtZWFzdXJlID0gT2JqZWN0LmtleXMoVW5pdE1lYXN1cmUudHlwZSkubWFwICgodW5pdFR5cGVJZCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdW5pdFR5cGUgPSBVbml0TWVhc3VyZS50eXBlIFt1bml0VHlwZUlkXTtcclxuICAgICAgICAgICAgbGV0IGNoZWNrZWQgPSBjdXJyZW50VW5pdE1lYXN1cmU9PXVuaXRUeXBlSWQgPyBcImRlZmF1bHRDaGVja2VkXCI6Jyc7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17dW5pdFR5cGVJZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPXt1bml0VHlwZUlkfSBuYW1lPVwidW5pdE1lYXN1cmVcIiByZWY9XCJ1bml0TWVhc3VyZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt1bml0VHlwZUlkfSBjaGVja2VkPXtjaGVja2VkfSBvbkNoYW5nZT17dGhpcy5wcm9wcy51cGRhdGVVbml0U2V0dGluZ3N9Lz5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17dW5pdFR5cGVJZH0+e3VuaXRUeXBlSWR9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NUYWJDb250ZW50fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjc3MuZmllbGR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5EYXRhIFNvdXJjZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwiT3BlbldlYXRoZXJNYXBcIiBuYW1lPVwiZGF0YVNvdXJjZVwiIHJlZj1cImRhdGFTb3VyY2VcIiB2YWx1ZT1cIk9wZW5XZWF0aGVyTWFwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRDaGVja2VkIHJlYWRPbmx5Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJPcGVuV2VhdGhlck1hcFwiPk9wZW5XZWF0aGVyTWFwPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzcy5maWVsZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkFQSSBLZXkgKDxhIGhyZWY9XCJodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2FwcGlkXCI+Z2V0IGtleTwvYT4pPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgcmVmPVwia2V5QXBpXCIgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLnNldHRpbmdzLkFQSS5vcGVud2VhdGhlcm1hcC5rZXl9Lz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzcy5maWVsZH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkRhdGEgcmVjZWl2ZSBsYW5ndWFnZXM8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cIk9wZW5XZWF0aGVyTWFwXCIgbmFtZT1cImRhdGFTb3VyY2VcIiByZWY9XCJkYXRhU291cmNlXCIgdmFsdWU9XCJPcGVuV2VhdGhlck1hcFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0Q2hlY2tlZCByZWFkT25seS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiT3BlbldlYXRoZXJNYXBcIj5PcGVuV2VhdGhlck1hcDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjc3MuZmllbGR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5Vbml0IG1lYXN1cmU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIHttZWFzdXJlfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8VW5pdEV4YW1wbGUgdW5pdFR5cGU9e3RoaXMucHJvcHMuc2V0dGluZ3MudW5pdF9tZWFzdXJlfS8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxubGV0IFVuaXRFeGFtcGxlID0gKHByb3BzKSA9PiB7XHJcbiAgICBsZXQgY3VycmVudFVuaXRNZWFzdXJlID0gcHJvcHMudW5pdFR5cGU7XHJcbiAgICBsZXQgbWVhc3VyZSA9IFVuaXRNZWFzdXJlLnR5cGVbY3VycmVudFVuaXRNZWFzdXJlXTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjc3Nfc2V0dGluZ3MudW5pdF9leGFtcGxlfT5cclxuICAgICAgICAgICAgPGxhYmVsPkxvb2sgbGlrZTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxkaXY+VGVtcGVyYXR1cmU6IHttZWFzdXJlLnRlbXBlcmF0dXJlLmV4YW1wbGUrREVHUkVFX0NIQVJ9e21lYXN1cmUudGVtcGVyYXR1cmUubGV0dGVyfSh7bWVhc3VyZS50ZW1wZXJhdHVyZS5uYW1lfSk8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj5XaW5kOiB7bWVhc3VyZS53aW5kX2V4YW1wbGV9e21lYXN1cmUud2luZH0sIFMoU291dGgpPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+UHJlc3N1cmU6IHtVbml0TWVhc3VyZS5wcmVzc3VyZV9leGFtcGxlfXtVbml0TWVhc3VyZS5wcmVzc3VyZX08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj5QcmVjaXBpdGF0aW9uOiB7VW5pdE1lYXN1cmUucHJlY2lwaXRhdGlvbl9leGFtcGxlfXtVbml0TWVhc3VyZS5wcmVjaXBpdGF0aW9ufTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ3M7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL3NldHRpbmdzL3NldHRpbmdzLmpzeFxuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP2xvY2FsSWRlbnROYW1lPVtuYW1lXV9fW2xvY2FsXV9fX1toYXNoOmJhc2U2NDo1XSEuLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsdXMtbG9hZGVyL2luZGV4LmpzIS4vc2V0dGluZ3Muc3R5bFwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bG9jYWxJZGVudE5hbWU9W25hbWVdX19bbG9jYWxdX19fW2hhc2g6YmFzZTY0OjVdIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWx1cy1sb2FkZXIvaW5kZXguanMhLi9zZXR0aW5ncy5zdHlsXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP2xvY2FsSWRlbnROYW1lPVtuYW1lXV9fW2xvY2FsXV9fX1toYXNoOmJhc2U2NDo1XSEuLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsdXMtbG9hZGVyL2luZGV4LmpzIS4vc2V0dGluZ3Muc3R5bFwiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9zZXR0aW5ncy9zZXR0aW5ncy5zdHlsXG4gKiogbW9kdWxlIGlkID0gODlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlcj9sb2NhbElkZW50TmFtZT1bbmFtZV1fX1tsb2NhbF1fX19baGFzaDpiYXNlNjQ6NV0hLi9+L3N0eWx1cy1sb2FkZXIhLi9hcHAvc2V0dGluZ3Mvc2V0dGluZ3Muc3R5bFxuICoqIG1vZHVsZSBpZCA9IDkwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcclxuICogQ3JlYXRlZCBieSBSdXNhayBPbGVnIG9uIDA5LjAyLjIwMTYuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGNzcyBmcm9tICcuLy4uL3N0eWxlLnN0eWwnO1xyXG5pbXBvcnQgY3NzX2NpdGllcyBmcm9tICcuL2NpdGllcy5zdHlsJztcclxuXHJcbmltcG9ydCBEU09wZW5XZWF0aGVyIGZyb20gJy4vLi4vbGliL29wZW4td2VhdGhlci5qcyc7XHJcblxyXG5jb25zdCBLRVlfQ09ERV9FTlRFUiA9IDEzO1xyXG5cclxuY2xhc3MgQ2l0aWVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yIChwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIgKHByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLnJlZnMuY2l0eS5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgY2xhc3NUYWJDb250ZW50ID0gY3NzLnRhYl9jb250YWluZXIgKyAodGhpcy5wcm9wcy5zZXR0aW5ncy5zaG93VGFiID09ICdjaXRpZXMnID8gJycgOiBcIiBcIiArIGNzcy5oaWRlX3RhYik7XHJcblxyXG4gICAgICAgIGxldCBkYXRhU291cmNlID0gbmV3IERTT3BlbldlYXRoZXIoe1xyXG4gICAgICAgICAgICBrZXk6IHRoaXMucHJvcHMuc2V0dGluZ3MuQVBJLm9wZW53ZWF0aGVybWFwLmtleSxcclxuICAgICAgICAgICAgdW5pdDogdGhpcy5wcm9wcy5zZXR0aW5ncy51bml0X21lYXN1cmUsXHJcbiAgICAgICAgICAgIGxhbmc6IHRoaXMucHJvcHMuc2V0dGluZ3MubGFuZ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgaGFuZGxlckNsaWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50eXBlPT0na2V5ZG93bicgJiYgZXZlbnQubmF0aXZlRXZlbnQua2V5Q29kZSE9S0VZX0NPREVfRU5URVIpe1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZS5zZXR0aW5ncy5BUEkub3BlbndlYXRoZXJtYXAua2V5KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZGF0YVNvdXJjZS5nZXREYXRhTWV0aG9kICh7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICd3ZWF0aGVyJyxcclxuICAgICAgICAgICAgICAgIHBhcmFtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcTogdGhpcy5yZWZzLmNpdHkudmFsdWVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiAoZGF0YSwgZGF0YUVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGE9PW51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUVycm9yLmNvZD09NDA0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLQk9C+0YDQvtC0INC90LUg0L3QsNC50LTQtdC9XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmNoYW5nZUNpdGllc0xpc3QoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDEwMDBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgaGFuZGxlclJlbW92ZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2l0eUlkID0gZXZlbnQuY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmlkO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2aW91c1N0YXRlLCBjdXJyZW50UHJvcHMpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBwcmV2aW91c1N0YXRlW2NpdHlJZF07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldmlvdXNTdGF0ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IHNhdmVDaXRpZXMgPSB0aGlzLnByb3BzLmNpdGllcztcclxuICAgICAgICBsZXQgY2l0aWVzTGlzdCA9IE9iamVjdC5rZXlzKHNhdmVDaXRpZXMpLm1hcChjaXR5SWQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2l0eSA9IHNhdmVDaXRpZXNbY2l0eUlkXTtcclxuICAgICAgICAgICAgbGV0IGNpdHlEZXNjcmlwdGlvbiA9IGAke2NpdHkubmFtZX0gKCR7Y2l0eS5jb3VudHJ5fSlgO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e2Nzc19jaXRpZXMuY2l0eX0gaWQ9e2NpdHlJZH0ga2V5PXtjaXR5SWR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjc3NfY2l0aWVzLmNpdHlfbmFtZX0+e2NpdHlEZXNjcmlwdGlvbn08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Nzc19jaXRpZXMuYnV0dG9ufSBvbkNsaWNrPXtoYW5kbGVyUmVtb3ZlfT48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vdG9kbzog0LTQvtCx0LDQstC40YLRjCDQstGL0LLQvtC0INC/0YDQtdC00YPQv9GA0LXQttC00LXQvdC40Y8g0LXRgdC70Lgg0L3QtSDQt9Cw0L/QvtC70L3QtdC9INC60LvRjtGHXHJcbiAgICAgICAgLy9pZiAoIXRoaXMuc3RhdGUuc2V0dGluZ3MuQVBJLm9wZW53ZWF0aGVybWFwLmtleSlcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzVGFiQ29udGVudH0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5FbnRlciB0aGUgbmFtZSBvZiB0aGUgY2l0eSwgd2hlcmUgdGhlIHdlYXRoZXIgaXMgaW50ZXJlc3RlZDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cInNlYXJjaFwiIHR5cGU9XCJ0ZXh0XCIgcmVmPVwiY2l0eVwiIG9uS2V5RG93bj17aGFuZGxlckNsaWNrfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y3NzX2NpdGllcy5idXR0b259IG9uQ2xpY2s9e2hhbmRsZXJDbGlja30+PGkgY2xhc3NOYW1lPVwiZmEgZmEtc2VhcmNoXCI+PC9pPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+U2VsZWN0IGNpdGllczwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9e2Nzc19jaXRpZXMuY2l0aWVzfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjaXRpZXNMaXN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufTtcclxuXHJcbi8qLCBTYWludCBCYXJ0cyAgbGlnaHQgaW50ZW5zaXR5IHNob3dlciByYWluXHJcbjI0LjbCsNChICB0ZW1wZXJhdHVyZSBmcm9tIDI0IHRvIDI1wrDQoSwgd2luZCA0LjFtL3MuIGNsb3VkcyA3NSUsIDEwMTcgaHBhXHJcblxyXG5HZW8gY29vcmRzIFsgLTYyLjg0OTgsIDE3Ljg5NzggXSovXHJcblxyXG4vL3RvZG86INC00L7QsdCw0LLQuNGC0Ywg0L/QvtGB0LjQuiDQv9C+INGC0LXQutGD0YnQtdC80YMg0LzQtdGB0YLQvtC90LDRhdC+0LbQtNC10L3QuNGOXHJcblxyXG4vL3RvZG86INC00L7QsdCw0LLQuNGC0Ywg0LLRi9Cy0L7QtCDRgNC10LfRg9C70YzRgtCw0YLQsCDQv9C+0LjRgdC60LBcclxubGV0IFNlYXJjaFJlc3VsdCA9IChwcm9wcykgPT4ge1xyXG4gICAgbGV0IGNpdHkgPSBwcm9wcy5jaXR5O1xyXG4gICAgbGV0IHdlYXRoZXIgPSBjaXR5LndlYXRoZXI7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjc3NfY2l0aWVzLnJlc3VsdH0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjc3NfY2l0aWVzLnJlc3VsdF9jaXR5X25hbWV9PntgY2l0eS5uYW1lIChjaXR5LmNvdW50cnkpYH08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Nzc19jaXRpZXMucmVzdWx0X3dlYXRoZXJfZGVzY3JpcHRpb259Pnt3ZWF0aGVyLmRlc2NyaXB0aW9ufTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzX2NpdGllcy5yZXN1bHRfd2VhdGhlcl90ZW1wZXJhdHVyZX0+e3dlYXRoZXIudGVtcGVyYXR1cmUuYXZyfTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2l0aWVzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9jaXRpZXMvY2l0aWVzLmpzeFxuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP2xvY2FsSWRlbnROYW1lPVtuYW1lXV9fW2xvY2FsXV9fX1toYXNoOmJhc2U2NDo1XSEuLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsdXMtbG9hZGVyL2luZGV4LmpzIS4vY2l0aWVzLnN0eWxcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP2xvY2FsSWRlbnROYW1lPVtuYW1lXV9fW2xvY2FsXV9fX1toYXNoOmJhc2U2NDo1XSEuLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsdXMtbG9hZGVyL2luZGV4LmpzIS4vY2l0aWVzLnN0eWxcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/bG9jYWxJZGVudE5hbWU9W25hbWVdX19bbG9jYWxdX19fW2hhc2g6YmFzZTY0OjVdIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWx1cy1sb2FkZXIvaW5kZXguanMhLi9jaXRpZXMuc3R5bFwiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9jaXRpZXMvY2l0aWVzLnN0eWxcbiAqKiBtb2R1bGUgaWQgPSA5MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuY2l0aWVzX19jaXRpZXNfX18xdnA2bCB7XFxuICBwYWRkaW5nLWxlZnQ6IDBweDtcXG4gIG1hcmdpbjogMHB4IDBweDtcXG59XFxuLmNpdGllc19fY2l0eV9fXzJsdDNIIHtcXG4gIG1hcmdpbjogMnB4IDJweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJvcmRlcjogc29saWQgMXB4ICNlNWNlOGI7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcbi5jaXRpZXNfX2NpdHlfbmFtZV9fXzMxVW1yIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICBwYWRkaW5nOiAycHggOHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZjNkOTtcXG4gIGJvcmRlci1yYWRpdXM6IDRweCAwIDAgNHB4O1xcbiAgY3Vyc29yOiB0ZXh0O1xcbn1cXG4uY2l0aWVzX19idXR0b25fX18zeC1YeiB7XFxuICBjb250ZW50OiAnJztcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICBwYWRkaW5nOiAzcHggMTBweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZGQ5YTQ7XFxuICBib3JkZXItbGVmdDogc29saWQgMXB4ICNlNWNlOGI7XFxuICBib3JkZXItcmFkaXVzOiAwIDRweCA0cHggMDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwiY2l0aWVzXCI6IFwiY2l0aWVzX19jaXRpZXNfX18xdnA2bFwiLFxuXHRcImNpdHlcIjogXCJjaXRpZXNfX2NpdHlfX18ybHQzSFwiLFxuXHRcImNpdHlfbmFtZVwiOiBcImNpdGllc19fY2l0eV9uYW1lX19fMzFVbXJcIixcblx0XCJidXR0b25cIjogXCJjaXRpZXNfX2J1dHRvbl9fXzN4LVh6XCJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlcj9sb2NhbElkZW50TmFtZT1bbmFtZV1fX1tsb2NhbF1fX19baGFzaDpiYXNlNjQ6NV0hLi9+L3N0eWx1cy1sb2FkZXIhLi9hcHAvY2l0aWVzL2NpdGllcy5zdHlsXG4gKiogbW9kdWxlIGlkID0gOTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJ1c2FrIE9sZWcgb24gMjIuMDIuMjAxNi5cclxuICovXHJcblxyXG5jbGFzcyBEU09wZW5XZWF0aGVyIHtcclxuICAgIHN0YXRpYyBnZXQgbmFtZUFQSSAoKXtcclxuICAgICAgICByZXR1cm4gXCJvcGVud2VhdGhlcm1hcFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgQVBJICgpe1xyXG4gICAgICAgIHJldHVybiAge1xyXG4gICAgICAgICAgICBVUkw6ICdodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS8nLFxyXG4gICAgICAgICAgICBmb3JlY2FzdDoge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnZm9yZWNhc3QvZGFpbHknLFxyXG5cclxuICAgICAgICAgICAgICAgIG1hcDogRFNPcGVuV2VhdGhlci5tYXBEYXRhRm9yZWNhc3RcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgd2VhdGhlcjoge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnd2VhdGhlcicsXHJcbiAgICAgICAgICAgICAgICBtYXA6IERTT3BlbldlYXRoZXIubWFwRGF0YVdlYXRoZXJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG9wdGlvbnMpe1xyXG4gICAgICAgIHRoaXMua2V5ID0gb3B0aW9ucy5rZXk7XHJcbiAgICAgICAgdGhpcy51bml0ID0gb3B0aW9ucy51bml0O1xyXG4gICAgICAgIHRoaXMubGFuZyA9IG9wdGlvbnMubGFuZztcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGFNZXRob2QgKG9wdGlvbnMpe1xyXG4gICAgICAgIGxldCB7bWV0aG9kLCBoYW5kbGVyLCB0aW1lb3V0LCBwYXJhbX0gPSBvcHRpb25zO1xyXG4gICAgICAgIGxldCBjdHggPSAgIHRoaXM7XHJcbiAgICAgICAgbGV0IG1hcCA9IERTT3BlbldlYXRoZXIuQVBJW21ldGhvZF0ubWFwO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGZldGNoICh0aGlzLmdldFJlcXVlc3RBUElNZXRob2QobWV0aG9kLCBwYXJhbSkpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmNvZD09MjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcihtYXAoZGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcihudWxsLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtjb25zb2xlLmVycm9yKGVycil9KSwgdGltZW91dCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVxdWVzdEFQSU1ldGhvZCAobWV0aG9kQVBJLCBwYXJhbWV0cil7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBbXTtcclxuICAgICAgICBsZXQgd2VhdGhlckRhdGFBUEkgPSBEU09wZW5XZWF0aGVyLkFQSTtcclxuICAgICAgICBsZXQgbWV0aG9kID0gd2VhdGhlckRhdGFBUElbbWV0aG9kQVBJXS5tZXRob2Q7XHJcblxyXG4gICAgICAgIGlmICghbWV0aG9kKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm90IHN1cHBvcnQgbWV0aG9kIFske21ldGhvZEFQSX1dYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwYXJhbWV0ciA9IHBhcmFtZXRyID8gcGFyYW1ldHIgOiB7fTtcclxuXHJcbiAgICAgICAgcGFyYW1ldHIgPSBPYmplY3Qua2V5cyhwYXJhbWV0cikubWFwKChrLCBpbmRleCwgYXJyYXkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIFtrLCBwYXJhbWV0cltrXV07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBwYXJhbSA9IG5ldyBNYXAoW1xyXG4gICAgICAgICAgICBbJ0FQUElEJywgdGhpcy5rZXldLFxyXG4gICAgICAgICAgICBbJ2xhbmcnLCB0aGlzLmxhbmddLFxyXG4gICAgICAgICAgICBbJ3VuaXRzJywgdGhpcy51bml0XVxyXG4gICAgICAgIF0uY29uY2F0KHBhcmFtZXRyKSk7XHJcblxyXG4gICAgICAgIHBhcmFtLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgZGF0YS5wdXNoKGtleSArICc9JysgdmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gd2VhdGhlckRhdGFBUEkuVVJMICsgbWV0aG9kICsgJz8nICsgIGRhdGEuam9pbignJicpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBtYXBEYXRhV2VhdGhlciAoZGF0YSl7XHJcbiAgICAgICAgbGV0IG1vZGVsID0ge307XHJcbiAgICAgICAgbW9kZWwuaWQgPSBkYXRhLmlkO1xyXG4gICAgICAgIG1vZGVsLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICAgICAgbW9kZWwuY291bnRyeSA9IGRhdGEuc3lzLmNvdW50cnk7XHJcbiAgICAgICAgbW9kZWwubG9jID0ge1xyXG4gICAgICAgICAgICBsb246IGRhdGEuY29vcmQubG9uLFxyXG4gICAgICAgICAgICBsYXQ6IGRhdGEuY29vcmQubGF0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGFXZWF0aGVyID0gZGF0YS53ZWF0aGVyWzBdO1xyXG4gICAgICAgIG1vZGVsLndlYXRoZXIgPSB7fTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGUgPSBnZXREYXRlV2l0aG91dFRpbWUocGFyc2VJbnQoZGF0YS5kdCkqMTAwMCk7XHJcblxyXG4gICAgICAgIC8vdG9kbzogZGF0ZS5nZXRUaW1lKCkgY2hhbmdlIG9uICtkYXRlXHJcbiAgICAgICAgbW9kZWwud2VhdGhlcltkYXRlLmdldFRpbWUoKV0gPSB7XHJcbiAgICAgICAgICAgIGRhdGU6IGRhdGUsXHJcbiAgICAgICAgICAgIG1vZGVfaWQ6IGRhdGFXZWF0aGVyLmlkLFxyXG4gICAgICAgICAgICBuYW1lOiBkYXRhV2VhdGhlci5tYWluLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogZGF0YVdlYXRoZXIuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgIGljb246IGRhdGFXZWF0aGVyLmljb24sXHJcbiAgICAgICAgICAgIHRlbXBlcmF0dXJlOiB7XHJcbiAgICAgICAgICAgICAgICBhdnI6IGRhdGEubWFpbi50ZW1wLFxyXG4gICAgICAgICAgICAgICAgbWluOiBkYXRhLm1haW4udGVtcF9taW4sXHJcbiAgICAgICAgICAgICAgICBtYXg6IGRhdGEubWFpbi50ZW1wX21heFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwcmVzc3VyZToge1xyXG4gICAgICAgICAgICAgICAgYXZyOiBkYXRhLm1haW4ucHJlc3N1cmUsXHJcbiAgICAgICAgICAgICAgICBzZWFfbGV2ZWw6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBncm91bmRfbGV2ZWw6IG51bGxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaHVtaWRpdHk6IGRhdGEubWFpbi5odW1pZGl0eSxcclxuICAgICAgICAgICAgcHJlY2lwaXRhdGlvbjogRFNPcGVuV2VhdGhlci5nZXRQcmVjaXBpdGF0aW9uIChkYXRhKSxcclxuICAgICAgICAgICAgY2xvdWRzOiBEU09wZW5XZWF0aGVyLmdldENsb3VkIChkYXRhWydjbG91ZHMnXSksXHJcbiAgICAgICAgICAgIHdpbmQ6IHtcclxuICAgICAgICAgICAgICAgIHNwZWVkOiBkYXRhLndpbmQuc3BlZWQsXHJcbiAgICAgICAgICAgICAgICBkZWc6IGRhdGEud2luZC5kZWdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VuOiB7XHJcbiAgICAgICAgICAgICAgICByaXNlOiBuZXcgRGF0ZShwYXJzZUludChkYXRhLnN5cy5zdW5yaXNlKSoxMDAwKSxcclxuICAgICAgICAgICAgICAgIHNldDogbmV3IERhdGUocGFyc2VJbnQoZGF0YS5zeXMuc3Vuc2V0KSoxMDAwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRQcmVjaXBpdGF0aW9uIChkYXRhKXtcclxuICAgICAgICBsZXQgbW9kZWxEYXRhID0ge307XHJcbiAgICAgICAgZm9yIChsZXQgcCBpbiBkYXRhKXtcclxuICAgICAgICAgICAgaWYgKHAgPT0gJ3Nub3cnIHx8IHAgPT0gJ3JhaW4nIHx8IHAgPT0gJ25vJyl7XHJcbiAgICAgICAgICAgICAgICBtb2RlbERhdGEubW9kZSA9IHA7XHJcbiAgICAgICAgICAgICAgICBtb2RlbERhdGEudmFsdWUgPSBkYXRhW3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbW9kZWxEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRDbG91ZCAoY2xvdWREYXRhKXtcclxuICAgICAgICBsZXQgbW9kZWxEYXRhID0ge307XHJcbiAgICAgICAgZm9yIChsZXQgayBpbiBjbG91ZERhdGEpe1xyXG4gICAgICAgICAgICBtb2RlbERhdGEubW9kZSA9IGs7XHJcbiAgICAgICAgICAgIG1vZGVsRGF0YS52YWx1ZSA9IGNsb3VkRGF0YVtrXTtcclxuXHJcbiAgICAgICAgICAgIC8v0YHRh9C40YLQsNC10Lwg0YfRgtC+INCx0L7Qu9GM0YjQtSDQvtC00L3QvtCz0L4g0LfQvdCw0YfQtdC90LjRjyDQvtCx0LvQsNGH0L3QvtGB0YLQuCDQv9GA0LjQudGC0Lgg0L3QtSDQvNC+0LbQtdGCXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1vZGVsRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgbWFwRGF0YUZvcmVjYXN0IChkYXRhKXtcclxuICAgICAgICBsZXQgbW9kZWwgPSB7fTtcclxuXHJcbiAgICAgICAgbW9kZWwuaWQgPSBkYXRhLmNpdHkuaWQ7XHJcbiAgICAgICAgbW9kZWwubmFtZSA9IGRhdGEuY2l0eS5uYW1lO1xyXG4gICAgICAgIG1vZGVsLmNvdW50cnkgPSBkYXRhLmNpdHkuY291bnRyeTtcclxuICAgICAgICBtb2RlbC5sb2MgPSB7XHJcbiAgICAgICAgICAgIGxvbjogZGF0YS5jaXR5LmNvb3JkLmxvbixcclxuICAgICAgICAgICAgbGF0OiBkYXRhLmNpdHkuY29vcmQubGF0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbW9kZWwud2VhdGhlciA9IHt9O1xyXG5cclxuICAgICAgICBsZXQgdG9kYXkgPSBnZXREYXRlV2l0aG91dFRpbWUobmV3IERhdGUoKSk7XHJcbiAgICAgICAgbGV0IG1pbGxzVG9kYXkgPSB0b2RheS5nZXRUaW1lKClcclxuXHJcbiAgICAgICAgZm9yIChsZXQgZGF0YURheVdlYXRoZXIgb2YgZGF0YS5saXN0KXtcclxuXHJcbiAgICAgICAgICAgIGxldCBkYXRhV2VhdGhlciA9IGRhdGFEYXlXZWF0aGVyLndlYXRoZXJbMF07XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF0ZSA9IGdldERhdGVXaXRob3V0VGltZSAocGFyc2VJbnQoZGF0YURheVdlYXRoZXIuZHQpKjEwMDApO1xyXG5cclxuICAgICAgICAgICAgLy/RgdC10LPQvtC00L3Rj9GI0L3QuNC5INC00LXQvdGMINC/0L7Qu9GD0YfQsNC10Lwg0YfQtdGA0LXQtyDQt9Cw0L/RgNC+0YEg0Logd2VhdGhlci4g0L7QvSDQsdC+0LvQtdC1INC/0L7QtNGA0L7QsdC90YvQuVxyXG4gICAgICAgICAgICBpZiAoZGF0ZS5nZXRUaW1lKCkgPT0gbWlsbHNUb2RheSkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICBtb2RlbC53ZWF0aGVyW2RhdGUuZ2V0VGltZSgpXSA9IHtcclxuICAgICAgICAgICAgICAgIG1vZGVfaWQ6IGRhdGFXZWF0aGVyLmlkLFxyXG4gICAgICAgICAgICAgICAgZGF0ZTogZGF0ZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6IGRhdGFXZWF0aGVyLm1haW4sXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGF0YVdlYXRoZXIuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBpY29uOiBkYXRhV2VhdGhlci5pY29uLFxyXG4gICAgICAgICAgICAgICAgdGVtcGVyYXR1cmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBhdnI6IGRhdGFEYXlXZWF0aGVyLnRlbXAuZGF5LFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbjogZGF0YURheVdlYXRoZXIudGVtcC5taW4sXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4OiBkYXRhRGF5V2VhdGhlci50ZW1wLm1heFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHByZXNzdXJlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZyOiBkYXRhRGF5V2VhdGhlci5wcmVzc3VyZSxcclxuICAgICAgICAgICAgICAgICAgICBzZWFfbGV2ZWw6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdW5kX2xldmVsOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaHVtaWRpdHk6IGRhdGFEYXlXZWF0aGVyLmh1bWlkaXR5LFxyXG4gICAgICAgICAgICAgICAgcHJlY2lwaXRhdGlvbjogRFNPcGVuV2VhdGhlci5nZXRQcmVjaXBpdGF0aW9uIChkYXRhRGF5V2VhdGhlciksXHJcbiAgICAgICAgICAgICAgICBjbG91ZHM6IHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YURheVdlYXRoZXIuY2xvdWRzXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgd2luZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkOiBkYXRhRGF5V2VhdGhlci5zcGVlZCxcclxuICAgICAgICAgICAgICAgICAgICBkZWc6IGRhdGFEYXlXZWF0aGVyLmRlZ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1bjoge1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtb2RlbDtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIGdldERhdGVXaXRob3V0VGltZVxyXG4gKiBAcGFyYW0gc3RyaW5nfERhdGUg0L/RgNC10LTRgdGC0LDQstC70LXQvdC40LUg0LTQsNGC0YtcclxuICogQHJldHVybiBEYXRlINC00LDRgtCwINGBINC90YPQu9C10LLRi9C8INCy0YDQtdC80LXQvdC10LxcclxuICogKi9cclxuZnVuY3Rpb24gZ2V0RGF0ZVdpdGhvdXRUaW1lIChkKXtcclxuICAgIGxldCBkYXRlID0gbmV3IERhdGUoZCk7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRFNPcGVuV2VhdGhlcjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvbGliL29wZW4td2VhdGhlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9tYXBcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvbWFwLmpzXG4gKiogbW9kdWxlIGlkID0gOTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5tYXAnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3Lm1hcC50by1qc29uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvJC5jb3JlJykuTWFwO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vbWFwLmpzXG4gKiogbW9kdWxlIGlkID0gOTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBzdHJvbmcgPSByZXF1aXJlKCcuLyQuY29sbGVjdGlvbi1zdHJvbmcnKTtcblxuLy8gMjMuMSBNYXAgT2JqZWN0c1xucmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24nKSgnTWFwJywgZnVuY3Rpb24oZ2V0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIE1hcCgpeyByZXR1cm4gZ2V0KHRoaXMsIGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTsgfTtcbn0sIHtcbiAgLy8gMjMuMS4zLjYgTWFwLnByb3RvdHlwZS5nZXQoa2V5KVxuICBnZXQ6IGZ1bmN0aW9uIGdldChrZXkpe1xuICAgIHZhciBlbnRyeSA9IHN0cm9uZy5nZXRFbnRyeSh0aGlzLCBrZXkpO1xuICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeS52O1xuICB9LFxuICAvLyAyMy4xLjMuOSBNYXAucHJvdG90eXBlLnNldChrZXksIHZhbHVlKVxuICBzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKXtcbiAgICByZXR1cm4gc3Ryb25nLmRlZih0aGlzLCBrZXkgPT09IDAgPyAwIDoga2V5LCB2YWx1ZSk7XG4gIH1cbn0sIHN0cm9uZywgdHJ1ZSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5tYXAuanNcbiAqKiBtb2R1bGUgaWQgPSA5N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgaGlkZSAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhpZGUnKVxuICAsIHJlZGVmaW5lQWxsICA9IHJlcXVpcmUoJy4vJC5yZWRlZmluZS1hbGwnKVxuICAsIGN0eCAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5jdHgnKVxuICAsIHN0cmljdE5ldyAgICA9IHJlcXVpcmUoJy4vJC5zdHJpY3QtbmV3JylcbiAgLCBkZWZpbmVkICAgICAgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpXG4gICwgZm9yT2YgICAgICAgID0gcmVxdWlyZSgnLi8kLmZvci1vZicpXG4gICwgJGl0ZXJEZWZpbmUgID0gcmVxdWlyZSgnLi8kLml0ZXItZGVmaW5lJylcbiAgLCBzdGVwICAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlci1zdGVwJylcbiAgLCBJRCAgICAgICAgICAgPSByZXF1aXJlKCcuLyQudWlkJykoJ2lkJylcbiAgLCAkaGFzICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBpc09iamVjdCAgICAgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBzZXRTcGVjaWVzICAgPSByZXF1aXJlKCcuLyQuc2V0LXNwZWNpZXMnKVxuICAsIERFU0NSSVBUT1JTICA9IHJlcXVpcmUoJy4vJC5kZXNjcmlwdG9ycycpXG4gICwgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBpc09iamVjdFxuICAsIFNJWkUgICAgICAgICA9IERFU0NSSVBUT1JTID8gJ19zJyA6ICdzaXplJ1xuICAsIGlkICAgICAgICAgICA9IDA7XG5cbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZighJGhhcyhpdCwgSUQpKXtcbiAgICAvLyBjYW4ndCBzZXQgaWQgdG8gZnJvemVuIG9iamVjdFxuICAgIGlmKCFpc0V4dGVuc2libGUoaXQpKXJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgaWRcbiAgICBpZighY3JlYXRlKXJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3Npbmcgb2JqZWN0IGlkXG4gICAgaGlkZShpdCwgSUQsICsraWQpO1xuICAvLyByZXR1cm4gb2JqZWN0IGlkIHdpdGggcHJlZml4XG4gIH0gcmV0dXJuICdPJyArIGl0W0lEXTtcbn07XG5cbnZhciBnZXRFbnRyeSA9IGZ1bmN0aW9uKHRoYXQsIGtleSl7XG4gIC8vIGZhc3QgY2FzZVxuICB2YXIgaW5kZXggPSBmYXN0S2V5KGtleSksIGVudHJ5O1xuICBpZihpbmRleCAhPT0gJ0YnKXJldHVybiB0aGF0Ll9pW2luZGV4XTtcbiAgLy8gZnJvemVuIG9iamVjdCBjYXNlXG4gIGZvcihlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pe1xuICAgIGlmKGVudHJ5LmsgPT0ga2V5KXJldHVybiBlbnRyeTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENvbnN0cnVjdG9yOiBmdW5jdGlvbih3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKXtcbiAgICB2YXIgQyA9IHdyYXBwZXIoZnVuY3Rpb24odGhhdCwgaXRlcmFibGUpe1xuICAgICAgc3RyaWN0TmV3KHRoYXQsIEMsIE5BTUUpO1xuICAgICAgdGhhdC5faSA9ICQuY3JlYXRlKG51bGwpOyAvLyBpbmRleFxuICAgICAgdGhhdC5fZiA9IHVuZGVmaW5lZDsgICAgICAvLyBmaXJzdCBlbnRyeVxuICAgICAgdGhhdC5fbCA9IHVuZGVmaW5lZDsgICAgICAvLyBsYXN0IGVudHJ5XG4gICAgICB0aGF0W1NJWkVdID0gMDsgICAgICAgICAgIC8vIHNpemVcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgfSk7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIHtcbiAgICAgIC8vIDIzLjEuMy4xIE1hcC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgLy8gMjMuMi4zLjIgU2V0LnByb3RvdHlwZS5jbGVhcigpXG4gICAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKXtcbiAgICAgICAgZm9yKHZhciB0aGF0ID0gdGhpcywgZGF0YSA9IHRoYXQuX2ksIGVudHJ5ID0gdGhhdC5fZjsgZW50cnk7IGVudHJ5ID0gZW50cnkubil7XG4gICAgICAgICAgZW50cnkuciA9IHRydWU7XG4gICAgICAgICAgaWYoZW50cnkucCllbnRyeS5wID0gZW50cnkucC5uID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGRlbGV0ZSBkYXRhW2VudHJ5LmldO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuX2YgPSB0aGF0Ll9sID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGF0W1NJWkVdID0gMDtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuMyBNYXAucHJvdG90eXBlLmRlbGV0ZShrZXkpXG4gICAgICAvLyAyMy4yLjMuNCBTZXQucHJvdG90eXBlLmRlbGV0ZSh2YWx1ZSlcbiAgICAgICdkZWxldGUnOiBmdW5jdGlvbihrZXkpe1xuICAgICAgICB2YXIgdGhhdCAgPSB0aGlzXG4gICAgICAgICAgLCBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSk7XG4gICAgICAgIGlmKGVudHJ5KXtcbiAgICAgICAgICB2YXIgbmV4dCA9IGVudHJ5Lm5cbiAgICAgICAgICAgICwgcHJldiA9IGVudHJ5LnA7XG4gICAgICAgICAgZGVsZXRlIHRoYXQuX2lbZW50cnkuaV07XG4gICAgICAgICAgZW50cnkuciA9IHRydWU7XG4gICAgICAgICAgaWYocHJldilwcmV2Lm4gPSBuZXh0O1xuICAgICAgICAgIGlmKG5leHQpbmV4dC5wID0gcHJldjtcbiAgICAgICAgICBpZih0aGF0Ll9mID09IGVudHJ5KXRoYXQuX2YgPSBuZXh0O1xuICAgICAgICAgIGlmKHRoYXQuX2wgPT0gZW50cnkpdGhhdC5fbCA9IHByZXY7XG4gICAgICAgICAgdGhhdFtTSVpFXS0tO1xuICAgICAgICB9IHJldHVybiAhIWVudHJ5O1xuICAgICAgfSxcbiAgICAgIC8vIDIzLjIuMy42IFNldC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgLy8gMjMuMS4zLjUgTWFwLnByb3RvdHlwZS5mb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gICAgICBmb3JFYWNoOiBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgICAgICB2YXIgZiA9IGN0eChjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgMylcbiAgICAgICAgICAsIGVudHJ5O1xuICAgICAgICB3aGlsZShlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoaXMuX2Ype1xuICAgICAgICAgIGYoZW50cnkudiwgZW50cnkuaywgdGhpcyk7XG4gICAgICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICAgICAgd2hpbGUoZW50cnkgJiYgZW50cnkucillbnRyeSA9IGVudHJ5LnA7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuNyBNYXAucHJvdG90eXBlLmhhcyhrZXkpXG4gICAgICAvLyAyMy4yLjMuNyBTZXQucHJvdG90eXBlLmhhcyh2YWx1ZSlcbiAgICAgIGhhczogZnVuY3Rpb24gaGFzKGtleSl7XG4gICAgICAgIHJldHVybiAhIWdldEVudHJ5KHRoaXMsIGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYoREVTQ1JJUFRPUlMpJC5zZXREZXNjKEMucHJvdG90eXBlLCAnc2l6ZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIGRlZmluZWQodGhpc1tTSVpFXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIEM7XG4gIH0sXG4gIGRlZjogZnVuY3Rpb24odGhhdCwga2V5LCB2YWx1ZSl7XG4gICAgdmFyIGVudHJ5ID0gZ2V0RW50cnkodGhhdCwga2V5KVxuICAgICAgLCBwcmV2LCBpbmRleDtcbiAgICAvLyBjaGFuZ2UgZXhpc3RpbmcgZW50cnlcbiAgICBpZihlbnRyeSl7XG4gICAgICBlbnRyeS52ID0gdmFsdWU7XG4gICAgLy8gY3JlYXRlIG5ldyBlbnRyeVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGF0Ll9sID0gZW50cnkgPSB7XG4gICAgICAgIGk6IGluZGV4ID0gZmFzdEtleShrZXksIHRydWUpLCAvLyA8LSBpbmRleFxuICAgICAgICBrOiBrZXksICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0ga2V5XG4gICAgICAgIHY6IHZhbHVlLCAgICAgICAgICAgICAgICAgICAgICAvLyA8LSB2YWx1ZVxuICAgICAgICBwOiBwcmV2ID0gdGhhdC5fbCwgICAgICAgICAgICAgLy8gPC0gcHJldmlvdXMgZW50cnlcbiAgICAgICAgbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgIC8vIDwtIG5leHQgZW50cnlcbiAgICAgICAgcjogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHJlbW92ZWRcbiAgICAgIH07XG4gICAgICBpZighdGhhdC5fZil0aGF0Ll9mID0gZW50cnk7XG4gICAgICBpZihwcmV2KXByZXYubiA9IGVudHJ5O1xuICAgICAgdGhhdFtTSVpFXSsrO1xuICAgICAgLy8gYWRkIHRvIGluZGV4XG4gICAgICBpZihpbmRleCAhPT0gJ0YnKXRoYXQuX2lbaW5kZXhdID0gZW50cnk7XG4gICAgfSByZXR1cm4gdGhhdDtcbiAgfSxcbiAgZ2V0RW50cnk6IGdldEVudHJ5LFxuICBzZXRTdHJvbmc6IGZ1bmN0aW9uKEMsIE5BTUUsIElTX01BUCl7XG4gICAgLy8gYWRkIC5rZXlzLCAudmFsdWVzLCAuZW50cmllcywgW0BAaXRlcmF0b3JdXG4gICAgLy8gMjMuMS4zLjQsIDIzLjEuMy44LCAyMy4xLjMuMTEsIDIzLjEuMy4xMiwgMjMuMi4zLjUsIDIzLjIuMy44LCAyMy4yLjMuMTAsIDIzLjIuMy4xMVxuICAgICRpdGVyRGVmaW5lKEMsIE5BTUUsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgICAgIHRoaXMuX3QgPSBpdGVyYXRlZDsgIC8vIHRhcmdldFxuICAgICAgdGhpcy5fayA9IGtpbmQ7ICAgICAgLy8ga2luZFxuICAgICAgdGhpcy5fbCA9IHVuZGVmaW5lZDsgLy8gcHJldmlvdXNcbiAgICB9LCBmdW5jdGlvbigpe1xuICAgICAgdmFyIHRoYXQgID0gdGhpc1xuICAgICAgICAsIGtpbmQgID0gdGhhdC5fa1xuICAgICAgICAsIGVudHJ5ID0gdGhhdC5fbDtcbiAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxuICAgICAgd2hpbGUoZW50cnkgJiYgZW50cnkucillbnRyeSA9IGVudHJ5LnA7XG4gICAgICAvLyBnZXQgbmV4dCBlbnRyeVxuICAgICAgaWYoIXRoYXQuX3QgfHwgISh0aGF0Ll9sID0gZW50cnkgPSBlbnRyeSA/IGVudHJ5Lm4gOiB0aGF0Ll90Ll9mKSl7XG4gICAgICAgIC8vIG9yIGZpbmlzaCB0aGUgaXRlcmF0aW9uXG4gICAgICAgIHRoYXQuX3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBzdGVwKDEpO1xuICAgICAgfVxuICAgICAgLy8gcmV0dXJuIHN0ZXAgYnkga2luZFxuICAgICAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBlbnRyeS5rKTtcbiAgICAgIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgZW50cnkudik7XG4gICAgICByZXR1cm4gc3RlcCgwLCBbZW50cnkuaywgZW50cnkudl0pO1xuICAgIH0sIElTX01BUCA/ICdlbnRyaWVzJyA6ICd2YWx1ZXMnICwgIUlTX01BUCwgdHJ1ZSk7XG5cbiAgICAvLyBhZGQgW0BAc3BlY2llc10sIDIzLjEuMi4yLCAyMy4yLjIuMlxuICAgIHNldFNwZWNpZXMoTkFNRSk7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29sbGVjdGlvbi1zdHJvbmcuanNcbiAqKiBtb2R1bGUgaWQgPSA5OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi8kLnJlZGVmaW5lJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCwgc3JjKXtcbiAgZm9yKHZhciBrZXkgaW4gc3JjKXJlZGVmaW5lKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnJlZGVmaW5lLWFsbC5qc1xuICoqIG1vZHVsZSBpZCA9IDk5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSl7XG4gIGlmKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpdGhyb3cgVHlwZUVycm9yKG5hbWUgKyBcIjogdXNlIHRoZSAnbmV3JyBvcGVyYXRvciFcIik7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3RyaWN0LW5ldy5qc1xuICoqIG1vZHVsZSBpZCA9IDEwMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgY2FsbCAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vJC5pcy1hcnJheS1pdGVyJylcbiAgLCBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi8kLnRvLWxlbmd0aCcpXG4gICwgZ2V0SXRlckZuICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQpe1xuICB2YXIgaXRlckZuID0gZ2V0SXRlckZuKGl0ZXJhYmxlKVxuICAgICwgZiAgICAgID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yO1xuICBpZih0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZihpc0FycmF5SXRlcihpdGVyRm4pKWZvcihsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICB9IGVsc2UgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7ICl7XG4gICAgY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZm9yLW9mLmpzXG4gKiogbW9kdWxlIGlkID0gMTAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2goZSl7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZihyZXQgIT09IHVuZGVmaW5lZClhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jYWxsLmpzXG4gKiogbW9kdWxlIGlkID0gMTAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIElURVJBVE9SICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYmFiZWwtcnVudGltZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXMtYXJyYXktaXRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDEwM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi8kLnRvLWludGVnZXInKVxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWxlbmd0aC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNvcmUgICAgICAgID0gcmVxdWlyZSgnLi8kLmNvcmUnKVxuICAsICQgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vJC5kZXNjcmlwdG9ycycpXG4gICwgU1BFQ0lFUyAgICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVkpe1xuICB2YXIgQyA9IGNvcmVbS0VZXTtcbiAgaWYoREVTQ1JJUFRPUlMgJiYgQyAmJiAhQ1tTUEVDSUVTXSkkLnNldERlc2MoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zZXQtc3BlY2llcy5qc1xuICoqIG1vZHVsZSBpZCA9IDEwNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi8kLmV4cG9ydCcpXG4gICwgZmFpbHMgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZmFpbHMnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhpZGUnKVxuICAsIHJlZGVmaW5lQWxsICAgID0gcmVxdWlyZSgnLi8kLnJlZGVmaW5lLWFsbCcpXG4gICwgZm9yT2YgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZm9yLW9mJylcbiAgLCBzdHJpY3ROZXcgICAgICA9IHJlcXVpcmUoJy4vJC5zdHJpY3QtbmV3JylcbiAgLCBpc09iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi8kLnNldC10by1zdHJpbmctdGFnJylcbiAgLCBERVNDUklQVE9SUyAgICA9IHJlcXVpcmUoJy4vJC5kZXNjcmlwdG9ycycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE5BTUUsIHdyYXBwZXIsIG1ldGhvZHMsIGNvbW1vbiwgSVNfTUFQLCBJU19XRUFLKXtcbiAgdmFyIEJhc2UgID0gZ2xvYmFsW05BTUVdXG4gICAgLCBDICAgICA9IEJhc2VcbiAgICAsIEFEREVSID0gSVNfTUFQID8gJ3NldCcgOiAnYWRkJ1xuICAgICwgcHJvdG8gPSBDICYmIEMucHJvdG90eXBlXG4gICAgLCBPICAgICA9IHt9O1xuICBpZighREVTQ1JJUFRPUlMgfHwgdHlwZW9mIEMgIT0gJ2Z1bmN0aW9uJyB8fCAhKElTX1dFQUsgfHwgcHJvdG8uZm9yRWFjaCAmJiAhZmFpbHMoZnVuY3Rpb24oKXtcbiAgICBuZXcgQygpLmVudHJpZXMoKS5uZXh0KCk7XG4gIH0pKSl7XG4gICAgLy8gY3JlYXRlIGNvbGxlY3Rpb24gY29uc3RydWN0b3JcbiAgICBDID0gY29tbW9uLmdldENvbnN0cnVjdG9yKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCBtZXRob2RzKTtcbiAgfSBlbHNlIHtcbiAgICBDID0gd3JhcHBlcihmdW5jdGlvbih0YXJnZXQsIGl0ZXJhYmxlKXtcbiAgICAgIHN0cmljdE5ldyh0YXJnZXQsIEMsIE5BTUUpO1xuICAgICAgdGFyZ2V0Ll9jID0gbmV3IEJhc2U7XG4gICAgICBpZihpdGVyYWJsZSAhPSB1bmRlZmluZWQpZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGFyZ2V0W0FEREVSXSwgdGFyZ2V0KTtcbiAgICB9KTtcbiAgICAkLmVhY2guY2FsbCgnYWRkLGNsZWFyLGRlbGV0ZSxmb3JFYWNoLGdldCxoYXMsc2V0LGtleXMsdmFsdWVzLGVudHJpZXMnLnNwbGl0KCcsJyksZnVuY3Rpb24oS0VZKXtcbiAgICAgIHZhciBJU19BRERFUiA9IEtFWSA9PSAnYWRkJyB8fCBLRVkgPT0gJ3NldCc7XG4gICAgICBpZihLRVkgaW4gcHJvdG8gJiYgIShJU19XRUFLICYmIEtFWSA9PSAnY2xlYXInKSloaWRlKEMucHJvdG90eXBlLCBLRVksIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgICBpZighSVNfQURERVIgJiYgSVNfV0VBSyAmJiAhaXNPYmplY3QoYSkpcmV0dXJuIEtFWSA9PSAnZ2V0JyA/IHVuZGVmaW5lZCA6IGZhbHNlO1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fY1tLRVldKGEgPT09IDAgPyAwIDogYSwgYik7XG4gICAgICAgIHJldHVybiBJU19BRERFUiA/IHRoaXMgOiByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZignc2l6ZScgaW4gcHJvdG8pJC5zZXREZXNjKEMucHJvdG90eXBlLCAnc2l6ZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Muc2l6ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldFRvU3RyaW5nVGFnKEMsIE5BTUUpO1xuXG4gIE9bTkFNRV0gPSBDO1xuICAkZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiwgTyk7XG5cbiAgaWYoIUlTX1dFQUspY29tbW9uLnNldFN0cm9uZyhDLCBOQU1FLCBJU19NQVApO1xuXG4gIHJldHVybiBDO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb2xsZWN0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMTA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuLyQuZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnTWFwJywge3RvSlNPTjogcmVxdWlyZSgnLi8kLmNvbGxlY3Rpb24tdG8tanNvbicpKCdNYXAnKX0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcubWFwLnRvLWpzb24uanNcbiAqKiBtb2R1bGUgaWQgPSAxMDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciBmb3JPZiAgID0gcmVxdWlyZSgnLi8kLmZvci1vZicpXG4gICwgY2xhc3NvZiA9IHJlcXVpcmUoJy4vJC5jbGFzc29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE5BTUUpe1xuICByZXR1cm4gZnVuY3Rpb24gdG9KU09OKCl7XG4gICAgaWYoY2xhc3NvZih0aGlzKSAhPSBOQU1FKXRocm93IFR5cGVFcnJvcihOQU1FICsgXCIjdG9KU09OIGlzbid0IGdlbmVyaWNcIik7XG4gICAgdmFyIGFyciA9IFtdO1xuICAgIGZvck9mKHRoaXMsIGZhbHNlLCBhcnIucHVzaCwgYXJyKTtcbiAgICByZXR1cm4gYXJyO1xuICB9O1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb2xsZWN0aW9uLXRvLWpzb24uanNcbiAqKiBtb2R1bGUgaWQgPSAxMDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFJ1c2FrIE9sZWcgb24gMjguMDIuMjAxNi5cclxuICovXHJcbmltcG9ydCB3aW5kcm9zZSBmcm9tICd3aW5kcm9zZSc7XHJcblxyXG5jb25zdCBERUdSRUVfQ0hBUl9DT0RFID0gMTc2O1xyXG5jb25zdCBERUdSRUVfQ0hBUiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoREVHUkVFX0NIQVJfQ09ERSk7XHJcblxyXG5jbGFzcyBEZWNvcmF0ZVdlYXRoZXJEYXRhIHtcclxuICAgIHN0YXRpYyBnZXREZWNvcmF0ZURhdGEgKGRhdGEsIHVuaXRzKXtcclxuICAgICAgICBkYXRhLmxvYy5sb24gPSBkYXRhLmxvYy5sb24gKyBERUdSRUVfQ0hBUjtcclxuICAgICAgICBkYXRhLmxvYy5sYXQgPSBkYXRhLmxvYy5sYXQgKyBERUdSRUVfQ0hBUjtcclxuXHJcbiAgICAgICAgbGV0IGRhdGVXZWF0aGVyID0gT2JqZWN0LmtleXMoZGF0YS53ZWF0aGVyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIGRhdGVXZWF0aGVyKSB7XHJcbiAgICAgICAgICAgIGxldCB3ZWF0aGVyID0gZGF0YS53ZWF0aGVyW2tleV07XHJcblxyXG4gICAgICAgICAgICB3ZWF0aGVyLmRhdGUgPSBEZWNvcmF0ZVdlYXRoZXJEYXRhLmdldEZvcm1hdHRlZERhdGUod2VhdGhlci5kYXRlLCB7XHJcbiAgICAgICAgICAgICAgICBkYXk6IFwiMi1kaWdpdFwiLFxyXG4gICAgICAgICAgICAgICAgbW9udGg6IFwic2hvcnRcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHdlYXRoZXIudGVtcGVyYXR1cmUuYXZyID0gRGVjb3JhdGVXZWF0aGVyRGF0YS5nZXRGb3JtYXR0ZWRUZW1wZXJhdHVyZSh3ZWF0aGVyLnRlbXBlcmF0dXJlLmF2ciwgdW5pdHMpO1xyXG4gICAgICAgICAgICB3ZWF0aGVyLnRlbXBlcmF0dXJlLm1pbiA9IERlY29yYXRlV2VhdGhlckRhdGEuZ2V0Rm9ybWF0dGVkVGVtcGVyYXR1cmUod2VhdGhlci50ZW1wZXJhdHVyZS5taW4pO1xyXG4gICAgICAgICAgICB3ZWF0aGVyLnRlbXBlcmF0dXJlLm1heCA9IERlY29yYXRlV2VhdGhlckRhdGEuZ2V0Rm9ybWF0dGVkVGVtcGVyYXR1cmUod2VhdGhlci50ZW1wZXJhdHVyZS5tYXgpO1xyXG5cclxuICAgICAgICAgICAgd2VhdGhlci5wcmVzc3VyZS5hdnIgPSBNYXRoLnJvdW5kKHBhcnNlRmxvYXQod2VhdGhlci5wcmVzc3VyZS5hdnIpKSArIHVuaXRzLnByZXNzdXJlO1xyXG5cclxuICAgICAgICAgICAgd2VhdGhlci5odW1pZGl0eSA9IHdlYXRoZXIuaHVtaWRpdHkgKyAnJSc7XHJcblxyXG4gICAgICAgICAgICBsZXQgcHJlY2lwaXRhdGlvbiA9IHdlYXRoZXIucHJlY2lwaXRhdGlvbi5tb2RlO1xyXG4gICAgICAgICAgICB3ZWF0aGVyLnByZWNpcGl0YXRpb24ubW9kZSA9IHByZWNpcGl0YXRpb24gPyB3ZWF0aGVyLnByZWNpcGl0YXRpb24ubW9kZSA6ICcnO1xyXG4gICAgICAgICAgICB3ZWF0aGVyLnByZWNpcGl0YXRpb24udmFsdWUgPSBwcmVjaXBpdGF0aW9uID8gd2VhdGhlci5wcmVjaXBpdGF0aW9uLnZhbHVlICsgdW5pdHMucHJlY2lwaXRhdGlvbjogJyc7XHJcblxyXG4gICAgICAgICAgICB3ZWF0aGVyLmNsb3Vkcy52YWx1ZSA9IHdlYXRoZXIuY2xvdWRzLnZhbHVlICsgJyUnO1xyXG5cclxuICAgICAgICAgICAgd2VhdGhlci53aW5kLnNwZWVkID0gTWF0aC5yb3VuZChwYXJzZUZsb2F0KHdlYXRoZXIud2luZC5zcGVlZCkpICsgdW5pdHMud2luZDtcclxuICAgICAgICAgICAgd2VhdGhlci53aW5kLmRpcmVjdGlvbiA9IHdpbmRyb3NlLmdldFBvaW50IChwYXJzZUZsb2F0KHdlYXRoZXIud2luZC5kZWcpLCB7ZGVwdGg6IDB9KS5zeW1ib2w7XHJcbiAgICAgICAgICAgIHdlYXRoZXIud2luZC5kZWcgPSB3ZWF0aGVyLndpbmQuZGVnICsgREVHUkVFX0NIQVI7XHJcblxyXG4gICAgICAgICAgICB3ZWF0aGVyLnN1bi5yaXNlID0gRGVjb3JhdGVXZWF0aGVyRGF0YS5nZXRGb3JtYXR0ZWREYXRlKHdlYXRoZXIuc3VuLnJpc2UsIHtcclxuICAgICAgICAgICAgICAgIGhvdXI6IFwiMi1kaWdpdFwiLFxyXG4gICAgICAgICAgICAgICAgbWludXRlOiBcIjItZGlnaXRcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHdlYXRoZXIuc3VuLnNldCA9IERlY29yYXRlV2VhdGhlckRhdGEuZ2V0Rm9ybWF0dGVkRGF0ZSh3ZWF0aGVyLnN1bi5zZXQsIHtcclxuICAgICAgICAgICAgICAgIGhvdXI6IFwiMi1kaWdpdFwiLFxyXG4gICAgICAgICAgICAgICAgbWludXRlOiBcIjItZGlnaXRcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0Rm9ybWF0dGVkRGF0ZVxyXG4gICAgICogQHBhcmFtIHN0cmluZ3xEYXRlINC/0YDQtdC00YHRgtCw0LLQu9C10L3QuNC1INC00LDRgtGLXHJcbiAgICAgKiBAb3B0aW9uIG9iamVjdCDQvdCw0YHRgtGA0L7QudC60Lgg0YTQvtGA0LzQsNGC0LBcclxuICAgICAqIEByZXR1cm4gc3RyaW5nINGE0L7RgNC80LDRgtC40YDQvtCy0LDQvdC90L7QtSDQv9GA0LXQtNGB0YLQsNCy0LvQtdC90LjQtSDQtNCw0YLRi1xyXG4gICAgICogKi9cclxuICAgIHN0YXRpYyBnZXRGb3JtYXR0ZWREYXRlKGRhdGUsIG9wdGlvbikge1xyXG4gICAgICAgIGlmIChkYXRlICYmIGRhdGUhPSctJykge1xyXG4gICAgICAgICAgICBsZXQgZm9ybWF0dGVyID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoXCJlbi1VU1wiLCBvcHRpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0dGVyLmZvcm1hdChkYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0Rm9ybWF0dGVkVGVtcGVyYXR1cmUodGVtcGVyYXR1cmUsIHVuaXRzKSB7XHJcbiAgICAgICAgbGV0IHVuaXQgPSB1bml0cyA/IHVuaXRzLnRlbXBlcmF0dXJlLmxldHRlciA6ICcnO1xyXG4gICAgICAgIHJldHVybiBgJHtNYXRoLnJvdW5kKHBhcnNlRmxvYXQodGVtcGVyYXR1cmUpKX0ke0RFR1JFRV9DSEFSfSR7dW5pdH1gO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEZWNvcmF0ZVdlYXRoZXJEYXRhO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9saWIvZGVjb3JhdGVXZWF0aGVyRGF0YS5qc1xuICoqLyIsIi8qKlxuICogV2luZHJvc2VcbiAqXG4gKiBUaGlzIGlzIGEgc2ltcGxlIG1vZHVsZSB0aGF0IGNvbnZlcnRzIGNvbXBhc3MgZGVncmVzcyBpbnRvIGNvbXBhc3MgcG9pbnRzXG4gKiBhbmQgcG9pbnRzIHRvIGRlZ3JlZXMuXG4gKlxuICogWW91IGNhbiBwYXNzIGFuIHsgZGVwdGg6IC4uLiB9IGhhc2ggdG8gdGhlIG1ldGhvZHMuXG4gKlxuICogUGFzc2luZyBhIGRlcHRoOiAwIHdpbGwgbGltaXQgdGhlIHNlYXJjaCB0byB0aGUgNFxuICogbWFpbiBjb21wYXNzIHBvaW50czogTiwgRSwgUywgVy5cbiAqXG4gKiBQYXNzaW5nIGEgZGVwdGg6IDEgd2lsbCBsaW1pdCB0aGUgc2VhcmNoIHRvIHRoZSA4XG4gKiBtYWluIGNvbXBhc3MgcG9pbnRzOiBOLCBORSwgRSwgU0UsIFMsIFNXLCBXLCBOV1xuICpcbiAqIFBhc3NpbmcgYSBkZXB0aDogMiB3aWxsIGxpbWl0IHRoZSBzZWFyY2ggdG8gdGhlIDE2XG4gKiBtYWluIGNvbXBhc3MgcG9pbnRzOiBOLCBOTkUsIE5FLCBFTkUsIEUsIEVTRSwgU0UsIFNTRSxcbiAqIFMsIFNTVywgU1csIFdTVywgVywgV05XLCBOVywgTk5XLlxuICpcbiAqIFBhc3NpbmcgYSBkZXB0aDogMyAoZGVmYXVsdCkgd2lsbCBkbyB0aGUgc2VhcmNoIGZvciB0aGVcbiAqIDMyIHBvaW50cyBvZiB0aGUgY29tcGFzcy5cbiAqXG4gKiBAYXV0aG9yIHJvZ2VyaW9wdmwgPGh0dHA6Ly9naXRodWIuY29tL3JvZ2VyaW9wdmw+XG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdC5XaW5kcm9zZSA9IGZhY3RvcnkoKTtcbiAgICB9XG59ICh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIERFUFRIU19BUkVBID0gWyA5MCwgNDUsIDIyLjUsIDExLjI1IF07XG4gICAgdmFyIENPTVBBU1NfUE9JTlRTID0gW1xuICAgICAgICB7IHN5bWJvbDogJ04nLCBuYW1lOiAnTm9ydGgnLCBkZXB0aDogMCB9LFxuICAgICAgICB7IHN5bWJvbDogJ05iRScsIG5hbWU6ICdOb3J0aCBieSBFYXN0JywgZGVwdGg6IDMgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdOTkUnLCBuYW1lOiAnTm9ydGggTm9ydGggRWFzdCcsIGRlcHRoOiAyIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnTkViTicsIG5hbWU6ICdOb3J0aCBFYXN0IGJ5IE5vcnRoJywgZGVwdGg6IDMgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdORScsIG5hbWU6ICdOb3J0aCBFYXN0JywgZGVwdGg6IDEgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdORWJFJywgbmFtZTogJ05vcnRoIEVhc3QgYnkgRWFzdCcsIGRlcHRoOiAzIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnRU5FJywgbmFtZTogJ0Vhc3QgTm9ydGggRWFzdCcsIGRlcHRoOiAyIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnRWJOJywgbmFtZTogJ0Vhc3QgYnkgTm9ydGgnLCBkZXB0aDogMyB9LFxuICAgICAgICB7IHN5bWJvbDogJ0UnLCBuYW1lOiAnRWFzdCcsIGRlcHRoOiAwIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnRWJTJywgbmFtZTogJ0Vhc3QgYnkgU291dGgnLCBkZXB0aDogMyB9LFxuICAgICAgICB7IHN5bWJvbDogJ0VTRScsIG5hbWU6ICdFYXN0IFNvdXRoIEVhc3QnLCBkZXB0aDogMiB9LFxuICAgICAgICB7IHN5bWJvbDogJ1NFYkUnLCBuYW1lOiAnU291dGggRWFzdCBieSBFYXN0JywgZGVwdGg6IDMgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdTRScsIG5hbWU6ICdTb3V0aCBFYXN0JywgZGVwdGg6IDEgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdTRWJTJywgbmFtZTogJ1NvdXRoIEVhc3QgYnkgU291dGgnLCBkZXB0aDogMyB9LFxuICAgICAgICB7IHN5bWJvbDogJ1NTRScsIG5hbWU6ICdTb3V0aCBTb3V0aCBFYXN0JywgZGVwdGg6IDIgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdTYkUnLCBuYW1lOiAnU291dGggYnkgRWFzdCcsIGRlcHRoOiAzIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnUycsIG5hbWU6ICdTb3V0aCcsIGRlcHRoOiAwIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnU2JXJywgbmFtZTogJ1NvdXRoIGJ5IFdlc3QnLCBkZXB0aDogMyB9LFxuICAgICAgICB7IHN5bWJvbDogJ1NTVycsIG5hbWU6ICdTb3V0aCBTb3V0aCBXZXN0JywgZGVwdGg6IDIgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdTV2JTJywgbmFtZTogJ1NvdXRoIFdlc3QgYnkgU291dGgnLCBkZXB0aDogMyB9LFxuICAgICAgICB7IHN5bWJvbDogJ1NXJywgbmFtZTogJ1NvdXRoIFdlc3QnLCBkZXB0aDogMSB9LFxuICAgICAgICB7IHN5bWJvbDogJ1NXYlcnLCBuYW1lOiAnU291dGggV2VzdCBieSBXZXN0JywgZGVwdGg6IDMgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdXU1cnLCBuYW1lOiAnV2VzdCBTb3V0aCBXZXN0JywgZGVwdGg6IDIgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdXYlMnLCBuYW1lOiAnV2VzdCBieSBTb3V0aCcsIGRlcHRoOiAzIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnVycsIG5hbWU6ICdXZXN0JywgZGVwdGg6IDAgfSxcbiAgICAgICAgeyBzeW1ib2w6ICdXYk4nLCBuYW1lOiAnV2VzdCBieSBOb3J0aCcsIGRlcHRoOiAzIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnV05XJywgbmFtZTogJ1dlc3QgTm9ydGggV2VzdCcsIGRlcHRoOiAyIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnTldiVycsIG5hbWU6ICdOb3J0aCBXZXN0IGJ5IFdlc3QnLCBkZXB0aDogMyB9LFxuICAgICAgICB7IHN5bWJvbDogJ05XJywgbmFtZTogJ05vcnRoIFdlc3QnLCBkZXB0aDogMSB9LFxuICAgICAgICB7IHN5bWJvbDogJ05XYk4nLCBuYW1lOiAnTm9ydGggV2VzdCBieSBOb3J0aCcsIGRlcHRoOiAzIH0sXG4gICAgICAgIHsgc3ltYm9sOiAnTk5XJywgbmFtZTogJ05vcnRoIE5vcnRoIFdlc3QnLCBkZXB0aDogMiB9LFxuICAgICAgICB7IHN5bWJvbDogJ05iVycsIG5hbWU6ICdOb3J0aCBieSBXZXN0JywgZGVwdGg6IDMgfVxuICAgIF07XG5cbiAgICB2YXIgV2luZHJvc2UgPSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIGEgcG9pbnQgb2YgdGhlIGNvbXBhc3MsIGdpdmVuIHRoZSBkZWdyZWVzXG4gICAgICAgICAqIFdoZW4gdGhlIGRlZ3JlZXMgZG8gbm90IG1hdGNoIGRpcmVjdGx5IHdpdGggYSBwb2ludCxcbiAgICAgICAgICogdGhlIG51bWJlciBpcyByb3VuZGVkIGZpcnN0XG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWdyZWVzIC0gdGhlIGRlZ3JlZXMgaW4gdGhlIGNvbXBhc3MgdG8gY29udmVydFxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0cyAtIChvcHRpb25hbCkgaGFzaCBjb250YWluaW5nIG9wdGlvbnNcbiAgICAgICAgICogICAgICAgICAgICAgICAgIG9wdHMuZGVwdGggLSB2YWxpZCBmcm9tIDAgdG8gM1xuICAgICAgICAgKiBAcmV0dXJuIHtvYmplY3R9IHRoZSBjb21wYXNzIHBvaW50IG9mIHRoZSBnaXZlbiBkZWdyZWVzLiBJZiBkZWdyZWVzIGFyZVxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIGludmFsaWQgKDwgMCB8fCA+IDM2MCksIHRoZW4gdW5kZWZpbmVkIGlzIHJldHVybmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0UG9pbnQ6IGZ1bmN0aW9uIChkZWdyZWVzLCBvcHRzKSB7XG4gICAgICAgICAgICBpZiAoZGVncmVlcyA8IDAgfHwgZGVncmVlcyA+IDM2MCkgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgICAgICAgICBvcHRzLmRlcHRoID0gb3B0cy5oYXNPd25Qcm9wZXJ0eSgnZGVwdGgnKSA/IG9wdHMuZGVwdGggOiAzO1xuXG4gICAgICAgICAgICB2YXIgaWR4ID0gTWF0aC5yb3VuZChkZWdyZWVzIC8gREVQVEhTX0FSRUFbb3B0cy5kZXB0aF0pO1xuICAgICAgICAgICAgdmFyIF9jb21wYXNzX3BvaW50cyA9IENPTVBBU1NfUE9JTlRTLmZpbHRlcihmdW5jdGlvbiAocHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHQuZGVwdGggPD0gb3B0cy5kZXB0aDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyAzNjAgPT09IDAgYWthIE5vcnRoXG4gICAgICAgICAgICBpZiAoaWR4ID09PSBfY29tcGFzc19wb2ludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWR4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBfY29tcGFzc19wb2ludHNbaWR4XTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgZGVncmVlcyBvZiBhIGdpdmVuIGNvbXBhc3MgcG9pbnQgbmFtZSBvciBzeW1ib2xcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB0aGUgbmFtZSBvciBzeW1ib2wgb2YgYSBjb21wYXNzIHBvaW50IChjYXNlIHNlbnNpdGl2ZSlcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IG9wdHMgLSAob3B0aW9uYWwpIGhhc2ggY29udGFpbmluZyBvcHRpb25zXG4gICAgICAgICAqICAgICAgICAgICAgICAgICBvcHRzLmRlcHRoIC0gdmFsaWQgZnJvbSAwIHRvIDNcbiAgICAgICAgICogQHJldHVybiB7b2JqZWN0fSB0aGUgZGVncmVlcyBhbmQgcmFuZ2Ugb2YgdGhlIGdpdmVuIGNvbXBhc3MgcG9pbnRcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAoYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBkZXB0aClcbiAgICAgICAgICovXG4gICAgICAgIGdldERlZ3JlZXM6IGZ1bmN0aW9uIChuYW1lLCBvcHRzKSB7XG4gICAgICAgICAgICB2YXIgZm91bmQsIG1pbiwgbWF4O1xuICAgICAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgICAgICAgICBvcHRzLmRlcHRoID0gb3B0cy5oYXNPd25Qcm9wZXJ0eSgnZGVwdGgnKSA/IG9wdHMuZGVwdGggOiAzO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5kZXB0aCA8IDAgfHwgb3B0cy5kZXB0aCA+IDMpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgIENPTVBBU1NfUE9JTlRTLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGlkeCkge1xuICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSBpdGVtLm5hbWUgfHwgbmFtZSA9PT0gaXRlbS5zeW1ib2wpIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSBpZHggKiBERVBUSFNfQVJFQVszXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtaW4gPSBmb3VuZCAtIChERVBUSFNfQVJFQVtvcHRzLmRlcHRoXSAvIDIpO1xuICAgICAgICAgICAgbWF4ID0gZm91bmQgKyAoREVQVEhTX0FSRUFbb3B0cy5kZXB0aF0gLyAyKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmb3VuZCA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIG1pbjogbWluID49IDAgPyBtaW4gOiAoMzYwICsgbWluKSxcbiAgICAgICAgICAgICAgdmFsdWU6IGZvdW5kLFxuICAgICAgICAgICAgICBtYXg6IG1heCA8PSAzNjAgPyBtYXggOiAobWF4IC0gMzYwKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFdpbmRyb3NlO1xufSkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vd2luZHJvc2Uvd2luZHJvc2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImxldCBMb25kb24gPSB7XHJcbiAgY29vcmQ6IHtcclxuICAgIGxvbjogLTAuMTMsXHJcbiAgICBsYXQ6IDUxLjUxXHJcbiAgfSxcclxuICB3ZWF0aGVyOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiA1MDEsXHJcbiAgICAgIG1haW46IFwiUmFpblwiLFxyXG4gICAgICBkZXNjcmlwdGlvbjogXCJtb2RlcmF0ZSByYWluXCIsXHJcbiAgICAgIGljb246IFwiMTBkXCJcclxuICAgIH1cclxuICBdLFxyXG4gIGJhc2U6IFwic3RhdGlvbnNcIixcclxuICBtYWluOiB7XHJcbiAgICB0ZW1wOiAyNzkuMTYsXHJcbiAgICBwcmVzc3VyZTogMTAxMyxcclxuICAgIGh1bWlkaXR5OiA2NSxcclxuICAgIHRlbXBfbWluOiAyNzcuNzUsXHJcbiAgICB0ZW1wX21heDogMjgwLjU1XHJcbiAgfSxcclxuICB2aXNpYmlsaXR5OiAxMDAwMCxcclxuICB3aW5kOiB7XHJcbiAgICBzcGVlZDogNC42LFxyXG4gICAgZGVnOiAyMDBcclxuICB9LFxyXG4gIGNsb3Vkczoge1xyXG4gICAgYWxsOiA5MFxyXG4gIH0sXHJcbiAgZHQ6IDE0NTU3MjEzMjgsXHJcbiAgc3lzOiB7XHJcbiAgICB0eXBlOiAxLFxyXG4gICAgaWQ6IDUwOTEsXHJcbiAgICBtZXNzYWdlOiAwLjA0NjksXHJcbiAgICBjb3VudHJ5OiBcIkdCXCIsXHJcbiAgICBzdW5yaXNlOiAxNDU1NjkzMDMwLFxyXG4gICAgc3Vuc2V0OiAxNDU1NzI5NTU5XHJcbiAgfSxcclxuICBpZDogMjY0Mzc0MyxcclxuICBuYW1lOiBcIkxvbmRvblwiLFxyXG4gIGNvZDogMjAwXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMb25kb247XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogZGF0YS93ZWF0aGVyLmpzXG4gKiovIiwibGV0IE1vc2NvdyA9IHtcclxuICBjb29yZDoge1xyXG4gICAgbG9uOiAzNy42MixcclxuICAgIGxhdDogNTUuNzVcclxuICB9LFxyXG4gIHdlYXRoZXI6IFtcclxuICAgIHtcclxuICAgICAgaWQ6IDgwMCxcclxuICAgICAgbWFpbjogXCJDbGVhclwiLFxyXG4gICAgICBkZXNjcmlwdGlvbjogXCJTa3kgaXMgQ2xlYXJcIixcclxuICAgICAgaWNvbjogXCIwMW5cIlxyXG4gICAgfVxyXG4gIF0sXHJcbiAgYmFzZTogXCJjbWMgc3RhdGlvbnNcIixcclxuICBtYWluOiB7XHJcbiAgICB0ZW1wOiAyNjguNDk4LFxyXG4gICAgcHJlc3N1cmU6IDEwMjMuNTIsXHJcbiAgICBodW1pZGl0eTogODMsXHJcbiAgICB0ZW1wX21pbjogMjY4LjQ5OCxcclxuICAgIHRlbXBfbWF4OiAyNjguNDk4LFxyXG4gICAgc2VhX2xldmVsOiAxMDQ0LjcxLFxyXG4gICAgZ3JuZF9sZXZlbDogMTAyMy41MlxyXG4gIH0sXHJcbiAgd2luZDoge1xyXG4gICAgc3BlZWQ6IDYuMTcsXHJcbiAgICBkZWc6IDMyMS41MDNcclxuICB9LFxyXG4gIGNsb3Vkczoge1xyXG4gICAgYWxsOiAwXHJcbiAgfSxcclxuICBkdDogMTQ1NTcyMTMyNSxcclxuICBzeXM6IHtcclxuICAgIG1lc3NhZ2U6IDAuMDA0NCxcclxuICAgIGNvdW50cnk6IFwiUlVcIixcclxuICAgIHN1bnJpc2U6IDE0NTU2ODQ1ODMsXHJcbiAgICBzdW5zZXQ6IDE0NTU3MTk4OTRcclxuICB9LFxyXG4gIGlkOiA1MjQ5MDEsXHJcbiAgbmFtZTogXCJNb3Njb3dcIixcclxuICBjb2Q6IDIwMFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9zY293O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGRhdGEvd2VhdGhlcl9tb3Njb3cuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnkuanNcbiAqKiBtb2R1bGUgaWQgPSAxMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjb3JlID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLmNvcmUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3RyaW5naWZ5KGl0KXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICByZXR1cm4gKGNvcmUuSlNPTiAmJiBjb3JlLkpTT04uc3RyaW5naWZ5IHx8IEpTT04uc3RyaW5naWZ5KS5hcHBseShKU09OLCBhcmd1bWVudHMpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9iYWJlbC1ydW50aW1lL34vY29yZS1qcy9saWJyYXJ5L2ZuL2pzb24vc3RyaW5naWZ5LmpzXG4gKiogbW9kdWxlIGlkID0gMTE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJsZXQgVW5pdE1lYXN1cmUgPSB7XHJcbiAgICB0eXBlOiB7XHJcbiAgICAgICAgdGhlcm1vZHluYW1pYzoge1xyXG4gICAgICAgICAgICB0ZW1wZXJhdHVyZToge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJLZWx2aW5cIixcclxuICAgICAgICAgICAgICAgIGxldHRlcjogXCJLXCIsXHJcbiAgICAgICAgICAgICAgICBleGFtcGxlOiAyNjRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgd2luZDogXCJtL3NcIixcclxuICAgICAgICAgICAgd2luZF9leGFtcGxlOiAzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXRyaWM6IHtcclxuICAgICAgICAgICAgdGVtcGVyYXR1cmU6IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiQ2Vsc2l1c1wiLFxyXG4gICAgICAgICAgICAgICAgbGV0dGVyOiBcIkNcIixcclxuICAgICAgICAgICAgICAgIGV4YW1wbGU6IC05XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHdpbmQ6IFwibS9zXCIsXHJcbiAgICAgICAgICAgIHdpbmRfZXhhbXBsZTogM1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW1wZXJpYWw6IHtcclxuICAgICAgICAgICAgdGVtcGVyYXR1cmU6IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiRmFocmVuaGVpdFwiLFxyXG4gICAgICAgICAgICAgICAgbGV0dGVyOiBcIkZcIixcclxuICAgICAgICAgICAgICAgIGV4YW1wbGU6IDE1XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHdpbmQ6IFwibXBoXCIsXHJcbiAgICAgICAgICAgIHdpbmRfZXhhbXBsZTogN1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwcmVzc3VyZTogXCJoUGFcIixcclxuICAgIHByZXNzdXJlX2V4YW1wbGU6IDk3OCxcclxuICAgIHByZWNpcGl0YXRpb246IFwibW1cIixcclxuICAgIHByZWNpcGl0YXRpb25fZXhhbXBsZTogNFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVW5pdE1lYXN1cmU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2xpYi91bml0LW1lYXN1cmUuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbENBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQUtBOzs7Ozs7QUNWQTs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3lCQTs7O0FBQ0E7QUFEQTtBQUNBO0FBREE7QUFDQTtBQUdBOztBQUhBO0FBQ0E7QUFGQTs7QUFPQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUdBO0FBQ0E7QUFDQTs7Ozs7QUFGQTs7OztBQVVBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBUEE7QUFDQTtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFEQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFOQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQUE7QUFEQTtBQUZBO0FBQ0E7QUFNQTs7QUFDQTtBQUNBOztBQUFBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7Ozs7QUFhQTs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUNBOztBQUpBO0FBQ0E7QUFTQTs7Ozs7O0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTs7Ozs7Ozs7Ozs7Ozs7QUFYQTs7OztBQW1CQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBTkE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBUEE7QUFTQTs7OztBQUdBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7OztBQUZBO0FBQ0E7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFYQTs7OztBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTs7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBUkE7QUFTQTtBQUFBOzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFEQTtBQU1BO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBRUE7QUEzQkE7QUFBQTtBQUNBO0FBK0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcENBOztBQXBNQTtBQUFBOzs7O0FBaVJBOzs7Ozs7Ozs7QUMxU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzdDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDSEE7QUFDQTs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNOQTs7Ozs7O0FDQUE7QUFDQTtBQUNBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNqQ0E7Ozs7OztBQ0FBO0FBQ0E7QUFDQTs7Ozs7O0FDRkE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNqRUE7Ozs7OztBQ0FBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNmQTs7Ozs7O0FDQUE7QUFDQTs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1RBOzs7Ozs7QUNBQTtBQUNBOzs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDMUJBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDcEJBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7Ozs7OztBQ0ZBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2xPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0pBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2hDQTs7Ozs7O0FDQUE7QUFDQTs7Ozs7O0FDREE7QUFDQTtBQUNBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6QkE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVPQTs7O0FBQ0E7QUFEQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFEQTs7QUFIQTtBQUNBO0FBRkE7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQUE7O0FBREE7QUFFQTs7QUFBQTs7QUFGQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7Ozs7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQTlDQTtBQUFBOzs7O0FBa0RBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckRBOzs7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUFBO0FBQ0E7OztBQUFBO0FBREE7QUFFQTtBQUNBOzs7QUFBQTtBQUhBO0FBSUE7OztBQUFBO0FBSkE7QUFGQTtBQURBOzs7QUFQQTtBQUFBO0FBQ0E7QUFvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFOQTtBQURBO0FBQ0E7QUFZQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQ0E7Ozs7Ozs7Ozs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTs7O0FBUkE7QUFBQTs7OztBQXFCQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFGQTtBQVhBO0FBZ0JBO0FBakJBO0FBQ0E7QUFtQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQ0E7OztBQUNBO0FBREE7QUFDQTtBQURBO0FBQ0E7QUFHQTs7QUFIQTtBQUNBO0FBRkE7O0FBUUE7OztBQUlBO0FBQ0E7O0FBQ0E7QUFDQTs7O0FBQUE7QUFEQTtBQUVBOzs7QUFBQTtBQUZBO0FBREE7OztBQWJBO0FBQUE7QUFDQTtBQXFCQTtBQUNBO0FBREE7QUFDQTtBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCQTs7Ozs7Ozs7OztBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOztBQUNBO0FBQ0E7QUFGQTs7O0FBTkE7QUFBQTs7OztBQWNBO0FBQ0E7QUFEQTtBQUNBO0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQkE7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7OztBQUFBO0FBREE7QUFFQTtBQUNBO0FBQ0E7OztBQUFBO0FBQUE7QUFBQTtBQUpBO0FBREE7OztBQVZBO0FBQUE7QUFDQTtBQW9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBREE7QUFDQTtBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQURBO0FBQUE7QUFDQTs7Ozs7O0FBQUE7QUFDQTtBQUZBOztBQVlBOzs7QUFJQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQUE7QUFBQTtBQUhBO0FBREE7QUFIQTtBQUNBO0FBV0E7O0FBQ0E7QUFDQTs7QUFBQTtBQUNBOzs7O0FBREE7QUFFQTs7O0FBQ0E7QUFDQTtBQUNBOztBQUFBOztBQUhBO0FBRkE7QUFEQTtBQVNBOztBQUFBO0FBQ0E7Ozs7QUFBQTs7QUFBQTs7QUFBQTs7QUFEQTtBQUVBOzs7QUFDQTtBQUhBO0FBVEE7QUFlQTs7QUFBQTtBQUNBOzs7O0FBREE7QUFFQTs7O0FBQ0E7QUFDQTtBQUNBOztBQUFBOztBQUhBO0FBRkE7QUFmQTtBQXVCQTs7QUFBQTtBQUNBOzs7O0FBREE7QUFFQTtBQXpCQTtBQTJCQTtBQTVCQTs7O0FBaENBO0FBQUE7QUFDQTtBQWlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7Ozs7QUFEQTtBQUVBOzs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZBO0FBR0E7Ozs7QUFBQTtBQUFBO0FBQUE7QUFIQTtBQUlBOzs7O0FBQUE7QUFBQTtBQUpBO0FBS0E7Ozs7QUFBQTtBQUFBO0FBTEE7QUFEQTtBQUpBO0FBQ0E7QUFjQTs7Ozs7O0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0VBOzs7O0FBRUE7OztBQUNBO0FBREE7QUFBQTtBQUNBO0FBQ0E7QUFGQTs7QUFLQTtBQUNBOzs7O0FBR0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQURBO0FBTUE7QUFOQTtBQURBO0FBVUE7QUFmQTtBQUNBO0FBaUJBO0FBM0JBO0FBQ0E7QUE2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBOztBQUFBO0FBQUE7QUFEQTtBQUVBOztBQUFBO0FBQUE7QUFGQTtBQURBO0FBSkE7QUFDQTs7OztBQWpEQTs7QUFnRUE7QUFDQTs7O0FBQ0E7Ozs7QUFEQTtBQUVBOzs7QUFDQTtBQUNBOztBQUFBO0FBQUE7QUFGQTtBQUZBO0FBREE7QUFRQTs7O0FBQ0E7Ozs7QUFEQTtBQUVBOztBQUFBO0FBQ0E7QUFIQTtBQVJBO0FBREE7OztBQXhFQTtBQUFBO0FBQ0E7QUF5RkE7QUFDQTs7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFBQTs7QUFEQTtBQUVBOztBQUFBO0FBQUE7QUFGQTtBQUdBOztBQUFBO0FBQUE7QUFIQTtBQURBO0FBSEE7QUFDQTtBQVdBOzs7Ozs7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUQTs7O0FBQ0E7QUFDQTs7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFGQTtBQVBBOzs7O0FBY0E7QUFwQkE7QUFDQTtBQW9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQXJCQTs7QUE0QkE7OztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFEQTtBQUlBO0FBQ0E7QUFEQTtBQUdBO0FBSEE7QUFEQTtBQU9BO0FBQUE7QUFYQTs7OztBQWNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFLQTtBQUNBO0FBREE7QUFDQTtBQUdBOzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQWRBO0FBaUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUF2QkE7QUFDQTtBQTRCQTs7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBREE7QUFDQTtBQU1BOzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUhBO0FBQUE7QUFDQTtBQU9BOzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBTEE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUF6QkE7QUFUQTs7Ozs7Ozs7Ozs7Ozs7QUFoQkE7QUFDQTtBQXVEQTs7O0FBNU1BOzs7Ozs7Ozs7O0FBcU5BO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTs7Ozs7O0FDOU5BOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzlKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMQTs7OztBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUEvQkE7Ozs7Ozs7Ozs7Ozs7O0FBTkE7QUFDQTtBQTBDQTs7Ozs7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7Ozs7QUFHQTtBQUNBO0FBQ0E7OztBQWhFQTs7O0FBb0VBOzs7Ozs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQUNBO0FBeENBO0FBQ0E7QUEwQ0E7Ozs7Ozs7Ozs7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUF2Q0E7QUFDQTtBQXlDQTs7Ozs7O0FDMUNBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQVBBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQVBBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQVBBO0FBbkJBO0FBNkJBO0FBQ0E7QUFDQTtBQUNBO0FBakNBO0FBQ0E7QUFtQ0E7OzsiLCJzb3VyY2VSb290IjoiIn0=