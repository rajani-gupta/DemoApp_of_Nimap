import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  id:number;
  constructor(private _http: HttpClient) { }

  createProfile(body) {
    let URL = "http://localhost:5555/register";
    return this._http.post(URL, body)
  }
  getProfile(){
    let URL = "http://localhost:5555/profile";
    return this._http.get(URL);

  }
  get_Url_Id(){
    let URL = "http://localhost:5555/profile/:id";
    return this._http.get(URL);

  }

}
