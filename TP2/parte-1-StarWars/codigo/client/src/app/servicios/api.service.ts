import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi = "http://localhost:3000/api/";

  
  constructor(private httpCliente: HttpClient) { }


  listarPersonajes(episodio: string) {

    return this.httpCliente.get(this.urlApi + episodio);
  }


  eliminarPersonaje(episodio: string, personaje: string) {

    return this.httpCliente.delete(this.urlApi + `${episodio}/${personaje}`);
  }


  agregarPersonaje(episodio: string, personaje: string) {

    return this.httpCliente.post(this.urlApi + `${episodio}/${personaje}`, {});
  }
}
