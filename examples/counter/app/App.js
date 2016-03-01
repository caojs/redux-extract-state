import React from 'react';
import { connect } from 'react-redux';
import { getState } from 'redux-extract-state';
import randomKey from 'redux-extract-state/randomKey.js';
import Counter from './Counter.js';
import Watcher from './Watcher.js';

let key = randomKey('Counter');
let key1 = randomKey('Counter');

let App = React.createClass({
	render () {
		let {
			count,
			count1
		} = this.props;

		return (
			<div>
				<div>
					<h3>Watchable:</h3>
					<Counter ident={key}/>
					<Counter ident={key1}/>	
				</div>
				<div>
					<h3>Watcher:</h3>
					<Watcher {...{count, count1}}/>
				</div>
			</div>
			)
	}
})

export default connect(
	(state) => {
		let getter = getState(state);
		return {
			...getter(key),
			...getter(key1, ({ count }) => ({ count1: count }))
		};
	})(App);