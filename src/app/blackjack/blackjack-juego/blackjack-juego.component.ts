import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  //cartas: Carta[];

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
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService) { }

  ngOnDestroy(): void {    
    this.suscripcion.unsubscribe();
    this.volverAJugar = true;
    this.volverAJugarMano = true;
    this.manoTerminada = false;
    this.puntajeJugador = 0;
    this.mostrarPuntajeJugador = "0";
    this.mostrarPuntajeCrupier = 0;
    this.puntajeCrupier = 0;
    this.cartasJugador = [];
    this.cartasCrupier = [];
  }

  ngOnInit(): void {    
    this.cargarUsuarioId();
    this.obtenerCartasSinJugar();
    this.obtenerCartasCroupier();
    this.obtenerCartasJugador();
    this.obtenerCartasJugadas();
  }

  public cargarUsuarioId() {    
    this.suscripcion.add(
      this.usuarioService.obtenerUsuarioID().subscribe({
        next: (id: number) =>{
          this.usuarioID = id;
        }
      })
    )
  }

  // -----------------------------------------------------------------
  // Metodos CROUPIER
  private obtenerCartasCroupier() {
    this.suscripcion.add(
      this.cartaCroupierService.obtenerCartaCroupier(this.usuarioID).subscribe({
        next: (respuesta: Carta[]) => {
          if (respuesta.length > 0) {
            this.manoTerminada = false;
            this.volverAJugarMano = false;
            this.cartasCrupier = respuesta;
            this.cartasCrupier.forEach(carta => {
              this.puntajeCrupier = this.calcularPuntaje(
                carta,
                this.puntajeCrupier,
                this.cartasCrupier
              );
            });
            this.mostrarCrupier();
          }

          console.log(respuesta);
        },
        error: () => {
          alert('Sin cartas Croupier');
        },
      }));
  }

  public eliminarCartasCroupier() {
    this.suscripcion.add(
      this.cartaCroupierService.eliminarCartaCroupier(this.usuarioID).subscribe({
        next: () => {
          console.log("Cartas del croupier eliminadas");
        },
        error: () => {
          alert("Error al eliminar cartas del croupier");
        },
      }));
  }

  // Metodos JUGADOR
  private obtenerCartasJugador() {
    this.suscripcion.add(
      this.cartaJugadorService.obtenerCartaJugador(this.usuarioID).subscribe({
        next: (respuesta: Carta[]) => {
          this.cartasJugador = respuesta;
          this.cartasJugador.forEach(carta => {
            this.puntajeJugador = this.calcularPuntaje(
              carta,
              this.puntajeJugador,
              this.cartasJugador
            );
          });
          if (this.cartasJugador.some((obj: Carta) => { return obj.valor === 11; })) {
            this.mostrarPuntajeJugador = this.puntajeJugador - 10 + '/' + this.puntajeJugador;
          } else {
            this.mostrarPuntajeJugador = this.puntajeJugador.toString();
          }
          console.log(respuesta)
        },
        error: () => {
          alert('Sin cartas Jugador');
        },
      }));
  }

  public eliminarCartasJugador() {
    this.suscripcion.add(
      this.cartaJugadorService.eliminarCartasJugador(this.usuarioID).subscribe({
        next: () => {
          console.log('Cartas del jugador eliminadas');
        },
        error: () => {
          alert("Error al eliminar cartas del jugador");
        },
      }));
  }

  // Metodos SIN JUGAR
  obtenerCartasSinJugar() {
    this.suscripcion.add(
      this.cartasSinJugarService.obtenerCartaSinJugar(this.usuarioID).subscribe({
        next: (respuesta: Carta[]) => {
          if (respuesta.length > 0) {
            this.cartasSinJugar = respuesta;
            console.log(respuesta);
          }
          else {
            this.suscripcion.add(
              this.cartaService.obtenerCarta().subscribe({
                next: (respuesta: Carta[]) => {
                  this.cartasSinJugar = respuesta;
                  this.InsertarCartasSinJugar();
                },
                error: () => {
                  alert('No se pudo cargar mazo.');
                }
              })
            );
          }
        },
        error: () => {
        }
      })
    );
  }

  public eliminarCartaSinJugar(idUsuario: number, carta: Carta) {
    this.suscripcion.add(
      this.cartasSinJugarService.eliminarCartaSinJugar(idUsuario, carta.id).subscribe({
        next: () => {
          console.log('cartas sin jugar eliminadas');
        },
        error: () => {
          alert("Error al eliminar carta");
        },
      }));
  }

  public eliminarTodasCartasSinJugar() {
    this.cartasSinJugar = [];
    this.suscripcion.add(
      this.cartasSinJugarService.eliminarTodasCartasSinJugar(this.usuarioID).subscribe({
        next: () => {
          console.log('cartas sin jugar eliminadas');
        },
        error: () => {
          alert("Error al eliminar cartas sin jugar");
        },
      }));
  }

  public InsertarCartasSinJugar() {
    this.cartasSinJugar.forEach(element => {
      this.cartasSinJugarService.agregarCartaSinJugar(new CartasConId(element.id, this.usuarioID))
        .subscribe({
          next: () => {
          }
        });
    });
  }

  //Metodos Jugadas
  private obtenerCartasJugadas() {
    this.suscripcion.add(
      this.cartasJugadasService.obtenerCartasJugadas(this.usuarioID).subscribe({
        next: (respuesta: Carta[]) => {
          this.cartasJugadas = respuesta;
          console.log(respuesta)
        },
        error: () => {
          alert('error al obtener las cartas jugadas');
        },
      }));
  }

  public eliminarCartasJugadas() {
    this.suscripcion.add(
      this.cartasJugadasService.eliminarCartasJugadas(this.usuarioID).subscribe({
        next: () => {
          console.log('cartas jugadas eliminadas');
        },
        error: () => {
          alert('error al obtener las cartas jugadas');
        },
      }));
  }
  // -----------------------------------------------------------------

  obtenerCartaJugador() {
    const random = Math.floor(Math.random() * this.cartasSinJugar.length);
    this.cartasJugador.push(this.cartasSinJugar[random]);
    this.cartaJugadorService.agregarCartaJugador(new CartasConId(this.cartasSinJugar[random].id, this.usuarioID)).subscribe({});

    this.puntajeJugador = this.calcularPuntaje(
      this.cartasSinJugar[random],
      this.puntajeJugador,
      this.cartasJugador
    );

    this.cartasJugadasService.agregarCartasJugadas(new CartasConId(this.cartasSinJugar[random].id, this.usuarioID)).subscribe({});
    this.eliminarCartaSinJugar(this.usuarioID, this.cartasSinJugar[random]);
    this.cartasSinJugar.splice(random, 1);

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
    const random = Math.floor(Math.random() * this.cartasSinJugar.length);
    this.cartasCrupier.push(this.cartasSinJugar[random]);
    this.cartaCroupierService.agregarCartaCroupier(new CartasConId(this.cartasSinJugar[random].id, this.usuarioID)).subscribe({});
    this.puntajeCrupier = this.calcularPuntaje(
      this.cartasSinJugar[random],
      this.puntajeCrupier,
      this.cartasCrupier
    );
    this.cartasJugadasService.agregarCartasJugadas(new CartasConId(this.cartasSinJugar[random].id, this.usuarioID)).subscribe({});
    this.eliminarCartaSinJugar(this.usuarioID, this.cartasSinJugar[random]);
    this.cartasSinJugar.splice(random, 1);
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
        this.eliminarTodasCartasSinJugar();
        this.obtenerCartasSinJugar();
      }
    });
  }

  jugarMano() {
    if (this.cartasSinJugar.length < 20) {
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
    this.cartaJugadorService.eliminarCartasJugador(this.usuarioID).subscribe({});
    this.cartaCroupierService.eliminarCartaCroupier(this.usuarioID).subscribe({});
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
