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
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    InicioSesionComponent,
    BlackjackJuegoComponent,
    BlackjackCartasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
