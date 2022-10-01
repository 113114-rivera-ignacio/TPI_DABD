import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Carta } from 'src/app/models/carta';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-blackjack-juego',
  templateUrl: './blackjack-juego.component.html',
  styleUrls: ['./blackjack-juego.component.css']
})
export class BlackjackJuegoComponent implements OnInit {
  cartas : Carta[];  

  jugador : Carta[] = [];
  croupier : Carta[] = [];

  cartasUsadas: Carta[]= [];

  mesaVisible: boolean = false;



  //@Output() onPedir = new EventEmitter();

  private suscripcion = new Subscription();

  constructor(private cartaService : CartaService) { }

  ngOnInit(): void {
    this.obtenerMazo();
  }

  obtenerMazo(){
    this.suscripcion.add(
       this.cartaService.obtenerCarta().subscribe({
         next: (carta : Carta[]) => {          
           this.cartas = carta;
         },
         error: () => {
           alert('No se pudo obtener carta');
         }
       })
     )
   }
 
   obtenerCartaJugador(){
     const random = Math.floor(Math.random()*52);
    //  let carta: Carta = this.cartas[random];
    // const cartaRandom = this.cartas[random];    
     this.jugador.push(this.cartas[random]);
     this.cartas.splice(random,1); 
   }

   obtenerCartaCroupier(){
    const random = Math.floor(Math.random()*this.cartas.length);
     this.croupier.push(this.cartas[random]);
    //this.cartasUsadas.push(this.cartas[random]);
     this.cartas.splice(random,1); 
   }

   jugarMano(){
    this.mesaVisible = true;
    this.obtenerCartaJugador();
    this.obtenerCartaCroupier();
    this.obtenerCartaJugador();
    this.obtenerCartaCroupier();
    console.log(this.jugador);
    console.log(this.croupier);
   }

}
