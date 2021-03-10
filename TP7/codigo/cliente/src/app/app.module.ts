import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PeliculasService } from "./servicios/peliculas/peliculas.service";
import { PersonajesService } from "./servicios/personajes/personajes.service";
import { HttpClientModule } from "@angular/common/http";
import { Data } from "./providers/data";
import { ReactiveFormsModule } from '@angular/forms';

import { AuthModule } from '@auth0/auth0-angular';
import { NavbarComponent } from './componentes/navbar/navbar.component';

import { InicioComponent as InicioPeliculas } from "./peliculas/inicio/inicio.component";
import { AgregarComponent as AgregarPeliculas } from "./peliculas/agregar/agregar.component";
import { ModificarComponent as ModificarPeliculas } from "./peliculas/modificar/modificar.component";

import { InicioComponent as InicioPersonajes } from "./personajes/inicio/inicio.component";
import { AgregarComponent as AgregarPersonajes } from "./personajes/agregar/agregar.component";
import { ModificarComponent as ModificarPersonajes } from "./personajes/modificar/modificar.component";
import { MasInfoComponent } from './personajes/mas-info/mas-info.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioPeliculas,
    AgregarPeliculas,
    ModificarPeliculas,
    InicioPersonajes,
    AgregarPersonajes,
    ModificarPersonajes,
    MasInfoComponent
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
  providers: [PeliculasService, PersonajesService, Data],
  bootstrap: [AppComponent]
})
export class AppModule { }
