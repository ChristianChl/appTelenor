import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { VentasService } from '../../services/ventas.service';
import { DatePipe } from '@angular/common';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reporte-detalle-ventas',
  templateUrl: './reporte-detalle-ventas.component.html',
  styleUrls: ['./reporte-detalle-ventas.component.css']
})
export class ReporteDetalleVentasComponent implements OnInit {

  @Input() isVisibleDetalleVentas: any;
  @Input() fechaInicio: any;
  @Input() fechaFinal: any;
  @Output() newVisbleDetalleVentas : EventEmitter<boolean>  = new EventEmitter<boolean>();
  
  fechaDesde:any ="";
  fechaHasta:any ="";
  totalVentas : any = 0;
  totalCambio: any = 0;
  totalFinal: any =0;
  campoIgv: any = 0;
  totalIgv: any = 0;
  subTotal1: any =0;
  subTotal2: any =0;
  subTotalIgv1: any = 0;
  subTotalIgv2: any = 0;
  fechaFormateada1: any = "";
  fechaFormateada2: any = "";

  ventas:any = [];
  fechaChange1 : any;
  fechaChange2: any;
  splitFecha1: any = [];
  splitFecha2: any = [];


  formVentas:FormGroup = this.fb.group({
    startDate: ['', []],
    endDate: ['', []]
  });

  constructor(private ventasService : VentasService,
              private fb: FormBuilder,
              private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.fechaChange1 = this.fechaInicio;
    this.fechaChange2 = this.fechaFinal;
  

    if(this.fechaInicio != "" && this.fechaFinal != ""){
      this.getVentas();
    }

    
  }

  //Descargar PDF
  descargar(){
    var element:any = document.getElementById("table");
    var doc = new jspdf.jsPDF('p','pt','a4');
    const options = {
      background : 'white',
      scale: 3
    };

    html2canvas(element, options).then((canvas) =>{
      var imgData = canvas.toDataURL('image/PNG')

      //Add image canvas to PDF
      const bufferX = 15;
      const BUfferY =  15;
      const imgProps = (doc as any).getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth()-2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth)/imgProps.width;

      doc.addImage(
        imgData,
        'PNG',
        bufferX,
        BUfferY,
        pdfWidth,
        pdfHeight,
        undefined,
        'FAST');

      return doc;
    })
    .then((docResult)=>{
      docResult.save('Reporte Contable del ' + this.fechaChange1 + ' hasta ' + this.fechaChange2)
    })
  }


  getVentas(){

    this.resetar();
    this.fechaDesde = new Date(this.fechaChange1);
    this.fechaHasta = new Date(this.fechaChange2);
    this.fechaDesde.setDate(this.fechaDesde.getDate() + 1);
    this.fechaHasta.setDate(this.fechaHasta.getDate() + 1);
    this.fechaFormateada1 = this.datePipe.transform(this.fechaDesde.toISOString(), 'yyyy-MM-dd');
    this.fechaFormateada2 = this.datePipe.transform(this.fechaHasta.toISOString(), 'yyyy-MM-dd');


    // console.log('fecha1', this.fechaFormateada1, 'fecha2', this.fechaFormateada2);


    this.ventasService.getVentasByDates(this.fechaFormateada1, this.fechaFormateada2)
    .subscribe(resp =>{
      if(resp.ok == true){
        this.ventas = resp
        this.ventas = this.ventas.venta;
        for(let i = 0; i< this.ventas.length; i++){
          if(this.ventas[i].Monedas.mon_nombre == "Dolares"){

            this.totalCambio = Number(this.ventas[i].ven_total * this.ventas[i].Monedas.mon_tipoCambio);
            this.campoIgv = Number(this.ventas[i].ven_igv);
            this.subTotal1 += this.totalCambio;
            this.subTotalIgv1 += this.campoIgv;
          }else{
            this.totalFinal = Number(this.ventas[i].ven_total);
            this.campoIgv = Number(this.ventas[i].ven_igv);
            this.subTotal2 += this.totalFinal;
            this.subTotalIgv2 +=this.campoIgv;
          }
        }
        this.totalVentas = Number(this.subTotal1 + this.subTotal2).toFixed(2);
        this.totalIgv = Number(this.subTotalIgv1 + this.subTotalIgv2).toFixed(2);

      }else{
        Swal.fire('Error', 'No se encontraron Registros', 'error');
        this.ventas = [];
        
      }

    });
  }
  resetar(){
    this.totalCambio = 0;
    this.totalFinal = 0;
    this.subTotal1 = 0;
    this.subTotal2 = 0;
    this.totalVentas = 0;
    this.campoIgv = 0;
    this.totalIgv =0;
    this.subTotalIgv1 = 0;
    this.subTotalIgv2 =0;
    this.ventas = [];
    this.splitFecha1 = [];
    this.splitFecha2 = [];
  }
  handleCancelVentas(): void{
    this.isVisibleDetalleVentas = false;
    this.newVisbleDetalleVentas.emit(this.isVisibleDetalleVentas);

  }

}
