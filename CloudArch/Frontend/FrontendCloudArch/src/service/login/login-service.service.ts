import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../app/models/User";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  public username: String="";
  public password: String="";
  readonly API_URL = "http://localhost:4000/api";

  constructor(
    private httpClient: HttpClient
  ) { }


  loginUser(username: String, password: String):any {
    return this.httpClient.post<User>(this.API_URL + "/authUser", {username, password});
  }

}
