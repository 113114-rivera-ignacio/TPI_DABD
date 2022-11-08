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

  private suscripcion = new Subscription();
  private labels: string[] = [
    'Probabilidad del Jugador',
    'Probabilidad del Croupier',
  ];

  constructor(
    private servicioReporte: ReporteService,
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
        next: (respuesta: ReporteCuatro[]) => {
          this.datos = {
            labels: this.labels,
            datasets: [
              {
                data: [respuesta[0].totalGanadas, respuesta[0].totalPerdidas],
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
