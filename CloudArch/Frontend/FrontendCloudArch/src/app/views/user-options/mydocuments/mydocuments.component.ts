import {Component, OnInit} from '@angular/core';
import {Carpeta} from "../../../models/Carpeta";
import {UserService} from "../../../../service/user-options/user.service";
import Swal from "sweetalert2";
import {CarpetaSave} from "../../../models/CarpetaSave";
@Component({
  selector: 'app-mydocuments',
  templateUrl: './mydocuments.component.html',
  styleUrls: ['./mydocuments.component.css']
})
export class MydocumentsComponent implements OnInit{
  carpetas:Array<Carpeta>=[];
  regresar_boton:boolean=false;
  constructor(
    private service: UserService
    ) {}

    ngOnInit(): void {
     this.buscarCarpetas();
    }

    newDirectory(){
        Swal.fire({
          title: 'Digite el nombre de la carpeta',
          input: 'text',
          icon: 'question',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Confirmar',
        }).then((result) => {
          if(result.dismiss){
            Swal.fire(
              'Cancelado',
              'No se creó la carpeta',
              'error'
            )
          }else if(result.isConfirmed){
            //Verifico primero que no haya una carpeta igual ya
            let verif = false;
            this.carpetas.forEach((carpeta)=>{
              if(carpeta.name == result.value){
                verif = true;
              }
            });
            if(verif){
              Swal.fire(
                'Error',
                'Ya existe una carpeta con ese nombre, en el directorio actual',
                'error'
              )
            }else{
              //Luego creo la carpeta si no hay una igual
              const today = new Date();
              const year = today.getFullYear();
              const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Asegura que siempre tenga 2 dígitos
              const day = today.getDate().toString().padStart(2, '0'); // Asegura que siempre tenga 2 dígitos

              const fechaFormateada = `${year}-${month}-${day}`;
              this.service.saveDirectory(new CarpetaSave(JSON.parse(localStorage.getItem("user") || '{}').username, JSON.parse(localStorage.getItem("path") || '{}'), result.value, fechaFormateada || ''))
                .subscribe((res: any) => {
                  if(res.insert=="yes"){
                    Swal.fire(
                      'Creado',
                      'Se creó la carpeta',
                      'success'
                    )
                  }else{
                    Swal.fire(
                      'Error',
                      'No se creó la carpeta',
                      'error'
                    )
                  }
                },()=> {
                  Swal.fire(
                    'Error',
                    'No se creó la carpeta',
                    'error'
                  )
                },()=> {
                  this.buscarCarpetas();
                  }
                );
            }
          }
        })
   }

   buscarCarpetas(){
     this.service.getDirectory()
       .subscribe((res: any) => {
         if(res.length > 0){
           this.carpetas = res;
         }else{
           this.carpetas = [];
           Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: 'No hay carpetas en este directorio',
           })
         }
       });
   }

   abrirCarpeta(carpeta: Carpeta){
      localStorage.setItem("path", JSON.stringify(carpeta.path+"/"+carpeta.name));
      this.buscarCarpetas();
      this.regresar_boton=true;
   }

   regresar(){
    if(JSON.parse(localStorage.getItem("path") || '{}')=="root"){
      this.regresar_boton=false;
    }else{
      let path = JSON.parse(localStorage.getItem("path") || '{}');
      let pathArray = path.split("/");
      let pathNew = "";
      for(let i=0; i<pathArray.length-1; i++){
        if(i==0){
          pathNew = pathArray[i];
        }else{
          pathNew = pathNew+"/"+pathArray[i];
        }
      }
      localStorage.setItem("path", JSON.stringify(pathNew));
      if(pathNew=="root"){
        this.regresar_boton=false;
      }
      this.buscarCarpetas();
    }
   }

}