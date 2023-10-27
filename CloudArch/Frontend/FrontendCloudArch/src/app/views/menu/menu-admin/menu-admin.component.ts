import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../../models/User";
import {ChangesVService} from "../../../../service/cambiosV/changes-v.service";

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit{

      constructor(private service:ChangesVService, private route:Router) {}
  user!:User;
      ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem("user") || '{}');
      }

      cambiarHoja(op:string){
        this.service.Opcion = op;
      }

      cerrarSesion(){
        localStorage.removeItem("user");
        this.route.navigate(['/']);
      }

      validarSesion(){
        if(this.user==null){
          this.route.navigate(['/']);
        }
      }

      ngAfterViewInit() {
        this.validarSesion();
      }

      getOpcion(){
        return this.service.Opcion;
      }

}
