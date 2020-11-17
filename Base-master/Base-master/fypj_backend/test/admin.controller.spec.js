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


// Admin
describe('Admin', function () {
    const admin = {
        fullName: 'Alvin Tan',
        email: 'alvin@email.com',
        username: 'alvin',
        password: '1234'
    };
    const id = 2;

    // it('should INSERT an Admin', (done) => {
    //     chai.request(baseUrl)
    //         .post(`/admin`)
    //         .type('form')
    //         .send(admin)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             //no deep equal as eventID is dynamic generated
    //             done();
    //         });
    // });

    // it('should RETRIEVE a single Admin record', (done) => {  
    //     admin.id = id;

    //     chai.request(baseUrl)
    //         .get(`/admin/all/${id}`)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             // console.log(res.body);
    //             expect(res.body).to.deep.equal(admin);
    //             // res.body.should.equal({id: 1, fullName:"a", username:"a", password:"1234", email:"a@email.com"});
    //             done();
    //         });
    // });

    // it('should UPDATE an Admin', (done) => {
    //     admin.fullName = 'Alvin Chua';

    //     chai.request(baseUrl)
    //     .put(`/admin/update/${id}`)
    //     .send(admin)
    //     .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.be.a('object');
    //         done();
    //     });
    // });

    // it('should DELETE an Admin', (done) => {
    //     chai.request(baseUrl)
    //         .delete(`/admin/delete/${id}`)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             done();
    //         });
    // });
});

