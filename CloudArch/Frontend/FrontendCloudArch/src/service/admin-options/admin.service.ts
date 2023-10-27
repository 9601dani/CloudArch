import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../app/models/User";
import {Observable} from "rxjs";
import {UserSave} from "../../app/models/UserSave";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  readonly URL_API = 'http://localhost:4000/api';
  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllUsers(){
    return this.httpClient.get<Array<User>>(this.URL_API+'/getAllUsers');
  }

  public saveUser(user: UserSave):Observable<any>{
    return this.httpClient.post(this.URL_API+'/addUser', user);
  }

  public getOneUser(username: string){
    let usss=new User("","",username, "",  0);
    return this.httpClient.post<User>(this.URL_API+'/getOneUser',usss);
  }

  public deleteUser(username: string){
    return this.httpClient.delete(this.URL_API+'/deleteUser/'+username);
  }

  public getByUsername(username: string){
    return this.httpClient.get<User>(this.URL_API+'/getByUsername/'+username);
  }

  public updateUser(user: UserSave){
    return this.httpClient.put(this.URL_API+'/updateUser', user);
  }
}
