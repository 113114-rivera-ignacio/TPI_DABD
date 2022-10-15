import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carta } from '../models/carta';
import { CartaCroupier } from '../models/cartaCroupier';

@Injectable({
  providedIn: 'root'
})
export class CartaCroupierService {

  private URLAPI: string = "https://localhost:7274/api/";

  constructor(private http: HttpClient) { }

  obtenerCartaCroupier(idUsuario: number): Observable<CartaCroupier[]> {
    return this.http.get<CartaCroupier[]>(this.URLAPI + "CartasCroupier/" + idUsuario);
  }

  eliminarCartasCroupier(idUsuario: number): Observable<CartaCroupier> {
    return this.http.delete<CartaCroupier>(this.URLAPI + "CartasCroupier/" + idUsuario);
  }

  agregarCartaCroupier(cartaCroupier: CartaCroupier): Observable<CartaCroupier> {
    return this.http.post<CartaCroupier>(this.URLAPI + "/CartasCroupier", cartaCroupier);
  }


}