import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Carta } from 'src/app/models/carta';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-blackjack-juego',
  templateUrl: './blackjack-juego.component.html',
  styleUrls: ['./blackjack-juego.component.css']
})
export class BlackjackJuegoComponent implements OnInit, OnDestroy {
  cartas: Carta[];  
  cartasUsadas: Carta[] = [];

  puntajeJugador: number = 0;  
  puntajeCrupier: number = 0;

  sePasaJugador: boolean = false;
  blackJack: boolean = false;
  manoTerminada: boolean = false;

  jugador: Carta[] = [];
  crupier: Carta[] = [];  

  mesaVisible: boolean = false;

  resultado: number = 0; //0:Empate 1:Gana 2:Pierde 3:Blackjack

  private suscripcion = new Subscription();

  constructor(private cartaService : CartaService) { }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

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
    const random = Math.floor(Math.random()*this.cartas.length);    
    this.jugador.push(this.cartas[random]);
    this.puntajeJugador = this.calcularPuntaje(this.cartas[random], this.puntajeJugador, this.jugador);
    if(this.jugador.some((obj: Carta) =>{
      return obj.valor === 11;
    })){
      console.log("Jugador: " + (this.puntajeJugador-10) + "/" + this.puntajeJugador);
    }
    else{
      console.log("Jugador: " + this.puntajeJugador);
    }
    console.log(this.jugador);
    this.cartas.splice(random,1);
    if(this.puntajeJugador > 21){
      console.log("SE PASA, PERDISTE");
      this.sePasaJugador = true;
      this.resultado = 2;
    }             
  }

  obtenerCartaCrupier(){
    const random = Math.floor(Math.random()*this.cartas.length);
    this.crupier.push(this.cartas[random]);
    this.puntajeCrupier = this.calcularPuntaje(this.cartas[random], this.puntajeCrupier, this.crupier);
    this.cartas.splice(random,1); 
  }

  calcularPuntaje(carta: Carta, puntaje: number, listaCartas: Carta[]): number{
    if(carta.valor == 1 && puntaje < 21){
      listaCartas[listaCartas.findIndex((x) => x.valor == 1)].valor = 11;
    }
    let valor = carta.valor;    
    puntaje += valor;
    listaCartas.forEach(element => {
      if(element.valor == 11 && puntaje > 21){
        puntaje -= 10; 
        listaCartas[listaCartas.findIndex((x) => x.valor == 11)].valor = 1;       
      }
    });
    return puntaje;
  }

  jugarMano(){
    this.mesaVisible = true;
    this.obtenerCartaJugador();
    this.obtenerCartaCrupier();
    console.log("Crupier: " + this.puntajeCrupier);
    this.obtenerCartaJugador();
    this.obtenerCartaCrupier();
    if(this.puntajeJugador == 21){
      this.blackJack = true;
      this.resultado = 3;
      console.log("BLACKJACK");
      console.log("Jugador: " + this.puntajeJugador);
      console.log(this.jugador);
      console.log("Crupier: " + this.puntajeCrupier);      
      console.log(this.crupier);
    }
    if(this.blackJack && this.puntajeCrupier == 21){
      this.resultado = 0;
      console.log("EMPATE");
      console.log("Jugador: " + this.puntajeJugador);
      console.log(this.jugador);
      console.log("Crupier: " + this.puntajeCrupier);      
      console.log(this.crupier); 
    }
  }

  terminarJugada(){
    this.manoTerminada = true;
    while(this.puntajeCrupier < 21 && this.puntajeCrupier <= 16){
      this.obtenerCartaCrupier();
    }
    if(this.puntajeCrupier < 21 && (this.puntajeCrupier > this.puntajeJugador)){
      this.resultado = 2;
      console.log("PERDISTE");
      console.log("Jugador: " + this.puntajeJugador);
      console.log(this.jugador);
      console.log("Crupier: " + this.puntajeCrupier);      
      console.log(this.crupier); 
    }
    else{
      this.resultado = 1;
      console.log("GANASTE");
      console.log("Jugador: " + this.puntajeJugador);
      console.log(this.jugador);
      console.log("Crupier: " + this.puntajeCrupier);      
      console.log(this.crupier); 
    }
    
  }
}
