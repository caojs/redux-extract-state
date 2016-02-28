import warning from './warning.js';
import { MODULE_KEY } from './constants.js';
import { setState } from './action.js';
import reducersWrapper from './reducersWrapper.js';

let _keys = [];
let _store = {
	dispatch: () => warning(`You may forgot extractState(store) or has problem with redux store`)
};

function isObject (o) {
	return {}.toString.call(o) === '[object Object]';
}

export { reducersWrapper }
export function extract (key, Component) {
	if (~_keys.indexOf(key)) {
		warning(`Double components key with same name ${key}`);
	}
	_keys.push(key);

	let Extract = function () {
		Component.apply(this, arguments);
		_store.dispatch(setState(key, this.state));
	};

	Extract.prototype = Object.create(Component.prototype);
	Extract.prototype.constructor = Extract;
	Extract.prototype.setState = function (state) {
		_store.dispatch(setState(key, {
			...this.state,
			...state
		}));
		return Component.prototype.setState.apply(this, arguments);
	}

	for (let key in Component) {
		if (Component.hasOwnProperty(key)) {
			Extract[key] = Component[key];
		}
	}

	return Extract;
}

export function getState (state) {
	return (key, fn) => {
		let result = state[MODULE_KEY][key];
		if (typeof fn === 'function') {
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