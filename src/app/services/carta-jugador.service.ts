import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartaJugador } from '../models/cartaJugador';

@Injectable({
  providedIn: 'root'
})
export class CartaJugadorService {

  private URLAPI: string = "https://localhost:7274/api/";

  constructor(private http: HttpClient) { }

  obtenerCartaCroupier(idUsuario: number): Observable<CartaJugador[]> {
    return this.http.get<CartaJugador[]>(this.URLAPI + "CartaJugador/" + idUsuario);
  }

  eliminarCartasCroupier(idUsuario: number): Observable<CartaJugador> {
    return this.http.delete<CartaJugador>(this.URLAPI + "CartaJugador/" + idUsuario);
  }

  agregarCartaCroupier(cartaJugador: CartaJugador): Observable<CartaJugador> {
    return this.http.post<CartaJugador>(this.URLAPI + "/CartaJugador", cartaJugador);
  }


}