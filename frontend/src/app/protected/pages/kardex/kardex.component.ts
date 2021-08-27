import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Cotizacion } from '../../interfaces/Cotizacion';
import { TablaKardex } from '../../interfaces/TablaKardex';
import { DetallVentaService } from '../../services/detall-venta.service';
import { DetalleIngresoService } from '../../services/detalle-ingreso.service';
import { IngresoService } from '../../services/ingreso.service';
import { ProductoService } from '../../services/producto.service';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css']
})
export class KardexComponent implements OnInit {

  ventas:any = [];
  producto:any = [];
  ingreso:any = [];
  detalleIngreso:any = [];
  detalleVenta:any = [];

  constructor(private productoService:ProductoService,
    private detalleIngresoService:DetalleIngresoService,
    private detallVentaService:DetallVentaService,
    private ventasService:VentasService,
    private ingresoService:IngresoService) { }

  formDatosBusqueda = new FormGroup({
    selecProducto: new FormControl(null),
  });

  formResultado = new FormGroup({
    modelo: new FormControl(),
    medida: new FormControl()
  });

  modelo = "";
  medida ="";



  ngOnInit(): void {
    this.getVentas();
    //this.getIngreso();
    this.getDetalleIngreso();
    this.getDetalleVentas();
    this.getProductos();

        
        
  }

  getProductos(){
    this.productoService.getProductos().subscribe(
      res => {
        this.producto = res;
        this.producto = this.producto.producto;
        
        this.producto = this.producto.filter(function(ele: any){
          return ele.prod_activo == true;
        });
      },
      err => console.error(err)
    );
  }

  getIngreso(){
    this.ingresoService.getIngresos().subscribe(
      res => {
        this.ingreso = res;
        this.ingreso = this.ingreso.ingreso;

        for(let i=0; i<this.ingreso.length; i++){
            const now = new Date(this.ingreso[i].createdAt);
            var months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
            let formatted = now.getDate()+ ' ' + months[now.getMonth()] + ' ' + now.getFullYear()   
            

            this.ingreso[i].createdAt = formatted;
        }
      },
      err => console.error(err)
    );
  }

  getVentas(){
    this.ventasService.getVentas().subscribe(
      res => {
        this.ventas = res;
        this.ventas = this.ventas.venta;

        for(let i=0; i<this.ventas.length; i++){
            const now = new Date(this.ventas[i].createdAt);
            var months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
            let formatted = now.getDate() + ' ' + months[now.getMonth()]  + ' ' + now.getFullYear();
            

            this.ventas[i].createdAt = formatted;
        }
      },
      err => console.error(err)
    );
  }

  getDetalleIngreso(){
    this.detalleIngresoService.getIngresos().subscribe(
      res => {
        this.detalleIngreso = res;
        this.detalleIngreso = this.detalleIngreso.detalleIngreso;

        for(let i=0; i<this.detalleIngreso.length; i++){
          const now = new Date(this.detalleIngreso[i].createdAt);
          var months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          let numMes:any = "";
            let mesPrueba =  Number([now.getMonth()+1]);
            if( mesPrueba <= 9){
                numMes = "0"+ mesPrueba;
            }
            else{
                numMes =  mesPrueba;
            }

          let formatted = now.getFullYear()+'-'+numMes+'-' +now.getDate();

          this.detalleIngreso[i].createdAt = formatted;
      }

      },
      err => console.error(err)
    );
  }

  getDetalleVentas(){
    this.detallVentaService.getDetalleVentas().subscribe(
      res => {
        this.detalleVenta = res;
        this.detalleVenta = this.detalleVenta.detalleVenta;

        for(let i=0; i<this.detalleVenta.length; i++){
            const now = new Date(this.detalleVenta[i].createdAt);
            var months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let numMes:any = "";
            let mesPrueba =  Number([now.getMonth()+1]);
            if( mesPrueba <= 9){
                numMes = "0"+ mesPrueba;
            }
            else{
                numMes =  mesPrueba;
            }

            let formatted = now.getFullYear()+'-'+numMes+'-' +now.getDate();

            this.detalleVenta[i].createdAt = formatted;
        }

      },
      err => console.error(err)
    );
  }

  selectedDevice:any = "";
  onChangeProducto(newValue:any){
    if(newValue === null){
      this.selectedDevice = 0;
    }
    else{
      this.selectedDevice = newValue;
    }
    
  }

  filterVentas:any = [];
  filterIngresos:any = [];
  filterVenta:any = [];
  filterIngreso:any = [];
  dataSourceKardex:any = [];
  filterProducto:any=[];
  buscarProducto(){
    
   

    this.filterVentas = [];
    this.filterIngresos = [];
    this.filterVenta = [];
    this.filterIngreso = [];
    this.dataSourceKardex = [];

    let idProducto = this.selectedDevice;
    
    this.filterProducto= this.producto.filter(function(ele: any){
      return ele.id_Producto == idProducto;
    });

    this.modelo = this.filterProducto[0].prod_modelo;
    this.medida = this.filterProducto[0].Medidas.med_unidad;



    this.filterVentas = this.detalleVenta.filter(function(ele: any){
      return ele.Productos.id_Producto == idProducto;
    });
    this.filterIngresos = this.detalleIngreso.filter(function(ele: any){
      return ele.Productos.id_Producto == idProducto;
    });

    if(this.filterVentas.length == 0 && this.filterIngresos.length == 0){
      Swal.fire({
        icon: 'warning',
        title: 'Alerta',
        text: 'No se encontraron movimientos para este producto',
      });
    }
    else{
      for(let i=0; i<this.filterVentas.length; i++){

        let numDuc = this.filterVentas[i].Ventas.ven_numeroComprobante;
  
        this.filterVenta = this.ventas.filter(function(ele: any){
          return ele.ven_numeroComprobante == numDuc;
        });
        
        this.dataSourceKardex.push({
          fecha:    this.filterVentas[i].createdAt,
          tipoDoc:  "Venta",
          numDoc:   this.filterVentas[i].Ventas.ven_numeroComprobante,
          cantidad: this.filterVentas[i].detv_cantidad,
          precio:   this.filterVentas[i].detv_precioVenta,
          moneda:   this.filterVenta[0].Monedas.mon_nombre
        });
  
      }
  
      for(let i=0; i<this.filterIngresos.length; i++){
  
        let numDuc = this.filterIngresos[i].Ingresos.ing_numeroComprobante;
  
        this.filterIngreso = this.ingreso.filter(function(ele: any){
          return ele.ing_numeroComprobante == numDuc;
        });
        
        this.dataSourceKardex.push({
          fecha:    this.filterIngresos[i].createdAt,
          tipoDoc:  "Compra",
          numDoc:   this.filterIngresos[i].Ingresos.ing_numeroComprobante,
          cantidad: this.filterIngresos[i].deti_cantidad,
          precio:   this.filterIngresos[i].deti_precioCompra,
          moneda:   "Soles"
        });
  
      }
      let temp;
      for(let i=0; i<this.dataSourceKardex.length; i++){
        for(let j=this.dataSourceKardex.length-1; j> i; j--){
          if(this.dataSourceKardex[j-1].fecha > this.dataSourceKardex[j].fecha){
              temp = this.dataSourceKardex[j-1];
              this.dataSourceKardex[j-1] = this.dataSourceKardex[j];
              this.dataSourceKardex[j] = temp;
          }
        }
      }
    }
    
  }
}
