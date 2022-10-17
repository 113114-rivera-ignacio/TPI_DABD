import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carta } from '../models/carta';

@Injectable({
  providedIn: 'root'
})
export class CartaService {

  private URLAPI: string = "https://localhost:7274/api/";

  constructor(private http: HttpClient) { }

  obtenerCarta(): Observable<Carta[]> {
    return this.http.get<Carta[]>(this.URLAPI + "Carta");
  } 


}