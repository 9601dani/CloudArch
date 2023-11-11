import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../app/models/User";
import {UserSave} from "../../app/models/UserSave";
import {Carpeta} from "../../app/models/Carpeta";
import {CarpetaSave} from "../../app/models/CarpetaSave";
import {Archivo} from "../../app/models/Archivo";
import {ArchivoSave} from "../../app/models/ArchivoSave";
import {SharedSave} from "../../app/models/SharedSave";

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
  editar: boolean=true;
  view_shared: boolean=false;
  move_archivo: boolean=false;
  move_carpeta: boolean=false;
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

  updatePathDirectory(carpeta: CarpetaSave){
    let username = JSON.parse(localStorage.getItem("user") || '{}').username;
    let path = JSON.parse(localStorage.getItem("path") || '{}');
    let new_path_directory = path+'/'+carpeta.name;
    let carpeta_move= JSON.parse(localStorage.getItem("carpeta_mov") || '{}');
    return this.httpClient.put(this.URL_API+'/updatePathDirectory?username='+username+'&pathn='+new_path_directory, carpeta);
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

  public updateFile(file: ArchivoSave, name:string){
    return this.httpClient.put(this.URL_API+'/updateFile?name='+name, file);
  }

  public deleteFile(file: ArchivoSave){
    return this.httpClient.delete(this.URL_API+'/deleteFile?user='+file.user+'&path='+file.path+'&name='+file.name);
  }

  public updatePath(file: ArchivoSave, new_path:string){
    return this.httpClient.put(this.URL_API+'/updatePath?newpath='+new_path, file);
  }
  /*---------------------------------------------------------SHARED---------------------------------------------------------*/
  public getSharedByUser(){
    let username = JSON.parse(localStorage.getItem("user") || '{}').username;
    return this.httpClient.get<Array<Archivo>>(this.URL_API+'/getAllSharedByUser?user='+username);
  }
  public addShared(file: SharedSave){
    return this.httpClient.post(this.URL_API+'/addShared', file);
  }

  public deleteShared(file: SharedSave){
    return this.httpClient.delete(this.URL_API+'/deleteShared?user='+file.user_shared+'&path='+file.path+'&name='+file.name);
  }



}
