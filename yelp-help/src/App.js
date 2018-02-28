import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Results from './components/Results';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/result/:id' component={Results} />
        </div>
      </Router>
    );
  }
}

export default App;
