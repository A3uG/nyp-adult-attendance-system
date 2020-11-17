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

describe('Lecturer', function () {
    // it('should return all Lecturers record', (done) => {
    //     chai.request(baseUrl)
    //         .get(`/lecturers/all`)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('array');
    //             // console.log(res.body);
    //             done();
    //         });
    // });
});