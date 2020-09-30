import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit {

  personajes = ['1', '2', '3'];
  episodio: string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.episodio = this.route.snapshot.paramMap.get('id');

    console.log(this.episodio);
      
  }

}
