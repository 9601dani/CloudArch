export class PapeleraSave{
  public name: string;
  public type: string;
  public path: string;
  public user: string;
  public content: string;
  public tipo_eliminacion: string;

  constructor(name: string, type: string, path: string, user: string, content: string, tipo_doc: string) {
    this.name = name;
    this.type = type;
    this.path = path;
    this.user = user;
    this.content = content;
    this.tipo_eliminacion = tipo_doc;
  }
}
