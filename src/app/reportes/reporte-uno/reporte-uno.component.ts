import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { Sesion } from 'src/app/models/sesion';
import { ReporteService } from 'src/app/services/reporte.service';


@Component({
  selector: 'app-reporte-uno',
  templateUrl: './reporte-uno.component.html',
  styleUrls: ['./reporte-uno.component.css'],
})
export class ReporteUnoComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  private labels: string[] = ['Cantidad de Sesiones'];

  constructor(private servicioReporte: ReporteService) {}
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  datos: ChartData<'bar'>;

  ngOnInit(): void {
    this.suscripcion.add(
      this.servicioReporte.obtenerSesionesPorUsuario().subscribe({
        next: (respuesta: Sesion[]) => {
          const datosTransformados = respuesta.map((sesion) => {
            return {
              data: [sesion.cantidad],
              label: sesion.nombreUsuario,
            };
          });

          this.datos = {
            labels: this.labels,
            datasets: datosTransformados,
            
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
        text: 'Cantidad de Sesiones por Usuario',
      },
    },
  };
}

