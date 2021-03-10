import { Component, OnInit } from '@angular/core';
import { PersonajesService } from "../../servicios/personajes/personajes.service";
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { Data } from "../../providers/data";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  personajes: Array<any>;
  personajesCompletos: Array<any>;

  constructor(
    public personajesService: PersonajesService, 
    public auth: AuthService,
    private data: Data,
    private router: Router) { }

  ngOnInit(): void {

    this.listarPersonajes();
  }

  listarPersonajes() {

    this.personajesService.getPersonajes().subscribe((res: Array<any>) => {

      this.personajes = res;
      this.personajesCompletos = this.personajes;
    });
  }

  modificar(personaje: any) {

    this.data.storage = personaje;

    this.router.navigate(["personajes/modificar"]);
  }

  masInfo(personaje: any) {

    this.data.storage = personaje;

    this.router.navigate(["personajes/info"]);
  }

  eliminar(personaje: any) {

    Swal.fire({
      title: 'Esta seguro que desea eliminar a ' + personaje.hero,
      text: 'Esta accion no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      
      if (result.value) {

        this.personajesService.eliminarPersonaje(personaje.id).subscribe(res => {

          this.listarPersonajes();
        });
      } 
    });
  }

  buscar(inputText: any) {

    let input = inputText.value;

    if (input != "") {
      
      this.personajes = new Array<any>()

      this.personajesCompletos.forEach(personaje => {
        
        personaje.peliculas.forEach((pelicula: String) => {

          if (pelicula.toLocaleLowerCase().includes(input) && 
              this.personajes.indexOf(personaje) === -1) {
            
            this.personajes.push(personaje)
          }
        });
      });
    }
    else {
      this.personajes = this.personajesCompletos
    }
  }
}
