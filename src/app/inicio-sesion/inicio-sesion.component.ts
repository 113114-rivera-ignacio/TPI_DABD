import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  @Output() usuarioLogeado = new EventEmitter<Usuario>();
  usuario : Usuario;
  private suscripcion = new Subscription();

  constructor(private usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.usuario.usuario= 'noe';
    this.usuario.pass = '123';
    this.logear(this.usuario);
  }

  logear(usuario : Usuario){
    this.suscripcion.add(
      this.usuarioService.obtenerUsuario(usuario).subscribe({
        next: (usuario1: Usuario) =>{
          console.log(usuario1);
          this.usuarioLogeado.emit(usuario1);
          
        },
        error:()=>{
          alert('No se encontro');
        }
      })
    )
  }



}
