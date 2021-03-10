import { Component, OnInit } from '@angular/core';
import { Data } from "../../providers/data";
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonajesService } from "../../servicios/personajes/personajes.service";

@Component({
  selector: 'app-mas-info',
  templateUrl: './mas-info.component.html',
  styleUrls: ['./mas-info.component.css']
})
export class MasInfoComponent implements OnInit {

  personaje: any = {};

  constructor(private data: Data) { 

    this.personaje = this.data.storage;
  }

  ngOnInit(): void { }

}
