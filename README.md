# redux-extract-state
Extract state of component to redux store.

## Usage:

index.js
```javascript
import { createStore } from 'redux';
import extractState, { reducersWrapper } from 'redux-extract-state';
import reducers from './reducers.js';

// wrapper reducers.
let store = extractState(createStore(reducersWrapper(reducers)));
...

```

Counter.js
```javascript
import { extract } from 'redux-extract-state';

let Counter = React.createClass({
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

export default extract(Counter, 'propKey' /* prop name, default is exKey */);
```

Watcher.js
```javascript

let Watcher = () => {
	let {
		counter
	} = this.props;
	return (
		<span>Counter {counter}</span>
	)
};

export default Watcher;

```

App.js
```javascript
import Counter from './Counter.js';
import Watcher from './Watcher.js';
import { getState } from 'redux-extract-key';
import randomKey from 'redux-extract-key/randomKey';

// randomKey will return unique key, you no need to use it.
let counterKey = randomKey();
let App = () => {
	let { counter } = this.props
	return (
		<div>
			{/* pass counterKey to propKey prop (we've just set on Counter.js) */}
			<Counter propKey={counterKey}/>
			<Watcher counter={counter}/>
		</div>
	)
};

export default connect(
	(state) => ({
		// getState will use counterKey to return states of Counter
		...getState(state)(counterKey)
	}))(App);
```


