import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from "../../providers/data";
import { FormGroup, FormControl } from '@angular/forms';
import { PersonajesService } from "../../servicios/personajes/personajes.service";

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  personaje: any;

  personajeForm = new FormGroup({
    hero: new FormControl(''),
    name: new FormControl(''),
    historia: new FormControl(''),
    img: new FormControl(''),
    peliculas: new FormControl(''),
  });

  constructor(
    public activatedRoute: ActivatedRoute,
    private data: Data,
    private personajesService: PersonajesService,
    private router: Router) { 

      this.personaje = this.data.storage;
    }

  ngOnInit(): void {

    let peliculas = this.personaje.peliculas.join(", ")

    this.personajeForm.patchValue({
      hero: this.personaje.hero,
      name: this.personaje.name,
      historia: this.personaje.historia,
      img: this.personaje.img,
      peliculas: peliculas
    });
  }

  onSubmit() {

    this.personaje.hero = this.personajeForm.value.hero;
    this.personaje.name = this.personajeForm.value.name;
    this.personaje.historia = this.personajeForm.value.historia;
    this.personaje.img = this.personajeForm.value.img;

    let peliculasArray = this.personajeForm.value.peliculas.split(",")

    this.personaje.peliculas = peliculasArray;
    
    this.personajesService.modificarPersonaje(this.personaje).subscribe(res => {

      console.log(res);
      
      this.router.navigate(["personajes"]);
    });
  }

}
