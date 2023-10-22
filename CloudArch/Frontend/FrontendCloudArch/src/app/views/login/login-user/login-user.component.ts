import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit{
  public formLogin!: FormGroup
  constructor(
    private FormBuilder: FormBuilder,
    private router: Router
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

      console.log(this.formLogin.value.username)
      console.log(this.formLogin.value.password)
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Hay campos vacios!'
      })
    }
  }

}


