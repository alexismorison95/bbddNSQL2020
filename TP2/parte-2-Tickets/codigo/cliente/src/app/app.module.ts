import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TicketService } from "./servicios/ticket.service";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { DisponiblesComponent } from './componentes/disponibles/disponibles.component';
import { ReservadosComponent } from './componentes/reservados/reservados.component';
import { CompradosComponent } from './componentes/comprados/comprados.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DisponiblesComponent,
    ReservadosComponent,
    CompradosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TicketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
