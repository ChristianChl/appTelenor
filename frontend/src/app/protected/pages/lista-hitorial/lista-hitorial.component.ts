import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HistorialProductoService } from '../../services/historial-producto.service';
import { ProductoService } from '../../services/producto.service';
import Swal from 'sweetalert2';

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

  fechaDesde:any ="";
  fechaHasta:any ="";
  fechaFormateada1: any = "";
  fechaFormateada2: any = "";


  formHistorial:FormGroup = this.fb.group({
    startDate: ['', []],
    endDate: ['', []]
  });

  constructor(private productoService: ProductoService,
    private historialProductoService:HistorialProductoService,
    private fb: FormBuilder,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.formHistorial.reset();
    if(this.idProducto != "" && this.fechaFormateada1 == "" && this.fechaFormateada2 == ""){
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

  buscar(){
    const {startDate, endDate} = this.formHistorial.value;
    
    if(startDate != "" && endDate != ""){

      this.fechaDesde = new Date(startDate);
      this.fechaHasta = new Date(endDate);
      this.fechaDesde.setDate(this.fechaDesde.getDate() + 1);
      this.fechaHasta.setDate(this.fechaHasta.getDate() + 2);
      this.fechaFormateada1 = this.datePipe.transform(this.fechaDesde.toISOString(), 'yyyy-MM-dd');
      this.fechaFormateada2 = this.datePipe.transform(this.fechaHasta.toISOString(), 'yyyy-MM-dd');
      this.historialProductoService.getHistorialByDates(this.fechaFormateada1, this.fechaFormateada2, this.idProducto)
        .subscribe(resp => {
          if (resp.ok) {
            let id = this.idProducto;
            this.historialProducto = resp;
            this.historialProducto = this.historialProducto.historialProducto;

            for (let i = 0; i < this.historialProducto.length; i++) {
              const now = new Date(this.historialProducto[i].createdAt);
              var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

              let numMes: any = "";
              let mesPrueba = Number([now.getMonth() + 1]);
              if (mesPrueba <= 9) {
                numMes = "0" + mesPrueba;
              }
              else {
                numMes = mesPrueba;
              }

              let formatted = now.getDate() + '/' + numMes + '/' + now.getFullYear();

              this.historialProducto[i].createdAt = formatted;
            }

          } else {
            Swal.fire('Error', resp, 'error');
          }

        });
    }else{

      Swal.fire('Error', 'No selecciono Rango de Fechas', 'error');

    }
    this.resetear();
    
    

  }
  buscarPorDia(){
    this.fechaDesde = new Date();
    this.fechaHasta = new Date();
    this.fechaDesde.setDate(this.fechaDesde.getDate() );
    this.fechaHasta.setDate(this.fechaHasta.getDate() + 1);
    this.fechaFormateada1 = this.datePipe.transform(this.fechaDesde.toISOString(), 'yyyy-MM-dd');
    this.fechaFormateada2 = this.datePipe.transform(this.fechaHasta.toISOString(), 'yyyy-MM-dd');

    this.historialProductoService.getHistorialByDates(this.fechaFormateada1, this.fechaFormateada2, this.idProducto)
    .subscribe(resp =>{
      if(resp.ok){
        let id = this.idProducto;
        this.historialProducto = resp;
        this.historialProducto= this.historialProducto.historialProducto;

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

      }else{
        Swal.fire('Error', resp, 'error');
      }

    });
    this.resetear();
  }
  resetear(){
    this.fechaFormateada1 = "";
    this.fechaFormateada2 = "";
    this.fechaDesde = "";
    this.fechaHasta = "";
  }

  handleCancelHistorial(){
    this.isVisibleHistorial = false;
    this.newVisibleHistorial.emit(this.isVisibleHistorial);
  }
}
