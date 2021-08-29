import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import Swal from 'sweetalert2';

import { Categoria } from '../../interfaces/Categoria';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-list-categoria',
  templateUrl: './list-categoria.component.html',
  styleUrls: ['./list-categoria.component.css']
})
export class ListCategoriaComponent implements OnInit {

  formCategoria!: FormGroup;
  inputValue?: string;
  edit: boolean = false;
  switchValue = false;
  checked = true;

  filterNombre = "";
  filterDescripcion = "";
  filterEstado = "";

  select: any = [
    {text:"Activos", value:"true"},
    {text:"Inactivos", value:"false"},
    {text:"Resetear", value:""}
  ];

  categoria: Categoria = {
    id_categoria: 0,
    cat_nombre: '',
    cat_descripcion: '',
    cat_activo: ''
  };




  isVisibleCategoria = false;
  
  
  showModalCategoria(): void {
    this.isVisibleCategoria = true;  
    
    this.idCategoria = "";
  }
  
  idCategoria = "";
  showModalEditarCategoria(id:string){
    this.isVisibleCategoria = true;  
    this.idCategoria = id;
  }

  nuevoDato(){
    this.ngOnInit();
    this.isVisibleCategoria = false;
  }

  isVisible = false;
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  
  categorias:any = [];
  constructor(private categoriaService:CategoriasService, private modalService: NzModalService) { }

  ngOnInit(): void {
      this.getCategorias();
  }

  getCategorias(){
    this.categoriaService.getCategorias().subscribe(
      res => {
        this.categorias = res;
      
        this.categorias = this.categorias.categoria;
      },
      err => console.error(err)
    );
  }

  deleteCategoria(id: string){

    Swal.fire({
      title: 'Esta seguro de eliminar la Categoria?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.categoriaService.deleteCategoria(id).subscribe(
          res=> {
            this.getCategorias();
            Swal.fire(
              'Eliminado!',
              'Usted ha eliminado la categoria',
              'success'
            )
          },
          err => console.log(err)
        );
      }
    })

    
  }


}
