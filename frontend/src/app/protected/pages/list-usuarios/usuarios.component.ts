import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from '../../services/usuario.service';
import { FormUsuarioComponent } from '../form-usuarios/form-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  isVisibleUsuario = false
  idUsuario = "";
  filterPost =  "";
  usuarios:any = [];

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
        this.getUsuarios();
      },
      err => console.log(err)
    );
  }

  showModalUsuario(): void {
    console.log(this.isVisibleUsuario);
    this.idUsuario ="";
    this.isVisibleUsuario = true;  
    
  }
  showModalUsuarioEdit(id: string): void {
    console.log(this.isVisibleUsuario);
    this.isVisibleUsuario = true;
    this.idUsuario = id;  
    
  }
  nuevoDato(){
    this.ngOnInit();
    this.isVisibleUsuario = false;
  }


}
