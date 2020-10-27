import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  currentUser = null;
  message = "";
  submitted = false;
  userid = null;
  eventuser = null;
  currentDate = null;

  userform = new FormGroup({
    fullName: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    phoneNum: new FormControl('', Validators.required),
    email: new FormControl('',Validators.required),
    am: new FormControl('',Validators.required),
    pm: new FormControl('',Validators.required),
    
  })
  
  get all(){
    return this.userform
  }


  constructor(private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.userid = this.route.snapshot.paramMap.get('id');
    this.currentDate = this.route.snapshot.queryParams['currentDate'];
    this.getUser(this.userid);
    this.getEventUserToday();
  }

  getUser(id){
    this.eventsService.getuser(id)
    .subscribe(
      data => {
        this.currentUser = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateUser(){
    this.eventsService.updateuser(this.currentUser.id, this.currentUser)
    .subscribe(
      response => {
        console.log(response);
        this.message = "The Attendee was updated successfully";
        this.submitted = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  getEventUserToday(){
    this.eventsService.getEventUserToday(this.userid, this.currentDate)
    .subscribe(
      data => {
        this.eventuser = data[0];
        console.log('hii',data[0]);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateEventUser(){
    var userid = this.userid;
    var currentDate = this.currentDate;
    var userstatus = this.eventuser;

    // console.log("userid " + userid + " , " + currentDate + " , " + userstatus);
    this.eventsService.updateEventUser(userid, currentDate, userstatus)
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
        
      }
    );
    this.updateUser();
  }

}
