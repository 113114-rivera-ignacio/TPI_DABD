import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartasJugadas } from '../models/cartasJugadas';

@Injectable({
  providedIn: 'root'
})
export class CartasJugadasService {

  private URLAPI: string = "https://localhost:7274/api/";

  constructor(private http: HttpClient) { }

  obtenerCartaCroupier(idUsuario: number): Observable<CartasJugadas[]> {
    return this.http.get<CartasJugadas[]>(this.URLAPI + "CartasJugadas/" + idUsuario);
  }

  eliminarCartasCroupier(idUsuario: number): Observable<CartasJugadas> {
    return this.http.delete<CartasJugadas>(this.URLAPI + "CartasJugadas/" + idUsuario);
  }

  agregarCartaCroupier(cartasJugadas: CartasJugadas): Observable<CartasJugadas> {
    return this.http.post<CartasJugadas>(this.URLAPI + "/CartasJugadas", cartasJugadas);
  }


}