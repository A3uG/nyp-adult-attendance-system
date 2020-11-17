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

describe('Date', function () {
    const date = {
        date: '2020-11-16',
        checked: 0,
        eventEventID: 2,
    };
    const id = 2;

    // it('should INSERT a Date', (done) => {
    //     chai.request(baseUrl)
    //         .post(`/date`)
    //         .type('form')
    //         .send(date)
    //         .end((err, res) => {
    //             console.log(res.body);
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             // no deep equal as eventID is dynamic generated
    //             done();
    //         });
    // });

    // it('should RETRIEVE ALL Date for a single Event', (done) => {
    //     chai.request(baseUrl)
    //         .get(`/date/${id}`)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('array');
    //             // console.log(res.body);
    //             // expect(res.body).to.deep.equal(date);
    //             done();
    //         });
    // });

    // it('should UPDATE a single User', (done) => {
    //     date.checked = 1;

    //     chai.request(baseUrl)
    //         .put(`/date/update/${id}/${date.date}`)
    //         .send(date)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             console.log(res.body);
    //             done();
    //         });
    // });

    // it('should DELETE a User', (done) => {
    //     chai.request(baseUrl)
    //         .delete(`/date/delete/${id}/${date.date}`)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             done();
    //         });
    // });
});