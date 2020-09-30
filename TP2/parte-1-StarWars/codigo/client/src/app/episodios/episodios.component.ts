import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-episodios',
  templateUrl: './episodios.component.html',
  styleUrls: ['./episodios.component.css']
})
export class EpisodiosComponent implements OnInit {

  rutasFotos = [
    "../../assets/ep1.jpg",
    "../../assets/ep2.jpg",
    "../../assets/ep3.jpg",
    "../../assets/ep4.jpg",
    "../../assets/ep5.jpg",
    "../../assets/ep6.jpg",
    "../../assets/ep7.jpg",
    "../../assets/ep8.jpg",
    "../../assets/ep9.jpg"
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  verPersonajes(episodio: string) {

    this.router.navigate(['/episodio/' + episodio]);
  }

}
