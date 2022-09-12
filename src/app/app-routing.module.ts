import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  lobbyComponent } from './lobby/lobby.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ListaComponent } from './lista/lista.component';
import { ListaJuegosComponent } from './lista-juegos/lista-juegos.component';
import { TableroComponent } from './tablero/tablero.component';
import { CreatedgamesComponent } from './createdgames/createdgames.component';




const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth1/auth1.module').then((m) => m.Auth1Module),
  },
  {path:"home",component:lobbyComponent, ...canActivate(()=> redirectUnauthorizedTo(['']))},
  {path:"listado",component:ListaComponent, ...canActivate(()=> redirectUnauthorizedTo(['']))},
  {path:"juegos",component:ListaJuegosComponent, ...canActivate(()=> redirectUnauthorizedTo([''])) },
  {path:"creados",component:CreatedgamesComponent, ...canActivate(()=> redirectUnauthorizedTo([''])) },
  {path:"tablero",component:TableroComponent, ...canActivate(()=> redirectUnauthorizedTo(['']))}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
