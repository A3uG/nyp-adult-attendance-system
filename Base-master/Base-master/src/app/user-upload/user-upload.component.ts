import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventsService } from '../events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-upload',
  templateUrl: './user-upload.component.html',
  styleUrls: ['./user-upload.component.css']
})
export class UserUploadComponent implements OnInit {
  submitted: boolean = false;
  fileData: any[] = [];
  newAttendee = {
    fullName: '',
    phoneNum: '',
    email: '',
    eventEventID: this.route.snapshot.paramMap.get('id'),
    id: uuidv4(),
    userCompany: ''
  }

  //ngModel
  file = '';

  //using [ngModel], ElementRef not required
  // @ViewChild('aFileInput') aFileInput: ElementRef;          //create template reference to reset input on submit

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private eventsService: EventsService,) {

  }

  ngOnInit(): void {
  }

  fileUploadForm = this.formBuilder.group({
    file: new FormControl('', Validators.required)
  });

  get all() {
    return this.fileUploadForm
  }

  uploadFile() {
    if (this.all.valid) {
      this.submitted = true;

      //for ElementRef
      // console.log("1" +  this.aFileInput.nativeElement.value)
      // this.aFileInput.nativeElement.value = "";                       //reset input field to empty string
      // console.log("2" +  this.aFileInput.nativeElement.value)

      // console.log('file name is ' + this.file);
    }
  }

  async onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log("fileName is " + file.name);
      // console.log("fileSize is " + file.size);
      // console.log("fileType is " + file.type);

      //check file type
      let af = ['application/vnd.ms-excel']
      if (!_.includes(af, file.type)) {
        alert("Excel (CSV) File Only");
      }

      //file reader method
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = async (e) => {
        let csv: any = reader.result;
        // console.log("results are \n" + csv);
        let allTextLines = [];
        allTextLines = csv.split(/\r|\n|\r/);
        var filtered = allTextLines.filter(function (el) {
          return el != '';
        });
        allTextLines = filtered
        // console.log("allTextline are \n" + allTextLines);

        this.uploadAllUser(this.route.snapshot.paramMap.get('id'), allTextLines);
      }
    }
  }

  backButton() {
    this.router.navigate(['events/' + this.route.snapshot.paramMap.get('id')]);
  }

  uploadAllUser(id, data) {
    this.eventsService.uploadAllUser(id, data)
      .subscribe(
        response => {
          console.log('success!');
          // console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
          this.submitted = true;
        }
      );
  }
}
