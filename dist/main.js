(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
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

	var _warning = __webpack_require__(1);

	var _warning2 = _interopRequireDefault(_warning);

	var _constants = __webpack_require__(2);

	var _action = __webpack_require__(3);

	var _action2 = _interopRequireDefault(_action);

	var _reducersWrapper = __webpack_require__(4);

	var _reducersWrapper2 = _interopRequireDefault(_reducersWrapper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _keys = [];
	var _store = {
		dispatch: function dispatch() {
			return (0, _warning2.default)('You may forgot extractState(store) or has problem with redux store');
		}
	};

	function isObject(o) {
		return Object.prototype.toString.call(o) === '[object Object]';
	}

	function isFunction(fn) {
		return typeof fn === 'function';
	}

	exports.reducersWrapper = _reducersWrapper2.default;
	function extract(key, Component) {

		/**
	  * Check if key is already in use.
	  */

		if (~_keys.indexOf(key)) {
			(0, _warning2.default)('Double components key with same name ' + key);
		} else {
			_keys.push(key);
		}

		/**
	  * Extend callback with dispatch action
	  */

		function callbackExtend(callback) {
			return function () {
				_store.dispatch((0, _action2.default)(key, this.state));
				if (isFunction(callback)) {
					callback.apply(this, arguments);
				}
			};
		}

		/**
	  * Create new class
	  */

		function Extract() {
			Component.apply(this, arguments);
			_store.dispatch((0, _action2.default)(key, this.state));
		}

		Extract.prototype = Object.create(Component.prototype);
		Extract.prototype.constructor = Extract;

		/**
	  * Extend setState
	  */

		Extract.prototype.setState = function (nextState, cb) {
			return Component.prototype.setState.call(this, nextState, callbackExtend(cb));
		};

		/**
	  * Extend forceUpdate
	  */

		Extract.prototype.forceUpdate = function (cb) {
			return Component.prototype.forceUpdate.call(this, callbackExtend(cb));
		};

		/**
	  * Copy static methods of Component
	  */

		for (var method in Component) {
			if (Component.hasOwnProperty(method)) {
				Extract[method] = Component[method];
			}
		}

		return Extract;
	}

	function getState(state) {
		return function (key, fn) {
			var result = state[_constants.MODULE_KEY][key];
			if (isFunction(fn)) {
				result = fn(result);
			}
			if (!isObject(result)) {
				(0, _warning2.default)(key + ' not return object');
			}
			return result;
		};
	}

	function extractState(store) {
		_store = _extends({}, _store, store);
		return store;
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = warning;
	function warning(message) {
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var MODULE_KEY = exports.MODULE_KEY = '@@EXTRACT_STATE_KEY@@';
	var ACTION_TYPE = exports.ACTION_TYPE = '@@EXTRACT_STATE_ACTION@@';

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = setState;

	var _constants = __webpack_require__(2);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function setState(key, state) {
		return {
			type: _constants.ACTION_TYPE,
			payload: _defineProperty({}, key, state)
		};
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = reducersWrapper;

	var _constants = __webpack_require__(2);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function reducersWrapper(reducer) {
		return function () {
			var state = arguments.length <= 0 || arguments[0] === undefined ? _defineProperty({}, _constants.MODULE_KEY, {}) : arguments[0];
			var action = arguments[1];

			switch (action.type) {
				case _constants.ACTION_TYPE:
					return _extends({}, state, _defineProperty({}, _constants.MODULE_KEY, _extends({}, state[_constants.MODULE_KEY], action.payload)));
				default:
					return reducer(state, action);
			}
		};
	}

/***/ }
/******/ ])
});
;