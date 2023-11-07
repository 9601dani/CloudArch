import {Component, OnInit} from '@angular/core';
import {CodeEditorModule, CodeModel} from "@ngstack/code-editor";
import Swal from "sweetalert2";
import {UserService} from "../../../../service/user-options/user.service";
import {Archivo} from "../../../models/Archivo";
import {ArchivoSave} from "../../../models/ArchivoSave";
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit{
  archivos:Array<Archivo>=[];
  codigo: string = '';
  columna!:number;
  linea!:number;
  name_doc:string='';
  type_doc:string='';
  editar:boolean=true;
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
      enabled: true
    },
    fontsize: 20,
    disabled: false,
  };
  constructor(
    private service: UserService
  ) {}
  ngOnInit(): void {
    this.codeModel.value= this.service.contenido
    this.name_doc= this.service.name_doc
    this.editar= this.service.editar
    if(!this.editar){
      this.options.disabled=true;
    }
  }
  onCompile(){
    const parser = this.codeModel.value;
    console.log(parser)
  }
  /*onCursorPositionChanged(position: EditorPosition) {
    this.linea = position.lineNumber;
    this.columna = position.column;
  }*/
  onCodeChanged(value:any) {
    this.codigo=value
    this.obtenerPosicion(this.codigo);
  }
  obtenerPosicion(codigo: string) {
    // separar el código por líneas
    this.linea= codigo.split('\n').length;
    const lineas= codigo.split('\n');
    this.columna= lineas[this.linea-1].length
  }

  saveFile(){
    if(this.name_doc==''){

      Swal.fire({
        title: 'Digite el nombre del archivo',
        input: 'text',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if(result.dismiss){
          Swal.fire(
            'Cancelado',
            'No se guardo el archivo',
            'error'
          )
        }else if(result.isConfirmed) {
          //Verifico primero que no haya un archivo igual ya
          let verif = false;
          Swal.fire({
            title: 'Seleccione el tipo de archivo',
            input: 'select',
            inputOptions: {
              html: 'Html',
              text: 'Texto',
            }
          }).then((result2) => {
            this.service.getOneFile(result.value+'.'+result2.value)
              .subscribe((res: any) => {
                if(res){
                  verif = true;
                  Swal.fire(
                    'Error',
                    'Ya existe un archivo con ese nombre, en el directorio actual',
                    'error'
                  )
                }else{
                  this.name_doc=result.value;
                  this.type_doc=result2.value;
                  this.saveFile2();
                }
              });
          });
        }
      })
    }else{
      this.updateFile();
    }
  }
  saveFile2(){
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Asegura que siempre tenga 2 dígitos
        const day = today.getDate().toString().padStart(2, '0'); // Asegura que siempre tenga 2 dígitos

        const fechaFormateada = `${year}-${month}-${day}`;
        let archivo = new ArchivoSave(this.name_doc+'.'+this.type_doc,this.type_doc, JSON.parse(localStorage.getItem("path") || '{}'),
          JSON.parse(localStorage.getItem("user") || '{]').username,fechaFormateada, this.codigo);
        this.service.saveFile(archivo)
          .subscribe((res: any) => {
            if(res.insert=="yes"){
              Swal.fire(
                'Creado',
                'Se creó el archivo',
                'success'
              ).then((result) => {
                this.service.document='my-document';
              });
            }else{
              Swal.fire(
                'Error',
                'No se creó el archivo',
                'error'
              )
            }
          },()=> {
            Swal.fire(
              'Error',
              'No se creó el archivo',
              'error'
            )
          });
      }

      salir(){
        this.service.document='my-document';
      }

      updateFile(){
      let new_name = this.obtenerNameSinExtension();
      Swal.fire({
        title: 'Cambie el nombre si desea',
        input: 'text',
        inputValue: new_name,
        icon: 'question',
      }).then((result) => {
        this.service.updateFile(new ArchivoSave(result.value+'.'+this.obtenerExtension() ,this.type_doc, JSON.parse(localStorage.getItem("path") || '{}'),
          JSON.parse(localStorage.getItem("user") || '{}').username,'',this.codigo), this.name_doc)
          .subscribe((res: any) => {
            if(res.update=="yes"){
              Swal.fire(
                'Actualizado',
                'Se actualizó el archivo',
                'success'
              ).then((result) => {
                this.service.document='my-document';
              });
            }else{
              Swal.fire(
                'Error',
                'No se actualizó el archivo',
                'error'
              )
            }
          });
      });
      }

      obtenerNameSinExtension(){
        let name = this.name_doc.split('.');
        return name[0];
      }

      obtenerExtension(){
        let name = this.name_doc.split('.');
        return name[1];
      }
}
