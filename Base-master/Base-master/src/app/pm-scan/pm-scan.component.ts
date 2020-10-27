import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pm-scan',
  templateUrl: './pm-scan.component.html',
  styleUrls: ['./pm-scan.component.css']
})
export class PmScanComponent implements OnInit {
  currentEvent = null;
  currentUser = null;
  qrResultString: string;
  validity: boolean;
  user = null;
  currentDate = null;
  eventuser = null;

  constructor(private eventsService: EventsService,
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

  /* old code passed down
    onCodeResult(resultString: string) {
      this.qrResultString = resultString;
      for (var user of this.currentEvent.users){
        if (this.qrResultString == user.id){
          if(user.pmStatus == 0){
            this.validity = true;
            this.currentUser = user.fullName;
            user.pmStatus = true;
            this.updateUser(user.id,user);
          }
          else{
            //window.alert("You've been Registered");
            this.validity = true;
            this.currentUser = user.fullName;
          }
        }
        else{
          this.validity = false;
        }
      }
    }
  */

  /*working - with no EventUser 
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    var array = [];
    for (var user of this.currentEvent.users){
      array.push(user.id);
    }
    if (array.includes(this.qrResultString)){
      this.getUser();
      if (this.user.fullName == this.currentUser){
        this.currentUser = this.user.fullName;
        this.validity = true;
        this.user.pmStatus = true;
        this.updateUser(this.user.id,this.user);
        setTimeout(function(){document.getElementById('try').click();},5000);
      }
    }
  
    else{
      this.validity = false;
      setTimeout(function(){document.getElementById('try2').click();},5000);
    }
  }
  */

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    var userids_thisevent = [];
    for (var user of this.currentEvent.users) {
      userids_thisevent.push(user.id);
    }
    console.log("all userid uuid: ", userids_thisevent);
    if (userids_thisevent.includes(this.qrResultString)) {
      this.getUser();
      this.getEventUserToday();
      console.log('user', this.currentUser);
      if (this.user.fullName == this.currentUser) {
        this.currentUser = this.user.fullName;
        this.validity = true;
        this.eventuser.pmStatus = true;
        console.log("EVENTUSER", this.eventuser);
        this.updateEventUser(this.qrResultString, this.currentDate, this.eventuser);
        setTimeout(function () { document.getElementById('try').click(); }, 5000);
      }
    }
    else {
      this.validity = false;
      setTimeout(function () { document.getElementById('try3').click(); }, 5000);
    }
  }


  getUser() {
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

  getEventUserToday() {
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

  getEvent(id) {
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

  updateEventUser(userid, currentDate, userpmstatus) {
    // console.log("userid " + userid + " , " + currentDate + " , " + useramstatus);
    this.eventsService.updateEventUser(userid, currentDate, userpmstatus)
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
  updateUser(userid, useramstatus) {
    this.eventsService.updateuser(userid, useramstatus)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);

        }
      );
  }

}
