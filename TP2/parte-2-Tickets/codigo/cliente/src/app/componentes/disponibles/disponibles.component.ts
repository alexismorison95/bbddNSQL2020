import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/servicios/ticket.service';

@Component({
  selector: 'app-disponibles',
  templateUrl: './disponibles.component.html',
  styleUrls: ['./disponibles.component.css']
})
export class DisponiblesComponent implements OnInit {

  disponibles: any;

  constructor(private ticketService: TicketService) { }

  
  ngOnInit(): void {

    this.listarDisponibles();
  }


  listarDisponibles() {
    this.ticketService.listarDisponibles().subscribe(res => {

      this.disponibles = res;
    });
  }


  reservar(nroTicket: number) {

    this.ticketService.reservar(nroTicket).subscribe(res => {

      this.listarDisponibles();

      alert(res);
    });
  }
}
