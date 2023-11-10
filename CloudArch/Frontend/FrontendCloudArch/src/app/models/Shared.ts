export class SharedSave{
  public id: string;
  public name: string;
  public type: string;
  public path: string;
  public user_shared: string;
  public content: string;
  public fecha_compartido: string;
  public hora_compartido: string;
  public user: string;

  constructor(id: string, name: string, type: string, path: string, user_shared: string, content: string, fecha_compartido: string, hora_compartido: string, user: string) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.path = path;
    this.user_shared = user_shared;
    this.content = content;
    this.fecha_compartido = fecha_compartido;
    this.hora_compartido = hora_compartido;
    this.user = user;
  }
}
