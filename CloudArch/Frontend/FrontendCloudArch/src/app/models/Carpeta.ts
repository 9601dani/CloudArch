export class Carpeta{
  public user: string;
  public path: string;
  public name: string;
  public createdDate: string;
    constructor(user: string, path: string, name: string, createdDate: string) {
        this.user = user;
        this.path = path;
        this.name = name;
        this.createdDate = createdDate;
    }
}
