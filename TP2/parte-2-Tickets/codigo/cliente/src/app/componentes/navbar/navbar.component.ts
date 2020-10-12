import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/servicios/ticket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private ticketService: TicketService, private route: Router) { }

  ngOnInit(): void {
  }


  reiniciar(cantidad: any) {

    if (cantidad.value != "") {
      
      this.ticketService.resetearBD(cantidad.value).subscribe(res => {

        alert(res);
  
        window.location.reload();
  
        cantidad.value = "";
      });
    }
  }

}
