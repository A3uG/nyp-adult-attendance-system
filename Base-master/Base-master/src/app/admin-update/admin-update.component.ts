import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.css']
})
export class AdminUpdateComponent implements OnInit {
  currentAdmin = null;
  message = "";
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

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAdmin(this.route.snapshot.paramMap.get('id'));
  }

  getAdmin(id){
    this.userService.getadminid(id)
    .subscribe(
      data => {
        this.currentAdmin = data;
        //console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateAdmin(){
    this.userService.update(this.currentAdmin.id, this.currentAdmin)
    .subscribe(
      response => {
        //console.log(response);
        this.message = "The Admin was updated successfully";
        this.submitted = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  back(){
    this.router.navigate(['adminlist']);
  }

  deleteAdmin(){
    var cfm = confirm("Are you sure?");
    if (cfm == true){
      this.userService.delete(this.currentAdmin.id)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/adminlist']);
      },
      error => {
        console.log(error);
      }
    );
    }
    else{
      
    }
  
  }

}
