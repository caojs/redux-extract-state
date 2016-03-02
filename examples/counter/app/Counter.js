import React from 'react';
import { extract } from 'redux-extract-state';

let Counter = React.createClass({
  getInitialState () {
    return { count: 0 };
  },

  render () {
    let { count } = this.state;
    return (
      <div>
        {count}
        <button onClick={() => this._increment()}>Increment</button>
        <button onClick={() => this._decrement()}>Decrement</button>
      </div>
      )
  },

  _increment () {
    let { count } = this.state;

    // Don't use state like this in your code.
    this.state.count = count + 1;
    this.forceUpdate();
  },

  _decrement () {
    let { count } = this.state;
    this.setState({ count: count - 1 });
  }
})

export default extract(Counter, 'ident');
