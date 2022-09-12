import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  HomeComponent } from './home/home.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { PlayersComponent } from './players/players.component';
import { TableroComponent } from './tablero/tablero.component';
import { CreatedgamesComponent } from './createdgames/createdgames.component';




const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth1/auth1.module').then((m) => m.Auth1Module),
  },
  {path:"home",component:HomeComponent, ...canActivate(()=> redirectUnauthorizedTo(['']))},
  {path:"players",component:PlayersComponent, ...canActivate(()=> redirectUnauthorizedTo([''])) },
  {path:"lobby",component:CreatedgamesComponent, ...canActivate(()=> redirectUnauthorizedTo([''])) },
  {path:"tablero",component:TableroComponent, ...canActivate(()=> redirectUnauthorizedTo(['']))}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
