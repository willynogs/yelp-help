let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('/GET index', function() {
  it('it should load homepage', function(done) {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
      should.not.exist(err);
      res.should.have.status(200);
      done();
    });
  });
});

describe('/POST random', function() {
  it('it should get a random restaurant', function(done) {
    chai.request(server)
    .post('/yelp/random')
    .type('form')
    .send({
      limit: 1,
      latitude: 40.7128,
      longitude: -74.0060,
      radius: 1610,
      price: 1,
      term: 'restaurants'
    })
    .end(function(err, res) {
      should.not.exist(err);
      res.body.error.should.equal(false);
      res.body.body.businesses.length.should.equal(1);
      res.should.have.status(200);
      done();
    });
  });
});

describe('/POST find by id', function() {
  it('it should lookup restaurants by id', function(done) {
    chai.request(server)
    .post('/yelp/lookup/3aLAjUNE_eTT6AGYYC7OGQ')
    .end(function(err, res) {
      should.not.exist(err);
      res.body.error.should.equal(false);
      res.body.body.id.should.equal('3aLAjUNE_eTT6AGYYC7OGQ');
      res.should.have.status(200);
      done();
    })
  })
});
