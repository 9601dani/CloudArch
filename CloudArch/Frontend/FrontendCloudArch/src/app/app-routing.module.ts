import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginUserComponent} from "./views/login/login-user/login-user.component";
import {HomeComponent} from "./views/home/home/home.component";
import {HomeAdminComponent} from "./views/home/home-admin/home-admin.component";

const routes: Routes = [
  {
    path: '',
    component: LoginUserComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'home-admin',
    component: HomeAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
