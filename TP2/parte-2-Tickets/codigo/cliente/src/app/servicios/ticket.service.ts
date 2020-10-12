import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private url: string = "http://localhost:5000/";

  constructor(private http: HttpClient) { }

  listarDisponibles() {

    return this.http.get(this.url + 'listar/disponibles');
  }


  listarReservados() {

    return this.http.get(this.url + 'listar/reservados');
  }


  listarVendidos() {

    return this.http.get(this.url + 'listar/vendidos');
  }


  reservar(ticket: number) {

    return this.http.get(this.url + 'reservar/' + ticket);
  }


  comprar(ticket: number) {

    return this.http.get(this.url + 'comprar/' + ticket);
  }


  resetearBD(cantTickets: string) {

    return this.http.get(this.url + 'iniciar/' + cantTickets);
  }
}
