# redux-extract-state
Extract state of component to redux store.

## Idea

index.js
```javascript
import { createStore } from 'redux';
import { reducersWrapper } from 'redux-extract-state';
import reducers from './reducers.js';

// wrapper reducers.
let store = createStore(reducersWrapper(reducers));
...

```

A.js
```javascript
import React, { Component } from 'react';
import { extract } from 'redux-extract-state';

let A = React.createClass({
	getInitialState () {
		return {
			counter: 0
		};
	},

	render () {
		return (
			<button onClick={() => this._clickHandler()}>Counter</button>
			)
	},

	_clickHandler () {
		let { counter } = this.state;
		this.setState({counter: counter + 1})
	}
});

// export key, so it can be used for getter.
export const key = 'A-key';
export default extract(key, A);
```

B.js
```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getState } from 'redux-extract-state';
import { key } from 'A.js'

let B = React.createClass({
	render () {
		let {
			counter,
			anotherState
		} = this.state;
		return (
			<span>A counter {counter}</span>
		)
	}
});

export default connect(
	(state) => ({
		...getState(key)(state),
		anotherState: 'another state'
	}))(B);
```


