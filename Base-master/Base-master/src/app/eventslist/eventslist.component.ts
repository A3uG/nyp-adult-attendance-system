import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-eventslist',
  templateUrl: './eventslist.component.html',
  styleUrls: ['./eventslist.component.css']
})
export class EventslistComponent implements OnInit {
  events: any;
  currentEvent = null;
  currentIndex = -1;
  eventName = '';

  constructor(private eventsService: EventsService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveEvents();
  }



  retrieveEvents(){ //Works
    this.eventsService.getAll()
    .subscribe(
      data => {
        this.events = data;
        //console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  createEvent(){
    this.router.navigate(['events-reg']);
  }

  setActiveEvent(event,index){
    this.currentEvent = event;
    this.currentIndex = index;
  }

  searchEvent(){
    this.eventsService.findByEvent(this.eventName)
    .subscribe(
      data => {
        this.events = data;
        //console.log(data);
      },
      error => {
        console.log(error)
      }
    );
  }

}
