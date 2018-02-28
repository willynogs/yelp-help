import React, { Component } from 'react';
import * as yelp from '../lib/yelp';
import '../App.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this._random = this._random.bind(this);

    this.state = {
      latitude: null,
      longitude: null,
      radius: 40000,
      price: 1,
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
    const { latitude, longitude, radius, price, loading } = this.state;
    const { history } = this.props;
    if(latitude && longitude && !loading) {
      yelp.random(latitude, longitude, radius, price)
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

        <div className='row'>
          <div className='col-md-6 col-sm-12'>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Location</h5>
                <h6 className="card-subtitle mb-2 text-muted">We need your location so we can find restaurants nearby</h6>
                <input type='text' className='form-control' />
              </div>
            </div>
          </div>

          <div className='col-md-6 col-sm-12'>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Radius</h5>
                <h6 className="card-subtitle mb-2 text-muted">How far out are you willing to go?</h6>
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
            </div>
          </div>

          <div className='col-md-6 col-sm-12'>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Price</h5>
                <h6 className="card-subtitle mb-2 text-muted">How much are you willing to spend?</h6>
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
            </div>
          </div>

          <div className='col-md-6 col-sm-12'>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Do It!</h5>
                <h6 className="card-subtitle mb-2 text-muted">Let us pick your restaurant!</h6>
                <button type="button" className={`btn btn-primary ${this.state.loading ? 'disabled' : null}`} onClick={() => this._random()}>
                  {this.state.loading ? 'Loading' : 'Random'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
