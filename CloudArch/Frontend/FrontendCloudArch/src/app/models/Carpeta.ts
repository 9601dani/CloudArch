export class Carpeta{
  private user: string;
  private path: string;
  private name: string;
  private createdDate: Date;
    constructor(user: string, path: string, name: string, createdDate: Date) {
        this.user = user;
        this.path = path;
        this.name = name;
        this.createdDate = createdDate;
    }
}
