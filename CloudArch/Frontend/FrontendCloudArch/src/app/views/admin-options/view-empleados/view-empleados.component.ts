import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../../../service/admin-options/admin.service";
import {User} from "../../../models/User";
import Swal from "sweetalert2";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserSave} from "../../../models/UserSave";
@Component({
  selector: 'app-view-empleados',
  templateUrl: './view-empleados.component.html',
  styleUrls: ['./view-empleados.component.css']
})
export class ViewEmpleadosComponent implements OnInit{
      usuarios:User[]=[];
      editar: boolean = false;
      username_update!: User;
      formUpdate!: FormGroup;
      constructor(
        private service: AdminService,
        private formBuilder: FormBuilder,
        private router: Router
      ) {}

      ngOnInit(): void {
        this.obtenerUsuarios();
          this.formUpdate= this.formBuilder.group({
            name: ['', Validators.required],
            username: [{ value: '', disabled: true }],
            password: ['', Validators.required],
            rol: ['', Validators.required]
          })
      }

      obtenerUsuarios(){
        this.service.getAllUsers().subscribe(
          res=>{
            this.usuarios=res;
          },
          err=>{
            console.log(err);
          }
        );
      }
  contador = 1; // Inicializa el contador en 1

  // Función para ocultar la contraseña con asteriscos
  ocultarPassword(password: string): string {
    return '*'.repeat(password.length);
  }

  deleteUser(username: string){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: "Eliminaras el usuario "+username,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, quiero eliminarlo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteUser(username)
          .subscribe((res:any)=>{
            console.log(res);
          });
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'El usuario '+username+' ha sido eliminado.',
          'success'
        )
        this.obtenerUsuarios();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Se ha cancelado la eliminacion de '+username+'.',
          'error'
        )

      }
    })
  }

  updateUser(username: string){
    this.service.getByUsername(username)
      .subscribe((res:User)=>{
        this.editar = true;
        this.username_update = res;
        this.formUpdate.patchValue(this.username_update);
        console.log(this.username_update);
      });
  }

  updateFinalUser(){
    console.log(this.formUpdate.value);
    console.log(this.username_update.username);
    this.service.updateUser(new UserSave(this.formUpdate.value.name, this.username_update.username, this.formUpdate.value.password, this.formUpdate.value.rol))
      .subscribe((res:any)=>{
        if (res.update=="yes"){
          Swal.fire({
            icon: 'success',
            title: 'Actualizado!',
            text: 'El usuario '+this.username_update.username+' ha sido actualizado.'
          })
          this.editar = false;
          this.obtenerUsuarios();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo actualizar el usuario '+this.username_update.username+'!'
          })
        }
      });


  }
}
