import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlackjackJuegoComponent } from './blackjack/blackjack-juego/blackjack-juego.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { BlackjackCartasComponent } from './blackjack/blackjack-cartas/blackjack-cartas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { CartaCroupierService } from './services/carta-croupier.service';
import { CartaJugadorService } from './services/carta-jugador.service';
import { CartasJugadasService } from './services/cartas-jugadas.service';
import { CartasSinJugarService } from './services/cartas-sin-jugar.service';
import { CartaService } from './services/cartas.service';
import { UsuarioService } from './services/usuario.service';
import { RegistrarComponent } from './registrar/registrar.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    InicioSesionComponent,
    BlackjackJuegoComponent,
    BlackjackCartasComponent,
    RegistrarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    CartaCroupierService,
    CartaJugadorService,
    CartasJugadasService,
    CartasSinJugarService,
    CartaService,
    UsuarioService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
