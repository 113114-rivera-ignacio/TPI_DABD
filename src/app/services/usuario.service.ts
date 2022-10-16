import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private isLoggedIn: Subject<boolean>;
  private usuarioLogueado: Subject<Usuario>;

  private URLAPI: string = 'https://localhost:7274/api/';

  constructor(private http: HttpClient) {
    this.isLoggedIn = new Subject<boolean>();
    this.usuarioLogueado = new Subject<Usuario>();
  }

  obtenerUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.URLAPI + 'Usuario/login', usuario);
  }

  loguear(usuario: Usuario) {
    this.usuarioLogueado.next(usuario);
    this.isLoggedIn.next(true);
  }

  desloguear() {
    this.isLoggedIn.next(false);
  }

  estadoLogueo(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }
  usuarioLogin(): Observable<Usuario> {
    return this.usuarioLogueado.asObservable();
  }
}
