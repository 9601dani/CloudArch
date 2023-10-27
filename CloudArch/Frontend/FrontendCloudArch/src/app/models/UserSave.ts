export class UserSave{
  name: string;
  username: string;
  password: string;
  rol: number;

  constructor(name: string, username:string, password: string, rol: number){
    this.name = name;
    this.username = username;
    this.password = password;
    this.rol = rol;
  }

}
