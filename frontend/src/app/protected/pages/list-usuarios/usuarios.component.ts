import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { FormUsuarioComponent } from '../form-usuarios/form-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  isVisibleUsuario = false
  isVisbleResumenUsuario = false
  idUsuario = "";
  usuarios:any = [];

  filterUsuario =  "";
  filterNombre = "";
  filterApellido = "";
  filterEstado  = "";
  filterDocumento = "";
  filterNumero = "";
  filterTelefono = "";
  filterPerfil = "";

  select: any = [
    {text:"Activos", value:"true"},
    {text:"Inactivos", value:"false"},
    {text: "Resetear", value: ""}
  ];


  
  


  constructor(private usuariosService: UsuarioService) { }

  ngOnInit(): void {
    
      this.getUsuarios();
      
  }

  getUsuarios(){
    this.usuariosService.getUsuarios().subscribe(
      res => {
        this.usuarios = res;
        this.usuarios = this.usuarios.usuarios;
      },
      err => console.error(err)
    );
  }

  deleteUsuario(id: string){
    this.usuariosService.deleteUsuario(id).subscribe(
      res=> {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se Elimino el Usuario con Exito!',
          showConfirmButton: false,
          timer: 1500
        });
        this.getUsuarios();
      },
      err => console.log(err)
    );
  }

  showModalUsuario(): void {
    this.idUsuario ="";
    this.isVisibleUsuario = true;  
  }
  showModalUsuarioEdit(id: string): void {
    this.isVisibleUsuario = true;
    this.idUsuario = id;  
  }
  nuevoDato(){
    this.ngOnInit();
    this.isVisibleUsuario = false;
  }

  modalResumenUsuario(id: string): void {
    this.idUsuario =id;
    this.isVisbleResumenUsuario = true;  
  }
  nuevoDatoResumenDato(){
    this.ngOnInit();
    this.isVisbleResumenUsuario = false;
  }
  
}
