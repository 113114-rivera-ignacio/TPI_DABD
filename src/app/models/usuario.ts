export class Usuario {
  idUsuario: number;
  usuario: string;
  pass: string;

  constructor(usuario: string, pass: string) {
    this.usuario = usuario;
    this.pass = pass;
  }
}
