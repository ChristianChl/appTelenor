import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../services/marca.service';

@Component({
  selector: 'app-list-marca',
  templateUrl: './list-marca.component.html',
  styleUrls: ['./list-marca.component.css']
})
export class ListMarcaComponent implements OnInit {

  marca:any = [];

  filterNombre = "";
  filterDescripcion = "";
  filterEstado = "";

  select: any = [
    {text:"Activos", value:"true"},
    {text:"Inactivos", value:"false"},
    {text:"Resetear", value:""}
  ];


  constructor(private marcaService:MarcaService) { }

  ngOnInit(): void {
      this.getMarcas();
  }

  idMarca = "";
  isVisibleMarca = false;
  showModalMarca(){
    this.isVisibleMarca = true;  
    
    this.idMarca = "";
  }

  nuevoDatoMarca(){
    this.ngOnInit();
    this.isVisibleMarca = false;
  }

  showModalEditarMarca(id:string){
    this.isVisibleMarca = true;  
    this.idMarca = id;
  }

  getMarcas(){
    this.marcaService.getMarcas().subscribe(
      res => {
        this.marca = res;
        this.marca = this.marca.marca;
      },
      err => console.error(err)
    );
  }

  deleteMarca(id: string){
    this.marcaService.deleteMarca(id).subscribe(
      res=> {
        this.getMarcas();
      },
      err => console.log(err)
    );
  }

}
