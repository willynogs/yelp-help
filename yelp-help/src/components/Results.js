import React, { Component } from 'react';
import * as yelp from '../lib/yelp';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: false,
      errorText: '',
      data: {}
    };
  }

  componentWillMount() {
    yelp.lookup(this.props.match.params.id)
    .then(response => {
      if(!response.error) {
        this.setState({ data: response.body, loading: false });
      }
    })
    .catch(e => {
      this.setState({ loading: false, error: true, errorText: e.statusText })
    });
  }

  _loading() {
    const { loading, error, errorText } = this.state;
    const { image_url, location, name, phone, price, url } = this.state.data;

    if(loading) {
      return (
        <h1 id='main-title' className='display-3 text-center'>Loading</h1>
      );
    } else if(error) {
      return (
        <h1 id='main-title' className='display-3 text-center'>Oops! Restaurant not found.</h1>
      );
    }

    return (
      <div>
        <h1 id='main-title' className='display-3 text-center'>Results</h1>
        <div className="card">
          <img className="card-img-top" src={image_url} alt={`${name || 'restaurant'}`} />
          <div className="card-body">
            <h5 className="card-title">
              <a href={url} target='_blank'>{name}</a>
            </h5>
            <p className="card-text"><b>Phone:</b> <a href={'tel:' + phone}>{phone}</a></p>
            <p className="card-text"><b>Address:</b> <a href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(name)} target='_blank'>{location.address1}, {location.city}, {location.state} {location.zip_code}</a></p>
            <p className="card-text"><b>Price:</b> {price}</p>
            <p className="card-text"><b>Rating:</b> {this._rating()}</p>
          </div>
        </div>
      </div>
    );
  }

  _rating() {
    const { rating } = this.state.data;
    const stars = Math.round(rating);
    const arr = [];
    for(let i = 0; i < stars; i += 1) {
      arr.push(<i key={`Star ${i}`} className="fa fa-star" aria-hidden="true"></i>);
    }
    return arr;
  }

  render() {
    return (
      <div className="container">
        {this._loading()}
      </div>
    );
  }
}

export default Home;
