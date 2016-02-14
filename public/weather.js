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

	var _app = __webpack_require__(21);

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
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?localIdentName=[hash:base64:5]!./../node_modules/stylus-loader/index.js!./style.styl", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?localIdentName=[hash:base64:5]!./../node_modules/stylus-loader/index.js!./style.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, ".zNkcG {\n  width: 250px;\n  margin: 100px auto;\n  padding: 10px;\n  text-align: left;\n}\n._2H1Hm {\n  border: 1px solid #000;\n}\n._30EC8 {\n  width: 100%;\n  height: 100%;\n}\n.nPor8 {\n  display: inline-block;\n  width: 45%;\n}\n._2LB9P {\n  float: left;\n  width: 33%;\n}\n", ""]);

	// exports
	exports.locals = {
		"weather_container": "zNkcG",
		"general": "_2H1Hm",
		"general__icon": "_30EC8",
		"description": "nPor8",
		"parametr": "_2LB9P"
	};

/***/ },
/* 7 */
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
/* 8 */
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
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _generalInfo = __webpack_require__(15);

	var _generalInfo2 = _interopRequireDefault(_generalInfo);

	var _cityInfo = __webpack_require__(16);

	var _cityInfo2 = _interopRequireDefault(_cityInfo);

	var _detailInfo = __webpack_require__(17);

	var _detailInfo2 = _interopRequireDefault(_detailInfo);

	var _forecast = __webpack_require__(19);

	var _forecast2 = _interopRequireDefault(_forecast);

	var _style = __webpack_require__(5);

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Rusak Oleg on 09.02.2016.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var Weather = function (_React$Component) {
	    _inherits(Weather, _React$Component);

	    function Weather(props) {
	        _classCallCheck(this, Weather);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Weather).call(this, props));

	        _this.state = {
	            weather: _this.props.weather,
	            settings: _this.props.settings,
	            forecast: _this.props.forecast
	        };
	        return _this;
	    }

	    _createClass(Weather, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({
	                weather: this.props.weather,
	                settings: this.props.settings,
	                forecast: this.props.forecast
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'div',
	                    null,
	                    _react2.default.createElement(_cityInfo2.default, { name: this.state.weather.name, country: this.state.weather.sys.country,
	                        id: this.state.weather.id }),
	                    _react2.default.createElement(_generalInfo2.default, { weather: this.state.weather.weather[0], temperature: this.state.weather.main.temp,
	                        settings: this.state.settings }),
	                    _react2.default.createElement(_forecast2.default, { weather: this.state.forecast }),
	                    _react2.default.createElement(_detailInfo2.default, { detail: this.state.weather })
	                )
	            );
	        }
	    }]);

	    return Weather;
	}(_react2.default.Component);

	exports.default = Weather;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(5);

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Rusak Oleg on 10.02.2016.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var GeneralInfo = function (_React$Component) {
	    _inherits(GeneralInfo, _React$Component);

	    function GeneralInfo(props) {
	        _classCallCheck(this, GeneralInfo);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(GeneralInfo).call(this, props));
	    }

	    //todo: http://cssload.net/ru/spinners


	    _createClass(GeneralInfo, [{
	        key: 'render',
	        value: function render() {
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
	                        this.props.weather.main + ' ' + this.props.temperature + ' ' + this.props.settings.unit_measure.unit_symbol
	                    ),
	                    _react2.default.createElement(
	                        'p',
	                        null,
	                        this.props.weather.description
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
	        main: "current weather?"
	    },
	    temperature: "?"
	};

	exports.default = GeneralInfo;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(5);

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Rusak Oleg on 09.02.2016.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var CityInfo = function (_React$Component) {
	    _inherits(CityInfo, _React$Component);

	    function CityInfo(props) {
	        _classCallCheck(this, CityInfo);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CityInfo).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    _createClass(CityInfo, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'render',
	        value: function render() {
	            var cityInfo = this.props.name + ' (' + this.props.country + ')';
	            return _react2.default.createElement(
	                'h1',
	                { className: _style2.default.city, title: this.props.id },
	                cityInfo
	            );
	        }
	    }]);

	    return CityInfo;
	}(_react2.default.Component);

	CityInfo.defaultProps = {
	    country: "City unknown"
	};

	exports.default = CityInfo;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(5);

	var _style2 = _interopRequireDefault(_style);

	var _parametrInfo = __webpack_require__(18);

	var _parametrInfo2 = _interopRequireDefault(_parametrInfo);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Rusak Oleg on 09.02.2016.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var DetailInfo = function (_React$Component) {
	    _inherits(DetailInfo, _React$Component);

	    function DetailInfo(props) {
	        _classCallCheck(this, DetailInfo);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DetailInfo).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    _createClass(DetailInfo, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {}

	        //todo: Current UV Index
	        //http://openweathermap.org/api_uv

	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: _style2.default.detail },
	                _react2.default.createElement(_parametrInfo2.default, { name: 'Pressure', value: this.props.detail.main.pressure }),
	                _react2.default.createElement(_parametrInfo2.default, { name: 'Humidity', value: this.props.detail.main.humidity }),
	                _react2.default.createElement(_parametrInfo2.default, { name: 'Visibility', value: this.props.detail.visibility }),
	                _react2.default.createElement(_parametrInfo2.default, { name: 'Wind', value: this.props.detail.wind.speed }),
	                _react2.default.createElement(_parametrInfo2.default, { name: 'Clouds', value: this.props.detail.clouds.all }),
	                _react2.default.createElement(_parametrInfo2.default, { name: 'Sunrise', value: this.props.detail.sys.sunrise }),
	                _react2.default.createElement(_parametrInfo2.default, { name: 'Sunset', value: this.props.detail.sys.sunset })
	            );
	        }
	    }]);

	    return DetailInfo;
	}(_react2.default.Component);

	DetailInfo.defaultProps = {
	    detail: {}
	};

	exports.default = DetailInfo;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(5);

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Rusak Oleg on 09.02.2016.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var Parametr = function (_React$Component) {
	    _inherits(Parametr, _React$Component);

	    function Parametr(props) {
	        _classCallCheck(this, Parametr);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Parametr).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    _createClass(Parametr, [{
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(5);

	var _style2 = _interopRequireDefault(_style);

	var _forecastDay = __webpack_require__(20);

	var _forecastDay2 = _interopRequireDefault(_forecastDay);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Rusak Oleg on 09.02.2016.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var Forecast = function (_React$Component) {
	    _inherits(Forecast, _React$Component);

	    function Forecast(props) {
	        _classCallCheck(this, Forecast);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Forecast).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    _createClass(Forecast, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'render',
	        value: function render() {
	            var forecastDay = [];
	            this.props.weather.list.forEach(function (day) {
	                forecastDay.push(_react2.default.createElement(_forecastDay2.default, { day: day }));
	            });
	            return _react2.default.createElement(
	                'div',
	                { className: _style2.default.forecast },
	                forecastDay
	            );
	        }
	    }]);

	    return Forecast;
	}(_react2.default.Component);

	Forecast.defaultProps = {
	    weather: {
	        list: []
	    }
	};

	exports.default = Forecast;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(5);

	var _style2 = _interopRequireDefault(_style);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Rusak Oleg on 09.02.2016.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var ForecastDay = function (_React$Component) {
	    _inherits(ForecastDay, _React$Component);

	    function ForecastDay(props) {
	        _classCallCheck(this, ForecastDay);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ForecastDay).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    _createClass(ForecastDay, [{
	        key: 'getTitle',
	        value: function getTitle() {
	            var weather = this.props.day.weather[0];
	            return weather.main + ' (' + weather.description + ')';
	        }
	    }, {
	        key: 'getFormattedDay',
	        value: function getFormattedDay() {
	            var millisecond = parseInt(this.props.day.dt, 10);
	            if (!millisecond) {
	                return "?";
	            }

	            var date = new Date(millisecond * 1000);
	            var formatter = new Intl.DateTimeFormat("en-US", {
	                day: "2-digit",
	                month: "short"
	            });
	            return formatter.format(date);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var day = this.getFormattedDay();
	            var title = this.getTitle();

	            return _react2.default.createElement(
	                'div',
	                { className: _style2.default.forecast_day },
	                _react2.default.createElement(
	                    'div',
	                    null,
	                    day
	                ),
	                _react2.default.createElement('img', { alt: title, title: title,
	                    src: 'http://openweathermap.org/img/w/' + this.props.day.weather[0].icon + '.png' }),
	                _react2.default.createElement(
	                    'div',
	                    null,
	                    this.props.day.temp.day,
	                    ' / ',
	                    this.props.day.temp.night
	                )
	            );
	        }
	    }]);

	    return ForecastDay;
	}(_react2.default.Component);

	ForecastDay.defaultProps = {
	    day: {
	        weather: [{}],
	        temp: {}
	    }
	};

	exports.default = ForecastDay;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _style = __webpack_require__(5);

	var _style2 = _interopRequireDefault(_style);

	var _weather = __webpack_require__(14);

	var _weather2 = _interopRequireDefault(_weather);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Rusak Oleg on 09.02.2016.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var WeatherApp = function (_React$Component) {
	    _inherits(WeatherApp, _React$Component);

	    function WeatherApp(props) {
	        _classCallCheck(this, WeatherApp);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WeatherApp).call(this, props));

	        _this.state = {
	            settings: {
	                unit_measure: {
	                    unit: "metric",
	                    unit_symbol: "C"
	                },
	                city: "Saint-Peterburg",
	                country: "ru",
	                lang: 'en',
	                API: {
	                    key: '7aaf25e81ae02f237ad79998501b8fe0',
	                    URL: 'http://api.openweathermap.org/data/2.5/',
	                    forecast: {
	                        method: 'forecast/daily',
	                        parametr: {
	                            cnt: 3
	                        }
	                    },
	                    weather: {
	                        method: 'weather'
	                    },
	                    history: {
	                        method: 'history/city',
	                        parametr: {
	                            cnt: 1,
	                            type: 'daily'
	                        }
	                    }
	                }
	            },
	            weather: {
	                weather: [],
	                sys: {},
	                wind: {},
	                clouds: {},
	                main: {}
	            },
	            forecast: {
	                list: []
	            },
	            history: {}
	        };
	        return _this;
	    }

	    _createClass(WeatherApp, [{
	        key: 'getRequest',
	        value: function getRequest(methodAPI) {
	            var data = [];
	            var settings = this.state.settings;
	            var parametr = settings.API[methodAPI].parametr;
	            var method = settings.API[methodAPI].method;

	            if (!method) {
	                throw new Error('Not support method [' + methodAPI + ']');
	            }

	            parametr = parametr ? parametr : {};

	            parametr = Array.from(parametr, function (v, k) {
	                return [k, v];
	            });

	            var param = new Map([['q', settings.city + ',' + settings.country], ['APPID', settings.API.key], ['lang', settings.lang], ['units', settings.unit_measure.unit]].concat(parametr));

	            param.forEach(function (value, key) {
	                data.push(key + '=' + value);
	            });

	            return method + '?' + data.join('&');
	        }
	    }, {
	        key: 'getDataAPI',
	        value: function getDataAPI(method, time) {
	            var _this2 = this;

	            var ctx = this;
	            setTimeout(function () {
	                return fetch(_this2.state.settings.API.URL + _this2.getRequest(method)).then(function (response) {
	                    return response.json();
	                }).then(function (data) {
	                    var obj = {};
	                    obj[method] = data;
	                    ctx.setState(obj);
	                }).catch(console.error);
	            }, time);
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.getDataAPI('weather');
	            this.getDataAPI('forecast', 1000);

	            //not in free subscription
	            //this.getDataAPI('history', 1000);
	            //this.getDataAPI('uvi', 1000);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: _style2.default.weather_container },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'tabs' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'tab', onClick: this.showWeather },
	                        'Weather'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'tab', onClick: this.showС },
	                        'Cities'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'tab', onClick: this.showWeather },
	                        'Settings'
	                    )
	                ),
	                _react2.default.createElement(_weather2.default, { weather: this.state.weather, forecast: this.state.forecast, settings: this.state.settings })
	            );
	        }
	    }]);

	    return WeatherApp;
	}(_react2.default.Component);

	exports.default = WeatherApp;

/***/ }
/******/ ]);