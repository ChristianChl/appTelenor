import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {

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

  isVisibleCliente = false;

  constructor(private personaService:PersonaService) { }

  formPrueba = new FormGroup({
    filterTipoDoc: new FormControl()
  });

  


  ngOnInit(): void {
      this.getCliente();
  }

  openModalCliente(){
    this.idCliente = "";
    this.isVisibleCliente = true;
  }

  idCliente = "";
  modalEditCliente(id:string){
    this.isVisibleCliente = true;
    this.idCliente = id;
  }

  nuevoDatoCliente(){
    this.ngOnInit();
    this.isVisibleCliente = false;
  }


  getCliente(){
    this.personaService.getPersonas().subscribe(
      res => {
        this.persona = res;
        this.persona = this.persona.persona;
         this.persona.filter((x: { TipoPersonas: { tipoper_descripcion: string; }; }) => x.TipoPersonas.tipoper_descripcion == 'Proveedor');
        
         this.persona = this.persona.filter(function(ele: any){

          return ele.TipoPersonas.tipoper_descripcion == 'Cliente';

        });
      },
      err => console.error(err)
    );
  }

  deleteProveedor(id: string){
    this.personaService.deletePersona(id).subscribe(
      res=> {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se Elimino el Proveedor con Exito',
          showConfirmButton: false,
          timer: 1500
        });
        this.getCliente();
      },
      err => console.log(err)
    );
  }
  

}
