import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartaJugador } from '../models/cartaJugador';
import { CartasSinJugar } from '../models/cartasSinJugar';

@Injectable({
  providedIn: 'root'
})
export class CartasSinJugarService {

  private URLAPI: string = "https://localhost:7274/api/";

  constructor(private http: HttpClient) { }

  obtenerCartaCroupier(idUsuario: number): Observable<CartasSinJugar[]> {
    return this.http.get<CartasSinJugar[]>(this.URLAPI + "CartasSinJugar/" + idUsuario);
  }

  eliminarCartasCroupier(idUsuario: number): Observable<CartasSinJugar> {
    return this.http.delete<CartasSinJugar>(this.URLAPI + "CartasSinJugar/" + idUsuario);
  }

  agregarCartaCroupier(cartasSinJugar: CartasSinJugar): Observable<CartasSinJugar> {
    return this.http.post<CartasSinJugar>(this.URLAPI + "/CartasSinJugar", cartasSinJugar);
  }


}