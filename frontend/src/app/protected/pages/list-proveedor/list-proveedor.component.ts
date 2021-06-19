import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-list-proveedor',
  templateUrl: './list-proveedor.component.html',
  styleUrls: ['./list-proveedor.component.css']
})
export class ListProveedorComponent implements OnInit {

  persona:any = [];
  proveedor:any = [];

  isVisibleProveedor = false;

  constructor(private personaService:PersonaService) { }

  ngOnInit(): void {
      this.getProveedor();
  }

  openModalProveedor(){
    this.idProveedor = "";
    this.isVisibleProveedor = true;
  }

  idProveedor = "";
  modalEditProveedor(id:string){

    console.log("Este es el id _-----" + id);
    this.isVisibleProveedor = true;
    this.idProveedor = id;
  }

  nuevoDatoProveedor(){
    this.ngOnInit();
    this.isVisibleProveedor = false;
  }


  getProveedor(){
    this.personaService.getPersonas().subscribe(
      res => {
        this.persona = res;
        console.log(this.persona);
        this.persona = this.persona.persona;
        console.log(this.persona);
        //const personasFiltradas = this.persona.filter((x: { TipoPersonas: { tipoper_descripcion: string; }; }) => x.TipoPersonas.tipoper_descripcion == 'Proveedor');
        
         this.persona = this.persona.filter(function(ele: any){

          return ele.TipoPersonas.tipoper_descripcion == 'Proveedor';

        });
        

        console.log(this.persona);
      },
      err => console.error(err)
    );
  }

  deleteProveedor(id: string){
    this.personaService.deletePersona(id).subscribe(
      res=> {
        console.log(res)
        this.getProveedor();
      },
      err => console.log(err)
    );
  }


}
