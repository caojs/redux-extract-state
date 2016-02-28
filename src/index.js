import warning from './warning.js';
import { MODULE_KEY } from './constants.js';
import action from './action.js';
import reducersWrapper from './reducersWrapper.js';

let _keys = [];
let _store = {
	dispatch: () => warning(`You may forgot extractState(store) or has problem with redux store`)
};

function isObject (o) {
	return Object.prototype.toString.call(o) === '[object Object]';
}

function isFunction (fn) {
	return typeof fn === 'function';
}

export { reducersWrapper }

export function extract (key, Component) {

	/**
	 * Check if key is already in use.
	 */

	if (~_keys.indexOf(key)) {
		warning(`Double components key with same name ${key}`);
	}
	else {
		_keys.push(key);
	}

	/**
	 * Extend callback with dispatch action
	 */

	function callbackExtend(callback) {
		return function () {
			_store.dispatch(action(key, this.state));
			if (isFunction(callback)) {
				callback.apply(this, arguments);
			}
		};
	}

	/**
	 * Create new class, which inherits properties from Component.prototype
	 */

	function Extract () {
		Component.apply(this, arguments);
		_store.dispatch(action(key, this.state));
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

	for (let method in Component) {
		if (Component.hasOwnProperty(method)) {
			Extract[method] = Component[method];
		}
	}

	return Extract;
}

export function getState (state) {
	return (key, fn) => {
		let result = state[MODULE_KEY][key];
		if (isFunction(fn)) {
			result = fn(result);
		}
		if (!isObject(result)) {
			warning(`${key} not return object`);
		}
		return result;
	};
}

export default function extractState (store) {
	_store = {
		..._store,
		...store
	};
	return store;
}
