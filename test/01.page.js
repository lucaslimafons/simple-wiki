const app = require('../server/app');
const supertest = require('supertest');
const server = supertest.agent(app);
const should = require('should');
const messages = require('../common/messages');

describe('01 - Acronym endpoints', function () {
  it('GET /acronym?from=0&limit=10&search=1 - Success', function (done) {
    server
      .get('/api/acronym?from=0&limit=10&search=1')
      .expect('Content-type',/json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.data.should.be.an.instanceOf(Object);
        res.body.data.count.should.be.greaterThan(0);
        res.body.data.rows.should.be.an.instanceOf(Array);
        res.body.data.rows.length.should.be.greaterThan(0);
        done();
      });
  });

  it('GET /acronym/:acronym - Success', function (done) {
    server
      .get('/api/acronym/eta')
      .expect('Content-type',/json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.data.should.be.an.instanceOf(Array);
        res.body.data.length.should.be.eql(2);
        res.body.data[0].abbreviation.should.be.eql('ETA');
        done();
      });
  });

  it('GET /acronym/random/:count - Success', function (done) {
    server
      .get('/api/acronym/random/10')
      .expect('Content-type',/json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.data.should.be.an.instanceOf(Array);
        res.body.data.length.should.be.eql(10);
        done();
      });
  });

  it('POST /acronym - Error', function (done) {
    server
      .post('/api/acronym')
      .send({
        abbreviation: 'dry'
      })
      .expect('Content-type',/json/)
      .expect(422)
      .end(function (err, res) {
        res.status.should.equal(422);
        res.body.should.be.an.instanceOf(Object);
        res.body.should.have.property('data').eql(null);
        res.body.should.have.property('errors');
        res.body.errors.should.be.an.instanceOf(Array);
        res.body.errors.length.should.be.eql(1);
        res.body.errors[0].should.be.an.instanceOf(Object);
        res.body.errors[0].should.have.property('message').eql(messages.text_required);
        res.body.errors[0].should.have.property('field').eql('text');
        done();
      });
  });

  it('POST /acronym - Success', function (done) {
    server
      .post('/api/acronym')
      .send({
        abbreviation: 'dry',
        text: 'dont repeat yourself'
      })
      .expect('Content-type',/json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.data.should.be.an.instanceOf(Object);
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('text');
        res.body.data.should.have.property('abbreviation').eql('dry');
        done();
      });
  });

  it('PUT /acronym/:id - Error', function (done) {
    server
      .put('/api/acronym/123')
      .send({
        text: 'testing put update'
      })
      .expect('Content-type',/json/)
      .expect(401)
      .end(function (err, res) {
        res.status.should.equal(401);
        done();
      });
  });

  it('PUT /acronym/:id - Success', function (done) {
    server
      .put('/api/acronym/123')
      .send({
        text: 'testing put update'
      })
      .set({ 'Authorization': 'Bearer g2i' })
      .expect('Content-type',/json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.data.should.be.an.instanceOf(Object);
        res.body.data.should.have.property('text');
        done();
      });
  });

  it('DELETE /acronym/:id - Success', function (done) {
    server
      .delete('/api/acronym/123')
      .set({ 'Authorization': 'Bearer g2i' })
      .expect('Content-type',/json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });
});
