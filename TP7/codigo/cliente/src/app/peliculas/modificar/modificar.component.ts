import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from "../../providers/data";
import { FormGroup, FormControl } from '@angular/forms';
import { PeliculasService } from "../../servicios/peliculas/peliculas.service";

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  pelicula: any;

  peliculaForm = new FormGroup({
    titulo: new FormControl(''),
    frase: new FormControl(''),
    web: new FormControl(''),
    fecha: new FormControl(''),
  });

  constructor(
    public activatedRoute: ActivatedRoute,
    private data: Data,
    private pelis: PeliculasService,
    private router: Router) { 

    this.pelicula = this.data.storage;
  }

  ngOnInit(): void {
    
    this.peliculaForm.patchValue({
      titulo: this.pelicula.title,
      frase: this.pelicula.tagline,
      web: this.pelicula.homepage,
      fecha: this.pelicula.release_date
    });
  }

  onSubmit() {

    this.pelicula.title = this.peliculaForm.value.titulo;
    this.pelicula.tagline = this.peliculaForm.value.frase;
    this.pelicula.homepage = this.peliculaForm.value.web;
    this.pelicula.release_date = this.peliculaForm.value.fecha;
    
    this.pelis.modificarPelicula(this.pelicula).subscribe(res => {

      console.log(res);
      
      this.router.navigate(["peliculas"]);
    });
  }

}
