import React, { Component } from 'react';
import BodyCard from './BodyCard';
import * as yelp from '../lib/yelp';

class Home extends Component {
  constructor(props) {
    super(props);

    this._random = this._random.bind(this);

    this.state = {
      step: 0,
      latitude: null,
      longitude: null,
      radius: 1610,
      price: 1,
      rating: 1,
      loading: true,
      access: true
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      this.setState({ latitude, longitude, loading: false });
    }, e => {
      if(e.code == 1) {
        this.setState({ access: false, loading: false });
      }
    });
  }

  _nextStep() {
    let { step } = this.state;
    step += 1;
    this.setState({ step });
  }

  _random() {
    const { latitude, longitude, radius, price, rating, loading } = this.state;
    const { history } = this.props;
    if(latitude && longitude && !loading) {
      yelp.random(latitude, longitude, radius, price, rating)
      .then(response => {
        const { id } = response.body.businesses[0];
        history.push(`/result/${id}`);
      })
      .catch(e => console.log('Error.'))
    }
  }

  render() {
    return (
      <div className="container">
        <h1 id='main-title' className='display-3 text-center'>Yelp Help</h1>

        <div className='col-md-12'>
          <p id='main-blurb' className='text-center'>
            {"Let us help you find a new restaurant in your area! Just tell us how far you're willing to drive and how much you're willing to spend and we'll do the rest. PLEASE NOTE: You must allow location services for this website to function."}
          </p>
          <button type='button' id='submit-button' className={`btn btn-block btn-primary ${this.state.loading ? 'disabled' : ''}`} onClick={() => this._nextStep()}>
            {this.state.loading ? 'Loading' : 'Begin'}
          </button>
        </div>

        <div className='col-md-12'>
          <h2 className='body-title'>Search Radius</h2>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" onClick={() => this.setState({ radius: 1610 })} className={`btn btn-secondary ${this.state.radius === 1610 ? 'active' : null}`}>
              1 Mile
            </button>
            <button type="button" onClick={() => this.setState({ radius: 16100 })} className={`btn btn-secondary ${this.state.radius === 16100 ? 'active' : null}`}>
              10 Miles
            </button>
            <button type="button" onClick={() => this.setState({ radius: 40000 })} className={`btn btn-secondary ${this.state.radius === 40000 ? 'active' : null}`}>
              25 Miles
            </button>
          </div>
        </div>

        <div className='col-md-12'>
          <h2 className='body-title'>Price</h2>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" onClick={() => this.setState({ price: 1 })} className={`btn btn-secondary ${this.state.price === 1 ? 'active' : null}`}>
              $
            </button>
            <button type="button" onClick={() => this.setState({ price: 2 })} className={`btn btn-secondary ${this.state.price === 2 ? 'active' : null}`}>
              $$
            </button>
            <button type="button" onClick={() => this.setState({ price: 3 })} className={`btn btn-secondary ${this.state.price === 3 ? 'active' : null}`}>
              $$$
            </button>
            <button type="button" onClick={() => this.setState({ price: 4 })} className={`btn btn-secondary ${this.state.price === 4 ? 'active' : null}`}>
              $$$$
            </button>
          </div>
        </div>

        <div className='col-md-12'>
          <button type='button' id='submit-button' className={`btn btn-block btn-primary ${this.state.loading ? 'disabled' : ''}`} onClick={() => this._random()}>
            {this.state.loading ? 'Loading' : 'Find a Restaurant!'}
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
