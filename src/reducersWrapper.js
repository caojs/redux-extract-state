import {
	ACTION_TYPE,
	MODULE_KEY
} from './constants.js';

export default function reducersWrapper (reducer) {
	return (state = { [MODULE_KEY]: {} }, action) => {
		switch (action.type) {
			case ACTION_TYPE:
				return {
					...state,
					[MODULE_KEY]: {
						...state[MODULE_KEY],
						...action.payload
					}
				};
			default:
				return reducer(state, action);
		}
	}
}