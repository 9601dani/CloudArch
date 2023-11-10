import {Component, OnInit} from '@angular/core';
import {SharedSave} from "../../../models/SharedSave";
import {UserService} from "../../../../service/user-options/user.service";
import {CodeModel} from "@ngstack/code-editor";
import Swal from "sweetalert2";

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent  implements OnInit {
  archivos_compartidos:Array<SharedSave>=[];
  archivo_seleccionado!: SharedSave;
  /*-------------------------------------------------------editor-------------------------------------------------------*/
  theme = 'vs-dark';
  name_doc:string='';
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
    private service: UserService
  ) { }

  ngOnInit(): void {
    this.getArchivosCompartidos();
  }

  getArchivosCompartidos(){
    this.service.getSharedByUser()
      .subscribe((res: any) => {
        if(res==null) {
          this.archivos_compartidos = [];
        }else{
          this.archivos_compartidos = res;
        }
      })
  }

  formatearFecha(fecha: string){
    let fecha_formateada = fecha.split('T')[0];
    return fecha_formateada;
  }

  verArchivoCompartido(archivo: SharedSave){
    this.archivo_seleccionado = archivo;
    this.service.view_shared = true;
    this.name_doc = archivo.name;
    this.codeModel.value = archivo.content;

  }
  eliminarArchivoCompartido(archivo: SharedSave){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteShared(archivo)
          .subscribe((res: any) => {
            if(res.remove=='yes'){
              Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: 'Archivo eliminado de los archivos compartidos',
              })
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que hubo un error',
              })
            }
          }, error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Parece que hubo un error',

            })
          }, () => {
            this.getArchivosCompartidos();
          })
      }else{
        Swal.fire(
          'Cancelado',
          'La acción ha sido cancelada',
          'error'
        )
      }

    });
  }

  getOpcionView(){
    return this.service.view_shared;
  }

  salir(){
    this.service.view_shared = false;
    this.name_doc='';

  }
}
