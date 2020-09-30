import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EpisodiosComponent } from "./episodios/episodios.component";
import { PersonajesComponent } from "./personajes/personajes.component";

const routes: Routes = [
  { path: '', component: EpisodiosComponent },
  { path: 'episodio/:id', component: PersonajesComponent },
  { path: '**', component:  EpisodiosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
