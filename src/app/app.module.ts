import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VistaInicialComponent } from './vista-inicial/vista-inicial.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ListaComponent } from './lista/lista.component';
import { ListaJuegosComponent } from './lista-juegos/lista-juegos.component';
import { TableroComponent } from './tablero/tablero.component';

@NgModule({
  declarations: [
    AppComponent,
    VistaInicialComponent,
    HomeComponent,
    ListaComponent,
    ListaJuegosComponent,
    TableroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
