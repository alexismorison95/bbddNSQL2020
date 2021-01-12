import { Component, OnInit } from '@angular/core';
import { CryptoService } from "./servicios/crypto.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  cryptoValues: any;
  limite: string = '10';

  constructor(private cryptoService: CryptoService) {}


  ngOnInit(): void {
    
    this.getCryptoMonedas();
  }


  getCryptoMonedas() {

    this.cryptoService.getCryptos(this.limite).subscribe(res => {

      this.cryptoValues = res;
    });
  }


  actualizar(input: any) {

    this.limite = input.value;

    this.getCryptoMonedas();
  }
}
