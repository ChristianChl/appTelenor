import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-list-perfil',
  templateUrl: './list-perfil.component.html',
  styleUrls: ['./list-perfil.component.css']
})
export class ListPerfilComponent implements OnInit {
  
  perfil: any = [];
  idPerfil = "";

  filterNombre = "";
  filterDescripcion = "";

  isVisiblePerfil = false;

  constructor(private perfilService: PerfilService) { }

  ngOnInit(): void {
    this.getPerfil();
  }

  getPerfil(){
    this.perfilService.getPerfiles().subscribe(
      res => {
        this.perfil = res;
        this.perfil = this.perfil.perfil;
      },
      err => console.error(err)
    );
  }
  deletePerfil(id: string){
    this.perfilService.deletePerfil(id).subscribe(
      res=>{
        this.getPerfil();
      },
      err => console.log(err)
    );
  }

  openModalPerfil() : void{
    this.idPerfil = "";
    this.isVisiblePerfil = true;
  }
  showModalPerfilEdit(id: string): void {
    this.isVisiblePerfil = true;
    this.idPerfil = id;  
  }
  nuevoDatoPerfil(){
    this.ngOnInit();
    this.isVisiblePerfil = false;
  }

}
