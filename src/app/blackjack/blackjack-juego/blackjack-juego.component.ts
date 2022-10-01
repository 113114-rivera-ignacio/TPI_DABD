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
  cartas: Carta[];  
  cartasUsadas: Carta[]= [];

  puntajeJugador: number = 0;
  puntajeCrupier: number = 0;

  jugador: Carta[] = [];
  croupier: Carta[] = [];  

  mesaVisible: boolean = false;

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
    const random = Math.floor(Math.random()*3);
    this.puntajeJugador = this.calcularPuntaje(this.cartas[random], this.puntajeJugador, this.jugador);
    this.jugador.push(this.cartas[random]);
    this.cartas.splice(random,1); 
    console.log(this.jugador);
    console.log(this.puntajeJugador);
  }

  obtenerCartaCroupier(){
    const random = Math.floor(Math.random()*this.cartas.length);
    this.croupier.push(this.cartas[random]);
    this.cartas.splice(random,1); 
  }

  calcularPuntaje(carta: Carta, puntaje: number, listaCartas: Carta[]): number{
    let valor = carta.valor;
    if(carta.valor == 1 && puntaje < 21){
      valor = 11;
    }
    puntaje += valor;
    listaCartas.forEach(element => {
      if(element.valor == 1 && puntaje > 21){
        puntaje -= 10;
      }
    });
    return puntaje;
  }

  jugarMano(){
    this.mesaVisible = true;
    this.obtenerCartaJugador();
    this.obtenerCartaCroupier();
    this.obtenerCartaJugador();
    this.obtenerCartaCroupier();
  }

}
