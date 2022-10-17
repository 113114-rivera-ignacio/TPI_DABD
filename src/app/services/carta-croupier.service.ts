import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carta } from '../models/carta';
import { CartasConId } from '../models/cartasConId';


@Injectable({
  providedIn: 'root'
})
export class CartaCroupierService {

  private URLAPI: string = "https://localhost:7274/api/";

  constructor(private http: HttpClient) { }

  obtenerCartaCroupier(idUsuario: number): Observable<Carta[]> {
    return this.http.get<Carta[]>(this.URLAPI + "CartasCroupier/" + idUsuario);
  }

  obtenerCartaCroupierTodas(): Observable<Carta[]> {
    return this.http.get<Carta[]>(this.URLAPI + "CartasCroupier/");
  }

  eliminarCartasCroupier(idUsuario: number): Observable<Carta> {
    return this.http.delete<Carta>(this.URLAPI + "CartasCroupier/" + idUsuario);
  }

  agregarCartaCroupier(cartaCroupier: CartasConId): Observable<CartasConId> {
    return this.http.post<CartasConId>(this.URLAPI + "CartasCroupier/", cartaCroupier);
  }


}