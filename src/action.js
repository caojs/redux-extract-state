import { ACTION_TYPE } from './constants.js';

export default function setState (key, state) {
	return {
		type: ACTION_TYPE,
		payload: {
			[key]: state
		}
	}
} 