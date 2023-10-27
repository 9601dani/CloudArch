import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginServiceService} from "../../../../service/login/login-service.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {AdminService} from "../../../../service/admin-options/admin.service";
import {UserSave} from "../../../models/UserSave";
import {User} from "../../../models/User";
import {waitForAsync} from "@angular/core/testing";
import {ChangesVService} from "../../../../service/cambiosV/changes-v.service";
@Component({
  selector: 'app-new-empleado',
  templateUrl: './new-empleado.component.html',
  styleUrls: ['./new-empleado.component.css']
})
export class NewEmpleadoComponent implements OnInit{
  public formNewEmpleado!: FormGroup
    constructor(
      private FormBuilder: FormBuilder,
      private router: Router,
      private AdminService: AdminService,
      private service:ChangesVService
    ) { }

    ngOnInit(): void {
      this.formNewEmpleado= this.FormBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        name: ['', Validators.required],
        rol: ['', Validators.required],
        })
    }

    newEmpleado(){
      if(this.formNewEmpleado.valid){
        let user_auth= this.AdminService.getOneUser(this.formNewEmpleado.value.username)
          .subscribe((res: any) => {
            if (res.find=="not") {
              this.saveEmpleado();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El usuario ya existe!'
              })
              this.clear();
            }
          } , (error: any) => {
            console.log(error);
          });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Campos Vacios',
          text: 'Revise los campos, no pueden estar vacios!'
        })
      }
    }

    saveEmpleado(){
      const userSave: UserSave = {
        name: this.formNewEmpleado.value.name,
        username: this.formNewEmpleado.value.username,
        password: this.formNewEmpleado.value.password,
        rol: this.formNewEmpleado.value.rol
      }
      this.AdminService.saveUser(userSave).subscribe((res: any) => {
        if(res.insert=="yes"){
          Swal.fire({
            icon: 'success',
            title: 'Empleado Guardado',
            text: 'El empleado se ha guardado correctamente!'
          })
          this.clear();
          this.service.Opcion='';
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo guardar el empleado!'
          })
          this.clear();
        }
      } , (error: any) => {
        console.log(error);
      });

    }
    clear(){
      this.formNewEmpleado.reset();
    }

}
