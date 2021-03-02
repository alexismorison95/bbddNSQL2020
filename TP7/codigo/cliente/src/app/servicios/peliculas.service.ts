import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private url: string = "http://localhost:5000/api";

  public urlImagenes: string = "https://image.tmdb.org/t/p/w500";

  public urlBuscar: string = "https://api.themoviedb.org/3/search/movie?api_key=dfe3234b957f307e6e0db40c7052c2db&language=es&query=";

  
  constructor(private http: HttpClient) { }

  getPeliculas() {
    return this.http.get(this.url);
  }

  modificarPelicula(pelicula: any) {
    return this.http.put(this.url + "/modificar", pelicula);
  }

  eliminarPelicula(id: number) {
    return this.http.delete(this.url + "/eliminar/" + id);
  }

  agregarPelicula(id: number) {
    return this.http.get(this.url + "/cargar/" + id);
  }

  buscarPelicula(nombre: string) {
    return this.http.get(this.urlBuscar + nombre);
  }
}
