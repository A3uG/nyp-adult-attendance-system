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


// Event
describe('Event', function () {
    const id = 3;

    const event = {
        eventName: "Test Course",
        eventCoordinator: "Lee Chit Boon",
        eventOrganisation: "Accenture",
        eventTechnologyArea: "Basic Programming Skills",
        eventDescription: "12 days course for Python",
        eventContactPerson: "Suresh Kumar",
        eventContactPersonHP: "9876 1234",
        eventContactPersonEmail: "sureshkumar@email.com",
        eventDate: "2020-11-12",
        eventEndDate: "2020-11-15",
        eventVenue: "NYP Block L",
        eventStartTime: "0900",
        eventEndTime: "1800"
    };

    // Create a Event
    /*it('should INSERT an Event', (done) => {
        chai.request(baseUrl)
            .post(``)
            .type('form')
            .send(event)
            .end((err, res) => {
                console.log(res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                // no deep equal as eventID is dynamic generated
                done();
            });
    });*/

    // Find a single Event with an id
    // it('should RETRIEVE a single Event', (done) => {
    //     event.eventID = 3;
    //     event.lecturerLectID = null;
    //     event.users = [];
 
    //     chai.request(baseUrl)
    //         .get(`/${id}`)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             expect(res.body).to.deep.equal(event);
    //             done();
    //         });
    // });

    // Update a Event by the id in the request
    // it('should UPDATE a single Event', (done) => {
    //     event.eventStartTime = "1000";

    //     chai.request(baseUrl)
    //         .put(`/${id}`)
    //         .send(event)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             done();
    //         });
    // });
});
