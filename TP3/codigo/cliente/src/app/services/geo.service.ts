import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  private url: string = "http://localhost:3000/api/";


  constructor(private http: HttpClient) { }


  iniciarBBDD(){
    return this.http.get(this.url + 'iniciar');
  }


  getNegociosPorRadio(datos: any) {
    return this.http.post<string[]>(this.url + 'radio-km-rubro', datos);
  }


  getDistanciaANegocio(datos: any) {
    return this.http.post<string>(this.url + 'distancia', datos);
  }
}
