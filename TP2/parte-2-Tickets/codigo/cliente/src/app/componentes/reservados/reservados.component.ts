import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/servicios/ticket.service';

@Component({
  selector: 'app-reservados',
  templateUrl: './reservados.component.html',
  styleUrls: ['./reservados.component.css']
})
export class ReservadosComponent implements OnInit {

  reservados;

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {

    this.listarReservados();
  }


  listarReservados() {

    this.ticketService.listarReservados().subscribe(res => {

      this.reservados = res;
    });
  }


  comprar(nroTicket: number) {

    this.ticketService.comprar(nroTicket).subscribe(res => {

      this.listarReservados();
      
      alert(res);
    });
  }

}
