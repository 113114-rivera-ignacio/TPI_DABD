import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { PasswordValidator } from '../validators/password.validator';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent implements OnInit {
  formulario: FormGroup;

  private suscripcion = new Subscription();

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      usuario: ['', Validators.required],
      passwords: this.formBuilder.group(
        {
          password: ['', [Validators.required]],
          confirmPassword: ['', [Validators.required]],
        },
        { validator: PasswordValidator }
      ),
    });
  }

  enviar() {
    if (this.formulario.valid) {      
      this.suscripcion.add(
        this.usuarioService.crearUsuario(new Usuario(this.formulario.value.usuario, this.formulario.value.passwords.password))
        .subscribe({
          next: (usuario: Usuario) =>{
            this.usuarioService.loguear(usuario);
            this.usuarioService.setJWTToken(usuario.token);
            this.usuarioService.darUsuarioID(usuario.idUsuario); 
            this.usuarioService.cambiarEstado(2);
            this.router.navigate(['/juego']);
          },
          error:()=>{            
            this.formulario.setErrors({'invalid':true});            
          }
        })
      )
    } else {
      console.log('formulario invalido')
    }
  }
}
