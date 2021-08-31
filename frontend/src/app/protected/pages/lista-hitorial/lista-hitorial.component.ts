import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HistorialProductoService } from '../../services/historial-producto.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-lista-hitorial',
  templateUrl: './lista-hitorial.component.html',
  styleUrls: ['./lista-hitorial.component.css']
})
export class ListaHitorialComponent implements OnInit {
  historialProducto:any = [];
  @Input() isVisibleHistorial: any;
  @Input() idProducto: any;
  @Output() newVisibleHistorial : EventEmitter<boolean>  = new EventEmitter<boolean>();

  constructor(private productoService: ProductoService,
    private historialProductoService:HistorialProductoService) { }

  ngOnInit(): void {
    if(this.idProducto != ""){
      this.historialProductoService.getHistorialProductos()
      .subscribe(
        res => {
          let id = this.idProducto;
          this.historialProducto = res;
          this.historialProducto= this.historialProducto.historialProducto;

          this.historialProducto = this.historialProducto.filter(function(ele: any){
            return ele.id_producto == id;
          });

          for(let i=0; i<this.historialProducto.length; i++){
            const now = new Date(this.historialProducto[i].createdAt);
            var months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          
              let numMes:any = "";
              let mesPrueba =  Number([now.getMonth()+1]);
              if( mesPrueba <= 9){
                  numMes = "0"+ mesPrueba;
              }
              else{
                  numMes =  mesPrueba;
              }

            let formatted = now.getDate() + '/' + numMes  + '/' + now.getFullYear();

            this.historialProducto[i].createdAt = formatted;
        }
        },
        err => console.log(err)
      )
    }
  }

  handleCancelHistorial(){
    this.isVisibleHistorial = false;
    this.newVisibleHistorial.emit(this.isVisibleHistorial);
  }
}
