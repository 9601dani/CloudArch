import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../service/user-options/user.service";
import {Router} from "@angular/router";
import {User} from "../../../models/User";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

    constructor(
      private service: UserService,
      private router: Router
    ) {}

    user!:User;
    ngOnInit(): void {
      this.user = JSON.parse(localStorage.getItem("user") || '{}');
    }

    cambiarHojaUser(op:string){
      this.service.Opcion = op;
    }

    cerrarSesion(){
      localStorage.removeItem("user");
      this.router.navigate(['/']);
    }

    validarSesion(){
      if(this.user==null){
        this.router.navigate(['/']);
      }
    }

    ngAfterViewInit() {
      this.validarSesion();
    }

    getOpcion(){
      return this.service.Opcion;
    }

}
