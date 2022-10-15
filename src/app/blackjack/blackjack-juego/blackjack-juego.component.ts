import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Carta } from 'src/app/models/carta';
import { CartaService } from 'src/app/services/cartas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blackjack-juego',
  templateUrl: './blackjack-juego.component.html',
  styleUrls: ['./blackjack-juego.component.css'],
})

export class BlackjackJuegoComponent implements OnInit, OnDestroy {
  cartas: Carta[];
  cartasUsadas: Carta[] = [];

  puntajeJugador: number = 0;
  puntajeCrupier: number = 0;
  mostrarPuntajeCrupier: number = 0;
  mostrarPuntajeJugador: string = "0";
  idCarta: string = '';

  manoTerminada: boolean = true;
  volverAJugar: boolean = true;
  volverAJugarMano: boolean = true;

  jugador: Carta[] = [];
  crupier: Carta[] = [];  

  private suscripcion = new Subscription();

  constructor(private cartaService: CartaService) {}

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
          console.log(carta)
          this.cartas = carta;
        },
        error: () => {          
          alert('No se pudo obtener carta');
        },
      })
    );
  }

  obtenerCartaJugador() {
    const random = Math.floor(Math.random() * this.cartas.length);
    this.jugador.push(this.cartas[random]);
    this.puntajeJugador = this.calcularPuntaje(
      this.cartas[random],
      this.puntajeJugador,
      this.jugador
    );
    this.cartas.splice(random, 1);

    if (this.jugador.some((obj: Carta) => {return obj.valor === 11;})) {
      this.mostrarPuntajeJugador = this.puntajeJugador - 10 + '/' + this.puntajeJugador;      
    } else {
      this.mostrarPuntajeJugador = this.puntajeJugador.toString();      
    }   

    if (this.puntajeJugador > 21) {
      this.manoTerminada = true;      
      this.volverAJugar = false;
      this.mostrarCrupier();
      this.mostrarMensaje(2);
    }
  }

  obtenerCartaCrupier() {
    const random = Math.floor(Math.random() * this.cartas.length);
    this.crupier.push(this.cartas[random]);
    this.puntajeCrupier = this.calcularPuntaje(
      this.cartas[random],
      this.puntajeCrupier,
      this.crupier
    );
    this.cartas.splice(random, 1);
  }

  calcularPuntaje(carta: Carta, puntaje: number, listaCartas: Carta[]): number {
    if (carta.valor == 1 && puntaje < 21) {
      listaCartas[listaCartas.findIndex((x) => x.valor == 1)].valor = 11;
    }

    let valor = carta.valor;
    puntaje += valor;

    listaCartas.forEach((element) => {
      if (element.valor == 11 && puntaje > 21) {
        puntaje -= 10;
        listaCartas[listaCartas.findIndex((x) => x.valor == 11)].valor = 1;
      }
    });

    return puntaje;
  }

  mensajeMezclar(){
    Swal.fire({
      title: "Quieres volver a mezclar para seguir jugando?",
      imageUrl: 'https://github.com/Noe1129/Imagenes_blackjack/blob/main/NA.png?raw=true',
      imageHeight: 300,
      showCancelButton: true,
      background: 'black',
      color: 'white',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, mezclar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.obtenerMazo();
      }
    });
  }

  jugarMano() {
    if (this.cartas.length < 20) {
      this.mensajeMezclar();      
    } else {

      this.manoTerminada = false;
      this.volverAJugarMano = false;

      this.obtenerCartaJugador();
      this.obtenerCartaCrupier();
      this.obtenerCartaJugador();
      this.obtenerCartaCrupier();
      this.mostrarCrupier();

      if (this.puntajeJugador == 21) { 
        this.volverAJugar = false;        
        this.manoTerminada = true;
        this.mostrarCrupier();        

        if(this.puntajeCrupier == 21){
          this.mostrarMensaje(0);
          return;
        }  
        
        this.mostrarMensaje(3);
      }      
    }
  }

  terminarJugada() {
    this.manoTerminada = true;
    this.volverAJugar = false;
    this.mostrarCrupier();
    this.mostrarPuntajeJugador = this.puntajeJugador.toString();

    while (this.puntajeCrupier < 21 && this.puntajeCrupier <= 16) {
      this.obtenerCartaCrupier();
      this.mostrarCrupier();
    }

    if (this.puntajeCrupier === this.puntajeJugador){
      this.mostrarMensaje(0);
      return;
    }

    if (this.puntajeCrupier <= 21 && this.puntajeCrupier > this.puntajeJugador){
      this.mostrarMensaje(2);
    } else if (this.puntajeCrupier < this.puntajeJugador || this.puntajeCrupier > 21) {
      this.mostrarMensaje(1);
    }    
  }

  mostrarMensajeGano(mensaje?: string) {
    Swal.fire({
      imageUrl: 'https://github.com/Noe1129/Imagenes_blackjack/blob/main/ganaste.png?raw=true',
      imageHeight: 300,
      text: mensaje,
      background: 'black',
      color: 'white',
      confirmButtonColor: '#ffc107',
    });
  }

  mostrarMensajePerdio() {
    Swal.fire({
      text: 'Perdiste, mejor suerte la próxima',
      imageUrl: 'https://github.com/Noe1129/Imagenes_blackjack/blob/main/perdiste.png?raw=true',
      imageHeight: 300,
      background: 'black',
      color: 'white',
      confirmButtonColor: '#ffc107',
    });
  }

  mostrarMensajeEmpate() {
    Swal.fire({
      imageUrl: 'https://github.com/Noe1129/Imagenes_blackjack/blob/main/empate.png?raw=true',
      imageHeight: 300,
      background: 'black',
      color: 'white',
      confirmButtonColor: '#ffc107',
    });
  }

  mostrarMensaje(puntaje: number){ //0:Empate 1:Gana 2:Pierde 3:Blackjack
    switch(puntaje){
      case 0:
        this.mostrarMensajeEmpate();
        break;
      case 1:
        this.mostrarMensajeGano();
        break;
      case 2:
        this.mostrarMensajePerdio();
        break;
      case 3: 
        this.mostrarMensajeGano("BlackJack!!!");
        break;
    }
  }
  
  limpiarMesa() {
    this.jugador = [];
    this.crupier = [];
    this.puntajeJugador = 0;
    this.mostrarPuntajeJugador = "0";
    this.mostrarPuntajeCrupier = 0;
    this.puntajeCrupier = 0;
    this.volverAJugar = true;
    this.volverAJugarMano = true;
    this.manoTerminada = true;
  }

  mostrarCrupier() {
    if (this.manoTerminada) {
      this.mostrarPuntajeCrupier = this.puntajeCrupier;
      this.crupier[1].id = this.idCarta;
    } else {
      this.mostrarPuntajeCrupier = this.crupier[0].valor;
      this.idCarta = this.crupier[1].id;
      this.crupier[1].id = 'dorso';
    }
  }
}
