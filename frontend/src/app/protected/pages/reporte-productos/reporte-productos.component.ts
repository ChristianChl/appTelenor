import { Component, OnInit } from '@angular/core';

import { ProductoService } from '../../services/producto.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { buffer } from 'rxjs/operators';
@Component({
  selector: 'app-reporte-productos',
  templateUrl: './reporte-productos.component.html',
  styleUrls: ['./reporte-productos.component.css']
})
export class ReporteProductosComponent implements OnInit {
  producto:any = [];

  filterModelo = "";
  filterCaracteristica = "";
  filterTipo = "";
  filterCategoria = "";
  filterMedida = "";
  filterStock ="";
  
  constructor(private prductoService:ProductoService) { }

  ngOnInit(): void {
    this.getProductos();
  }

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
      docResult.save('tutorial.pdf')
    })
  }

  getProductos(){
    this.prductoService.getProductos().subscribe(
      res => {
        this.producto = res;
        this.producto = this.producto.producto;


        this.producto.sort(function (a:any, b:any) {
          if (a.Categorias.cat_nombre > b.Categorias.cat_nombre) {
            return 1;
          }
          if (a.Categorias.cat_nombre < b.Categorias.cat_nombre) {
            return -1;
          }
          return 0;
        });

        console.log(this.producto);

      },
      err => console.error(err)
    );
  }

}
