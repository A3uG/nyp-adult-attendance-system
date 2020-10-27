import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }


  getAll(){ //Works
    return this.http.get(baseUrl);
  }

  get(id){ //Works
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data){
    return this.http.post(baseUrl, data);
  }

  update(id,data){
    return this.http.put(`${baseUrl}/${id}`,data);
  }

  delete(id){
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(){
    return this.http.delete(baseUrl);
  }

  findByEvent(event){ //Works
    return this.http.get(`${baseUrl}?eventName=${event}`);
  }

  //USERS 
  
  createuser(data){
    return this.http.post(`${baseUrl}/users`,data);
  }

  getusers(){
    return this.http.get(`${baseUrl}/users/all`);
  }

  getuser(id){
    return this.http.get(`${baseUrl}/users/all/${id}`);
  }

  updateuser(id,data){
    return this.http.put(`${baseUrl}/users/update/${id}`,data);
  }

  findByUser(id,phone){ 
    return this.http.get(`${baseUrl}/users/${id}/${phone}`);
  }

  findUserbyeventID(id){
    return this.http.get(`${baseUrl}/users/${id}`);
  }


  //EventUser
  createEventUser(data){
    return this.http.post(`${baseUrl}/eventUser`,data);
  }

  getEventUserToday(id, date){
    return this.http.get(`${baseUrl}/eventUser/${id}/${date}`);
  }

  updateEventUser(id, date, data){
    return this.http.put(`${baseUrl}/eventUser/update/${id}/${date}`,data);
  }
  
  getAllEventUserToday(id, date){
    return this.http.get(`${baseUrl}/eventUser/all/${id}/${date}`);
  }


  //Date
  createDate(data){
    return this.http.post(`${baseUrl}/date`,data);
  }

  getSingleEventDate(id){
    return this.http.get(`${baseUrl}/date/${id}`);
  }

  updateDate(id, date, data){
    return this.http.put(`${baseUrl}/date/update/${id}/${date}`,data);
  }

  deleteDate(id, date){
    return this.http.delete(`${baseUrl}/date/delete/${id}/${date}`);
  }


  //Lecturer
  getAllLecturers(){
    return this.http.get(`${baseUrl}/lecturers/all`);
  }
}
