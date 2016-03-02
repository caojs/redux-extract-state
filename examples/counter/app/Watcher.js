import React from 'react';

let Watcher = (props) => {
  let {
    count,
    count1
  } = props;

  return (
    <div>
      <span>Counter 1: {count}</span><br/>
      <span>Counter 2: {count1}</span>
    </div>
    )
};

export default Watcher;
