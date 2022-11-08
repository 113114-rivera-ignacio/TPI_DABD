import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { ReporteDos } from 'src/app/models/reporte-dos';
import { ReporteService } from 'src/app/services/reporte.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-reporte-dos',
  templateUrl: './reporte-dos.component.html',
  styleUrls: ['./reporte-dos.component.css'],
})
export class ReporteDosComponent implements OnInit {
  usuarioID: number;
  sinDatos: boolean = false;
  private suscripcion = new Subscription();

  private labels: string[] = [
    'Partidas ganadas por el Jugador',
    'Partidas ganadas por el Croupier',
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
      this.servicioReporte.obtenerJugadasGanadas(this.usuarioID).subscribe({
        next: (respuesta: ReporteDos) => {
          if(respuesta.ganadasJugador == 0 && respuesta.ganadasCroupier == 0){
            this.sinDatos = true;
          };
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
        labels:{
          font:{
            family: 'sans-serif',
            size: 14           
          }
        } 
      },
      title: {
        display: false,        
      },
      datalabels:{
        color: 'white',
        formatter: function(value, context) {
          var data = context.dataset.data,              
              total = 0;              
          data.forEach((x) => {
            if(x!=null){
              total += x as number;
            }
          });    
          return Math.round((value*100)/total) + '%';
        },       
      }                               
    },
    color: 'white',        
  };
}
