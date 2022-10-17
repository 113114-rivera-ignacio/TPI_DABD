import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private estadoSubject : Subject<number>;  
  private estadoBehaviorSubject : BehaviorSubject<number>;
  

  private isLoggedIn: Subject<boolean>;
  private usuarioLogueado: Subject<Usuario>;
  public loggedIn: boolean;

  private URLAPI: string = 'https://localhost:7274/api/';

  constructor(private http: HttpClient) {
    this.isLoggedIn = new Subject<boolean>();
    this.usuarioLogueado = new Subject<Usuario>();
    this.isLoggedIn.next(false);
    this.loggedIn=false;

    this.estadoSubject = new Subject<number>();        
  }


  cambiarEstado(valor: number){
    this.estadoSubject.next(valor);
  } 

  estadoCambio():Observable<number>{
    return this.estadoSubject.asObservable();
  }

  obtenerUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.URLAPI + 'Usuario/login', usuario);
  }

  loguear(usuario: Usuario) {
    this.usuarioLogueado.next(usuario);
    this.isLoggedIn.next(true);
    this.loggedIn=true;
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

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.URLAPI + 'Usuario', usuario);
  }
}
