import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sesion } from '../models/sesion';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private URLAPI: string = "https://localhost:7274/api/";

  constructor(private http: HttpClient) { }

  obtenerSesionesPorUsuario(): Observable<Sesion[]> {
    return this.http.get<Sesion[]>(this.URLAPI + "Sesiones/CantSesiones");
  } 
}
