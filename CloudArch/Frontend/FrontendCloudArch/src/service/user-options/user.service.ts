import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../app/models/User";
import {UserSave} from "../../app/models/UserSave";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly URL_API = 'http://localhost:4000/api';
  constructor(
    private httpClient: HttpClient
  ) { }
  Opcion!: string;

  public getByUsername(username: string){
    return this.httpClient.get<User>(this.URL_API+'/getByUsername/'+username);
  }

  public updateUser(user: UserSave){
    return this.httpClient.put(this.URL_API+'/updateUser', user);
  }
}
