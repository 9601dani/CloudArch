import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../service/user-options/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
    constructor(
      private route:Router,
      private service:UserService
    ) {}

    ngOnInit(): void {
      const sessionID=localStorage.getItem('user');
      if(!sessionID){
        this.route.navigate(['']);
      }
      this.service.Opcion='';
    }

    getOpcion():String{
      return this.service.Opcion;
    }

}
