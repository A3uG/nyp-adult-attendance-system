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

describe('Sqlite', function () {

    // Admin
    describe('Admin', function () {
        it('should return a single Admin record', (done) => {
            const id = 1;
            const username = "a";

            chai.request(baseUrl)
                .get(`/admin/all/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    // console.log(res.body);
                    expect(res.body).to.deep.equal({ id: 1, fullName: 'a', username: 'a', password: '1234', email: 'a@email.com' });
                    // res.body.should.equal({id: 1, fullName:"a", username:"a", password:"1234", email:"a@email.com"});
                    done();
                });
        });
    });

    // Lecturer
    describe('Lecturers', function () {
        it('should return all Lecturers record', (done) => {
            chai.request(baseUrl)
                .get(`/lecturers/all`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
});