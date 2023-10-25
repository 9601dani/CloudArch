export class User{
  _id: string;
  name: string;
  username: string;
  password: string;
  rol: number;

  constructor(id: string, name: string, username:string, password: string, rol: number){
    this._id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.rol = rol;
  }
}
