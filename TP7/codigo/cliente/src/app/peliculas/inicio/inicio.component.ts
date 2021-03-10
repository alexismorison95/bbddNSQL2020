import { Component, OnInit } from '@angular/core';
import { PeliculasService } from "../../servicios/peliculas/peliculas.service";
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

  peliculas;


  constructor(public pelis: PeliculasService, 
              public auth: AuthService,
              private data: Data,
              private router: Router) { }

  ngOnInit(): void {

    this.listarPeliculas();
  }

  listarPeliculas() {

    this.pelis.getPeliculas().subscribe(res => {
      
      this.peliculas = res;
    });
  }

  modificar(pelicula: any) {

    this.data.storage = pelicula;

    this.router.navigate(["peliculas/modificar"]);
  }

  eliminar(pelicula: any) {

    Swal.fire({
      title: 'Esta seguro que desea eliminar ' + pelicula.title,
      text: 'Esta accion no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      
      if (result.value) {

        this.pelis.eliminarPelicula(pelicula.id).subscribe(res => {

          this.listarPeliculas();
        });
      } 
    });
  }

}
