export class ArchivoSave{
  public name: string;
  public type: string;
  public path: string;
  public user: string;
  public createdDate: string;
  public content: string;

  constructor(name: string, type: string, path: string, user: string, createdDate: string, content: string) {
    this.name = name;
    this.type = type;
    this.path = path;
    this.user = user;
    this.createdDate = createdDate;
    this.content = content;
  }
}
