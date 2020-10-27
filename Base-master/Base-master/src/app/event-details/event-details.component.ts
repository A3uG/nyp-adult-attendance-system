import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventsService } from '../events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { start } from 'repl';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  currentEvent = null;
  message = "";
  paramid = "";
  userid = '';
  currentIndex = -1;
  userphoneNum = '';
  users = null;
  dates = [];
  dateSelected; //can be removed, useless
  dateSelectedIsTrue = false;
  eventUsers = null;
  todayDate;
  todayDateExist = false;
  eventDates;   //select option set default
  @ViewChild('amScanLink') amScanLink:ElementRef;
  @ViewChild('pmScanLink') pmScanLink:ElementRef;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.paramid = this.route.snapshot.paramMap.get('id');
    //this.startDate = this.route.snapshot.queryParams['start'];
    this.getEvent(this.paramid);
    this.getUsers(this.paramid);
  }

  getEvent(id) {
    this.eventsService.get(id)
      .subscribe(
        data => {
          this.currentEvent = data;
          console.log(data);
          this.fillDates();
        },
        error => {
          console.log(error);
        }
      );
  }

  getUsers(id) {
    this.eventsService.findUserbyeventID(id)
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  getEventUser(eventID, date){
    this.eventsService.getAllEventUserToday(eventID, date)
    .subscribe(
      data => {
        this.eventUsers = data;
        console.log("DATA - EVENTUSER", data);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteEvent() {
    var cfm = confirm("Are you sure?");
    if (cfm == true) {
      this.eventsService.delete(this.currentEvent.eventID)
        .subscribe(
          response => {
            console.log(response);
            this.router.navigate(['/events']);
          },
          error => {
            console.log(error);
          }
        );
    }
    else {

    }

  }

  searchUser() {
    this.eventsService.findByUser(this.currentEvent.eventID, this.userphoneNum)
      .subscribe(
        data => {
          this.currentEvent.users = data;
          console.log(data);
        },
        error => {
          console.log(error)
        }
      );
  }

  searchuser() {
    for (var user of this.users) {
      if (this.userphoneNum == user.phoneNum) {
        this.eventsService.findByUser(this.currentEvent.eventID, user.phoneNum)
          .subscribe(
            data => {
              this.users = data;
              console.log(data);
            },
            error => {
              console.log(error)
            }
          );
      }
      else {
        this.eventsService.findUserbyeventID(this.currentEvent.eventID)
          .subscribe(
            data => {
              this.users = data;
              console.log(data);
            },
            error => {
              console.log(error);
            }
          );
      }
    }
  }

  /*
  getQRCODE(){
    for (var users of this.currentEvent.users){
      users.id 
    }
  }
  */

  //generate dates in from start to end dates
  fillDates() {
    var startDate = new Date(this.currentEvent.eventDate);
    var endDate = new Date(this.currentEvent.eventEndDate);
    var currentDate = startDate;
    // console.log(this.currentEvent.eventDate);
    // var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]//mth name
    
    while (currentDate <= endDate) {
      this.dates.push(currentDate.toISOString().substr(0, 10));
      // this.dates.push(currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + currentDate.getDate());
      // this.dates.push(currentDate.getDate()+ " " + months[currentDate.getMonth()] + " " + currentDate.getFullYear());//mth name
      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + 1); 
    }
    console.log("dates array", this.dates);


    var today = new Date();
    this.todayDate = today.toISOString().substr(0, 10);
    for(var i of this.dates){
      if (i == this.todayDate){
        console.log("there is a event today!");
        this.todayDateExist = true;
        this.eventDates = i;    //select option set default
        this.dateSelected = i;
        this.getEventUser(this.paramid, i);
        this.dateSelectedIsTrue = true;
      }
      else{
        this.eventDates = this.dates[0];    //select option set default
        this.dateSelected = this.dates[0];  
        this.getEventUser(this.paramid, this.dates[0]);
        this.dateSelectedIsTrue = true;
      }
    }
  }

  onDateChange(cDate){
    if (this.dateSelected == ''){
      console.log("NO DATE SELECTED ", cDate);
    }
    else{
      // console.log("SELECTED DATE ", cDate);
      this.dateSelected = cDate;
      this.dateSelectedIsTrue = true;
      this.getEventUser(this.paramid, this.dateSelected)
    }
  }

  popUp(time){
    if (confirm("Scan QR Code for: \n" + this.currentEvent.eventName + "\n" + this.dateSelected + " [" + time + "] \n\nPress OK to continue")){
      
      if (time == "AM"){
        let am: HTMLElement = this.amScanLink.nativeElement as HTMLElement;
        am.click();
      }
      else {
        let pm: HTMLElement = this.pmScanLink.nativeElement as HTMLElement;
        pm.click();
      }
    }
    else{
       //no event
    }
  }
}
