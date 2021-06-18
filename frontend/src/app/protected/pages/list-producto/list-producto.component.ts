import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.css']
})
export class ListProductoComponent implements OnInit {

  isVisibleProducto = false;
  isVisibleCategoria = false;

  producto:any = [];
  categoria:any = [];
  tipos:any = [];
  medida:any = [];
  constructor(private prductoService:ProductoService) { }

  ngOnInit(): void {
      this.getProductos();
  }

  openModalProducto(){
    this.idProducto = "";
    this.isVisibleProducto = true;
  }

  idProducto = "";
  modalEditProducto(id:string){

    console.log("Este es el id _-----" + id);
    this.isVisibleProducto = true;
    this.idProducto = id;
  }

  

  getProductos(){
    this.prductoService.getProductos().subscribe(
      res => {
        this.producto = res;
        this.producto = this.producto.producto;
        this.tipos = this.producto.Tipos;
        
        console.log(this.producto);
        console.log(this.tipos);
        console.log("this.producto.producto");
      },
      err => console.error(err)
    );
  }

  deleteProducto(id: string){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.prductoService.deleteProducto(id).subscribe(
          res=> {
            console.log(res)
            this.getProductos();

            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )

          },
          err => console.log(err)
          
        );

        
      }
    })
  }

  nuevoDatoProducto(){
    this.ngOnInit();
    this.isVisibleProducto = false;
  }

  nuevoDatoCategoria(){
    this.ngOnInit();
    this.isVisibleCategoria = false;
  }

}
