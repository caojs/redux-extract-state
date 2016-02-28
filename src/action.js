import { ACTION_TYPE } from './constants.js';

export function setState (key, state) {
	return {
		type: ACTION_TYPE,
		payload: {
			[key]: state
		}
	}
} 