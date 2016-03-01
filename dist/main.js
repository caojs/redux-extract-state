(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ReduxExtractState"] = factory();
	else
		root["ReduxExtractState"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.reducersWrapper = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.extract = extract;
	exports.getState = getState;
	exports.default = extractState;

	var _warning = __webpack_require__(4);

	var _warning2 = _interopRequireDefault(_warning);

	var _constants = __webpack_require__(1);

	var _actionCreators = __webpack_require__(2);

	var _reducersWrapper = __webpack_require__(3);

	var _reducersWrapper2 = _interopRequireDefault(_reducersWrapper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var idents = [];
	var store = {
		dispatch: function dispatch() {
			return (0, _warning2.default)('Warning: Forget use extractState(store)');
		}
	};

	function isObject(o) {
		return Object.prototype.toString.call(o) === '[object Object]';
	}

	function isFunction(fn) {
		return typeof fn === 'function';
	}

	exports.reducersWrapper = _reducersWrapper2.default;
	function extract(Component, prop) {
		prop = prop || _constants.DEFAULT_PROP_NAME;

		/**
	  * Extend callback with dispatch action
	  */

		function callbackExtend(callback) {
			return function () {
				store.dispatch((0, _actionCreators.set)(this._esComponentIdent, this.state));
				if (isFunction(callback)) {
					callback.apply(this, arguments);
				}
			};
		}

		/**
	  * Create new class, which inherits properties from Component.prototype
	  */

		function ExtractContainer(props) {
			Component.apply(this, arguments);

			var ident = props[prop];
			if (!ident) {

				// Warning when don't pass value to prop
				(0, _warning2.default)('Warning: You forget pass value to ' + prop + ' prop');
			} else {

				// Check and throw error in case the key prop is not unique
				if (idents.indexOf(ident) >= 0) {
					throw new Error('The ' + prop + ' prop must be unique.');
				}

				this._esComponentIdent = ident;
			}
		}

		ExtractContainer.prototype = Object.create(Component.prototype);
		ExtractContainer.prototype.constructor = ExtractContainer;

		var containerProto = ExtractContainer.prototype;
		var _Component$prototype = Component.prototype;
		var setState = _Component$prototype.setState;
		var forceUpdate = _Component$prototype.forceUpdate;
		var componentDidMount = _Component$prototype.componentDidMount;
		var componentWillUnmount = _Component$prototype.componentWillUnmount;

		/**
	  * Extend setState
	  */

		containerProto.setState = function (nextState, cb) {
			return setState.call(this, nextState, callbackExtend(cb));
		};

		/**
	  * Extend forceUpdate
	  */

		containerProto.forceUpdate = function (cb) {
			return forceUpdate.call(this, callbackExtend(cb));
		};

		containerProto.componentDidMount = function () {
			idents.push(this._esComponentIdent);
			store.dispatch((0, _actionCreators.set)(this._esComponentIdent, this.state));

			// call componentDidMount function on base Component if has any.
			if (isFunction(componentDidMount)) {
				componentDidMount.apply(this, arguments);
			}
		};

		/**
	  * Cleanup
	  */

		containerProto.componentWillUnmount = function () {
			var index = idents.indexOf(this._esComponentIdent);

			if (index >= 0) {
				idents.splice(index, 1);
			}

			// dispatch remove action, so store can clean data.
			store.dispatch((0, _actionCreators.remove)(this._esComponentIdent));

			// call componentWillUnmount function on base Component if has any.
			if (isFunction(componentWillUnmount)) {
				componentWillUnmount.apply(this, arguments);
			};
		};

		/**
	  * Copy static methods of Component
	  */

		for (var method in Component) {
			if (Component.hasOwnProperty(method)) {
				ExtractContainer[method] = Component[method];
			}
		}

		return ExtractContainer;
	}

	function getState(state) {
		return function (key, fn) {
			var result = state[_constants.MODULE_KEY][key];

			if (!isObject(result)) {
				(0, _warning2.default)('Warning: ' + key + ' not return object');
				result = {};
			}

			if (isFunction(fn)) {
				result = fn(result);
			}

			return result;
		};
	}

	function extractState(reduxStore) {
		store = _extends({}, store, reduxStore);
		return reduxStore;
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var MODULE_KEY = exports.MODULE_KEY = '@@EXTRACT_STATE_KEY@@';
	var SET_ACTION = exports.SET_ACTION = '@@EXTRACT_STATE_SET@@';
	var REMOVE_ACTION = exports.REMOVE_ACTION = '@@EXTRACT_STATE_REMOVE@@';
	var DEFAULT_PROP_NAME = exports.DEFAULT_PROP_NAME = 'exKey';

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.set = set;
	exports.remove = remove;

	var _constants = __webpack_require__(1);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function set(key, state) {
		return {
			type: _constants.SET_ACTION,
			payload: _defineProperty({}, key, state)
		};
	}

	function remove(key) {
		return {
			type: _constants.REMOVE_ACTION,
			payload: key
		};
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = reducersWrapper;

	var _constants = __webpack_require__(1);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function reducersWrapper(reducer) {
		return function () {
			var state = arguments.length <= 0 || arguments[0] === undefined ? _defineProperty({}, _constants.MODULE_KEY, {}) : arguments[0];
			var action = arguments[1];

			switch (action.type) {
				case _constants.SET_ACTION:
					return _extends({}, state, _defineProperty({}, _constants.MODULE_KEY, _extends({}, state[_constants.MODULE_KEY], action.payload)));

				case _constants.REMOVE_ACTION:
					delete state[_constants.MODULE_KEY][action.payload];
					return _extends({}, state, _defineProperty({}, _constants.MODULE_KEY, _extends({}, state[_constants.MODULE_KEY])));

				default:
					return reducer(state, action);
			}
		};
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = warning;
	function warning(message) {
	  if ((undefined) !== 'production') {
	    /* eslint-disable no-console */
	    if (typeof console !== 'undefined' && typeof console.error === 'function') {
	      console.error(message);
	    }
	    /* eslint-enable no-console */
	    try {
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	      /* eslint-disable no-empty */
	    } catch (e) {}
	    /* eslint-enable no-empty */
	  }
	}

/***/ }
/******/ ])
});
;