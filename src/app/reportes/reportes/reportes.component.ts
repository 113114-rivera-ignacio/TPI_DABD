import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  opcion:number;

  constructor(private router:Router) { }

  ngOnInit(): void {

  }




  option:number;


  mostrarReporte1(){
   this.option = 0;
 }

 mostrarReporte2(){
  this.option =1;
}
mostrarReporte3(){
  this.option =2;
}


  

}
