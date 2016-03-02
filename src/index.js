import warning from './warning.js';
import { MODULE_KEY, DEFAULT_PROP_NAME } from './constants.js';
import { set, remove } from './actionCreators.js';
import reducersWrapper from './reducersWrapper.js';

let idents = {};
let reservedProps = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
let store = {
  dispatch: () => warning(`Warning: Forget use extractState(store)`)
};

function isFunction (fn) {
  return typeof fn === 'function';
}

export { reducersWrapper }

export function extract (Component, prop) {
  if (reservedProps[prop]) {
    throw new Error(`"${prop}" is a react reserved prop.`);
  }

  prop = prop || DEFAULT_PROP_NAME;


  /**
   * Extend callback with dispatch action
   */

  function callbackExtend(callback) {
    return function () {
      store.dispatch(set(this._esComponentIdent, this.state));
      if (isFunction(callback)) {
        callback.apply(this, arguments);
      }
    };
  }

  /**
   * Create new class, which inherits properties from Component.prototype
   */

  function ExtractContainer (props) {
    Component.apply(this, arguments);

    let ident = props[prop];
    if (!ident) {

      // Warning when don't pass value to prop
      warning(`Warning: You forget pass value to ${prop} prop.`);
    }
    else {

      // Check and throw error in case the key prop is not unique
      if (idents[ident]) {
        throw new Error(`"${prop}" prop must be unique.`)
      }

      idents[ident] = true;
      this._esComponentIdent = ident;
    }
  }

  ExtractContainer.prototype = Object.create(Component.prototype);
  ExtractContainer.prototype.constructor = ExtractContainer;

  let containerProto = ExtractContainer.prototype;
  let {
    setState,
    forceUpdate,
    componentDidMount,
    componentWillUnmount
  } = Component.prototype;

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
    store.dispatch(set(this._esComponentIdent, this.state));

    // call componentDidMount function on base Component if has any.
    if (isFunction(componentDidMount)) {
      componentDidMount.apply(this, arguments);
    }
  };

  /**
   * Cleanup
   */

  containerProto.componentWillUnmount = function () {
    idents[this._esComponentIdent] = null;

    // dispatch remove action, so store can clean data.
    store.dispatch(remove(this._esComponentIdent));


    // call componentWillUnmount function on base Component if has any.
    if (isFunction(componentWillUnmount)) {
      componentWillUnmount.apply(this, arguments);
    };
  }

  /**
   * Copy static methods of Component
   */

  for (let method in Component) {
    if (Component.hasOwnProperty(method)) {
      ExtractContainer[method] = Component[method];
    }
  }

  return ExtractContainer;
}

export function getState (state) {
  return (key, fn) => {
    let result = state[MODULE_KEY][key];

    if (isFunction(fn)) {
      result = fn(result || {});
    }

    return result;
  };
}

export default function extractState (reduxStore) {
  store = {
    ...store,
    ...reduxStore
  };
  return reduxStore;
}
