import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlackjackJuegoComponent } from './blackjack/blackjack-juego/blackjack-juego.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistrarComponent } from './registrar/registrar.component';

const routes: Routes = [
  {path: 'home/login', component: InicioSesionComponent},
  {path: 'login', component: InicioSesionComponent},
  {path: 'home', component: HomeComponent},
  {path: 'juego/:id', component: BlackjackJuegoComponent, canActivate:[AuthGuard]},  
  {path: 'signup', component: RegistrarComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
