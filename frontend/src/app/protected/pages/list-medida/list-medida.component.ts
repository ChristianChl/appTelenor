import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UnidadMedidaService } from '../../services/unidad-medida.service';

@Component({
  selector: 'app-list-medida',
  templateUrl: './list-medida.component.html',
  styleUrls: ['./list-medida.component.css']
})
export class ListMedidaComponent implements OnInit {

  medida:any = [];

  filterNombre = "";

  
  constructor(private medidaService:UnidadMedidaService) { }

  ngOnInit(): void {
      this.getMedidas();
  }

  isVisibleMedida = false;
  openModalMedida(){
    this.idMedida = "";
    this.isVisibleMedida = true;
  }

  idMedida = "";
  modalEditMedida(id:string){
    this.isVisibleMedida = true;
    this.idMedida = id;
  }

  nuevoDatoMedida(){
    this.ngOnInit();
    this.isVisibleMedida = false;
  }

  getMedidas(){
    this.medidaService.getMedidas().subscribe(
      res => {
        this.medida = res;
        this.medida = this.medida.medida;
      },
      err => console.error(err)
    );
  }

  deleteMedida(id: string){

    Swal.fire({
      title: 'Esta seguro de eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.medidaService.deleteMedida(id).subscribe(
          res=> {
            this.getMedidas();
            Swal.fire(
              'Eliminado!',
              'Usted ha eliminado la unidad de medida',
              'success'
            )
          },
          err => console.log(err)
        );

        
      }
    })
    
    
  }

}
