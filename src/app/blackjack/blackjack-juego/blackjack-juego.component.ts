import { Component, OnDestroy, OnInit,} from '@angular/core';
import { Subscription } from 'rxjs';
import { Carta } from 'src/app/models/carta';
import { CartaService } from 'src/app/services/carta.service';
import Swal from 'sweetalert2';

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
  mostrarPuntajeCrupier: number = 0;
  idCarta: string = '';

  sePasaJugador: boolean = false;
  blackJack: boolean = false;
  manoTerminada: boolean = true;
  volverAJugar: boolean = true;
  volverAJugarMano: boolean = true;

  jugador: Carta[] = [];
  crupier: Carta[] = [];

  mesaVisible: boolean = false;

  resultado: number = 0; //0:Empate 1:Gana 2:Pierde 3:Blackjack

  private suscripcion = new Subscription();

  constructor(private cartaService: CartaService) { }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit(): void {
    this.obtenerMazo();
  }

  obtenerMazo() {
    this.suscripcion.add(
      this.cartaService.obtenerCarta().subscribe({
        next: (carta: Carta[]) => {
          this.cartas = carta;
        },
        error: () => {
          alert('No se pudo obtener carta');
        }
      })
    )
  }

  obtenerCartaJugador() {
    const random = Math.floor(Math.random() * this.cartas.length);
    this.jugador.push(this.cartas[random]);
    this.puntajeJugador = this.calcularPuntaje(this.cartas[random], this.puntajeJugador, this.jugador);
    if (this.jugador.some((obj: Carta) => {
      return obj.valor === 11;
    })) {
      console.log("Jugador: " + (this.puntajeJugador - 10) + "/" + this.puntajeJugador);
    }
    else {
      console.log("Jugador: " + this.puntajeJugador);
    }
    console.log(this.jugador);
    this.cartas.splice(random, 1);
    if (this.puntajeJugador > 21) {
      this.volverAJugar = false;
      this.mostrarMensajePerdio();
      this.mostrarCrupier();      
      this.sePasaJugador = true;
      this.resultado = 2;
    }
  }

  obtenerCartaCrupier() {
    const random = Math.floor(Math.random() * this.cartas.length);
    this.crupier.push(this.cartas[random]);
    this.puntajeCrupier = this.calcularPuntaje(this.cartas[random], this.puntajeCrupier, this.crupier);
    this.cartas.splice(random, 1);
  }

  calcularPuntaje(carta: Carta, puntaje: number, listaCartas: Carta[]): number {
    if (carta.valor == 1 && puntaje < 21) {
      listaCartas[listaCartas.findIndex((x) => x.valor == 1)].valor = 11;
    }
    let valor = carta.valor;
    puntaje += valor;
    listaCartas.forEach(element => {
      if (element.valor == 11 && puntaje > 21) {
        puntaje -= 10;
        listaCartas[listaCartas.findIndex((x) => x.valor == 11)].valor = 1;
      }
    });
    return puntaje;
  }

  jugarMano() {
    this.mesaVisible = true;
    this.manoTerminada = false;
    this.volverAJugarMano = false;
    this.obtenerCartaJugador();
    this.obtenerCartaCrupier();
    this.obtenerCartaJugador();
    this.obtenerCartaCrupier();
    this.mostrarCrupier();
    if (this.puntajeJugador == 21) {
      this.blackJack = true;
      this.resultado = 3;
      this.volverAJugar = false;
      this.mostrarMensajeGano("BlackJack!!!");
      this.manoTerminada= true;
      this.mostrarCrupier();
    }
    if (this.blackJack && this.puntajeCrupier == 21) {
      this.resultado = 0;
      this.mostrarMensajeEmpate();
      this.mostrarCrupier();
    }

  }

  terminarJugada() {
    this.manoTerminada = true;
    this.volverAJugar = false;
    this.mostrarCrupier();

    while (this.puntajeCrupier < 21 && this.puntajeCrupier <= 16) {
      this.obtenerCartaCrupier();
      this.mostrarCrupier();
    }

    if (this.puntajeCrupier <= 21 && (this.puntajeCrupier > this.puntajeJugador)) {
      this.resultado = 2;
      this.mostrarMensajePerdio();      
    }
    else {
      this.resultado = 1;
      this.mostrarMensajeGano();      
    }

  }

  mostrarMensajeGano(mensaje?: string) {
    Swal.fire({
      imageUrl: '../../../assets/ganaste.png',
      imageHeight: 300,
      text: mensaje,
      background: 'black',
      color: 'white',
      confirmButtonColor: '#ffc107'
    })
  }

  mostrarMensajePerdio() {
    Swal.fire({
      text: 'Te pasaste de 21, perdiste',
      imageUrl: '../../../assets/perdiste.png',
      imageHeight: 300,
      background: 'black',
      color: 'white',
      confirmButtonColor: '#ffc107'
    })
  }

  mostrarMensajeEmpate() {
    Swal.fire({
      imageUrl: '../../../assets/empate.png',
      imageHeight: 300,
      background: 'black',
      color: 'white',
      confirmButtonColor: '#ffc107'
    })
  }

  limpiarMesa() {
    this.jugador = [];
    this.crupier = [];
    this.puntajeJugador = 0;
    this.mostrarPuntajeCrupier = 0;
    this.puntajeCrupier = 0;
    this.volverAJugar = true;
    this.volverAJugarMano = true;
    this.sePasaJugador = false;
    this.blackJack = false;
    this.manoTerminada = true;
  }

  mostrarCrupier(){
    if(this.manoTerminada){
      this.mostrarPuntajeCrupier = this.puntajeCrupier;
      this.crupier[1].id = this.idCarta;
    }
    else{
      this.mostrarPuntajeCrupier = this.crupier[0].valor;
      this.idCarta = this.crupier[1].id;
      this.crupier[1].id = 'dorso';
    }
  }
}
