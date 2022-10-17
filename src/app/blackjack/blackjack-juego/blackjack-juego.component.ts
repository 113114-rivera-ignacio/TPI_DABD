import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Carta } from 'src/app/models/carta';

import { CartasConId } from 'src/app/models/cartasConId';

import { Usuario } from 'src/app/models/usuario';
import { CartaCroupierService } from 'src/app/services/carta-croupier.service';
import { CartaJugadorService } from 'src/app/services/carta-jugador.service';
import { CartasJugadasService } from 'src/app/services/cartas-jugadas.service';
import { CartasSinJugarService } from 'src/app/services/cartas-sin-jugar.service';
import { CartaService } from 'src/app/services/cartas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blackjack-juego',
  templateUrl: './blackjack-juego.component.html',
  styleUrls: ['./blackjack-juego.component.css'],
})

export class BlackjackJuegoComponent implements OnInit, OnDestroy {
  //$valorObservable : Observable<number>


  cartas: Carta[];

  cartasJugadas: Carta[] = [];
  cartasSinJugar: Carta[] = [];
  cartasJugador: Carta[] = [];
  cartasCrupier: Carta[] = [];

  puntajeJugador: number = 0;
  puntajeCrupier: number = 0;
  mostrarPuntajeCrupier: number = 0;
  mostrarPuntajeJugador: string = "0";
  idCarta: string = '';

  manoTerminada: boolean = true;
  volverAJugar: boolean = true;
  volverAJugarMano: boolean = true;

  usuarioID: number;

  private suscripcion = new Subscription();


  constructor(private cartaService: CartaService,
    private cartaCroupierService: CartaCroupierService,
    private cartaJugadorService: CartaJugadorService,
    private cartasJugadasService: CartasJugadasService,
    private cartasSinJugarService: CartasSinJugarService,
    private usuarioService: UsuarioService,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit(): void {
    this.obtenerCartasCroupier();
    this.obtenerMazo();
    this.obtenerCartasJugador();
    this.obtenerCartasSinJugar();
    this.obtenerCartasJugadas();
  }
  // -----------------------------------------------------------------
  //METODOS CROUPIER
  private obtenerCartasCroupier() {
    this.suscripcion.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          const id = params['id'];
          this.cartaCroupierService.obtenerCartaCroupier(id).subscribe({
            next: (respuesta: Carta[]) => {
              this.cartasCrupier = respuesta;
              this.usuarioID = id;
              console.log(respuesta)
            },
            error: () => {
              alert('error al obtener las cartas del croupier');
            },
          });
        },
      })
    );
  }
  public eliminarCartasCroupier() {
    this.suscripcion.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          const id = params['id'];
          this.cartaCroupierService.eliminarCartasCroupier(id).subscribe({
            next: () => {
              console.log('cartas croupier eliminadas');
            },
            error: () => {
              alert('error al obtener la carta');
            },
          });
        },
      })
    );
  }

  //Metodos JUGADOR
  private obtenerCartasJugador() {
    this.suscripcion.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          const id = params['id'];
          this.cartaJugadorService.obtenerCartaJugador(id).subscribe({
            next: (respuesta: Carta[]) => {
              this.cartasJugador = respuesta;
              console.log(respuesta)
            },
            error: () => {
              alert('error al obtener las cartas del jugador');
            },
          });
        },
      })
    );
  }
  public eliminarCartasJugador() {
    this.suscripcion.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          const id = params['id'];
          this.cartaJugadorService.eliminarCartasJugador(id).subscribe({
            next: () => {
              console.log('cartas jugador eliminadas');
            },
            error: () => {
              alert('error al obtener la carta del jugador');
            },
          });
        },
      })
    );
  }

  //Metodos Cartas sin jugar
  private obtenerCartasSinJugar() {
    this.suscripcion.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          const id = params['id'];
          this.cartasSinJugarService.obtenerCartaSinJugar(id).subscribe({
            next: (respuesta: Carta[]) => {
              this.cartasSinJugar = respuesta;
              console.log(respuesta)
            },
            error: () => {
              alert('error al obtener las cartas sin jugar');
            },
          });
        },
      })
    );
  }
  public eliminarCartasSinJugar() {
    this.suscripcion.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          const id = params['id'];
          this.cartasSinJugarService.eliminarCartasSinJugar(id).subscribe({
            next: () => {
              console.log('cartas sin jugar eliminadas');
            },
            error: () => {
              alert('error al obtener las cartas sin jugar');
            },
          });
        },
      })
    );
  }

  public InsertarCartasSinJugar() {
    this.cartas.forEach(element => {
      this.cartasSinJugarService.agregarCartaSinJugar(new CartasConId(element.id, this.usuarioID))
        .subscribe({
          next: () => {
            //console.log(this.obtenerCartasSinJugar());
          }
        });
    });
  }

  //Metodos Cartas Jugadas
  private obtenerCartasJugadas() {
    this.suscripcion.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          const id = params['id'];
          this.cartasJugadasService.obtenerCartasJugadas(id).subscribe({
            next: (respuesta: Carta[]) => {
              this.cartasJugadas = respuesta;
              console.log(respuesta)
            },
            error: () => {
              alert('error al obtener las cartas jugadas');
            },
          });
        },
      })
    );
  }
  public eliminarCartasJugadas() {
    this.suscripcion.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          const id = params['id'];
          this.cartasJugadasService.eliminarCartasJugadas(id).subscribe({
            next: () => {
              console.log('cartas jugadas eliminadas');
            },
            error: () => {
              alert('error al obtener las cartas jugadas');
            },
          });
        },
      })
    );
  }


  prueba() {
    this.eliminarCartasCroupier();
    this.eliminarCartasJugador();
    this.eliminarCartasSinJugar();
    this.eliminarCartasJugadas();
  }
  // ---------------------------------------------------------------
  obtenerMazo() {
    this.suscripcion.add(
      this.cartaService.obtenerCarta().subscribe({
        next: (carta: Carta[]) => {
          console.log(carta)
          this.cartas = carta;
          this.InsertarCartasSinJugar();
        },
        error: () => {
          alert('No se pudo obtener carta');
        },
      })
    );
  }

  obtenerCartaJugador() {
    const random = Math.floor(Math.random() * this.cartas.length);
    this.cartasJugador.push(this.cartas[random]);
    this.puntajeJugador = this.calcularPuntaje(
      this.cartas[random],
      this.puntajeJugador,
      this.cartasJugador
    );
    this.cartas.splice(random, 1);

    if (this.cartasJugador.some((obj: Carta) => { return obj.valor === 11; })) {
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
    this.cartasCrupier.push(this.cartas[random]);
    this.puntajeCrupier = this.calcularPuntaje(
      this.cartas[random],
      this.puntajeCrupier,
      this.cartasCrupier
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

  mensajeMezclar() {
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

        if (this.puntajeCrupier == 21) {
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

    if (this.puntajeCrupier === this.puntajeJugador) {
      this.mostrarMensaje(0);
      return;
    }

    if (this.puntajeCrupier <= 21 && this.puntajeCrupier > this.puntajeJugador) {
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

  mostrarMensaje(puntaje: number) { //0:Empate 1:Gana 2:Pierde 3:Blackjack
    switch (puntaje) {
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
    this.cartasJugador = [];
    this.cartasCrupier = [];
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
      this.cartasCrupier[1].id = this.idCarta;
    } else {
      this.mostrarPuntajeCrupier = this.cartasCrupier[0].valor;
      this.idCarta = this.cartasCrupier[1].id;
      this.cartasCrupier[1].id = 'dorso';
    }
  }
}
