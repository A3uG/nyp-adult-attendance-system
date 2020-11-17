const assert = require('assert');
const { expect } = require('chai');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

// configure chai
chai.use(chaiHttp);
chai.should();
chai.expect;

const baseUrl = 'http://localhost:8080/api/events';

describe('EventUser', function () {
    const eventUser = {
        date: '2020-11-16',
        amStatus: false,
        pmStatus: false,
        eventEventID: 2,
        userID: "3dda9e4f-debe-4f88-8017-6fca28e19078"
    }
    const id = 2;

    // it('should INSERT a EventUser', (done) => {
    //     chai.request(baseUrl)
    //         .post(`/eventUser`)
    //         .type('form')
    //         .send(eventUser)
    //         .end((err, res) => {
    //             console.log(res.body);
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             // no deep equal as eventID is dynamic generated
    //             done();
    //         });
    // });

    // it('should RETRIEVE a EventUser', (done) => {
    //     chai.request(baseUrl)
    //         .get(`/eventUser/${eventUser.userId}/${eventUser.date}`)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('array');
    //             console.log(res.body);
    //             // expect(res.body).to.deep.equal(date);
    //             done();
    //         });
    // });

    // it('should UPDATE a single EventUser', (done) => {
    //     eventUser.amStatus = true;

    //     chai.request(baseUrl)
    //         .put(`/eventUser/update/${eventUser.userId}/${eventUser.date}`)
    //         .send(eventUser)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             console.log(res.body);
    //             done();
    //         });
    // });

    // it('should RETRIEVE a EventUser, include User table', (done) => {
    //     chai.request(baseUrl)
    //         .get(`/eventUser/all/${id}/${eventUser.date}`)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('array');
    //             console.log(res.body);
    //             // expect(res.body).to.deep.equal(date);
    //             done();
    //         });
    // });
});