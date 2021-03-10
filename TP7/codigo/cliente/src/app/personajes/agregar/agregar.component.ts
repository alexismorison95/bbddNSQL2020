import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { PersonajesService } from "../../servicios/personajes/personajes.service";

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  personaje: any = {};

  personajeForm = new FormGroup({
    hero: new FormControl(''),
    name: new FormControl(''),
    historia: new FormControl(''),
    img: new FormControl(''),
    peliculas: new FormControl(''),
  });

  constructor(
    public activatedRoute: ActivatedRoute,
    private personajesService: PersonajesService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {

    this.personaje.hero = this.personajeForm.value.hero;
    this.personaje.name = this.personajeForm.value.name;
    this.personaje.historia = this.personajeForm.value.historia;
    this.personaje.img = this.personajeForm.value.img;

    let peliculasArray = this.personajeForm.value.peliculas.split(",")

    this.personaje.peliculas = peliculasArray;
    
    this.personajesService.getPersonajes().subscribe((res: Array<any>) => {

      this.personaje.id = res.length

      this.personajesService.agregarPersonaje(this.personaje).subscribe(res => {

        console.log(res);
        
        this.router.navigate(["personajes"]);
      });
    });
  }

}
