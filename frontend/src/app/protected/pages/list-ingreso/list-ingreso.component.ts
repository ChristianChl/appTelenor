import { Component, OnInit } from '@angular/core';
import { IngresoService  } from '../../services/ingreso.service';
import { PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import { jsPDF } from 'jspdf'
import 'jspdf-autotable';
import {UserOptions} from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { devOnlyGuardedExpression } from '@angular/compiler';
import { TablaIngreso } from '../../interfaces/tablaIngreso';
import { Marca } from '../../interfaces/Marca';

import { DetalleIngresoService } from '../../services/detalle-ingreso.service';

@Component({
  selector: 'app-list-ingreso',
  templateUrl: './list-ingreso.component.html',
  styleUrls: ['./list-ingreso.component.css']
})
export class ListIngresoComponent implements OnInit {

  

  tablaIngreso:TablaIngreso = {
    producto: '',
    cantidad: 0,
    precioCompra: 0,
  }
  
  arrayPdf:any=[];

  ingreso:any = [];
  detalleIngreso:any = [];

  filterNombre = "";
  filterDescripcion = "";
  filterEstado = "";

  select: any = [
    {text:"Activos", value:"true"},
    {text:"Inactivos", value:"false"},
    {text:"Resetear", value:""}
  ];
  titulo1 ="eeeeeeeeddf";
  titulo2 ="eeeeeeeeddf";
  titulo3 ="eeeeeeeeddf";
  titulo4 ="eeeeeeeeddf";

  constructor(private ingresoService:IngresoService, private detalleIngresoService:DetalleIngresoService) { }

  ngOnInit(): void {
      this.getIngreso();
      this.getDetalleIngreso();
  }

  header = [[ 'Name', 'Cantidad', 'Precio']]

    tableData = [
        [1, 'John', 'john@yahoo.com', 'HR'],
        [2, 'Angel', 'angel@yahoo.com', 'Marketing'],
        [3, 'Harry', 'harry@yahoo.com', 'Finance'],
        [4, 'Anne', 'anne@yahoo.com', 'Sales'],
        [5, 'Hardy', 'hardy@yahoo.com', 'IT'],
        [6, 'Nikole', 'nikole@yahoo.com', 'Admin'],
        [7, 'Sandra', 'Sandra@yahoo.com', 'Sales'],
        [8, 'Lil', 'lil@yahoo.com', 'Sales']
    ]
    arrayP : any = [];
  generatePdf(numeroComprobante:string){
        
        const nuevoNumero = Number(numeroComprobante);

        this.detalleIngreso = this.detalleIngreso.filter(function(ele: any){

          return ele.fk_id_ingreso == nuevoNumero;

        });

        console.log(this.detalleIngreso);
        
        for(let i=0; i<this.detalleIngreso.length;i++){
            this.tablaIngreso.producto = this.detalleIngreso[i].Productos.prod_modelo;
            this.tablaIngreso.cantidad = this.detalleIngreso[i].deti_cantidad;
            this.tablaIngreso.precioCompra = Number(this.detalleIngreso[i].deti_precioCompra);
            
            this.arrayP.push([this.tablaIngreso.producto, this.tablaIngreso.cantidad,this.tablaIngreso.precioCompra])
            

            this.arrayPdf.push(this.tablaIngreso);
        }

        console.log(this.arrayP);
        var pdf = new jsPDF();

        pdf.setFontSize(12);
        pdf.roundedRect(130, 20, 65, 45, 3, 3, 'S');
        pdf.text('Comprobante', 150, 28);
        pdf.text('Comprobante', 150, 38);
        pdf.text('Comprobante', 150, 48);
        pdf.text('Comprobante', 150, 58);
        pdf.addImage("https://tse2.mm.bing.net/th?id=OIP.cYWQK9OSoxIMGgIkBwl9GgHaHa&pid=Api&P=0&w=300&h=300", "jpg", 15, 20, 40, 40);


        
        this.titulo1 = 'Template Syntax';

        pdf.setFontSize(12);
        pdf.setTextColor(99);

        
        (pdf as any).autoTable({
        columnStyles: { Cantidad: { halign: 'center' } },
        margin:{top:70},
        head: this.header,
        body: this.arrayP,
        theme: 'grid',
        didDrawCell: () => {
            
        }
        })

        var element : HTMLElement | any = document.getElementById('boleta');
        
        
        console.log(element)
        html2canvas(element).then((canvas) => { 
          
          var imgdata = canvas.toDataURL("image/png");
          pdf.addImage(imgdata,130,20,65, 45)

          pdf.save('table.pdf');  
        })

        // Download PDF pdf  
        

  }

  getDetalleIngreso(){
    this.detalleIngresoService.getIngresos().subscribe(
      res => {
        this.detalleIngreso = res;
        this.detalleIngreso = this.detalleIngreso.detalleIngreso;
        console.log(this.detalleIngreso)

      },
      err => console.error(err)
    );
  }

  getIngreso(){
    this.ingresoService.getIngresos().subscribe(
      res => {
        this.ingreso = res;
        this.ingreso = this.ingreso.ingreso;
        const now = new Date('2021-06-30T15:49:26.000Z');
        var months = ['Jan', 'Feb', 'Mar', 'May', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        
        formatted = now.getFullYear() + ' ' + months[now.getMonth()] + ' ' + 
            now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + 
            now.getSeconds();
        console.log(this.ingreso);console.log(formatted);

        for(let i=0; i<this.ingreso.length; i++){
            const now = new Date(this.ingreso[i].createdAt);
            var months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        
            formatted = now.getFullYear() + ' ' + months[now.getMonth()] + ' ' + 
            now.getDate() + ' /// ' + now.getHours() + ':' + now.getMinutes() + ':' + 
            now.getSeconds();

            this.ingreso[i].createdAt = formatted;
        }
      },
      err => console.error(err)
    );
  }

  

}
