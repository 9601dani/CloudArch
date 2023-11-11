import {Component, OnInit} from '@angular/core';
import {Carpeta} from "../../../models/Carpeta";
import {UserService} from "../../../../service/user-options/user.service";
import Swal from "sweetalert2";
import {CarpetaSave} from "../../../models/CarpetaSave";
import {Archivo} from "../../../models/Archivo";
import {ArchivoSave} from "../../../models/ArchivoSave";
import {AdminService} from "../../../../service/admin-options/admin.service";
import {PapeleraSave} from "../../../models/PapeleraSave";
import {SharedSave} from "../../../models/SharedSave";
@Component({
  selector: 'app-mydocuments',
  templateUrl: './mydocuments.component.html',
  styleUrls: ['./mydocuments.component.css']
})
export class MydocumentsComponent implements OnInit{
  carpetas:Array<Carpeta>=[];
  archivos:Array<Archivo>=[];
  regresar_boton:boolean=false;
  editorAdmin:boolean=false;
  constructor(
    private service: UserService,
    private serviceForPapelera: AdminService
    ) {}

    ngOnInit(): void {
     this.buscarCarpetas();
      this.buscarArchivos();
     if (JSON.parse(localStorage.getItem("path") || '{}')=="root"){
       this.regresar_boton=false;
      }else{
        this.regresar_boton=true;
     }
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
         }
       });
   }

   clickCarpeta(carpeta: Carpeta){
    Swal.fire({
      title: 'Seleccione opcion a realizar',
      input: 'select',
      inputOptions: {
        abrir: 'Abrir',
        mover: 'Mover',
        copiar: 'Hacer Copia',
        delete: 'Eliminar',
      }
    }).then((result) => {
      if(result.value=='abrir'){
        this.abrirCarpeta(carpeta);
      }else if(result.value=='delete'){
        this.eliminarCarpeta(carpeta);
      }else if(result.value=='mover'){
        this.moveDirectory(carpeta);
      }else if(result.value=='copiar'){
        this.copiarCarpeta(carpeta)
      }
    });
   }

   copiarCarpeta(carpeta: Carpeta){
    this.service.copyDirectory(carpeta)
      .subscribe((res:any)=>{
        if(res.copy=='yes') {
          Swal.fire(
            'Copiado',
            'Se copió la carpeta',
            'success'
          ).then((result) => {
            this.buscarCarpetas();
          });
        }else{
          Swal.fire(
            'Error',
            'No se copió la carpeta',
            'error'
          )
        }
      })
   }

   abrirCarpeta(carpeta: Carpeta){
      localStorage.setItem("path", JSON.stringify(carpeta.path+"/"+carpeta.name));
      this.buscarCarpetas();
      this.buscarArchivos();
      this.regresar_boton=true;
   }
  eliminarCarpeta(carpeta: Carpeta){
  alert('Eliminando carpeta: ' + carpeta.name);
  //TODO: Eliminare la carpeta y todo lo que tenga adentro, y lo enviare a la papelera
    Swal.fire({
      title: '¿Está seguro de eliminar la carpeta?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if(result.isConfirmed){
        //TODO: eliminare la carpeta y lo que este dentro
      }
    })
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
      this.buscarArchivos();
    }
   }

   edit_new_file(){
      this.service.document='edit-arch';
      this.service.contenido='';
      this.service.name_doc='';
   }

   buscarArchivos(){
    this.service.getFilesUser()
      .subscribe((res: any) => {
        if(res.length > 0){
          this.archivos = res;
        }else{
          this.archivos = [];
        }
      },()=> {

      },()=> {
        this.service.document='my-document';
        });
   }
  clickArchivo(archivo: any) {
    Swal.fire({
      title: 'Seleccione opcion a realizar',
      input: 'select',
      inputOptions: {
        abrir: 'Editar',
        delete: 'Eliminar',
        compartir: 'Compartir',
        copiar: 'Hacer Copia',
        mover: 'Mover',
        cancelar: 'Cancelar'
      }
      }).then((result) => {
      if(result.value=='abrir'){
        this.abrirArchivo(archivo);
      }else if(result.value=='delete'){
        this.eliminarArchivo(archivo);
      }else if(result.value=='compartir'){
       this.compartirArchivo(archivo);
      }else if(result.value=='copiar') {
        this.hacerCopia(archivo.name);
      }else if(result.value=='mover'){
        this.moveFile(archivo);
      }
    })
  }

  abrirArchivo(archivo: any) {
    // Lógica para abrir el archivo
    this.service.document='edit-arch';
    this.service.contenido=archivo.content;
    this.service.name_doc=archivo.name;
  }

  eliminarArchivo(archivo: any) {
      Swal.fire({
        title: '¿Está seguro de eliminar el archivo?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if(result.isConfirmed){
          this.añadirAPapelera(archivo.name);
          this.service.deleteFile(new ArchivoSave(archivo.name, archivo.type, archivo.path, archivo.user, archivo.createdDate, archivo.content))
            .subscribe((res: any) => {
              if(res.remove=="yes"){
                Swal.fire(
                  'Eliminado',
                  'Se eliminó el archivo',
                  'success'
                ).then((result) => {
                  this.buscarArchivos();
                });
              }else{
                Swal.fire(
                  'Error',
                  'No se eliminó el archivo',
                  'error'
                )
              }
            });
        }else if(result.dismiss){
          Swal.fire(
            'Cancelado',
            'No se eliminó el archivo',
            'error'
          )
        }
      });

  }

  compartirArchivo(archivo: any) {
    // Lógica para compartir el archivo
    Swal.fire({
      title: 'Digite el nombre del usuario con el que desea compartir',
      input: 'text',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.dismiss){
        Swal.fire(
          'Cancelado',
          'No se compartió el archivo',
          'error'
        )
      }else{
        //verificare que exista el usuario al que se la va a compartir
        this.service.getByUsername(result.value)
          .subscribe((res: any) => {
            if(res.find=='not'){
              Swal.fire(
                'Error',
                'No existe el usuario al que desea compartir',
                'error'
              )
            }else{
              //hare lo de la fecha actual para mandar el string
              const today = new Date();
              const year = today.getFullYear();
              const month = (today.getMonth() + 1).toString().padStart(2, '0');
              const day = today.getDate().toString().padStart(2, '0');
              let fechaActual = `${year}-${month}-${day}`;
              //ahora añadite la hora en formato string
              const hour = today.getHours().toString().padStart(2, '0');
              const minute = today.getMinutes().toString().padStart(2, '0');
              const second = today.getSeconds().toString().padStart(2, '0');
              let horaActual = `${hour}:${minute}:${second}`;
              this.service.addShared(new SharedSave(archivo.name, archivo.type, 'shared', result.value, archivo.content, fechaActual, horaActual, archivo.user))
                .subscribe((res: any) => {
                  if(res.insert=="yes"){
                    Swal.fire(
                      'Compartido',
                      'Se compartió el archivo a '+ result.value ,
                      'success'
                    )
                  }else{
                    Swal.fire(
                      'Error',
                      'No se compartió el archivo',
                      'error'
                    )
                  }
                });
            }
          });
      }
    })
  }

  añadirAPapelera(name:string){
    this.service.getOneFile(name)
      .subscribe((res:Archivo)=> {
        if(res!=null){
          this.serviceForPapelera.addToPapelera(new PapeleraSave(res.name, res.type, 'papelera', res.user, res.content, 'archivo'))
            .subscribe((res:any)=> {
              if(res.insert=="yes"){
              }else{
              }
            });
        }
      });
  }
  hacerCopia(name:string){
    let verif = false;
    this.archivos.forEach((archivo)=>{
      if(archivo.name == 'copia'+name){
        verif = true;
      }

    });
    if(verif){
      Swal.fire(
        'Error',
        'Ya existe una copia con ese nombre, en el directorio actual',
        'error'
      )
      return;
    }else{
      this.service.getOneFile(name)
        .subscribe((res:Archivo)=> {
          if(res!=null){
            this.service.saveFile(new ArchivoSave('copia'+res.name, res.type, res.path, res.user, res.createdDate, res.content))
              .subscribe((res:any)=> {
                if(res.insert=="yes"){
                  Swal.fire(
                    'Creado',
                    'Se creó la copia',
                    'success'
                  ).then((result) => {
                    this.buscarArchivos();
                  });
                }else{
                  Swal.fire(
                    'Error',
                    'No se creó la copia',
                    'error'
                  )
                }
              });
          }
        });
    }
  }

  getMoveFile(){
    return this.service.move_archivo
  }

  moveFile(archivo:ArchivoSave){
    this.service.move_archivo=true;
    localStorage.setItem("archivo_mov", JSON.stringify(archivo));
  }
  moverArchivo(){
    this.service.move_archivo=false;
    let path_actual=JSON.parse(localStorage.getItem("path") || '{}')
    let archivo_mover= JSON.parse(localStorage.getItem("archivo_mov") || '{}');
    Swal.fire({
      title: '¿Esta seguro de moverlo aqui?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result)=>{
      if(result.dismiss){
        Swal.fire(
          'Cancelado',
          'No se compartió el archivo',
          'error'
        )
      }else{
        this.service.updatePath(archivo_mover, path_actual)
          .subscribe((res:any)=>{
           if(res.update=='yes'){
              Swal.fire(
                'Movido',
                'Se movió el archivo',
                'success'
              ).then((result) => {
                this.buscarArchivos();
                localStorage.removeItem("archivo_mov");
              });
           }else{
              Swal.fire(
                'Error',
                'No se movió el archivo',
                'error'
              )
             this.service.move_archivo=false;
           }

        });
      }
    })

  }

  getMoveDirectory(){
    return this.service.move_carpeta
  }
  moverCarpeta(){
    this.service.move_carpeta=false;
    let path_actual=JSON.parse(localStorage.getItem("path") || '{}')
    let carpeta_mover= JSON.parse(localStorage.getItem("carpeta_mov") || '{}');
    Swal.fire({
      title: '¿Esta seguro de moverlo aqui?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result)=>{
      //TODO: aqui tengo que recorrer todo el directorio:
      if(result.dismiss){
        Swal.fire(
          'Cancelado',
          'No se compartió el archivo',
          'error'
        )
      }else{
        let path_antiguo = carpeta_mover.path+"/"+carpeta_mover.name;
        let path_nuevo = JSON.parse( localStorage.getItem("path") || '{}');
        this.service.updatePathDirectory(carpeta_mover)
          .subscribe((res:any)=>{
            if(res.move=='yes'){
              Swal.fire(
                'Movido',
                'Se movió el archivo',
                'success'
              ).then((result) => {
                this.buscarCarpetas();
                this.buscarArchivos();
                localStorage.removeItem("carpeta_mov");
              });
            }
          });
      }
    });
  }

  moveDirectory(carpeta: Carpeta){
    this.service.move_carpeta=true;
    localStorage.setItem("carpeta_mov", JSON.stringify(carpeta));
  }

}
