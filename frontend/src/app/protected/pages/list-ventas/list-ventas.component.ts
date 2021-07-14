import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Img, PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { VentasService } from '../../services/ventas.service';

PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-list-ventas',
  templateUrl: './list-ventas.component.html',
  styleUrls: ['./list-ventas.component.css']
})
export class ListVentasComponent implements OnInit {

  constructor(
    private ventasService:VentasService
  ) { }

  ngOnInit(): void {
    this.getVentas();
  }
  ventas:any = []
  getVentas(){
    this.ventasService.getVentas().subscribe(
      res => {
        this.ventas = res;
        this.ventas = this.ventas.venta;

        for(let i=0; i<this.ventas.length; i++){
            const now = new Date(this.ventas[i].createdAt);
            var months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
            let formatted = now.getFullYear() + ' ' + months[now.getMonth()] + ' ' + 
            now.getDate() + ' /// ' + now.getHours() + ':' + now.getMinutes() + ':' + 
            now.getSeconds();

            this.ventas[i].createdAt = formatted;
        }
      },
      err => console.error(err)
    );
  }

  async createPdf(){
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();

      pdf.images({
        picture1: await new Img('https://tse1.mm.bing.net/th?id=OIP.uNArs1pBSZw-pkFAzaf1CQHaFj&pid=Api&P=0&w=236&h=178').build(),
      })
      
      pdf.add(
        
        new Img('https://tse1.mm.bing.net/th?id=OIP.uNArs1pBSZw-pkFAzaf1CQHaFj&pid=Api&P=0&w=236&h=178').build()
      );

      pdf.styles({
        style1: {
            bold: true,
        },
        style2: {
            italics: true
        }
    });
      pdf.create().download();
  }

}

