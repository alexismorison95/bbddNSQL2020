import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PeliculasService } from "./servicios/peliculas.service";
import { HttpClientModule } from "@angular/common/http";
import { Data } from "./providers/data";
import { ReactiveFormsModule } from '@angular/forms';

import { AuthModule } from '@auth0/auth0-angular';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AgregarComponent } from './componentes/agregar/agregar.component';
import { ModificarComponent } from './componentes/modificar/modificar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    AgregarComponent,
    ModificarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-gaf7p2ph.auth0.com',
      clientId: 'zpkAf19BiuaHBiai8x2yI5gOK60TmZ0J'
    })
  ],
  providers: [PeliculasService, Data],
  bootstrap: [AppComponent]
})
export class AppModule { }
