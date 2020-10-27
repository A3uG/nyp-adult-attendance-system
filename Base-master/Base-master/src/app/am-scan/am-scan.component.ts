import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { json } from 'sequelize/types';

@Component({
  selector: 'app-am-scan',
  templateUrl: './am-scan.component.html',
  styleUrls: ['./am-scan.component.css']
})

export class AmScanComponent implements OnInit {
  currentEvent = null;
  currentUser = null;
  qrResultString: string;
  validity: boolean;
  //validity2: boolean;
  user = null;
  //alluser = null;
  currentDate = null;
  eventuser = null;


  constructor( private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getEvent(this.route.snapshot.paramMap.get('id'));
    this.currentDate = this.route.snapshot.queryParams['currentDate'];
  }

  clearResult(): void {
      this.qrResultString = null;
      this.validity = null;  
  }

  clear(){
    this.qrResultString = null;
    this.validity = null;  
    console.log(this.qrResultString,this.validity);
  }

  /* old code passed down
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    for (var user of this.currentEvent.users){
      if (this.qrResultString != user.id){
        this.validity = false;
      }
      else{
        this.validity = true;
        this.currentUser = user.fullName;
        user.amStatus = true;
        this.updateUser(user.id,user);
      }
    }
  }
  */

 onCodeResult(resultString: string) {
  this.qrResultString = resultString;
  //this.getallUsers(); 
  var userids_thisevent = [];
  //var alluserids = [];
/*
  for (var all of this.alluser){
    alluserids.push(all.id);
  }
  */
  for (var user of this.currentEvent.users){ 
    userids_thisevent.push(user.id);
  }
  console.log("all userid uuid: ", userids_thisevent);
  if (userids_thisevent.includes(this.qrResultString)){
    this.getUser();
    this.getEventUserToday();
    console.log('user', this.currentUser);
    if (this.user.fullName == this.currentUser){
      this.currentUser = this.user.fullName;
      this.validity = true;

      // old user table amStatus not in use
      /* this.user.amStatus = true;       
         this.updateUser(this.user.id,this.user);
         console.log("USER", this.user);*/
         
      this.eventuser.amStatus = true;
      console.log("EVENTUSER", this.eventuser);
      this.updateEventUser(this.qrResultString, this.currentDate, this.eventuser);
      setTimeout(function(){document.getElementById('try').click();},5000);
    }
  }
  /* old code passed down
  else if (alluserids.includes(this.qrResultString)){
    this.getUser()
    this.validity2 = true;
    setTimeout(function(){document.getElementById('try2').click();},5000);
  }
  */
  else{
    this.validity = false;
    setTimeout(function(){document.getElementById('try3').click();},5000);
  }
}

//to retrieve users fullName
getUser(){
  this.eventsService.getuser(this.qrResultString)
  .subscribe(
    data => {
      this.user = data;
      this.currentUser = this.user.fullName;
      console.log(data);
    },
    error => {
      console.log(error);
    }
  );
}

  getEventUserToday(){
    this.eventsService.getEventUserToday(this.qrResultString, this.currentDate)
    .subscribe(
      data => {
        this.eventuser = data[0];
        console.log(data[0]);
      },
      error => {
        console.log(error);
      }
    );
  }

  getEvent(id){
    this.eventsService.get(id)
    .subscribe(
      data => {
        this.currentEvent = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateEventUser(userid, currentDate, useramstatus){
    // console.log("userid " + userid + " , " + currentDate + " , " + useramstatus);
    this.eventsService.updateEventUser(userid, currentDate, useramstatus)
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
        
      }
    );
  }

  //not in use -- replaced by updateEventUser()
  /*updateUser(userid,useramstatus){
    this.eventsService.updateuser(userid, useramstatus)
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
        
      }
    );
  }*/

  /* old code passed down
  getallUsers(){
    this.eventsService.getusers()
    .subscribe(
      data => {
        this.alluser = data;
        //this.currentUser = this.alluser.fullName;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }*/

}
