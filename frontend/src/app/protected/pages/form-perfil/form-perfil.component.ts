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
  }
  edit: boolean = false;

  
  formPerfil: FormGroup = this.fb.group({
    perf_nombre: [, [Validators.required]],
    perf_descripcion: [, [Validators.required]],
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private perfilService: PerfilService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.edit = false;
    console.log(this.idPerfil);
    if(this.idPerfil != ""){
      this.edit = true;
      this.perfilService.getPerfil(this.idPerfil)
      .subscribe(
        res => {
          this.perfil = res;
          
        },
        err => console.log(err)

      )
    }else{

      this.perfil.id_perfil = 0;
      this.perfil.perf_nombre = "";
      this.perfil.perf_descripcion = "";

    }
  }
  guardarPerfil(){
    this.perfilService.savePerfil(this.perfil)
    .subscribe(ok =>{
      
      if( ok == true && this.formPerfil.valid ) {
        
        Swal.fire('Success', 'Perfil creado exitosamente!', 'success');
        this.formPerfil.reset();
        this.handleCancelPerfil();

      }else{
        this.formPerfil.markAllAsTouched();
        Swal.fire('Error', ok, 'error');
        console.log(ok);
      }
      
    });
  }
  updatePerfil(){
    const params = this.activatedRoute.snapshot.params;
    this.perfilService.updatePerfil(this.idPerfil, this.perfil)
    .subscribe(ok =>{
      if(this.formPerfil.valid){
        Swal.fire('Success', 'Perfil actualizado exitosamente!', 'success');
        console.log(ok);
        this.formPerfil.reset();
        this.handleCancelPerfil();
      }else{
        this.formPerfil.markAllAsTouched();
        // Swal.fire('Error', ok, 'error');
        console.log(ok);
      }
    });
  }

  handleCancelPerfil(): void{
    this.isVisiblePerfil = false;
    this.formPerfil.reset();
    this.newVisiblePerfil.emit(this.isVisiblePerfil);

  }

  campoEsValido(campo: string){
    return this.formPerfil.controls[campo].errors && this.formPerfil.controls[campo].touched;
  }

}
