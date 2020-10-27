import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core';
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
  attendees = {
    name: '',
    phone: '',
    email: '',
    company: ''
  }

  //ngModel
  file = '';  

  //using [ngModel], ElementRef not required
  // @ViewChild('aFileInput') aFileInput: ElementRef;          //create template reference to reset input on submit

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
  }

  fileUploadForm = this.formBuilder.group({
    file: new FormControl('', Validators.required)
  });

  get all(){
    return this.fileUploadForm
  }

  uploadFile(){
    console.log("file function running")
    if (this.all.valid){
      this.submitted = true;

      //for ElementRef
      // console.log("1" +  this.aFileInput.nativeElement.value)
      // this.aFileInput.nativeElement.value = "";                       //reset input field to empty string
      // console.log("2" +  this.aFileInput.nativeElement.value)

      console.log('file name is ' +  this.file);
      
      
    }
  }



  onFileSelect(event){
    if (event.target.files.length > 0){
      const file = event.target.files[0];
      console.log("fileName is " + file.name);
      console.log("fileSize is " + file.size);
      console.log("fileType is " + file.type);

      //check file type
      let af = ['application/vnd.ms-excel']
      if(!_.includes(af, file.type)){
        alert("Excel (CSV) File Only");
      }

      //file reader method
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv:any = reader.result;
        console.log("results are \n" + csv);
        let allTextLines = [];
        // allTextLines = csv.split(/\r|\n|\r/);
        // allTextLines = csv.split(/\r\n|\n/);
        allTextLines = csv.split("\n");
        console.log("allTextline are \n" + allTextLines);

        for (let i = 0; i < allTextLines.length; i++){
          console.log("-----");
          console.log(allTextLines[i]);
        }
      } 
    }
  }

  newFileUpload(){
    this.submitted = false;
    this.file = '';
    //check if file Upload is not empty
    
  }
}
