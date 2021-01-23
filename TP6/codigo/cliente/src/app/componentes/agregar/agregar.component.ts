import { Component, OnInit } from '@angular/core';
import { PeliculasService } from "../../servicios/peliculas.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  peliculas: any = [];


  constructor(private pelis: PeliculasService) { }

  ngOnInit(): void {
  }

  buscar(input: any) {

    this.pelis.buscarPelicula(input.value).subscribe((res: any) => {
      
      this.peliculas = res.results;
    });
  }

  agregar(id: number) {

    this.pelis.agregarPelicula(id).subscribe(res => {

      console.log(res);

      Swal.fire({
        title: 'Pelicula agregada',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
      
    });
  }

}
