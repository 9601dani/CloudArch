import {Component, OnInit} from '@angular/core';
import {Router, Routes} from "@angular/router";
import {ChangesVService} from "../../../../service/cambiosV/changes-v.service";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit{

    constructor(private route:Router, private service:ChangesVService) {}

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
