import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { ReporteTres } from 'src/app/models/reporte-tres';
import { ReporteService } from 'src/app/services/reporte.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-reporte-tres',
  templateUrl: './reporte-tres.component.html',
  styleUrls: ['./reporte-tres.component.css']
})
export class ReporteTresComponent implements OnInit {

  usuarioID: number;
  private suscripcion = new Subscription();
  private labels: string[] = [
    'Cantidad de Blackjack natural por el Jugador',
    'Cantidad de Blackjack natural por el Croupier',
  ];

  constructor(
    private servicioReporte: ReporteService,
    private usuarioService: UsuarioService
  ) {}
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  datos: ChartData<'pie'>;

  ngOnInit(): void {
    this.cargarUsuarioId();
    this.obtenerJugadasGanadas();
  }
  public cargarUsuarioId() {
    this.suscripcion.add(
      this.usuarioService.obtenerUsuarioID().subscribe({
        next: (id: number) => {
          this.usuarioID = id;
        },
      })
    );
  }

  public obtenerJugadasGanadas() {
    this.suscripcion.add(
      //cambiar parametro this.usuarioID
      this.servicioReporte.obtenerBlackjackNatural(this.usuarioID).subscribe({
        next: (respuesta: ReporteTres) => {
          this.datos = {
            labels: this.labels,
            datasets: [
              {
                data: [respuesta.blackJackJugador, respuesta.blackJackCroupier],
              },
            ],
          };
        },
        error: () => alert('API no responde'),
      })
    );
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
      },
      title: {
        display: true,
        text: 'Cantidad de Blackjack Natural',
      },
    },
  };

}
