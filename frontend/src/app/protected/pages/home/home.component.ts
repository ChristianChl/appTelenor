import { Component, OnInit } from '@angular/core';
import {ChartOptions,ChartType,ChartDataSets} from 'chart.js';
import {Color,MultiDataSet, Label} from 'ng2-charts';
import { DetallVentaService } from '../../services/detall-venta.service';
import { IngresoService } from '../../services/ingreso.service';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ventas:any = [];
  ingreso:any = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  /*
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80], label: 'Ventas' },
    { data: [28, 48, 40], label: 'Series B' }
  ];*/

  public barChartData: ChartDataSets[] = [];

  //Datos para la grafica d dona
  public doughnutChartLabels: Label[] = ['Productos', 'Servicios'];
  public doughnutChartData: MultiDataSet = [[350, 450]];
  public doughnutChartType: ChartType = 'doughnut';

  public colors: Color[] = [
    {
      backgroundColor:[
        '#FAC65A',
        '#D98B50',
        '#F07A65',
        '#DB7AA6',
        '#F2C7FF'
      ]
    }
  ]


  constructor(private ventasService:VentasService,
  private ingresoService: IngresoService,
  private detallVentaService:DetallVentaService) { }
  
  ngOnInit(): void {

    this.getMeses();
    this.getVentas();
    this.getCompras();
    this.getDetalleVentas();   
  }
  detalleVenta:any = [];
  filterDetallePro:any = [];
  filterDetalleSer:any = [];
  getDetalleVentas(){ 
    this.detallVentaService.getDetalleVentas().subscribe(
      res => {
        this.detalleVenta = res;
        this.detalleVenta = this.detalleVenta.detalleVenta;

        this.filterDetallePro = this.detalleVenta.filter(function(ele: any){
          return ele.Productos.fk_id_tipo == 1;
        });

        this.filterDetalleSer = this.detalleVenta.filter(function(ele: any){
          return ele.Productos.fk_id_tipo == 3;
        });
        console.log(this.doughnutChartData);
        this.doughnutChartData[0].splice(0, 1, this.filterDetallePro.length);
        this.doughnutChartData[0].splice(1, 1, this.filterDetalleSer.length);

        console.log(this.detalleVenta)
      },
      err => console.error(err)
    );
  }




  contador:number = 0;
  filterVentas:any=[];
  filterIngresos:any=[];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
  //Obtener meses
  getMeses(){
    var todaysDate = new Date();
    var currentMonth = this.months[todaysDate.getMonth()];
    console.log('Current month ' + currentMonth);
    console.log('Previous month(s) ');
    for(let i = this.months.indexOf(currentMonth); i >= 0; i--){
        this.contador = this.contador + 1;
        if(this.contador <= 3){
          this.barChartLabels.push(this.months[i]);
        }
        console.log(this.months[i]);
    }
    this.barChartLabels = this.barChartLabels.reverse();

    // Obtener meses por filtro
    
  }

  getVentas(){
    this.ventasService.getVentas().subscribe(
      res => {
        this.barChartData = [];
        
        const pruebaVentas = 'Ventas';
        this.ventas = res;
        this.ventas = this.ventas.venta;
        let ventasArraySol:any = [];
        let ventasArrayDol:any = [];
        for(let i = 0; i <this.barChartLabels.length ; i++){
    
          this.filterVentas = this.filterMes(this.barChartLabels[i],this.ventas);

          let ventaMesDol = 0;
          let ventaMesSol = 0;
          
          for(let i=0; i<this.filterVentas.length; i++){
              if(this.filterVentas[i].Monedas.mon_nombre == "Dolares"){
                ventaMesDol = ventaMesDol + Number(this.filterVentas[i].ven_total);
              }else{
                ventaMesSol = ventaMesSol + Number(this.filterVentas[i].ven_total);
              }
              
          }

          ventasArrayDol.push(ventaMesDol);
          ventasArraySol.push(ventaMesSol);
        }
          
          this.barChartData.push({data:ventasArrayDol, label:"Ventas - Dol",backgroundColor:'#ea8013', hoverBackgroundColor:'#e1913e'});
          this.barChartData.push({data:ventasArraySol, label:"Ventas - Sol",backgroundColor:'#a3e542', hoverBackgroundColor:'#b5e56e'});
          
      },
      err => console.error(err)
    );
  }

  filterIngreso:any = [];
  getCompras(){
    this.ingresoService.getIngresos().subscribe(
      res => {
        
        const pruebaCompras = 'Compras';
        this.ingreso = res;
        this.ingreso = this.ingreso.ingreso;
        let IngresoArray:any = [];
        for(let i = 0; i <this.barChartLabels.length ; i++){
    
          this.filterIngreso =  this.filterMes(this.barChartLabels[i],this.ingreso);
          console.log(this.filterIngreso);

          let ingresoMes = 0;
          
          for(let i=0; i<this.filterIngreso.length; i++){
              ingresoMes = ingresoMes + Number(this.filterIngreso[i].ing_totalCompra);
          }
          console.log(this.filterIngreso);
          IngresoArray.push(ingresoMes);
        }
          console.log(IngresoArray);
          this.barChartData.push({data:IngresoArray, label:"Compras", backgroundColor:'#6cb6d6', hoverBackgroundColor:'#8bc4dd'});
          console.log(this.barChartData);
      },
      err => console.error(err)
    );
  }

  filterMes(mesSeleccionado:Label, arrayDatos:any){

    let filtro :any=[];
    for(let i=0; i<arrayDatos.length; i++){
        const now = new Date(arrayDatos[i].createdAt);
        let mesVenta = this.months[now.getMonth()];
        if(mesVenta == mesSeleccionado){
          filtro.push(arrayDatos[i]);
        }
    }
    return filtro;
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);

  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40 ];
  }

  

}
