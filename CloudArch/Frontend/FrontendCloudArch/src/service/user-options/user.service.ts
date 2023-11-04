import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../app/models/User";
import {UserSave} from "../../app/models/UserSave";
import {Carpeta} from "../../app/models/Carpeta";
import {CarpetaSave} from "../../app/models/CarpetaSave";
import {Archivo} from "../../app/models/Archivo";
import {ArchivoSave} from "../../app/models/ArchivoSave";

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
  contenido: string='';
  name_doc: string='';
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

  /*---------------------------------------------------------FILES---------------------------------------------------------*/
  public getFilesUser(){
    let username = JSON.parse(localStorage.getItem("user") || '{}').username;
    let path = JSON.parse(localStorage.getItem("path") || '{}');
    return this.httpClient.get<Array<Archivo>>(this.URL_API+'/getAllFilesUser?username='+username+'&path='+path);
  }

  public saveFile(file: ArchivoSave){
    return this.httpClient.post(this.URL_API+'/addFile', file);
  }

  public getOneFile(name:string){
    let username = JSON.parse(localStorage.getItem("user") || '{}').username;
    let path = JSON.parse(localStorage.getItem("path") || '{}');
    return this.httpClient.get<Archivo>(this.URL_API+'/getOneFile?username='+username+'&path='+path+'&name='+name);
  }

  public updateFile(file: ArchivoSave){
    return this.httpClient.put(this.URL_API+'/updateFile', file);
  }

  public deleteFile(file: ArchivoSave){
    return this.httpClient.delete(this.URL_API+'/deleteFile?user='+file.user+'&path='+file.path+'&name='+file.name);
  }
}
