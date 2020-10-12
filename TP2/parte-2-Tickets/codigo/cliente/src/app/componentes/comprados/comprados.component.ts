import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/servicios/ticket.service';

@Component({
  selector: 'app-comprados',
  templateUrl: './comprados.component.html',
  styleUrls: ['./comprados.component.css']
})
export class CompradosComponent implements OnInit {

  vendidos;

  constructor(private ticketService: TicketService) { }


  ngOnInit(): void {

    this.listarComprados();
  }


  listarComprados() {

    this.ticketService.listarVendidos().subscribe(res => {

      this.vendidos = res;
    });
  }

}
