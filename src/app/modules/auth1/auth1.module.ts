import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Auth1RoutingModule } from './auth1-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    Auth1RoutingModule
  ]
})
export class Auth1Module { }
