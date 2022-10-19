import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
@Injectable()
export class UniversalAppInterceptor implements HttpInterceptor {

  constructor( private service: UsuarioService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.service.getJWTToken();
   // console.log('token: ',token);
    req = req.clone({
      url:  req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(req);
    
  }
}