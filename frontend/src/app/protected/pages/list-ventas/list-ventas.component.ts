import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Img, PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { VentasService } from '../../services/ventas.service';
import { DetallVentaService } from '../../services/detall-venta.service';
import { jsPDF } from 'jspdf'
import 'jspdf-autotable';
import { PersonaService } from '../../services/persona.service';
import { TablaVenta } from '../../interfaces/tablaVenta';

PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-list-ventas',
  templateUrl: './list-ventas.component.html',
  styleUrls: ['./list-ventas.component.css']
})
export class ListVentasComponent implements OnInit {

  tablaVenta:TablaVenta = {
    id:'',
    modelo: '',
    decripcion:'',
    pUnitario:0,
    cantidad: 0,
    subTotal: 0,
    total: 0,
  }


  constructor(
    private ventasService:VentasService,
    private personaService:PersonaService,
    private detallVentaService:DetallVentaService
  ) { }

  ngOnInit(): void {
    this.getVentas(); 
    this.getCliente();
    this.getDetallVenta();
  }
  ventas:any = []
  detalleVenta:any=[];
  filterDetalle:any=[];
  getVentas(){
    this.ventasService.getVentas().subscribe(
      res => {
        this.ventas = res;
        this.ventas = this.ventas.venta;

        for(let i=0; i<this.ventas.length; i++){
            const now = new Date(this.ventas[i].createdAt);
            var months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
            let formatted = now.getFullYear() + ' ' + months[now.getMonth()] + ' ' + 
            now.getDate()

            this.ventas[i].createdAt = formatted;
        }
      },
      err => console.error(err)
    );
  }
  getDetallVenta(){
    this.detallVentaService.getDetalleVentas().subscribe(
      res => {
        this.detalleVenta = res;
        this.detalleVenta = this.detalleVenta.detalleVenta;

        for(let i=0; i<this.detalleVenta.length; i++){
            const now = new Date(this.detalleVenta[i].createdAt);
            var months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
            let formatted = now.getFullYear() + ' ' + months[now.getMonth()] + ' ' + 
            now.getDate();

            this.detalleVenta[i].createdAt = formatted;
        }

        console.log(this.detalleVenta)
      },
      err => console.error(err)
    );
  }
  persona:any = [];
  getCliente(){

    this.personaService.getPersonas().subscribe(
      res => {
        this.persona = res;
        console.log(this.persona);
        this.persona = this.persona.persona;
        console.log(this.persona);
        //const personasFiltradas = this.persona.filter((x: { TipoPersonas: { tipoper_descripcion: string; }; }) => x.TipoPersonas.tipoper_descripcion == 'Proveedor');
        
         this.persona = this.persona.filter(function(ele: any){

          return ele.TipoPersonas.tipoper_descripcion == 'Cliente';

        });
        

        console.log(this.persona);
      },
      err => console.error(err)
    );
  }
  totalVenta = "";
  tamañoFilas : any = 0;
  getProductos(numeroComprobante:string){

    const nuevoNumero = Number(numeroComprobante);
    this.filterDetalle = this.detalleVenta.filter(function(ele: any){
      return ele.fk_id_venta == nuevoNumero;
    });

    for(let i=0; i<this.filterDetalle.length;i++){

      this.tablaVenta.id = (i+1).toString();
      this.tablaVenta.modelo = this.filterDetalle[i].Productos.prod_modelo;
      this.tablaVenta.decripcion = this.filterDetalle[i].Productos.prod_descripcion;
      this.tablaVenta.cantidad = this.filterDetalle[i].detv_cantidad;
      this.tablaVenta.pUnitario = this.filterDetalle[i].detv_precioVenta;
      this.tablaVenta.subTotal = this.filterDetalle[i].detv_subTotal;
      this.tablaVenta.total = this.filterDetalle[i].detv_total;

      
      this.arrayPdf.push([this.tablaVenta.id,
        this.tablaVenta.modelo,
        this.tablaVenta.decripcion,
        this.tablaVenta.cantidad,
        this.tablaVenta.pUnitario,
        this.tablaVenta.subTotal,
        this.tablaVenta.total]);
    }
    this.tamañoFilas =  this.arrayPdf.length*8;

  }

  arrayP : any = [];
  arrayPdf : any = [];
  filterVenta:any = [];
  header = [[ 'Item', 'Modelo', 'Descripcion/Serie','Cantidad','P.Unit','S.Total', 'V.venta']]
  igv : string = "";
  total : string ="";
  generatePdf(numeroComprobante:string){
        var pdf = new jsPDF();
        this.arrayPdf =[]
        this.arrayP=[]
        console.log(this.arrayPdf);

        //Filtrar Venta

        const nuevoNumero = Number(numeroComprobante);

        this.filterVenta = this.ventas.filter(function(ele: any){
          return ele.id_venta == nuevoNumero;
        });

        console.log(this.filterVenta);

        this.getProductos(numeroComprobante);
        
        pdf.rect(120, 10, 80, 15, 'F');
        pdf.rect(120, 40, 80, 15, 'F')

        pdf.setTextColor('#FFFFFF');
        pdf.setFont('', 'bold')
        pdf.text('FACTURA ELECTRONICA', 125, 19);
        
        
        pdf.setTextColor('#FFFFFF');
        pdf.setFont('', 'bold')
        pdf.text(this.filterVenta[0].ven_serieComprobante + "-" + this.filterVenta[0].ven_numeroComprobante, 147, 49);
        
        pdf.setTextColor('#030303');
        
        //Datos de la Empresa
        pdf.addImage("https://tse2.mm.bing.net/th?id=OIP.cYWQK9OSoxIMGgIkBwl9GgHaHa&pid=Api&P=0&w=300&h=300", "jpg", 
        30, 10, 50, 50);
          //Direccion 
          pdf.setFontSize(11);
          pdf.setFont('', 'bold')
          pdf.text('Jiron Orbegoso #860 Int "2A" 13001 Trujillo-Perú', 10, 65);
          

          pdf.addImage("https://lh3.googleusercontent.com/Ol7K4Z4d1rGTsfiyMlurQi90oJay5kbfHRXi8p5-qRz4XRrJTu1d8_h6cB9jHk5D_9U=s180","png",
          10, 66, 5, 5);
          pdf.setFont('', 'bold')
          pdf.text('917006760', 16, 70);

          pdf.addImage("https://tse2.mm.bing.net/th?id=OIP.nNQv7GMmjm5JkpSlB1TwigHaHa&pid=Api&P=0&w=300&h=300","jpg",
          10, 72, 6, 6);
          pdf.setFont('', 'bold')
          pdf.text('telenorSac@gmail.com', 16, 76);
       
        
        pdf.roundedRect(10, 80, 190, 30, 1, 1, 'S');
        pdf.setFontSize(11);

        pdf.setFont('', 'bold')
        pdf.text("Sr/Sra(s): ", 12, 87);
        pdf.setFont('', 'normal')
        pdf.text(this.filterVenta[0].Personas.per_razonSocial, 35, 87);


        pdf.setFont('', 'bold');
        pdf.text("RUC: ", 12, 95);
        pdf.setFont('', 'normal')
        pdf.text(this.filterVenta[0].Personas.per_numeroDocumento, 35, 95);

        pdf.setFont('', 'bold');
        pdf.text("Direccion:", 12, 103);
        pdf.setFont('', 'normal')
        pdf.text(this.filterVenta[0].Personas.per_direccion, 35, 103);

        pdf.setFont('', 'bold');
        pdf.text("F.Emision:", 150, 87);
        pdf.setFont('', 'normal')
        pdf.text(this.filterVenta[0].createdAt, 170, 87);

        pdf.setFont('', 'bold');
        pdf.text("Moneda:", 150, 95);
        pdf.setFont('', 'normal')
        pdf.text(this.filterVenta[0].Monedas.mon_nombre, 170, 95);
        const margiTopiGV =   this.tamañoFilas + 20 + 115+3;
        const margiTopTotal =   margiTopiGV + 5;
        this.igv = (this.filterVenta[0].ven_igv).toString();
        this.total = (this.filterVenta[0].ven_total).toString();
        /*
        const igv = this.filterVenta[0].ven_igv;
        const total = this.filterVenta[0].ven_total;*/

        pdf.text('IGV:  ', 160, margiTopiGV);
        pdf.text(this.igv, 184, margiTopiGV);
        pdf.text('TOTAL:', 160, margiTopTotal);
        pdf.text(this.total, 184, margiTopTotal);
        //pdf.text(total, 163, margiTopTotal);


        (pdf as any).autoTable({
          columnStyles: { Cantidad: { halign: 'center' } },
          
          margin:{top:115, right:10, left:10},
          head: this.header,
          body: this.arrayPdf,
          theme: 'striped',
          didDrawCell: () => {
              
          }
          });


        //Total de venta
        this.totalVenta = this.filterVenta[0].ven_total ;

        pdf.save(`prueba.pdf` );
  }

}

