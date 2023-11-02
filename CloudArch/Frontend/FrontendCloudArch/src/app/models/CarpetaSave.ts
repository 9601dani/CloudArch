export class CarpetaSave{
  private user: string;
  private path: string;
  private name: string;
  private createdDate: string;
    constructor(user: string, path: string, name: string, createdDate: string) {
        this.user = user;
        this.path = path;
        this.name = name;
        this.createdDate = createdDate;
    }
}
