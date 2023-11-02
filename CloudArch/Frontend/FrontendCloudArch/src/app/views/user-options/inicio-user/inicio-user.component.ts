import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../service/user-options/user.service";
import {MydocumentsComponent} from "../mydocuments/mydocuments.component";

@Component({
  selector: 'app-inicio-user',
  templateUrl: './inicio-user.component.html',
  styleUrls: ['./inicio-user.component.css']
})
export class InicioUserComponent  implements OnInit{
    constructor(
      private service: UserService,
    ) {}

    ngOnInit(): void {
    }

    getOpcion(): String {
      return this.service.document;
    }

    cambiarOpcion(opcion: string): void {
      this.service.document = opcion;
      localStorage.setItem("path", JSON.stringify("root"));
    }

}
