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


  formVentas:FormGroup = this.fb.group({
    startDate: ['', []],
    endDate: ['', []]
  });

  constructor(private ventasService : VentasService,
              private fb: FormBuilder,
              private datePipe: DatePipe) { }

  ngOnInit(): void {

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
      console.log(canvas)

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
      docResult.save('Reporte Contable del ' + this.fechaInicio + ' hasta ' + this.fechaFinal)
    })
  }


  getVentas(){
    this.resetar();
    this.fechaDesde = new Date(this.fechaInicio);
    this.fechaHasta = new Date(this.fechaFinal);
    this.fechaDesde.setDate(this.fechaDesde.getDate() + 1);
    this.fechaHasta.setDate(this.fechaHasta.getDate() + 2);
    this.fechaFormateada1 = this.datePipe.transform(this.fechaDesde.toISOString(), 'yyyy-MM-dd');
    this.fechaFormateada2 = this.datePipe.transform(this.fechaHasta.toISOString(), 'yyyy-MM-dd');
    this.ventasService.getVentasByDates(this.fechaFormateada1, this.fechaFormateada2)
    .subscribe(resp =>{
      if(resp.ok == true){
        this.ventas = resp
        this.ventas = this.ventas.venta;
        console.log(this.ventas);
        for(let i = 0; i< this.ventas.length; i++){
          if(this.ventas[i].Monedas.mon_nombre == "Dolares"){

            this.totalCambio = Number(this.ventas[i].ven_total * this.ventas[i].Monedas.mon_tipoCambio);
            this.campoIgv = Number(this.ventas[i].ven_igv);
            this.subTotal1 += this.totalCambio;
            this.subTotalIgv1 += this.campoIgv;
            // console.log('cuando es dolares '+ this.totalVentas);
          }else{
            this.totalFinal = Number(this.ventas[i].ven_total);
            this.campoIgv = Number(this.ventas[i].ven_igv);
            this.subTotal2 += this.totalFinal;
            this.subTotalIgv2 +=this.campoIgv;
          }
        }
        this.totalVentas = Number(this.subTotal1 + this.subTotal2).toFixed(2);
        this.totalIgv = Number(this.subTotalIgv1 + this.subTotalIgv2).toFixed(2);
        // console.log(this.totalVentas);

      }else{
        Swal.fire('Error', 'No se encontraron Registros', 'error');
        console.log(resp);
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
  }
  handleCancelVentas(): void{
    this.isVisibleDetalleVentas = false;
    this.newVisbleDetalleVentas.emit(this.isVisibleDetalleVentas);

  }

}
