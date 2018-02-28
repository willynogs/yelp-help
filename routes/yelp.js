var express = require('express');
var yelp = require('yelp-fusion');
var config = require('../config');
var router = express.Router();
var client = yelp.client(config.yelp_key);

/* Random */
router.post('/random', function(req, res, next) {
  client.search(req.body)
  .then(response => {
    if(response.statusCode == 200) {
      var max = response.jsonBody.total >= 1000 ? 1000 : response.jsonBody.total;
      var rand = Math.floor(Math.random() * max);
      req.body['offset'] = rand;
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
