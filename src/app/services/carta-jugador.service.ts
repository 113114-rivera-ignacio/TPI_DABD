import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carta } from '../models/carta';
import { CartasConId } from '../models/cartasConId';

@Injectable({
  providedIn: 'root'
})
export class CartaJugadorService {

  private URLAPI: string = "https://localhost:7274/api/";

  constructor(private http: HttpClient) { }

  obtenerCartaJugador(idUsuario: number): Observable<Carta[]> {
    return this.http.get<Carta[]>(this.URLAPI + "CartaJugador/" + idUsuario);
  }

  eliminarCartasJugador(idUsuario: number): Observable<Carta> {
    return this.http.delete<Carta>(this.URLAPI + "CartaJugador/" + idUsuario);
  }

  agregarCartaJugador(cartaJugador: CartasConId): Observable<CartasConId> {
    return this.http.post<CartasConId>(this.URLAPI + "CartaJugador/", cartaJugador);
  }


}