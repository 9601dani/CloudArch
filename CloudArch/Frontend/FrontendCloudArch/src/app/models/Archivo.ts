export class Archivo{
  private name: string;
  private type: string;
  private path: string;
  private createdDate: Date;
  private content: string;

    constructor(name: string, type: string, path: string, createdDate: Date, content: string) {
        this.name = name;
        this.type = type;
        this.path = path;
        this.createdDate = createdDate;
        this.content = content;
    }
}
