import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import extractState, { reducersWrapper } from 'redux-extract-state';
import reducers from './reducers.js';
import App from './App.js';

let store = extractState(createStore(reducersWrapper(reducers)));

render(
	<Provider store={store}><App/></Provider>,
	document.getElementById('app'));
