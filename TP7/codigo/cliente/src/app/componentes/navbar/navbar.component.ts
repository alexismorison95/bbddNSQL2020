import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public auth: AuthService, 
    private router: Router) { }

  ngOnInit(): void { }

  btnAgregar() {

    const path = location.pathname
    
    if (path === "/peliculas") {

      this.router.navigate(["/peliculas/agregar"])
    }
    else {

      this.router.navigate(["/personajes/agregar"])
    }
  }
}
