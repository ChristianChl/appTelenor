import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-precios-productos',
  templateUrl: './precios-productos.component.html',
  styleUrls: ['./precios-productos.component.css']
})
export class PreciosProductosComponent implements OnInit {
  producto:any = [];
  filterModelo = "";
  filterCategoria = "";
  filterMedida = "";
  filterStock ="";
  filterEstado = "";
  filterMoneda = "";
  filterPrecio = "";

  select: any = [
    {text:"Activos", value:"true"},
    {text:"Inactivos", value:"false"},
    {text: "Resetear", value: ""}
  ];


  constructor(private prductoService:ProductoService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(){
    this.prductoService.getProductos().subscribe(
      res => {
        this.producto = res;
        this.producto = this.producto.producto;
      },
      err => console.error(err)
    );
  }
}
