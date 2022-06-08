import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private  url = "http://localhost:3000";

  postUser(data: any){
    data.creationDate = new Date();
    return this.http.post<any>(`${this.url}/userList`, data);
  }

  getUser(){
    return this.http.get<any>(`${this.url}/userList`)
  }

  putUser(data: any, id: number){
    return this.http.put<any>(`${this.url}/userList/`+id, data) 
  }

  deleteUser(id: number){
    return this.http.delete<any>(`${this.url}/userList/`+id);
  }
}
