import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@auth0/auth0-angular';

import { InicioComponent as InicioPeliculas } from "./peliculas/inicio/inicio.component";
import { AgregarComponent as AgregarPeliculas } from "./peliculas/agregar/agregar.component";
import { ModificarComponent as ModificarPeliculas } from "./peliculas/modificar/modificar.component";

import { InicioComponent as InicioPersonajes } from "./personajes/inicio/inicio.component";
import { AgregarComponent as AgregarPersonajes } from "./personajes/agregar/agregar.component";
import { ModificarComponent as ModificarPersonajes } from "./personajes/modificar/modificar.component";
import { MasInfoComponent } from "./personajes/mas-info/mas-info.component";

const routes: Routes = [
  {path: '', redirectTo:'/peliculas', pathMatch:'full'},
  {path: 'peliculas', component: InicioPeliculas},
  {path: 'peliculas/agregar', component: AgregarPeliculas, canActivate: [AuthGuard]},
  {path: 'peliculas/modificar', component: ModificarPeliculas, canActivate: [AuthGuard]},

  {path: 'personajes', component: InicioPersonajes},
  {path: 'personajes/agregar', component: AgregarPersonajes, canActivate: [AuthGuard]},
  {path: 'personajes/modificar', component: ModificarPersonajes, canActivate: [AuthGuard]},
  {path: 'personajes/info', component: MasInfoComponent},
  
  {path: '**', redirectTo: '/peliculas'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
