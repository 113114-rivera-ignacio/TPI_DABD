import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { ReporteCuatro } from 'src/app/models/reporte-cuatro';
import { ReporteService } from 'src/app/services/reporte.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-reporte-cuatro',
  templateUrl: './reporte-cuatro.component.html',
  styleUrls: ['./reporte-cuatro.component.css']
})
export class ReporteCuatroComponent implements OnInit {

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
    this.obtenerJugadasGanadas();
  }

  public obtenerJugadasGanadas() {
    this.suscripcion.add(      
      this.servicioReporte.obtenerTotalGanadasPerdidas().subscribe({
        next: (respuesta: ReporteCuatro) => {
          this.datos = {
            labels: this.labels,
            datasets: [
              {
                data: [respuesta.totalGanadas, respuesta.totalPerdidas],
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
