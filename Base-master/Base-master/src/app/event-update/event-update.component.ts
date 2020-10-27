import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent implements OnInit {
  currentEvent = null;
  message = "";
  submitted = false;
  datesList = [];  //store newly generated dates
  startEndValid = true;
  datesTableList;    //store dates retrieved from dates table
  eventID;

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

  get all() {
    return this.eventform
  }

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.eventID = this.route.snapshot.paramMap.get('id');
    this.getEvent(this.eventID);
    this.getDates(this.eventID);
  }

  getEvent(id) {
    this.eventsService.get(id)
      .subscribe(
        data => {
          this.currentEvent = data;
          console.log(data);
          // this.verifyStartEnd();
        },
        error => {
          console.log(error);
        }
      );
  }

  getDates(id) {
    this.eventsService.getSingleEventDate(id)
      .subscribe(
        data => {
          this.datesTableList = data;
          console.log('dates table', data);

          this.datesList = [];
          for (var i = 0; i < this.datesTableList.length; i++) {
            this.datesList.push(this.datesTableList[i]);
          }
          this.verifyStartEnd();
        },
        error => {
          console.log(error);
        }
      );
  }

  updateEvent() {
    // assign start/end date for 'event' table
    this.currentEvent.eventDate = this.datesList[0].date;
    this.currentEvent.eventEndDate = this.datesList[this.datesList.length - 1].date;
    // console.log('start/end', this.currentEvent.eventDate, this.currentEvent.eventEndDate);

    // 0. update 'event' table start end column, and other columns
    this.eventsService.update(this.currentEvent.eventID, this.currentEvent)
      .subscribe(
        response => {
          console.log(response);
          // this.updateEventUser();
          this.message = "The Event was updated successfully";
          this.submitted = true;


          for (var i = 0; i < this.datesList.length; i++) {
            // 1. if row exist in db, update instead
            // console.log('datesTableList includes?', (this.datesTableList.includes(this.datesList[i])));
            if (this.datesTableList.includes(this.datesList[i])) {
              var dateData = {
                date: this.datesList[i].date,
                checked: this.datesList[i].checked,
                eventEventID: this.eventID
              }

              this.eventsService.updateDate(this.currentEvent.eventID, dateData.date, dateData)
                .subscribe(
                  response => {
                    console.log('update', response);
                  },
                  error => {
                    console.log(error);
                  }
                );
            }
            else {
              // 2. if new value, create new row in database

              //save to dates table
              var dateData = {
                date: this.datesList[i].date,
                checked: this.datesList[i].checked,
                eventEventID: this.eventID
              }

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
              // this.eventsService.deleteDate(this.currentEvent.eventID, this.datesList[i].date)
              //   .subscribe(
              //     response => {
              //       console.log(response);
              //     },
              //     error => {
              //       console.log(error);
              //     }
              //   );

            }
          }

          // 3. if old values from dataTableList do not exist in datesList, delete
          for (var i = 0; i < this.datesTableList.length; i++) {
            // ensure do not delete updated columns...
            if (!this.datesList.includes(this.datesTableList[i]) ) {
              // console.log('deletable?', (this.datesList.includes(this.datesTableList[i])));

              this.eventsService.deleteDate(this.currentEvent.eventID, this.datesTableList[i].date)
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

          this.datesTableList = [];
          this.datesList = [];
        },
        error => {
          console.log(error);
        }
      );
  }

  // onlyUnique(value, index, self){
  //   return self.indexOf(value) === index;
  // }

  back() {
    this.router.navigate(['events']);
  }

  verifyStartEnd() {
    if (this.currentEvent.eventDate != "" && this.currentEvent.eventEndDate != "") {
      this.datesList = [];        //clear list if new value is selected
      var startDate = new Date(this.currentEvent.eventDate);
      var endDate = new Date(this.currentEvent.eventEndDate);
      var currentDate = startDate;

      if (startDate <= endDate) {
        this.startEndValid = true;

        while (currentDate <= endDate) {

          var dateData = {
            date: currentDate.toISOString().substr(0, 10),
            checked: true,
            eventEventID: this.eventID
          }
          this.datesList.push(dateData);          // append new Date to datesList
          // this.datesList.push(currentDate.toISOString().substr(0, 10));
          currentDate = new Date(currentDate);
          currentDate.setDate(currentDate.getDate() + 1);
        }

        // replace newly generated datesList with datesTablesList, to match existing dates
        for (var i = 0; i < this.datesList.length; i++) {
          for (var j = 0; j < this.datesTableList.length; j++) {
            // console.log("i is", this.datesList[i]);
            // console.log("j is", this.datesTableList[j]);
            if (this.datesList[i].date.includes(this.datesTableList[j].date)) {
              this.datesList[i] = this.datesTableList[j];
            }
          }
        }

        // this.datesList
        // console.log("datesList", this.datesList);
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
    // console.log("selected date is", value);


    for (var i = 0; i < this.datesList.length; i++) {
      if (this.datesList[i].date == value) {     // 1. check date exist in datesList
        console.log('exist in dateList', this.datesList[i]);
        if (this.datesList[i].checked) {         // 2. check 'checked' column is true or false
          // console.log('checked');
          this.datesList[i].checked = false;    // 3. if true, set column to false. otherwise set to true
        }
        else {
          // console.log('uncheck');
          this.datesList[i].checked = true;

        }
      }
    }
  }
}
