import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-reg',
  templateUrl: './admin-reg.component.html',
  styleUrls: ['./admin-reg.component.css']
})
export class AdminRegComponent implements OnInit {
  admin = {
    fullName: '',
    email: '',
    username: '',
    password: ''
  }
  submitted = false;

  adminform = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('',Validators.required),
    
  })

  get all(){
    return this.adminform
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  saveAdmin(){
    const data = {
      fullName: this.admin.fullName,
      email: this.admin.email,
      username: this.admin.username,
      password: this.admin.password
    };
    this.userService.create(data)
    .subscribe(
      response => {
        //console.log(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  newAdmin(){
    this.submitted = false;
    this.admin = {
      fullName: '',
      email: '',
      username: '',
      password: ''
    };
  }
}