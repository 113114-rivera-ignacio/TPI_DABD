import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carta } from '../models/carta';

@Injectable({
  providedIn: 'root'
})
export class CartaService {

  private URL: string ="https://632b55121090510116d6fac2.mockapi.io/cartas/";

  constructor(private http: HttpClient) { }

  obtenerCarta(): Observable <Carta[]> {
    return this.http.get<Carta[]>(this.URL);
    }
}
