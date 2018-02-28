import React, { Component } from 'react';
import * as yelp from '../lib/yelp';
import '../App.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
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
    .catch(e => console.log(e));
  }

  _loading() {
    const { loading } = this.state;
    const { image_url, location, name, phone, price, url } = this.state.data;

    if(loading) {
      return (
        <h1 id='main-title' className='display-3 text-center'>Loading</h1>
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
            <p className="card-text"><b>Phone:</b> {phone}</p>
            <p className="card-text"><b>Address:</b> {location.address1}, {location.city}, {location.state} {location.zip_code}</p>
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
