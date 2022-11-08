import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { ReporteCinco } from 'src/app/models/reporte-cinco';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-reporte-cinco',
  templateUrl: './reporte-cinco.component.html',
  styleUrls: ['./reporte-cinco.component.css']
})
export class ReporteCincoComponent implements OnInit, OnDestroy {

  private suscripcion = new Subscription();
  private labels: string[] = ['Cantidad de Ganadas'];

  constructor(private servicioReporte: ReporteService) { }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  datos: ChartData<'bar'>;

  ngOnInit(): void {
    this.suscripcion.add(
      this.servicioReporte.obtenerRankingGanadas().subscribe({
        next: (respuesta: ReporteCinco[]) => {
          var ordenada: ReporteCinco[] = respuesta.sort((n1, n2) =>{
            if(n1.ganadas>n2.ganadas){
              return -1;
            }
            if(n1.ganadas<n2.ganadas){
              return 1;
            }
            return 0;
          });
          const datosTransformados = ordenada.map((ranking) => {
            return {
              data: [ranking.ganadas],
              label: ranking.usuario,
              barThickness: 45, 
              borderRadius: 4,
              maxBarThickness:40
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
        labels:{          
          font:{
            family: 'sans-serif',
            size: 14          
          },          
        }                                        
      },
      title: {
        display: false,
      }, 
      datalabels:{
        color: 'white',
      },
                 
    },        
  scales:{      
    x: {                         
      grid: {         
        color : 'white',  
        drawBorder: false              
      },
      ticks: {color: 'white'},
      offset: true            
    },
    y: {                   
      grid: {
        color : 'white',
        drawBorder: false                                 
      },      
      ticks: {color: 'white'},            
    },
  }, 
  color: 'white', 
  
  };

}
