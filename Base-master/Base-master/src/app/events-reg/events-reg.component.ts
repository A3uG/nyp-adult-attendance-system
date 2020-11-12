import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-events-reg',
  templateUrl: './events-reg.component.html',
  styleUrls: ['./events-reg.component.css']
})
export class EventsRegComponent implements OnInit {
  event = {
    eventName: '',
    eventDate: '',
    //eventStartDate: '',
    eventEndDate: '',
    eventCoordinator: '',
    eventOrganisation: '',
    eventTechnologyArea: '',
    eventDescription: '',
    eventContactPerson: '',
    eventContactPersonHP: '',
    eventContactPersonEmail: '',
    eventVenue: '',
    eventStartTime: '',
    eventEndTime: ''
  }
  submitted = false;
  datesList = [];
  startEndValid = false;
  removalDates = [];
  lecturers;

  eventform = new FormGroup({
    name: new FormControl('', Validators.required),
    venue: new FormControl('', Validators.required),
    startdate: new FormControl('', Validators.required),
    enddate: new FormControl('', Validators.required),
    starttime: new FormControl('', Validators.required),
    endtime: new FormControl('', Validators.required),
    coor: new FormControl('', Validators.required),
    org: new FormControl('', Validators.required),
    tech: new FormControl('', Validators.required),
    cp: new FormControl('', Validators.required),
    cphp: new FormControl('', Validators.required),
    cpemail: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),

  })

  courseName = ["Basic Programming Skills", "Business & Big Data Analytics", "Cyber Security", "Data Visualisation",
    "Digital Literacysptial", "Infocomm & Digital media (IT NW and System)", "Adminstration", "Information Security",
    "Innovation", "Mobile Computing", "Office Software", "Problem Solving Skills", "Social Media & Analytics", "Software Quality"]

  get all() {
    return this.eventform
  }

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void { 
    this.getLecturers();
  }

  saveEvent() {
    var submittedEvent;

    const data = {
      eventName: this.event.eventName,
      eventCoordinator: this.event.eventCoordinator,
      eventOrganisation: this.event.eventOrganisation,
      eventTechnologyArea: this.event.eventTechnologyArea,
      eventDescription: this.event.eventDescription,
      eventContactPerson: this.event.eventContactPerson,
      eventContactPersonHP: this.event.eventContactPersonHP,
      eventContactPersonEmail: this.event.eventContactPersonEmail,
      eventDate: this.event.eventDate,
      //eventStartDate: this.event.eventStartDate,
      eventEndDate: this.event.eventEndDate,
      eventVenue: this.event.eventVenue,
      eventStartTime: this.event.eventStartTime,
      eventEndTime: this.event.eventEndTime
    };
    // console.log("COURSE NAME " + data.eventTechnologyArea);
    this.eventsService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          submittedEvent = response;
          // console.log('submitted', submittedEvent.eventID);

          //not required for boolean model
          //remove elements from removalDates in datesList 
          /*for (var i = 0; i < this.datesList.length; i++) {
            for (var j = 0; j < this.removalDates.length; j++) {
              if (this.datesList[i] == this.removalDates[j]) {
                this.datesList.splice(i, 1);
              }
            }
          }
          console.log('datesList filtered', this.datesList);*/

          //set checked true or false
          for (var i = 0; i < this.datesList.length; i++) {
            if (this.removalDates.includes(this.datesList[i])){
              var dateData = {
                date: this.datesList[i],
                checked: true,
                eventEventID: submittedEvent.eventID
              }
            }
            else{
              var dateData = {
                date: this.datesList[i],
                checked: false,
                eventEventID: submittedEvent.eventID
              }
            }
           
            //save to dates table
            this.eventsService.createDate(dateData)
              .subscribe(
                response => {
                  console.log(response);
                  this.submitted = true;
                },
                error => {
                  console.log(error);
                }
              );
          }

          this.removalDates = [];
          this.datesList = [];
        },
        error => {
          console.log(error);
        }
      );





    /* old codes passed down
    if (this.event.eventName == "" || this.event.eventDate==""){
      if (this.event.eventCoordinator == "" || this.event.eventOrganisation==""){
        if (this.event.eventContactPerson == "" || this.event.eventContactPersonEmail==""){
          if (this.event.eventContactPersonHP == "" || this.event.eventVenue==""){
            if (this.event.eventStartTime == "" || this.event.eventEndTime==""){
              if (this.event.eventDescription == ""){
                document.getElementById("errormsg").innerHTML = "Please fill in all blanks";
              }
              else{
                document.getElementById("errormsg").innerHTML = "";
              }
            }
          }
        }
      }
    } 
    */
  }

  newEvent() {
    this.submitted = false;
    this.event = {
      eventName: '',
      eventDate: '',
      //eventStartDate: '',
      eventEndDate: '',
      eventCoordinator: '',
      eventOrganisation: '',
      eventTechnologyArea: '',
      eventDescription: '',
      eventContactPerson: '',
      eventContactPersonHP: '',
      eventContactPersonEmail: '',
      eventVenue: '',
      eventStartTime: '',
      eventEndTime: ''
    };
  }

  verifyStartEnd() {
    if (this.event.eventDate != "" && this.event.eventEndDate != "") {
      this.datesList = [];        //clear list if new value is selected
      var startDate = new Date(this.event.eventDate);
      var endDate = new Date(this.event.eventEndDate);
      var currentDate = startDate;

      if (startDate <= endDate) {
        this.startEndValid = true;

        while (currentDate <= endDate) {

          // check if date is weekend, auto uncheck
          // if (currentDate.getDay() == 6 || currentDate.getDay() == 7){
          //   console.log('weekend', currentDate);
          // }
          
          this.datesList.push(currentDate.toISOString().substr(0, 10));
          currentDate = new Date(currentDate);
          currentDate.setDate(currentDate.getDate() + 1);
        }
        // this.datesList
        // console.log("dates array", this.datesList);
      }
      else {
        this.startEndValid = false;
      }
    }
    else {
      // console.log("ERROR");
    }
  }

  removeDate(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    // console.log("remove date is ", value);

    //add dates into removalDates
    for (var i = 0; i < this.datesList.length; i++) {
      if (this.datesList[i] == value) {     //if date not exist in removal list
        if (this.removalDates.length != 0) {   //if removalDates is not empty
          if (!this.removalDates.includes(value)) {   //if removalDates not equal value (not in removalDates)
            // console.log("push");
            this.removalDates.push(value);
          }
          else {
            for (var j = 0; j < this.removalDates.length; j++) {     //if removalDates equal value (exist in removalDates, add back to this.datesList)
              if (this.removalDates[j] == value) {
                // console.log("splice");
                this.removalDates.splice(j, 1);
              }
            }
          }
        }
        else {                //if removalDates is empty, add value
          this.removalDates.push(value);
        }
      }
    }
    // console.log("remove dates", this.removalDates);
  }

  getLecturers(){
    this.eventsService.getAllLecturers()
    .subscribe(
      data => {
        this.lecturers = data;
        console.log("Lecturers", data);
      },
      error => {
        console.log(error);
      }
    );
  }
}


