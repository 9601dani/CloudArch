import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {UserService} from "../../../../service/user-options/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserSave} from "../../../models/UserSave";

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit{
   user!:User;
   editar=false;
   formUpdatePass!: FormGroup;
   username_update!: User;
    constructor(
      private router:Router,
      private service:UserService,
      private form:FormBuilder
    ) {}
    async ngOnInit(): Promise<void> {
      this.user = JSON.parse(localStorage.getItem("user") || '{}');
      //aqui usare Swal para pedir que digite su contraseña actual, y si es correcta, entonces se le permitira cambiar la contraseña
      const { value: password } = await Swal.fire({
        title: 'Confirmar contraseña',
        input: 'password',
        inputLabel: 'Ingrese su contraseña actual',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        inputPlaceholder: 'Ingrese su contraseña actual',
        icon: 'question',
      })
      if (password === this.user.password) {
        Swal.fire({
          icon: 'success',
          title: 'Contraseña correcta',
          text: 'La contraseña que ingresó es correcta',
        })
        this.service.Opcion='cambiar-pass';
        this.editar=true;
        this.formUpdatePass= this.form.group({
          name: [{ value: this.user.name, disabled: true }],
          username: [{ value: this.user.username, disabled: true }],
          password: [{value: '', disabled: false}, Validators.required],
          rol: [{ value: this.user.rol, disabled: true }]
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Contraseña incorrecta',
          text: 'La contraseña que ingresó no es correcta',
        })
        this.service.Opcion='';
      }
    }

    updatePass(){
      if(this.formUpdatePass.get('password')?.value!=''){
        Swal.fire({
          title: 'Estas seguro?',
          text: "Cambiaras la contraseña del usuario "+this.user.username,
          icon: 'warning',
          showCancelButton: true,
        }).then((result) => {
          if(result.dismiss){
            Swal.fire(
              'Cancelado',
              'No se realizó ningún cambio',
              'error'
            )
          }else if(result.isConfirmed){
            this.service.updateUser(new UserSave(this.user.name, this.user.username, this.formUpdatePass.get('password')?.value, this.user.rol))
              .subscribe((res:any)=>{
                if(res.update=="yes"){
                  Swal.fire(
                    'Actualizado',
                    'La contraseña se actualizó correctamente',
                    'success'
                  )
                  this.service.getByUsername(this.user.username)
                    .subscribe((res:User)=>{
                      this.user=res;
                      localStorage.setItem("user", JSON.stringify(this.user));
                    });
                  this.service.Opcion='';
                }else{
                  Swal.fire(
                    'Error',
                    'La contraseña no se pudo actualizar',
                    'error'
                  )
                }
              })
          }
        })
      }else {
        Swal.fire({
          icon: 'error',
          title: 'Contraseña incorrecta',
          text: 'El campo de contraseña no puede estar vacío',
        })
      }
    }

}
