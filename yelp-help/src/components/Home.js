import React, { Component } from 'react';
import BodyCard from './BodyCard';
import * as yelp from '../lib/yelp';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      latitude: null,
      longitude: null,
      radius: 1610,
      price: 1,
      rating: 1,
      access: true
    };
  }

  _nextStep() {
    const { history } = this.props;
    history.push(`/location`);
  }

  render() {
    return (
      <div className="container">
        <h1 id='main-title' className='display-3 text-center'>Yelp Help</h1>

        <div className='col-md-12'>
          <p id='main-blurb' className='text-center'>
            {"Let us help you find a new restaurant in your area! Just tell us where you are, how far you're willing to drive and how much you're willing to spend and we'll do the rest."}
          </p>
          <button type='button' id='submit-button' className={`btn btn-block btn-primary`} onClick={() => this._nextStep()}>
            Start!
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
