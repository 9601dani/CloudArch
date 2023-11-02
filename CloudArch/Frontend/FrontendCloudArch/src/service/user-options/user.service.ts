import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../app/models/User";
import {UserSave} from "../../app/models/UserSave";
import {Carpeta} from "../../app/models/Carpeta";
import {CarpetaSave} from "../../app/models/CarpetaSave";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly URL_API = 'http://localhost:4000/api';
  constructor(
    private httpClient: HttpClient
  ) { }
  Opcion!: string;
  document: string='my-document';
  /*---------------------------------------------------------USUARIO---------------------------------------------------------*/
  public getByUsername(username: string){
    return this.httpClient.get<User>(this.URL_API+'/getByUsername/'+username);
  }

  public updateUser(user: UserSave){
    return this.httpClient.put(this.URL_API+'/updateUser', user);
  }
/*---------------------------------------------------------DIRECTIORIOS---------------------------------------------------------*/
  public getDirectory(){
    let username = JSON.parse(localStorage.getItem("user") || '{}').username;
    let path = JSON.parse(localStorage.getItem("path") || '{}');
    return this.httpClient.get<Carpeta>(this.URL_API+'/getAllDirectoriesUser?username='+username+'&path='+path);
  }

  public saveDirectory(carpeta: CarpetaSave){
    return this.httpClient.post(this.URL_API+'/addDirectory', carpeta);
  }
}
