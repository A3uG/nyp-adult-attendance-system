import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { start } from 'repl';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {
  users = {
    fullName: '',
    phoneNum: '',
    email: '',
    id: uuidv4(),
    userCompany: '',
  }
  submitted = false;

  userform = new FormGroup({
    fullName: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    phoneNum: new FormControl('', Validators.required),
    email: new FormControl('',Validators.required),

    
  })
  
  get all(){
    return this.userform
  }

  constructor(private eventsService: EventsService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    //fetch from url for checking
    // console.log("start date " + this.route.snapshot.queryParams['start']);
    // console.log("end date " + this.route.snapshot.queryParams['end']);
  }

  saveUser(){
    const data = {
      fullName: this.users.fullName,
      phoneNum: this.users.phoneNum,
      email: this.users.email,
      eventEventID: this.route.snapshot.paramMap.get('id'),
      id: this.users.id,
      userCompany: this.users.userCompany,
      
    };

    this.eventsService.createuser(data)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      }
    );

    //generate dates in between start and end dates
    var startDate = new Date(this.route.snapshot.queryParams['start']);
    var endDate = new Date(this.route.snapshot.queryParams['end']);
    var dateArray = [];
    var currentDate = startDate;   

    while(currentDate <= endDate){
      this.newEventUser(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
      dateArray.push(currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + currentDate.getDate());
    }
    console.log("dateArray" + dateArray);

    /*
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

  //creates new EventUser
  newEventUser(cDate){
    const eudata = {
      date: cDate,
      amStatus: false,
      pmStatus: false,
      eventEventID: this.route.snapshot.paramMap.get('id'),
      userID: this.users.id
    }

    console.log("eudata " + JSON.stringify(eudata));
    this.eventsService.createEventUser(eudata)
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  newUser(){
    this.submitted = false;
    this.users = {
      fullName: '',
      phoneNum: '',
      email: '',
      id: uuidv4(),
      userCompany: '',

    };
  }

}
