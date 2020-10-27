import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlist',
  templateUrl: './adminlist.component.html',
  styleUrls: ['./adminlist.component.css']
})
export class AdminlistComponent implements OnInit {
  admin: any;
  currentAdmin = null;
  currentIndex = -1;
  username = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveAdmin();
  }

  retrieveAdmin(){ //Works
    this.userService.getadmin()
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

  createAdmin(){
    this.router.navigate(['admin-reg']);
  }

  searchAdmin(){
    this.userService.findByUsername(this.username)
    .subscribe(
      data => {
        this.admin = data;
        //console.log(data);
      },
      error => {
        console.log(error)
      }
    );
  }


}
