import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
	admin: any;
	username = '';
	password = '';
	validity: boolean;

  constructor(private router: Router, private user:UserService) { }

  ngOnInit(): void {
	this.retrieveadmin();
  }

  retrieveadmin(){ //Works
    this.user.getadmin()
    .subscribe(
      data => {
        this.admin = data;
        //console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  loginUser(e){
	  //e.preventDefault();
	  //console.log(e);
  	var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;
	  for (var ad of this.admin){
		  if (username == ad.username && password == ad.password){
			  this.user.setUserLoggedIn();
        this.router.navigate(['events']);
        console.log("Success");
		  }
		  else{
        this.validity = true;
        //console.log("Fail");
			  //this.user.denyUserLoggedIn();
		  }
	  }
  }
}
