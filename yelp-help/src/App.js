import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Results from './components/Results';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Router>
        <div>
          <div id='banner'>
            <span>Created by <a href='https://willynogs.com' rel="noopener noreferrer" target='_blank'>@willynogs</a></span>
          </div>
          <Route exact path='/' component={Home} />
          <Route path='/result/:id' component={Results} />
        </div>
      </Router>
    );
  }
}

export default App;
