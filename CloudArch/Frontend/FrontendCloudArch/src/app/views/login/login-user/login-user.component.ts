import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {LoginServiceService} from "../../../../service/login/login-service.service";

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit{
  public formLogin!: FormGroup
  constructor(
    private FormBuilder: FormBuilder,
    private router: Router,
    private LoginService: LoginServiceService
  ) { }

  ngOnInit(): void {
  this.formLogin= this.FormBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  })
  }


  userAuth(){
      if(this.formLogin.valid) {
        Swal.fire({
          icon: 'info',
          title: 'Bienvenido a CloudArch: '+this.formLogin.value.username,
          text: 'Validando credenciales'
          })
        this.LoginService.loginUser(this.formLogin.value.username, this.formLogin.value.password)
          .subscribe((res: any) => {
            console.log(res);
            if (res.null==null) {
              this.LoginService.username = this.formLogin.value.username;
              this.LoginService.password = this.formLogin.value.password;
              localStorage.setItem("user", JSON.stringify(res));
              this.router.navigate(['/home']);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario o contraseña incorrectos!'
              })
              this.clear();
            }
          }, (error: any) => {
            console.log(error);
          });
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Hay campos vacios!'
      })
    }
  }

  clear(){
    this.formLogin.reset();
  }

}


