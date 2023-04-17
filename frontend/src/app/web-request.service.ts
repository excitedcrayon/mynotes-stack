import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) { 
    this.ROOT_URL = 'http://localhost:3000';
  }

  getNotes(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  getSingleNote(uri: string, id: string){
    return this.http.get(`${this.ROOT_URL}/${uri}/${id}`);
  }
}
