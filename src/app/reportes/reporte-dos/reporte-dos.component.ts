import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { ReporteDos } from 'src/app/models/reporte-dos';
import { ReporteService } from 'src/app/services/reporte.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-reporte-dos',
  templateUrl: './reporte-dos.component.html',
  styleUrls: ['./reporte-dos.component.css'],
})
export class ReporteDosComponent implements OnInit {
  usuarioID: number;
  private suscripcion = new Subscription();
  private labels: string[] = [
    'Cantidad de partidas ganadas por Jugador',
    'Cantidad de partidas ganadas por el Croupier',
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
      this.servicioReporte.obtenerJugadasGanadas(this.usuarioID).subscribe({
        next: (respuesta: ReporteDos) => {
          this.datos = {
            labels: this.labels,
            datasets: [
              {
                data: [respuesta.ganadasJugador, respuesta.ganadasCroupier],
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
        text: 'Cantidad de Partidas Ganadas',
      },
    },
  };
}
