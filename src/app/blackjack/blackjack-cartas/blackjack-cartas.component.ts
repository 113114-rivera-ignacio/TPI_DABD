import { Component, EventEmitter,Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Carta } from 'src/app/models/carta';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-blackjack-cartas',
  templateUrl: './blackjack-cartas.component.html',
  styleUrls: ['./blackjack-cartas.component.css']
})
export class BlackjackCartasComponent implements OnInit {

  @Input() carta : Carta;
  @Input() tipo:string;


  private suscripcion = new Subscription();

  constructor() { }

  ngOnInit(): void {

  }

  


}
