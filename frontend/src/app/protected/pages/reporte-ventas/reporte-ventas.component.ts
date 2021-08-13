import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent implements OnInit {
  
  isVisibleDetalleVentas = false;
  fechaDesde:any ="";
  fechaHasta:any ="";
  isExpanded = true;
  isShowing = false;
  showSubmenu: boolean = false;
  totalVentas : any = 0;
  totalCambio: any = 0;
  totalFinal: any =0;
  subTotal1: any =0;
  subTotal2: any =0;
  existDatos = false;
  fechaFormateada1: any = "";
  fechaFormateada2: any = "";
  dataError: any = "";

  fechaInicio:any ="";
  fechaFinal:any="";


  ventas:any = [];

  miFormulario: FormGroup = this.fb.group({
    startDate: ['', []],
    endDate: ['', []]
  });

  panels = [
    {
      active: false,
      name: 'Ventas por Fechas',
      disabled: false,
      // icon: 'plus-circle',
    }
  ];
  subPanel = [
    {
      active: true,
      name: '44.000 - Trujillo',
      disabled: false,
    }
  ];
  constructor(private ventasService:VentasService,
              private fb: FormBuilder,
              private datePipe: DatePipe) { }

  ngOnInit(): void {

  }

  buscar(){
    this.resetar();
    console.log(this.miFormulario.value);
    const {startDate, endDate} = this.miFormulario.value;
    if(startDate != "" && endDate != ""){

      this.fechaInicio = startDate;
      this.fechaFinal = endDate;
      this.fechaDesde = new Date(startDate);
      this.fechaHasta = new Date(endDate);
      this.fechaDesde.setDate(this.fechaDesde.getDate() + 1);
      this.fechaHasta.setDate(this.fechaHasta.getDate() + 2);
      this.fechaFormateada1 = this.datePipe.transform(this.fechaDesde.toISOString(), 'yyyy-MM-dd');
      this.fechaFormateada2 = this.datePipe.transform(this.fechaHasta.toISOString(), 'yyyy-MM-dd');
      
      console.log(this.fechaFormateada1);
      console.log(this.fechaFormateada2);
      console.log(this.fechaDesde.toISOString().toString());
      console.log(this.fechaHasta.toISOString().toString());
      this.ventasService.getVentasByDates(this.fechaFormateada1, this.fechaFormateada2)
      .subscribe(resp =>{
        if(resp.ok == true){
          this.existDatos = true;
          this.ventas = resp
          this.ventas = this.ventas.venta;
          console.log(this.ventas);
          for(let i = 0; i< this.ventas.length; i++){
            if(this.ventas[i].Monedas.mon_nombre == "Dolares"){
  
              this.totalCambio = Number(this.ventas[i].ven_total * this.ventas[i].Monedas.mon_tipoCambio);
              this.subTotal1 += this.totalCambio;
              console.log('cuando es dolares '+ this.totalVentas);
            }else{
              this.totalFinal = Number(this.ventas[i].ven_total);
              this.subTotal2 += this.totalFinal;
            }
          }
          this.totalVentas = Number(this.subTotal1 + this.subTotal2).toFixed(2);
          console.log(this.totalVentas);
  
        }else{
          // Swal.fire('Error', resp, 'error');
          console.log(resp);
          this.existDatos = false;
          this.dataError = resp;
        }
  
      });

    }
    else{
      this.existDatos = false;
      this.dataError = "No se encontraron registros";
    }
  }
  buscarPorDia(){
    this.resetar();
    this.fechaDesde = new Date();
    this.fechaHasta = new Date();
    this.fechaInicio = this.datePipe.transform(new Date().toISOString(), 'yyyy-MM-dd');
    this.fechaFinal =  this.datePipe.transform(new Date().toISOString(), 'yyyy-MM-dd');
    this.fechaDesde.setDate(this.fechaDesde.getDate() );
    this.fechaHasta.setDate(this.fechaHasta.getDate() + 1);
    this.fechaFormateada1 = this.datePipe.transform(this.fechaDesde.toISOString(), 'yyyy-MM-dd');
    this.fechaFormateada2 = this.datePipe.transform(this.fechaHasta.toISOString(), 'yyyy-MM-dd');
    
    console.log(this.fechaFormateada1);
    console.log(this.fechaFormateada2);
    console.log(this.fechaDesde.toISOString().toString());
    console.log(this.fechaHasta.toISOString().toString());
    this.ventasService.getVentasByDates(this.fechaFormateada1, this.fechaFormateada2)
    .subscribe(resp =>{
      if(resp.ok == true){
        this.existDatos = true;
        this.ventas = resp
        this.ventas = this.ventas.venta;
        console.log(this.ventas);
        for(let i = 0; i< this.ventas.length; i++){
          if(this.ventas[i].Monedas.mon_nombre == "Dolares"){

            this.totalCambio = Number(this.ventas[i].ven_total * this.ventas[i].Monedas.mon_tipoCambio);
            this.subTotal1 += this.totalCambio;
            console.log('cuando es dolares '+ this.totalVentas);
          }else{
            this.totalFinal = Number(this.ventas[i].ven_total);
            this.subTotal2 += this.totalFinal;
          }
        }
        this.totalVentas = Number(this.subTotal1 + this.subTotal2).toFixed(2);
        console.log(this.totalVentas);

      }else{
        // Swal.fire('Error', resp, 'error');
        console.log(resp);
        this.existDatos = false;
        this.dataError = resp;
      }

    });
  }


  hidde(){
    this.isExpanded = !this.isExpanded;
  }
  resetar(){
    this.totalCambio = 0;
    this.totalFinal = 0;
    this.subTotal1 = 0;
    this.subTotal2 = 0;
    this.totalVentas = 0;
  }
  showModalDetalleVentas(){
    this.isVisibleDetalleVentas = true;
    this.fechaFormateada1 = this.fechaFormateada1;
    this.fechaFormateada2 = this.fechaFormateada2;
  }
  nuevoDato(){
    this.ngOnInit();
    this.isVisibleDetalleVentas = false;
  }

}
