import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carta } from '../models/carta';
import { CartasConId } from '../models/cartasConId';


@Injectable({
  providedIn: 'root'
})
export class CartasJugadasService {

  private URLAPI: string = "https://localhost:7274/api/";

  constructor(private http: HttpClient) { }

  obtenerCartasJugadas(idUsuario: number): Observable<Carta[]> {
    return this.http.get<Carta[]>(this.URLAPI + "CartasJugadas/" + idUsuario);
  }

  eliminarCartasJugadas(idUsuario: number): Observable<Carta> {
    return this.http.delete<Carta>(this.URLAPI + "CartasJugadas/" + idUsuario);
  }

  agregarCartasJugadas(cartasJugadas: CartasConId): Observable<CartasConId> {
    return this.http.post<CartasConId>(this.URLAPI + "CartasJugadas/", cartasJugadas);
  }


}