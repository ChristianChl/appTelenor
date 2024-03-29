import { Component, OnInit } from '@angular/core';
import {ChartOptions,ChartType,ChartDataSets} from 'chart.js';
import {Color,MultiDataSet, Label} from 'ng2-charts';
import { DetallVentaService } from '../../services/detall-venta.service';
import { IngresoService } from '../../services/ingreso.service';
import { ProductoService } from '../../services/producto.service';
import { VentasService } from '../../services/ventas.service';


import { DatePipe } from '@angular/common';
import { Ingreso } from '../../interfaces/Ingreso';

import * as pluginDataLabels from '@marcelorafael/chartjs-plugin-datalabels';
import { DetalleCotizacionService } from '../../services/detalle-cotizacion.service';
import { CotizacionService } from '../../services/cotizacion.service';
import { HistorialProductoService } from '../../services/historial-producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  ventas:any = [];
  ingreso:any = [];

  fechaDesde:any ="";
  fechaHasta:any ="";
  fechaFormateada1: any = "";
  fechaFormateada2: any = "";
  unicos: any = [];
  totalCompras: any = [];
  count: any =0;
  totalAcumulado: any = 0;

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
  public barChartPlugins = [pluginDataLabels];
  /*
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80], label: 'Ventas' },
    { data: [28, 48, 40], label: 'Series B' }
  ];*/

  public barChartData: ChartDataSets[] = [];
  public barChartDataCompra: ChartDataSets[] = [];

  public doughnutChartLabels: Label[] = ['Productos', 'Servicios'];
  public doughnutChartData: MultiDataSet = [[350, 450]];
  public doughnutChartType: ChartType = 'doughnut';


  //Dona Compras mayor a Proveedores
  public doughnutChartLabels1: Label[] = [];
  public doughnutChartData1: MultiDataSet = [];



  public doughnutChartLabelsProvee: Label[] = [];
  public doughnutChartDataProvee: MultiDataSet = [[]];

  public doughnutChartLabelsCoti: Label[] = ['Cotización - Ventas', 'Cotización - No Ventas'];
  // public doughnutChartDataCoti: MultiDataSet = [[350, 450]];
  public doughnutChartDataCoti: MultiDataSet = [];

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
  private detallVentaService:DetallVentaService,
  private prductoService:ProductoService,
  private datePipe: DatePipe,
  private cotizacionService:CotizacionService,
  private historialProductoService:HistorialProductoService) { }
  
  ngOnInit(): void {

    this.getProductos();
    this.getMeses();
    this.getVentas();
    this.getCompras();
    this.getDetalleVentas();
    this.getMonthsValues();
    this.getCotizaciones();
    this.getHistorial();
  }
  historialProducto:any = [];
  historialProductoFilter:any=[];
  stockInicialDiaAyer:number = 0;
  stockFinalDiaAyer:number = 0;
  getHistorial(){
    this.historialProductoService.getHistorialProductos()
      .subscribe(
        res => {


          // PRODUCTOS SIN SALIDA
          let id = this.idProducto;
          this.historialProducto = res;
          this.historialProducto= this.historialProducto.historialProducto;
          let milisegundos = 24*60*60*1000;
          for(let i=0; i<this.todosProductos.length; i++){

            let idProducto = this.todosProductos[i].id_Producto;
  
            this.ventasProducto = this.historialProducto.filter(function(ele: any){
              return ele.id_producto == idProducto && ele.hist_cambioTiempo != "Compra" && ele.hist_cambioTiempo != "Editado";
            });
            let ultimoMovimiento = this.ventasProducto.length;
            if(ultimoMovimiento > 0){
              var f = new Date();
              var xy = new Date(this.ventasProducto[ultimoMovimiento-1].createdAt);
              let milisegundosTranscurridos = Math.abs(f.getTime() - xy.getTime());
              
              let diasTranscurridos = Math.round(milisegundosTranscurridos/milisegundos);
              
              if(diasTranscurridos >= 90){
                this.productoSinMoviento.push(this.todosProductos[i]);
              }
            }
            
            
          }
          /*
          this.historialProducto = this.historialProducto.filter(function(ele: any){
            return ele.id_producto == id;
          });
          */

          //iNDICE DE ROTACION
          for(let i=0; i<this.historialProducto.length; i++){
            const now = new Date(this.historialProducto[i].createdAt);
            var months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          
              let numMes:any = "";
              let mesPrueba =  Number([now.getMonth()+1]);
              if( mesPrueba <= 9){
                  numMes = "0"+ mesPrueba;
              }
              else{
                  numMes =  mesPrueba;
              }

              let numDia:any = "";
              let diaPrueba =  Number([now.getDate()]);
              if( diaPrueba <= 9){
                numDia = "0"+ diaPrueba;
              }
              else{
                numDia =  diaPrueba;
              }


            
            let formatted = numDia + '-' + numMes + '-' + now.getFullYear()
            this.historialProducto[i].createdAt = formatted;
          }
          var date = new Date();
          date ; 
          date.setDate(date.getDate() - 1);
          date ;
          let numMes:any = "";
            let mesPrueba =  Number([date.getMonth()+1]);
            if( mesPrueba <= 9){
                numMes = "0"+ mesPrueba;
            }
            else{
                numMes =  mesPrueba;
            }
            let formattedAyer = date.getDate() + '-' + numMes + '-' + date.getFullYear();
            let primerDiaMes = '01-'+numMes+'-'+date.getFullYear();
            for(let i=0; i<this.todosProductos.length; i++){
              let cantidadVentas = 0;
              let id = this.todosProductos[i].id_Producto;
      
              this.historialProductoFilter = this.historialProducto.filter(function(ele: any){
                return ele.id_producto == id && ele.createdAt >= primerDiaMes;
              });
  
              this.historialProductoFilter = this.historialProductoFilter.filter(function(ele: any){
                return ele.createdAt <= formattedAyer ;
              });
              
              let cant = this.historialProductoFilter.length;
      
              //Sacar Sttock inicial y final de cada Producto
              if(this.historialProductoFilter.length > 0){
      
                if(this.historialProductoFilter.length == 1){
                  if(this.historialProductoFilter[0].hist_cambioTiempo == "Venta"){
                     this.stockInicialDiaAyer = this.historialProductoFilter[0].hist_stock + this.historialProductoFilter[0].hist_cantVenta;
                     this.stockFinalDiaAyer = this.historialProductoFilter[0].hist_stock;
                  }
                  else{
                    this.stockInicialDiaAyer = 0;
                    this.stockFinalDiaAyer = 0;
                  }
                  
                }
                else{
                  if(this.historialProductoFilter[0].hist_cambioTiempo == "Venta"){
                    this.stockInicialDiaAyer = this.historialProductoFilter[0].hist_stock + this.historialProductoFilter[0].hist_cantVenta;
                  }
                  else if(this.historialProductoFilter[0].hist_cambioTiempo == "Compra"){
                    this.stockInicialDiaAyer = this.historialProductoFilter[0].hist_stock  - this.historialProductoFilter[0].hist_cantCompra;;
                  }
                  
      
                  if(this.historialProductoFilter[cant-1].hist_cambioTiempo == "Venta"){
                    this.stockFinalDiaAyer = this.historialProductoFilter[cant-1].hist_stock;
                  }
                  else if(this.historialProductoFilter[cant-1].hist_cambioTiempo == "Compra"){
                    this.stockFinalDiaAyer = this.historialProductoFilter[cant-1].hist_stock;
                  }
                }
                
              }
              else{
                this.stockInicialDiaAyer = 0;
                this.stockFinalDiaAyer = 0;
              }
      
              //Obtener la cantidad de productos que se vendieron
      
              for(let j=0;j<this.historialProductoFilter.length; j++){
                cantidadVentas = this.historialProductoFilter[j].hist_cantVenta + cantidadVentas
              }
      
              // Realizar la formula 
              let stockPromDiaAyer = (this.stockFinalDiaAyer + this.stockInicialDiaAyer)/2;
              let rotacion;
              if(stockPromDiaAyer == 0){
                 rotacion = 0;
              } 
              else{
                rotacion = (cantidadVentas/stockPromDiaAyer).toFixed(2);
              }
              
              this.todosProductos[i].prod_imagen = rotacion;
              // console.log(this.todosProductos);
            }
        },
        err => console.log(err)
      )
  }
  detalleVenta:any = [];
  filterDetallePro:any = [];
  filterDetalleSer:any = [];
  ventasProducto:any = [];
  productoSinMoviento:any = [];
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
        
        this.doughnutChartData[0].splice(0, 1, this.filterDetallePro.length);
        this.doughnutChartData[0].splice(1, 1, this.filterDetalleSer.length);

        

        for(let i=0; i<this.detalleVenta.length; i++){
          const now = new Date(this.detalleVenta[i].createdAt);
          var months = ['Ene', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
          let numMes:any = "";
          let mesPrueba =  Number([now.getMonth()+1]);
          if( mesPrueba <= 9){
              numMes = "0"+ mesPrueba;
          }
          else{
              numMes =  mesPrueba;
          }

          let formatted = now.getFullYear()+'/'+numMes+'/' +now.getDate();

          this.detalleVenta[i].createdAt = formatted;
        }
        let milisegundos = 24*60*60*1000;
        this.productoSinMoviento = [];
        for(let i=0; i<this.producto.length; i++){

          let idProducto = this.producto[i].id_Producto;

          this.ventasProducto = this.detalleVenta.filter(function(ele: any){
            return ele.fk_id_producto == idProducto;
          });
          if(this.ventasProducto.length>0){
            let ultimo = this.ventasProducto.length - 1 ;
            var f = new Date();
            var xy = new Date(this.ventasProducto[ultimo].createdAt);
            let milisegundosTranscurridos = Math.abs(f.getTime() - xy.getTime());
            let diasTranscurridos = Math.round(milisegundosTranscurridos/milisegundos);
            
            if(diasTranscurridos >= 90){
              this.productoSinMoviento.push(this.producto[i]);
            }
          }
          else{
            
            var f = new Date();
            var xy = new Date(this.producto[i].createdAt);
            
            let milisegundosTranscurridos = Math.abs(f.getTime() - xy.getTime());
            let diasTranscurridos = Math.round(milisegundosTranscurridos/milisegundos);
            if(diasTranscurridos >= 90){
              this.productoSinMoviento.push(this.producto[i]);
            }
          }
        }

      },
      err => console.error(err)
    );
  }




  contador:number = 0;
  filterVentas:any=[];
  filterIngresos:any=[];
  months = ['Ene', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
    
  //Obtener meses
  getMeses(){
    var todaysDate = new Date();
    var currentMonth = this.months[todaysDate.getMonth()];
    for(let i = this.months.indexOf(currentMonth); i >= 0; i--){
        this.contador = this.contador + 1;
        if(this.contador <= 3){
          this.barChartLabels.push(this.months[i]);
        }
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
          
          this.barChartData.push({data:ventasArrayDol, label:"Ventas - Dolares",backgroundColor:'#ea8013', hoverBackgroundColor:'#e1913e'});
          this.barChartData.push({data:ventasArraySol, label:"Ventas - Soles",backgroundColor:'#a3e542', hoverBackgroundColor:'#b5e56e'});
          

      },
      err => console.error(err)
    );
  }

  filterIngreso:any = [];
  getCompras(){
    this.ingresoService.getIngresos().subscribe(
      res => {
        this.barChartDataCompra = [];
        const pruebaCompras = 'Compras';
        this.ingreso = res;
        this.ingreso = this.ingreso.ingreso;
        let IngresoArray:any = [];
        for(let i = 0; i <this.barChartLabels.length ; i++){
    
          this.filterIngreso =  this.filterMes(this.barChartLabels[i],this.ingreso);

          let ingresoMes = 0;
          
          for(let i=0; i<this.filterIngreso.length; i++){
              ingresoMes = ingresoMes + Number(this.filterIngreso[i].ing_totalCompra);
          }
          IngresoArray.push(ingresoMes);
        }
          this.barChartDataCompra.push({data:IngresoArray, label:"Compras - Soles", backgroundColor:'#6cb6d6', hoverBackgroundColor:'#8bc4dd'});
          
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
    

  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {

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
  producto:any = [];
  todosProductos:any=[];
  
  getProductos(){
    this.prductoService.getProductos().subscribe(
      res => {
        this.producto = res;
        this.todosProductos = this.producto.producto;
        this.producto = this.producto.producto;
        
        this.producto = this.producto.filter(function(ele: any){
          return ele.prod_stock != 0;
        });

        for(let i=0; i<this.producto.length; i++){
          const now = new Date(this.producto[i].createdAt);
          var months = ['Ene', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
          let numMes:any = "";
          let mesPrueba =  Number([now.getMonth()+1]);
          if( mesPrueba <= 9){
              numMes = "0"+ mesPrueba;
          }
          else{
              numMes =  mesPrueba;
          }

          let formatted = now.getFullYear()+'/'+numMes+'/' +now.getDate();

          this.producto[i].createdAt = formatted;
        }
      },
      err => console.error(err)
    );
  }
  isVisibleProducto = false;
  idProducto = "";
  cambioTiempo = true;
  modalEditProducto(id:string){
    this.isVisibleProducto = true;
    this.idProducto = id;
    this.cambioTiempo = true;
  }

  nuevoDatoProducto(){
    this.ngOnInit();
    this.isVisibleProducto = false;
  }


  onlyUnique(value: any, index: any, self: any) { 
    return self.indexOf(value) === index;
}

  //Obtener Compras Del Mes y el anterior
  getMonthsValues (){
    this.resetear();
    const fechaInicial  = new Date();
    const fechaFinal  = new Date(); 
    this.fechaDesde = new Date(fechaInicial.getFullYear(), fechaInicial.getMonth() - 1, 1);
    this.fechaHasta = new Date(fechaFinal.getFullYear(), fechaFinal.getMonth() + 1, 0);
    this.fechaHasta.setDate(this.fechaHasta.getDate() + 1);
    this.fechaFormateada1 = this.datePipe.transform(this.fechaDesde.toISOString(), 'yyyy-MM-dd');
    this.fechaFormateada2 = this.datePipe.transform(this.fechaHasta.toISOString(), 'yyyy-MM-dd');
    this.ingresoService.getIngresosByDates(this.fechaFormateada1, this.fechaFormateada2)
    .subscribe(
      resp => { 
        this.ingreso = resp;
        this.ingreso = this.ingreso.ingreso;
        if(this.ingreso.length > 0){
          
          for(let i = 0; i< this.ingreso.length; i++ ){
            const elemento = this.ingreso[i].Personas.per_razonSocial.toLowerCase();
            if(!this.unicos.includes(this.ingreso[i].Personas.per_razonSocial.toLowerCase())){
              this.unicos.push(elemento);
            }
          }
          for(let i=0; i<this.unicos.length; i++){
            
            this.count = 0;
            this.totalAcumulado = 0;
  
            for(let j=0; j<this.ingreso.length; j++){
  
              if(this.unicos[i].toLowerCase() == this.ingreso[j].Personas.per_razonSocial.toLowerCase()){
                
                this.count = Number(this.ingreso[j].ing_totalCompra);
                this.totalAcumulado += this.count;
              }
  
            }
            this.totalCompras.push({total: this.totalAcumulado, nombreProveedor: this.unicos[i]});
          }
          this.totalCompras.sort(function(a: any, b: any){
            return b.total - a.total;
          });
          for(let k = 0; k < this.totalCompras.length; k ++){

            if(k < 3){
              
              this.doughnutChartLabels1.push(this.totalCompras[k].nombreProveedor);
              this.doughnutChartData1.push(this.totalCompras[k].total);
            }
          }
        }
        else{
          this.totalAcumulado = 0;
          this.doughnutChartLabels1.push('Sin datos');
          this.doughnutChartData1.push(this.totalAcumulado);

        }

      },
      err => console.error(err)
    );
  }


  resetear(){
    this.count = 0;
    this.totalAcumulado = 0;
    this.unicos = [];
    this.totalCompras = [];
  }


  cotizacion:any = [];
  filterDetalleCotizacion:any = [];
  totalCotiVenta: any = 0;
  totalCotiNoVenta: any = 0;
  getCotizaciones(){
    this.cotizacionService.getCotizacions().subscribe(
      res =>{
            
        this.cotizacion = res;
        this.cotizacion = this.cotizacion.cotizacion;
        // let totalCotiVenta = 0;
        // let totalCotiNoVenta = 0;
        this.totalCotiVenta = 0;
        this.totalCotiNoVenta =0;

        for(let i = 0; i <this.barChartLabels.length ; i++){
    
          this.filterDetalleCotizacion = this.filterMes(this.barChartLabels[i],this.cotizacion);
          for(let i=0; i<this.filterDetalleCotizacion.length; i++){
              if(this.filterDetalleCotizacion[i].coti_hechoVenta == true){
                this.totalCotiVenta = this.totalCotiVenta + 1;
              }else{
                this.totalCotiNoVenta = this.totalCotiNoVenta + 1;
              }
              
          }

        }
        // this.doughnutChartDataCoti[0].splice(0, 1, totalCotiVenta);
        // this.doughnutChartDataCoti[0].splice(1, 1, totalCotiNoVenta);
        this.doughnutChartDataCoti.push(this.totalCotiVenta);
        this.doughnutChartDataCoti.push(this.totalCotiNoVenta);
      },
      err => console.log(err)
    )
  }
}
