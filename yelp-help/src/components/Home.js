import React, { Component } from 'react';
import BodyCard from './BodyCard';
import * as yelp from '../lib/yelp';

class Home extends Component {
  constructor(props) {
    super(props);

    this._random = this._random.bind(this);

    this.state = {
      latitude: null,
      longitude: null,
      radius: 1610,
      price: 1,
      rating: 1,
      loading: true
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      this.setState({ latitude, longitude, loading: false });
    });
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
        
        <BodyCard title='Search Radius'>
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
        </BodyCard>
        
        <BodyCard title='Price'>
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
        </BodyCard>
        
        <BodyCard title='Submit'>
          <button type="button" className={`btn btn-primary ${this.state.loading ? 'disabled' : ''}`} onClick={() => this._random()}>
            {this.state.loading ? 'Loading' : 'Random'}
          </button>
        </BodyCard>
      </div>
    );
  }
}

export default Home;
