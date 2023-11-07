import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../../../service/admin-options/admin.service";
import {Papelera} from "../../../models/Papelera";
import Swal from "sweetalert2";
import {CodeModel} from "@ngstack/code-editor";
import {Archivo} from "../../../models/Archivo";
@Component({
  selector: 'app-papelera',
  templateUrl: './papelera.component.html',
  styleUrls: ['./papelera.component.css']
})
export class PapeleraComponent  implements OnInit{
  archivos:Array<any>=[];
  carpeta:Array<any>=[];
  respuesta:Array<Papelera>=[];
  verDocumento:boolean=false;
  name_doc:string='';
  theme = 'vs-dark';
  result = '';
  codeModel: CodeModel ={
    language: 'html',
    uri: 'main.html',
    value: '',
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: false
    },
    fontsize: 20
  };
  constructor(
    public serviceForPapelera: AdminService
  ) {}
  ngOnInit(): void {
    this.pedirPapelera();
  }
  pedirPapelera(){
    this.serviceForPapelera.getAllPapelera()
      .subscribe((res:Array<Papelera>)=>{
       this.respuesta=res;
      },error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Parece que hubo un error',

        })
      },()=>{
        for(let dato of this.respuesta) {
          if (dato.tipo_eliminacion == 'archivo') {
            this.archivos.push(dato);
          } else {
            this.carpeta.push(dato);
          }
        }
      });
  }

  verContenido(archivo: Archivo) {
    this.name_doc=archivo.name;
    this.verDocumento=true;
    this.codeModel.value=archivo.content;
  }

  salir(){
    this.verDocumento=false;
    this.name_doc='';
  }

}
