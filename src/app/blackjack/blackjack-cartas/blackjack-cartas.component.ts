import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Carta } from 'src/app/models/carta';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-blackjack-cartas',
  templateUrl: './blackjack-cartas.component.html',
  styleUrls: ['./blackjack-cartas.component.css']
})
export class BlackjackCartasComponent implements OnInit {

  cartas : Carta[];
  @Output() onPedir = new EventEmitter();

  private suscripcion = new Subscription();

  constructor(private cartaService : CartaService) { }

  ngOnInit(): void {
    //this.darCarta();
  }

  // darCarta(){
  //  this.suscripcion.add(
  //     this.cartaService.obtenerCarta().subscribe({
  //       next: (carta : Carta[]) => {
  //         this.cartas = carta;
  //       },
  //       error: () => {
  //         alert('No se pudo obtener carta');
  //       }
  //     })
  //   )
  // }

  // obtenerCarta(){
  //   const random = Math.floor(Math.random()*52);
  //   const cartaRandom = this.cartas[random];
  //   console.log(cartaRandom);
  // }
  


}
