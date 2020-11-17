const assert = require('assert');
const { expect } = require('chai');
const { v4: uuidv4 } = require('uuid');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

// configure chai
chai.use(chaiHttp);
chai.should();
chai.expect;

const baseUrl = 'http://localhost:8080/api/events';

describe('Users', function () {

    // Create user
    const user = {
        id: "7b9c55c1-40dc-490b-aaf9-4f4562d3e4bd",//uuidv4(),
        fullName: 'Mark Kheng',
        phoneNum: '987654321',
        email: 'markk@email.com',
        age: 40,
        gender: 'M',
        eventEventID: 2,
        userCompany: 'ST Engineering'
    };
    const id = "7b9c55c1-40dc-490b-aaf9-4f4562d3e4bd";

    // it('should INSERT an User', (done) => {
    //     chai.request(baseUrl)
    //         .post(`/users`)
    //         .type('form')
    //         .send(user)
    //         .end((err, res) => {
    //             console.log(res.body);
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             // no deep equal as eventID is dynamic generated
    //             done();
    //         });
    // });

    // it('should RETRIEVE a single User', (done) => {

    //     chai.request(baseUrl)
    //         .get(`/users/all/${id}`)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             console.log(res.body);
    //             expect(res.body).to.deep.equal(user);
    //             done();
    //         });
    // });

    // it('should UPDATE a single User', (done) => {
    //     user.fullName = "Mar Kok";

    //     chai.request(baseUrl)
    //         .put(`/users/update/${id}`)
    //         .send(user)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             done();
    //         });
    // });

    // it('should DELETE a User', (done) => {
    //     chai.request(baseUrl)
    //         .delete(`/${id}`)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             done();
    //         });
    // });

    // it('should RETRIEVE ALL User by a single Event', (done) => {
    //     var id = 2;
    //     chai.request(baseUrl)
    //         .get(`/users/${id}`)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('array');
    //             console.log(res.body);
    //             done();
    //         });
    // });
});