import {
  SET_ACTION,
  REMOVE_ACTION,
  MODULE_KEY
} from './constants.js';

export default function reducersWrapper (reducer) {
  return (state = { [MODULE_KEY]: {} }, action) => {
    switch (action.type) {
      case SET_ACTION:
        return {
          ...state,
          [MODULE_KEY]: {
            ...state[MODULE_KEY],
            ...action.payload
          }
        };

      case REMOVE_ACTION:
        delete state[MODULE_KEY][action.payload];
        return {
          ...state,
          [MODULE_KEY]: {
            ...state[MODULE_KEY]
          }
        };

      default:
        return reducer(state, action);
    }
  }
}
