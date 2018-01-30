import React, { Component } from 'react';
import './App.css';
import TweetMap from './tweet-map/components/tweet-map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TweetMap />
      </div>
    );
  }
}

export default App;
