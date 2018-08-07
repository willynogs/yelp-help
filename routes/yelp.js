var express = require('express');
var yelp = require('yelp-fusion');
var config = require('../config');
var router = express.Router();
var client = yelp.client(config.yelp_key);

/* Random */
router.post('/random', function(req, res, next) {
  /* Inital request is made, returns a "total" number of results in the response */
  client.search(req.body)
  .then(response => {
    if(response.statusCode == 200) {
      /* Handling a bug with the Yelp API, limit max to never be greater than 1000 */
      var max = response.jsonBody.total >= 1000 ? 1000 : response.jsonBody.total;
      /* Generate a random number between 0 and max, this number selects our restaurant choice */
      var rand = Math.floor(Math.random() * max);
      /* Include the random number as the offset in the new request body */
      req.body['offset'] = rand;
      /* Second request to the Yelp API, returns our final result */
      client.search(req.body)
      .then(response => {
        if(response.statusCode == 200) {
          res.json({ error: false, body: response.jsonBody });
        } else {
          res.json({ error: true, statusCode: response.statusCode });
        }
      })
      .catch(e => console.log(e));
    } else {
      res.json({ error: true, statusCode: response.statusCode });
    }
  })
  .catch(e => {
    console.log(e);
  });
});

/* Lookup By ID */
router.post('/lookup/:id', function(req, res, next) {
  client.business(req.params.id)
  .then(response => {
    if(response.statusCode == 200) {
      res.json({ error: false, body: response.jsonBody });
    } else {
      res.json({ error: true, statusCode: response.statusCode });
    }
  })
  .catch(e => {
    console.log(e);
  });
});

/* Autocomplete :: unneccesary at the moment */
router.post('/autocomplete', function(req, res, next) {
  client.autocomplete(req.body)
  .then(response => {
    if(response.statusCode == 200) {
      res.json({ error: false, body: response.jsonBody });
    } else {
      res.json({ error: true, statusCode: response.statusCode });
    }
  })
  .catch(e => {
    console.log(e);
  });
});

module.exports = router;
