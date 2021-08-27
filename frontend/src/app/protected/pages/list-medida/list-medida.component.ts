import { Component, OnInit } from '@angular/core';
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
    this.medidaService.deleteMedida(id).subscribe(
      res=> {
        this.getMedidas();
      },
      err => console.log(err)
    );
  }

}
