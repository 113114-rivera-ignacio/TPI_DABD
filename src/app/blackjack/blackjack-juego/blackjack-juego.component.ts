import { outputAst, ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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
      this.mostrarMensajePerdio()
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
      this.mostrarMensajeGano("BlackJack!!!")
      console.log("BLACKJACK");
      console.log("Jugador: " + this.puntajeJugador);
      console.log(this.jugador);
      console.log("Crupier: " + this.puntajeCrupier);      
      console.log(this.crupier);
    }
    if(this.blackJack && this.puntajeCrupier == 21){
      this.resultado = 0;
      this.mostrarMensajeEmpate();
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
      this.mostrarMensajePerdio()
      console.log("PERDISTE");
      console.log("Jugador: " + this.puntajeJugador);
      console.log(this.jugador);
      console.log("Crupier: " + this.puntajeCrupier);      
      console.log(this.crupier); 
    }
    else{
      this.resultado = 1;
      this.mostrarMensajeGano()
      console.log("GANASTE");
      console.log("Jugador: " + this.puntajeJugador);
      console.log(this.jugador);
      console.log("Crupier: " + this.puntajeCrupier);      
      console.log(this.crupier); 
    }
    
  }


  mostrarMensajeGano(mensaje?:string){
    Swal.fire({
      imageUrl: 'https://img.freepik.com/vector-premium/ganaste-ilustracion_183875-223.jpg?w=2000',
      imageHeight: 200,
      text:mensaje
    })
  }

  mostrarMensajePerdio(){
    Swal.fire({
      text:'Te pasaste de 21, perdiste',
      imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANkAAADoCAMAAABVRrFMAAAAflBMVEX///8BAQEAAAD09PTv7+/8/PyOjo5RUVGwsLD5+flFRUXf399ZWVnIyMjn5+fz8/PZ2dlhYWGjo6MVFRW6urqDg4MbGxtubm42NjbT09NNTU2UlJR5eXmoqKjNzc21tbU+Pj4uLi4iIiIPDw98fHwmJiZeXl5xcXGcnJyGhoZCkldBAAAIE0lEQVR4nO2c63arrBpGFaEJbRJzNIfm0Bzart7/DW5AUDBoNB9pusd45o+uFlGZIvAKuqIIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHthTz86TGnhdDt8GXkgwO3tKm0lTXi1PIBhPRaG8l5Yn+VkTahU734cmeoNJZ+I4qfqDibKyIpHfrDRxlsdULKMNx1UbmefMagOv7Jqk8meadC0B77pHO5pvBmlAvVtoxEbVzOIS3FXMpot7P/5yWydlvhwsShlLq4k8va+UPHhTE6XOq+zQ9yGVRBuXOejO3iALz1O1YaSTdmN5nISm6jrMrUOsN4MGeoeHmBUN5ZP4eJNZmOq4x3Z6xvR1ET+GJrGfp+XdfM+kjq0cfv7JvYI3tOLOWZH4itxMM7YykKN1ww31BnKwDzwgJD/EuMzhh0wfYVYeUJr568w2U4nSzDpGnVl8beavs/BmjCWqoYjhLGHCjJBT5nJ+0/6CtTTKTtlpJnJ+rgW0YtbnYnyWvYgcHH1m5DjoXbM5hDYTYvkwpVtQTE4izcE060leVTEZiTJPTe3OXTOVeBYJo+PxuJr5zN5rCxN0QGNUF3ysbrBYmtWwNUWT49cuzx2TYdVM36YjfaWuzV5qCxM0wJJDj+rdxnl91JjJav2umsU+s7g0szqhVmbeEfNuioDvjZj7q0ZM1ZnKMBJ/Ts2tOcy3D22PlUiiXc1EEOoPW+9ExQ/D3uBrI4u6WO/3e1+278Hg61NU6Gy+3w/VyDzc7+dS9VUMsy+VOjt/iaG3tZl6IhDxcOCAWJn1Te8xrcv2oTv6zL5hUjMELCujldXE2phRLgkdM6re6GBOWmv2qruCzI5+qdmtalal3kzdf8lDnsyeYHbV64cPqiQ1ZuO1BQ9rdrajgKU8UPVh4YFmfFWJrgKaudHV5LfNPh5o5mx5kpkuViezYse6GMSts8EvmyWrfBTobkaMkN3zu+1sMP1Xcvhls0iM2OuJp87ilY2pEttsst6vd/KRoS9+2baKG3+1b5Rsr82qz1aeOruIPfckl4neW5mFnyS4wywP8ItfPXW27Wzmm+0LgBVdiZPubpndrjNppqY8WptRWplbDmi2viwWl5kozcdk8rVoMCPn7c+i4OJrZ9KMjgW8rZl+vk1o2JuyuBOSo+7QNk1mTkSc1NVZQbt2VpQlqFrxgE4/dSl6jWY3e/3/YBb2ybOYkaOfuq09yUxG/WGDfjMRkn7MstNZtrXhPGfwILPJ3MNBdjihBzbddOVF+ybxdc8X2KxmvvEhc8TlkoOZxLEJbublMXPE5ez3t/dyKrOcmWumWVqz9hUzze15/ceYFauCN82y/zOziFO18lobBZR9ljVxxrjv11puhRis3WG6ISIASiOn2PZGu1i2GWPeX33HqNvgniUJX2f0QYvfHQk7UkseMy3WFRb+vYnAUc19JCkNPpnaeHsz66d/m2bUCL3VgTCq14sDIvpF+c/bq2+9bqIzLTd5wsTuB+iHziV6ek5mDcTiONON5wRqdzW1Kp5iwooxs1Aw9o4yZsHWzNLZS9PleCaCaNY8Wn1F0UvtxosuSli14nBj4ousVjqbia5WrpnONZBmZhdv7KTM6gIrbRbxoD100S2W62cF95l5GVhmVycpnuLDrgwqq12/rwKhnjUX8CPnHDORcKEdzMjK+7bMsDQjE+ski5N4uljKVQQW2kzdAMX6mTPDMzGV+NbFrBfV8GLifmfpcWNOEgU3kz/8s3K+mdTbZpuohsJsaCWy14eZNcw3/pqZSoUZzGBWmNkZWphZF+Kvm8nw1gzuic/sdWxzy0z1+n/CjGRZpoq26w0GAzOvXx+DWE9cV2aJPET2R8zycg8jHd/GHjNnGWrWVGdcR1d/w0wlyKK92wmOmcVNs7is6eeZFZe3YqbCzdq70WdmoivmxODPMuvNslPRJF4Oh/my6AsXl8u73YM4z9LXZiI41a/R7KWQeeXl9Cwzyc6tFneX1r2+s3BAyNrO+XQzlRq3MrO4fj6LbbNIv0X6HDNSee6WCXeamV9ts7CTnh3MpsRVy99J7Wzm3Mtkz7h+rGeB16k7mI32+/XcNovXKTXfZ3WIG6fr/fq9eG9J8K3Nws5ddTCTUKfOrA0dzGSv71whM8MTVu2WGQlvJodDr9nVR1H/CWXWN31wZR5Er+2qJWRjphuJmSCJ9DZmyn17HiQ3sxqbmruSU7Th32rfL7fbpfwe5GNiId/1Pg8F0l5/2phuF4sXueF1rzcwrlp+UWfZxMPXT8VsuCnfDidHmUVdt+Bm6hfzposzFXg2+SjnxXl7JM7fS1T7cfXZY+v5xtxM1hDX70GWMzxB78b8TRd5Jxw9MS2JzTeoVH33mP+xsc1SljhmXqw5YjciLtusunwhzYq+lmbei83KXMWSzSspm1Oizbi/rpw607hPMQZ1lUKayfssL+L7iw/VO+g3RszK6D+RrnvRhGpj9uPd3SC6prnO8WN6VO7sok4Q1oyl6lLVjCUqUE3ytSXG1debZc5UjdP3Liyyq7+Cr1DeiETtkjvrvmZDywLZJt43GR6w9tr8UbcdzzkhkP7GnXVf5uYj3y6PWC5vWPtm7lqv9WpseT1ot7cdWJJG6dWiNOv80Xy7c1Ga+v4vhpRWry6TOUVeZwPXb8zWkpbHl1G09BD/pE6GP/GCAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAv8L/ADsbhiMByxGTAAAAAElFTkSuQmCC',
      imageHeight: 200
    })
  }
  mostrarMensajeEmpate(){
  Swal.fire({
    text:'EMPATE',
    icon: 'info',
    imageHeight: 200
  })
}

}
