import { Component, OnInit } from '@angular/core';

import { ProductoService } from '../../services/producto.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { buffer } from 'rxjs/operators';
import { HistorialProductoService } from '../../services/historial-producto.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-reporte-productos',
  templateUrl: './reporte-productos.component.html',
  styleUrls: ['./reporte-productos.component.css']
})
export class ReporteProductosComponent implements OnInit {
  tipoDoc: any = [
    {text:"Mes Actual", value:"1"}
  ];

  formRotacion = new FormGroup({
    indiceRotacion: new FormControl()
  });

  producto:any = [];

  filterModelo = "";
  filterCaracteristica = "";
  filterTipo = "";
  filterCategoria = "";
  filterMedida = "";
  filterStock ="";
  
  constructor(private prductoService:ProductoService,
    private historialProductoService:HistorialProductoService) { }

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

  historialProducto:any = [];
  historialProductoFilter:any = [];
  stockInicialDiaAyer:number = 0;
  stockFinalDiaAyer:number = 0;
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
        
        this.historialProductoService.getHistorialProductos()
        .subscribe(
        res => {
          var months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            
          console.log(res);
          this.historialProducto = res;
          this.historialProducto= this.historialProducto.historialProducto;
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
          console.log(formattedAyer);

          for(let i=0; i<this.historialProducto.length; i++){
            const now = new Date(this.historialProducto[i].createdAt);
            let numMes:any = "";
            let mesPrueba =  Number([now.getMonth()+1]);
            if( mesPrueba <= 9){
                numMes = "0"+ mesPrueba;
            }
            else{
                numMes =  mesPrueba;
            }
            let formatted = now.getDate() + '-' + numMes + '-' + now.getFullYear();
            

            this.historialProducto[i].createdAt = formatted;
          }

          for(let i=0; i<this.producto.length; i++){
            let cantidadVentas = 0;
            let id = this.producto[i].id_Producto;
            console.log(formattedAyer);
            this.historialProductoFilter = this.historialProducto.filter(function(ele: any){
              return ele.id_producto == id && ele.createdAt == formattedAyer;
            });
            console.log(this.historialProductoFilter);
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
                  this.stockInicialDiaAyer = this.historialProductoFilter[0].hist_stock;
                }
                

                if(this.historialProductoFilter[cant-1].hist_cambioTiempo == "Venta"){
                  this.stockFinalDiaAyer = this.historialProductoFilter[0].hist_stock;
                }
                else if(this.historialProductoFilter[cant-1].hist_cambioTiempo == "Compra"){
                  this.stockFinalDiaAyer = this.historialProductoFilter[0].hist_stock - this.historialProductoFilter[0].hist_cantCompra;;
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
            

            console.log(rotacion);
            this.producto[i].prod_imagen = rotacion;
            
          }
          
        },
        err => console.log(err)
      )

        console.log(this.producto);

      },
      err => console.error(err)
    );
  }

  

  onChangeTipoCambio(newValue:any){
    console.log(newValue);

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

    if(newValue == 1){
      for(let i=0; i<this.producto.length; i++){
        let cantidadVentas = 0;
        let id = this.producto[i].id_Producto;
        console.log(formattedAyer);
        this.historialProductoFilter = this.historialProducto.filter(function(ele: any){
          return ele.id_producto == id && ele.createdAt >= primerDiaMes ;
        });
        this.historialProductoFilter = this.historialProductoFilter.filter(function(ele: any){
          return ele.createdAt <= formattedAyer ;
        });
        console.log(this.historialProductoFilter);
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
              this.stockInicialDiaAyer = this.historialProductoFilter[0].hist_stock;
            }
            

            if(this.historialProductoFilter[cant-1].hist_cambioTiempo == "Venta"){
              this.stockFinalDiaAyer = this.historialProductoFilter[0].hist_stock;
            }
            else if(this.historialProductoFilter[cant-1].hist_cambioTiempo == "Compra"){
              this.stockFinalDiaAyer = this.historialProductoFilter[0].hist_stock - this.historialProductoFilter[0].hist_cantCompra;;
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
        

        console.log(rotacion);
        this.producto[i].prod_imagen = rotacion;
        
      }
    }
  }
}
