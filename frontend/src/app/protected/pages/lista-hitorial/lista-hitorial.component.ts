import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HistorialProductoService } from '../../services/historial-producto.service';
import { ProductoService } from '../../services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-hitorial',
  templateUrl: './lista-hitorial.component.html',
  styleUrls: ['./lista-hitorial.component.css']
})
export class ListaHitorialComponent implements OnInit {
  historialProducto:any = [];
  historialGeneral: any = [];
  @Input() isVisibleHistorial: any;
  @Input() idProducto: any;
  @Output() newVisibleHistorial : EventEmitter<boolean>  = new EventEmitter<boolean>();

  fechaDesde:any ="";
  fechaHasta:any ="";
  fechaFormateada1: any = "";
  fechaFormateada2: any = "";

  fechaActual: any = "";

  splitFecha1: any [] = [];
  splitFecha2: any [] = [];


  formHistorial:FormGroup = this.fb.group({
    startDate: ['', []],
    endDate: ['', []]
  });

  constructor(private productoService: ProductoService,
    private historialProductoService:HistorialProductoService,
    private fb: FormBuilder,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.formHistorial.reset();
    if(this.idProducto != "" && this.fechaFormateada1 == "" && this.fechaFormateada2 == ""){
      this.fechaActual = this.datePipe.transform(new Date().toISOString(), 'yyyy-MM-dd');
      this.formHistorial.controls['startDate'].setValue(this.fechaActual);
      this.formHistorial.controls['endDate'].setValue(this.fechaActual);
      this.historialProductoService.getHistorialProductos()
      .subscribe(
        res => {
          let id = this.idProducto;
          this.historialProducto = res;
          this.historialProducto= this.historialProducto.historialProducto;
          this.historialProducto = this.historialProducto.filter(function(ele: any){
            return ele.id_producto == id;
          });
          this.historialGeneral = this.historialProducto;
          // console.log('historial', this.historialProducto);
          
  
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
              let day = now.getDate()<=9?"0"+now.getDate():now.getDate();

            let formatted = day + '/' + numMes  + '/' + now.getFullYear();

            this.historialProducto[i].createdAt = formatted;
        }
        
        
        },
        err => console.log(err)
      )
    }
  }

 

  buscar(){

    const {startDate, endDate} = this.formHistorial.value;
    
    if(startDate != "" && startDate != null && endDate != "" && endDate != null){

    
        this.fechaDesde = startDate;
        this.fechaHasta = endDate;

        this.splitFecha1 = startDate.split("-");
        let year1 = this.splitFecha1[0];
        let month1 = this.splitFecha1[1];
        let day1 = this.splitFecha1[2];
  
        this.splitFecha2 = endDate.split("-");
        let year2 = this.splitFecha2[0];
        let month2 = this.splitFecha2[1];
        let day2 = this.splitFecha2[2];
        
        this.fechaFormateada1 = day1+"/"+month1+"/"+year1;
        this.fechaFormateada2 = day2+"/"+month2+"/"+year2;



        let historialFilter1 = [];
        let historialFilter2 = [];
        historialFilter1 = this.historialGeneral;
        historialFilter2 = this.historialGeneral;
        let fechafilter1 = this.fechaFormateada1;
        let fechafilter2 = this.fechaFormateada2;

        if(fechafilter1 == fechafilter2){

          historialFilter1 = historialFilter1.filter(function(element: any){
            return element.createdAt == fechafilter1;
          });

          if(historialFilter1.length>0){


            this.historialProducto = historialFilter1;

          }else{
      
            Swal.fire('Error', 'No se encontraron registros', 'error');
      
          }

        }else{

          historialFilter2 = historialFilter2.filter(function(element: any){
            return element.createdAt >= fechafilter1 && element.createdAt <= fechafilter2;
          });

          if(historialFilter2.length>0){
            
            historialFilter2.sort(function(a: any, b: any){
              return a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt?1: 0;
            });
            this.historialProducto = historialFilter2;
          }else{
      
            Swal.fire('Error', 'No se encontraron registros', 'error');
      
          }
  
        }
        
      // this.fechaDesde = new Date(startDate);
      // this.fechaHasta = new Date(endDate);
      // this.fechaDesde.setDate(this.fechaDesde.getDate() + 1);
      // this.fechaHasta.setDate(this.fechaHasta.getDate() + 2);
      // this.fechaFormateada1 = this.datePipe.transform(this.fechaDesde.toISOString(), 'yyyy-MM-dd');
      // this.fechaFormateada2 = this.datePipe.transform(this.fechaHasta.toISOString(), 'yyyy-MM-dd');
      // this.historialProductoService.getHistorialByDates(this.fechaFormateada1, this.fechaFormateada2, this.idProducto)
      //   .subscribe(resp => {
      //     if (resp.ok) {
      //       let id = this.idProducto;
      //       this.historialProducto = resp;
      //       this.historialProducto = this.historialProducto.historialProducto;

      //       for (let i = 0; i < this.historialProducto.length; i++) {
      //         const now = new Date(this.historialProducto[i].createdAt);
      //         var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      //         let numMes: any = "";
      //         let mesPrueba = Number([now.getMonth() + 1]);
      //         if (mesPrueba <= 9) {
      //           numMes = "0" + mesPrueba;
      //         }
      //         else {
      //           numMes = mesPrueba;
      //         }

      //         let formatted = now.getDate() + '/' + numMes + '/' + now.getFullYear();

      //         this.historialProducto[i].createdAt = formatted;
      //       }

      //     } else {
      //       Swal.fire('Error', resp, 'error');
      //     }

      //   });
    }else{

      if(startDate == null){

        Swal.fire('Error', 'No seleccionó rango de fechas', 'error');
      }

    }
    this.resetear();
    
    

  }
  buscarPorDia(){
    this.formHistorial.controls['startDate'].setValue(this.fechaActual);
    this.formHistorial.controls['endDate'].setValue(this.fechaActual);

    this.fechaHasta = new Date().toLocaleString('es-PE', {timeZone: 'America/Lima'});

    this.splitFecha2 = this.fechaHasta.split("/");
    let day2 = this.splitFecha2[0]<=9?"0"+this.splitFecha2[0]:this.splitFecha2[0];
    let month2 = this.splitFecha2[1]<=9?"0"+this.splitFecha2[1]:this.splitFecha2[1];
    let year2 = this.splitFecha2[2].substring(0, 4);
    this.fechaFormateada1 = day2+"/"+month2+"/"+year2;
    let historialFilter = [];
    historialFilter = this.historialGeneral;
    let fechafilter = this.fechaFormateada1;
    historialFilter = historialFilter.filter(function(element: any){
      return element.createdAt == fechafilter;
    });
    if(historialFilter.length>0){
      
      this.historialProducto = historialFilter;
    }else{

      Swal.fire('Error', 'No se encontraron registros', 'error');

    }

    this.resetear();

    




    // this.fechaDesde = new Date();
    // this.fechaHasta = new Date();
    // this.fechaDesde.setDate(this.fechaDesde.getDate() );
    // this.fechaHasta.setDate(this.fechaHasta.getDate() + 1);
    // this.fechaFormateada1 = this.datePipe.transform(this.fechaDesde.toISOString(), 'yyyy-MM-dd');
    // this.fechaFormateada2 = this.datePipe.transform(this.fechaHasta.toISOString(), 'yyyy-MM-dd');

    // this.historialProductoService.getHistorialByDates(this.fechaFormateada1, this.fechaFormateada2, this.idProducto)
    // .subscribe(resp =>{
    //   if(resp.ok){
    //     let id = this.idProducto;
    //     this.historialProducto = resp;
    //     this.historialProducto= this.historialProducto.historialProducto;

    //     for(let i=0; i<this.historialProducto.length; i++){
    //       const now = new Date(this.historialProducto[i].createdAt);
    //       var months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
    //         let numMes:any = "";
    //         let mesPrueba =  Number([now.getMonth()+1]);
    //         if( mesPrueba <= 9){
    //             numMes = "0"+ mesPrueba;
    //         }
    //         else{
    //             numMes =  mesPrueba;
    //         }

    //       let formatted = now.getDate() + '/' + numMes  + '/' + now.getFullYear();

    //       this.historialProducto[i].createdAt = formatted;
    //     }

    //   }else{
    //     Swal.fire('Error', resp, 'error');
    //   }

    // });
    // this.resetear();
  }
  resetear(){
    this.fechaFormateada1 = "";
    this.fechaFormateada2 = "";
    this.fechaDesde = "";
    this.fechaHasta = "";
    this.splitFecha2= [];
    this.splitFecha1=[];
    
  }

  handleCancelHistorial(){
    this.isVisibleHistorial = false;
    this.newVisibleHistorial.emit(this.isVisibleHistorial);
  }
}
