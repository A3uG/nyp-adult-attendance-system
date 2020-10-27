import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/events';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isUserLoggedIn;
  

  constructor(private http: HttpClient){
  	  this.isUserLoggedIn = false;
	  
  }

  setUserLoggedIn(){
  	  this.isUserLoggedIn = true;
  }

  denyUserLoggedIn(){
  	  this.isUserLoggedIn = false;
	  document.getElementById("error").innerHTML = "Username or Password Incorrect";
	  //window.alert("error");
  }

  logout(){
  	  this.isUserLoggedIn = false;
  }

  getUserLoggedIn(){
  	  return this.isUserLoggedIn;
  } 

  getadmin(){
    return this.http.get(`${baseUrl}/admin/all`);
  }

  findByUsername(username){ 
    return this.http.get(`${baseUrl}/admin/all?username=${username}`);
  }

  getadminid(id){ //Works
    return this.http.get(`${baseUrl}/admin/all/${id}`);
  }

  update(id,data){
    return this.http.put(`${baseUrl}/admin/update/${id}`,data);
  }

  create(data){
    return this.http.post(`${baseUrl}/admin`, data);
  }

  delete(id){
    return this.http.delete(`${baseUrl}/admin/delete/${id}`);
  }




}
