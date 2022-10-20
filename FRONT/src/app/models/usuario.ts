export class Usuario {
  asObservable(): import("rxjs").Subject<Usuario> {
    throw new Error('Method not implemented.');
  }
  idUsuario: number;
  usuario: string;
  pass: string;
  token:string;

  constructor(usuario: string, pass: string) {
    this.usuario = usuario;
    this.pass = pass;
    this.token='';
  }
  
}
