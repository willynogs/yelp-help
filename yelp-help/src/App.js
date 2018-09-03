import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Results from './components/Results';
import NotFound from './components/NotFound';
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

          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/result/:id' component={Results} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
