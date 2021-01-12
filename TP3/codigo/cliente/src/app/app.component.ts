import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GeoService } from "./services/geo.service";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ubicacion: any = {};

  ubicacionPersonalizada: boolean = false;

  rubros: string[] = [
    'Cervecerias', 
    'Farmacias', 
    'Universidades',
    'Centro de Emergencias',
    'Supermercados'
  ];

  @ViewChild('lat') lat: ElementRef; //del #lat del html(trae el input) y lo asigna a lat(variable)
  @ViewChild('lon') lon: ElementRef;

  radio: number = 1;

  negociosEnRadio = [];


  constructor(private geoService: GeoService) {}


  ngOnInit(): void {
    
    this.buscarUader();
  }


  buscarUader() {

    this.ubicacionPersonalizada = false;
    this.ubicacion = {lat: -32.479240, lon: -58.233421};

    this.buscarNegociosPorRadio();
  }


  buscarPersonalizada() {

    this.ubicacion.lat = this.lat.nativeElement.value;
    this.ubicacion.lon = this.lon.nativeElement.value;

    this.buscarNegociosPorRadio();
  }


  cambiarRadio(input: any) {
    
    this.radio = Number(input.value);

    this.buscarNegociosPorRadio();
  }
  


  buscarNegociosPorRadio() {

    this.negociosEnRadio = [];

    const datos: any = {};
    datos.lat = this.ubicacion.lat;
    datos.lon = this.ubicacion.lon;
    datos.km = this.radio;

    this.rubros.forEach(rubro => {

      datos.rubro = rubro;

      this.geoService.getNegociosPorRadio(datos).subscribe(res => {

        res.forEach(negocio => {

          if (!this.ubicacionPersonalizada) {
            if (negocio != "Universidad Autónoma de Entre Ríos FCYT") {
              
              const aux: any = {nombre: negocio, rubro: rubro};
              this.negociosEnRadio.push(aux);
            }
          }
          else {

            const aux: any = {nombre: negocio, rubro: rubro};
            this.negociosEnRadio.push(aux);
          }
        });
      });
    });
  }


  calcularDistancia(negocio: any) {

    const datos: any = {};
    datos.lat = this.ubicacion.lat;
    datos.lon = this.ubicacion.lon;
    datos.rubro = negocio.rubro;
    datos.negocio = negocio.nombre;

    this.geoService.getDistanciaANegocio(datos).subscribe(res => {

      let distancia = Number(res);
      let metros = (distancia * 1000).toFixed(2)
      
      Swal.fire({
        title: '',
        text: `La distancia entre tu ubicacion y ${datos.negocio} es: ${distancia} Km, o ${metros} metros.`,
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
    });
  }
}
