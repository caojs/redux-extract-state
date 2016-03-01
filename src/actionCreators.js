import { SET_ACTION, REMOVE_ACTION } from './constants.js';

export function set (key, state) {
	return {
		type: SET_ACTION,
		payload: {
			[key]: state
		}
	};
}

export function remove (key) {
	return {
		type: REMOVE_ACTION,
		payload: key
	};
}