import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Perfil } from '../../interfaces/Perfil';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-form-perfil',
  templateUrl: './form-perfil.component.html',
  styleUrls: ['./form-perfil.component.css']
})
export class FormPerfilComponent implements OnInit {
  @Input() isVisiblePerfil: any;
  @Input() idPerfil: any;
  @Output() newVisiblePerfil : EventEmitter<boolean>  = new EventEmitter<boolean>();



  perfil: Perfil = {
    id_perfil: 0,
    perf_nombre: "",
    perf_descripcion: ""
  };
  edit: boolean = false;

  
  formPerfil: FormGroup = this.fb.group({
    perf_nombre: ['', [Validators.required]],
    perf_descripcion: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private perfilService: PerfilService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.edit = false;
    const params = this.activatedRoute.snapshot.params;
    if(this.idPerfil!=""){
      this.perfilService.getPerfil(this.idPerfil)
      .subscribe(
        res => {
          this.perfil = res;
          this.edit = true;
          
        },
        err => console.log(err)

      )
    }else{
      this.edit=false;
      this.perfil.id_perfil = 0;
      this.perfil.perf_nombre = "";
      this.perfil.perf_descripcion = "";
    }
  }
  guardarPerfil(){
    this.perfilService.savePerfil(this.perfil)
    .subscribe(ok =>{
      
      if( ok == true && this.formPerfil.valid) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Perfil Creado Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.formPerfil.reset();
        this.handleCancelPerfil();

      }else{
        this.formPerfil.markAllAsTouched();
        Swal.fire('Error', ok, 'error');
      }
      
    });
  }
  updatePerfil(){
    const params = this.activatedRoute.snapshot.params;
    this.perfilService.updatePerfil(this.idPerfil, this.perfil)
    .subscribe(ok =>{
      if(ok == true && this.formPerfil.valid){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Perfil Actualizado Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.formPerfil.reset();
        this.ngOnInit();
        this.handleCancelPerfil();
      }else{
        this.formPerfil.markAllAsTouched();
        Swal.fire('Error', ok, 'error');
      }
    });
  }

  handleCancelPerfil(): void{
    this.isVisiblePerfil = false;
    this.newVisiblePerfil.emit(this.isVisiblePerfil);

  }
  campoEsValido(campo: string){
    return this.formPerfil.controls[campo].errors && this.formPerfil.controls[campo].touched;
  }

}
