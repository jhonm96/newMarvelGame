import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VistaInicialComponent } from './vista-inicial/vista-inicial.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ListaComponent } from './lista/lista.component';
import { ListaJuegosComponent } from './lista-juegos/lista-juegos.component';
import { TableroComponent } from './tablero/tablero.component';

const routes: Routes = [
  {path:"login",component:VistaInicialComponent},
  {path:"home",component:HomeComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path:"listado",component:ListaComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path:"juegos",component:ListaJuegosComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path:"tablero",component:TableroComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
