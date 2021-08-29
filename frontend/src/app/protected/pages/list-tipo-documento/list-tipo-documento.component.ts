import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TipoDocumentoService } from '../../services/tipo-documento.service';

@Component({
  selector: 'app-list-tipo-documento',
  templateUrl: './list-tipo-documento.component.html',
  styleUrls: ['./list-tipo-documento.component.css']
})
export class ListTipoDocumentoComponent implements OnInit {

  documento: any = [];
  idTipoDocumento = "";

  filterDescripcion = "";

  isVisibleDocumento = false;

  constructor(private documentoService: TipoDocumentoService) { }

  ngOnInit(): void {
    this.getDocumento();
  }
  getDocumento(){
    this.documentoService.getDocumentos().subscribe(
      res => {
        this.documento = res;
        this.documento = this.documento.tiposDocumentos;
      },
      err => console.log(err)
    );
  }
  deleteDocumento(id: string){
    Swal.fire({
      title: 'Esta seguro de eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.documentoService.deleteDocumento(id).subscribe(
          res=>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se Elimino el Documento con Exito!',
              showConfirmButton: false,
              timer: 1500
            });
            this.getDocumento();
          },
          err => console.log(err)
        );

        
      }
    })

    
  }
  openModalDocumento() : void{
    this.idTipoDocumento = "";
    this.isVisibleDocumento = true;
  }
  showModalDocumentoEdit(id: string): void {
    this.isVisibleDocumento = true;
    this.idTipoDocumento = id;
  }
  nuevoDatoDocumento(){
    this.ngOnInit();
    this.isVisibleDocumento = false;
  }

}
