import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlackjackCartasComponent } from './blackjack/blackjack-cartas/blackjack-cartas.component';
import { BlackjackJuegoComponent } from './blackjack/blackjack-juego/blackjack-juego.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';

const routes: Routes = [
  {path: 'home/login', component: InicioSesionComponent},
  {path: 'login', component: InicioSesionComponent},
  {path: 'home', component: HomeComponent},
  {path: 'juego', component: BlackjackJuegoComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
