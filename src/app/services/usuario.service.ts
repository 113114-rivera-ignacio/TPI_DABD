import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URLAPI: string = "https://localhost:7274/api/";

  constructor(private http: HttpClient) { }

  obtenerUsuario(usuario : Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.URLAPI + "Usuario/login", usuario);
  } 


}
