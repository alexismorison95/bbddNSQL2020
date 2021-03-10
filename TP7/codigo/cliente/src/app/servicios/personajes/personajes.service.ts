import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  private url: string = "http://localhost:5000/api/personajes";

  constructor(private http: HttpClient) { }

  getPersonajes() {
    return this.http.get(this.url);
  }

  getPersonaje(id: number) {
    return this.http.get(this.url + "/" + id);
  }

  modificarPersonaje(personaje: any) {
    return this.http.put(this.url + "/" + personaje.id, personaje);
  }

  eliminarPersonaje(id: number) {
    return this.http.delete(this.url + "/" + id);
  }

  agregarPersonaje(personaje: any) {
    return this.http.post(this.url + "/nuevo", personaje);
  }
}
