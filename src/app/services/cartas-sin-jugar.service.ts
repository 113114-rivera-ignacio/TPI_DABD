import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carta } from '../models/carta';

import { CartasConId } from '../models/cartasConId';


@Injectable({
  providedIn: 'root'
})
export class CartasSinJugarService {

  private URLAPI: string = "https://localhost:7274/api/";

  constructor(private http: HttpClient) { }

  obtenerCartaSinJugar(idUsuario: number): Observable<Carta[]> {
    return this.http.get<Carta[]>(this.URLAPI + "CartasSinJugar/" + idUsuario);
  }

  eliminarCartasSinJugar(idUsuario: number): Observable<Carta> {
    return this.http.delete<Carta>(this.URLAPI + "CartasSinJugar/" + idUsuario);
  }

  agregarCartaSinJugar(cartasSinJugar: CartasConId): Observable<CartasConId> {
    return this.http.post<CartasConId>(this.URLAPI + "CartasSinJugar/", cartasSinJugar);
  }


}