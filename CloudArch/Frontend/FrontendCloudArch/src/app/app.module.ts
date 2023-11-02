import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUserComponent } from './views/login/login-user/login-user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './views/home/home/home.component';
import { HomeAdminComponent } from './views/home/home-admin/home-admin.component';
import {LoginServiceService} from "../service/login/login-service.service";
import {HttpClientModule} from "@angular/common/http";
import { MenuAdminComponent } from './views/menu/menu-admin/menu-admin.component';
import { MenuComponent } from './views/menu/menu/menu.component';
import { NewEmpleadoComponent } from './views/admin-options/new-empleado/new-empleado.component';
import { ViewEmpleadosComponent } from './views/admin-options/view-empleados/view-empleados.component';
import { PapeleraComponent } from './views/admin-options/papelera/papelera.component';
import { ChangePassComponent } from './views/user-options/change-pass/change-pass.component';
import { InicioUserComponent } from './views/user-options/inicio-user/inicio-user.component';
import { MydocumentsComponent } from './views/user-options/mydocuments/mydocuments.component';
import { SharedComponent } from './views/user-options/shared/shared.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    HomeComponent,
    HomeAdminComponent,
    MenuAdminComponent,
    MenuComponent,
    NewEmpleadoComponent,
    ViewEmpleadosComponent,
    PapeleraComponent,
    ChangePassComponent,
    InicioUserComponent,
    MydocumentsComponent,
    SharedComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [LoginServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
