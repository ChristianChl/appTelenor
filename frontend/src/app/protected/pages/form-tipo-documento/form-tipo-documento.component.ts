import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { TipoDocumento } from '../../interfaces/TipoDocumento';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-tipo-documento',
  templateUrl: './form-tipo-documento.component.html',
  styleUrls: ['./form-tipo-documento.component.css']
})
export class FormTipoDocumentoComponent implements OnInit {

  @Input() isVisibleTipoDocumento: any;
  @Input() idTipoDocumento: any;
  @Output() newVisibleTipoDocumento : EventEmitter<boolean>  = new EventEmitter<boolean>();

  tipoDocumento: TipoDocumento = {
    id_tipoDocumento: 0,
    tipodoc_descripcion: "",
  }
    edit: boolean = false;
  
  formTipoDocumento: FormGroup = this.fb.group({
    tipodoc_descripcion: [, [Validators.required]]
  });
  constructor(private fb: FormBuilder,
              private router: Router,
              private tipoDocumentoService: TipoDocumentoService,
              private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
  }

  guardarTipoDocumento(){

    this.tipoDocumentoService.saveDocumento(this.tipoDocumento)
    .subscribe(ok =>{
      
      if( ok == true && this.formTipoDocumento.valid ) {
        
        Swal.fire('Success', 'Tipo Documento creado exitosamente!', 'success');
        this.formTipoDocumento.reset();
        this.router.navigateByUrl('/dashboard/listaUsuarios');
        this.handleCancelTipoDocumento();

      }else{
        this.formTipoDocumento.markAllAsTouched();
        Swal.fire('Error', ok, 'error');
      }
      
    });



  }
  handleCancelTipoDocumento(): void{
    this.isVisibleTipoDocumento = false;
    this.formTipoDocumento.reset();
    this.newVisibleTipoDocumento.emit(this.isVisibleTipoDocumento);

  }

  campoEsValido(campo: string){
    return this.formTipoDocumento.controls[campo].errors && this.formTipoDocumento.controls[campo].touched;
  }

}
