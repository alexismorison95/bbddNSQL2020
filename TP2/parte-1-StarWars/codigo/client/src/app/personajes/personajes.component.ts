import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit {

  personajes: any;
  episodio: string = "";


  constructor(
    private route: ActivatedRoute,
    private api: ApiService
    ) { }


  ngOnInit(): void {

    this.episodio = this.route.snapshot.paramMap.get('id');

    this.listarPersonajes();
  }


  listarPersonajes() {

    this.api.listarPersonajes(this.episodio).subscribe(res => {

      this.personajes = res;
    });
  }


  agregarPersonaje(event: any) {
    
    this.api.agregarPersonaje(this.episodio, event.target.value).subscribe(res => {

      console.log(res);
      event.target.value = ""
  
      this.listarPersonajes();
    });
  }


  eliminarPersonaje(personaje: string) {
    
    this.api.eliminarPersonaje(this.episodio, personaje).subscribe(res => {

      console.log(res);
      
      this.listarPersonajes();
    });
  }
}
