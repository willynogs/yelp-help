/*
A collection of functions that talk to our Express server, which talks to the Yelp API for us
author: Will Naugle
*/

/*
USAGE: pass a search term, lat, lon and get back search suggestions
RETURNS: promise
DOCS: https://www.yelp.com/developers/documentation/v3/autocomplete
*/
export const autocomplete = (text, latitude, longitude) => {
  return new Promise((resolve, reject) => {
    fetch('/yelp/autocomplete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ text, latitude, longitude })
    })
    .then(res => res.json())
    .then(body => body.error ? reject(body.statusCode) : resolve(body.body))
    .catch(e => reject(e));
  });
};

/*
1. Make initial request to get total number of options available, n
2. Generate a random number between 1 and n
3. Pick the restaurant at n
USAGE: pass your location and get a random restaurant
RETURNS: promise
*/
export const random = (latitude, longitude, radius, price, rating) => {
  return new Promise((resolve, reject) => {
    fetch('/yelp/random', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ limit: 1, latitude, longitude, radius, price, term: "restaurants" })
    })
    .then(res => res.json())
    .then(body => resolve(body))
    .catch(e => reject(e));
  });
};

export const lookup = (id) => {
    return new Promise((resolve, reject) => {
      fetch(`/yelp/lookup/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(body => {
        if(!body.error) {
          resolve(body);
        } else {
          reject(body);
        }
      })
      .catch(e => reject(e));
    });
};
