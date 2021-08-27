import { Component, OnInit } from '@angular/core';
import { TipoProductoService } from '../../services/tipo-producto.service';

@Component({
  selector: 'app-list-tipo-producto',
  templateUrl: './list-tipo-producto.component.html',
  styleUrls: ['./list-tipo-producto.component.css']
})
export class ListTipoProductoComponent implements OnInit {

  tipoProducto:any = [];
  constructor(private tipoProductoService:TipoProductoService) { }

  isVisibleTipoProducto = false;
  openModalTipoProducto(){
    this.idTipoProducto = "";
    this.isVisibleTipoProducto = true;
  }

  idTipoProducto = "";
  modalEditTipoProducto(id:string){
    this.isVisibleTipoProducto= true;
    this.idTipoProducto = id;
  }

  nuevoDatoTipoProducto(){
    this.ngOnInit();
    this.isVisibleTipoProducto = false;
  }



  ngOnInit(): void {
      this.getTipoProducto();
  }

  getTipoProducto(){
    this.tipoProductoService.getTipoProductos().subscribe(
      res => {
        this.tipoProducto = res;
        this.tipoProducto = this.tipoProducto.tipoProducto;
      },
      err => console.error(err)
    );
  }

  deleteTipoProducto(id: string){
    this.tipoProductoService.deleteTipoProducto(id).subscribe(
      res=> {
        this.getTipoProducto();
      },
      err => console.log(err)
    );
  }

}
