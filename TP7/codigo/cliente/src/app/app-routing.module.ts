import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@auth0/auth0-angular';

import { InicioComponent } from "./componentes/inicio/inicio.component";
import { AgregarComponent } from "./componentes/agregar/agregar.component";
import { ModificarComponent } from "./componentes/modificar/modificar.component";

const routes: Routes = [
  {path: '', redirectTo:'/inicio', pathMatch:'full'},
  {path: 'inicio', component: InicioComponent},
  {path: 'agregar', component: AgregarComponent, canActivate: [AuthGuard]},
  {path: 'modificar', component: ModificarComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
