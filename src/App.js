import './App.css';
import React, { Component } from 'react';

import { observer } from 'mobx-react'

class App extends Component {
  render() {
    const { timer } = this.props
    return (
      <div className="App">
        <header className="App-header">
          <p>
            {timer.count}
          </p>
          <button onClick={() => timer.increment()}>+</button>
          <button onClick={() => timer.decrement()}>-</button>
        </header>
      </div>
    );
  }
}

export default observer(App);
