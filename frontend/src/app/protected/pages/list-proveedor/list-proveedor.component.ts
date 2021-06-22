import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-list-proveedor',
  templateUrl: './list-proveedor.component.html',
  styleUrls: ['./list-proveedor.component.css']
})
export class ListProveedorComponent implements OnInit {

  persona:any = [];
  proveedor:any = [];
  filterEmail = "";
  filterRazon = "";
  filterTipoDoc="";
  filterNumDoc="";
  filterCelular="";
  filterEstado="";


  select: any = [
    {text:"Activos", value:"true"},
    {text:"Inactivos", value:"false"},
    {text:"Resetear", value:""}
  ];

  isVisibleProveedor = false;

  constructor(private personaService:PersonaService) { }

  formPrueba = new FormGroup({
    filterTipoDoc: new FormControl()
  });

  


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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se Elimino el Proveedor con Exito',
          showConfirmButton: false,
          timer: 1500
        });
        this.getProveedor();
      },
      err => console.log(err)
    );
  }
  

}
