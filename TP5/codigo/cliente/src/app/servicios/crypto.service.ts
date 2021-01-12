import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private url: string = "http://localhost:5000/crypto/";

  constructor(private http: HttpClient) { }

  getCryptos(limit: string) {
    return this.http.get(this.url + limit);
  }
}
