import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuarios } from '../../interfaces/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { PerfilService } from '../../services/perfil.service';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { PermisoService } from '../../services/permiso.service';
import { UsuarioPermisoService } from '../../services/usuario-permiso.service';
import { UsuarioPermiso } from '../../interfaces/UsuarioPermiso';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {

  @Input() isVisibleUsuario: any;
  @Input() idUsuario: any;
  @Output() newVisibleUsuario : EventEmitter<boolean>  = new EventEmitter<boolean>();
  perfil: any = [];
  tipoDocumentos: any = [];
  permiso: any = [];
  usuarioPermiso: any = [];
  idPermisos: Number[] = [];

  isVisibleTipoDocumento = false;
  isVisiblePerfil = false;

  idTipoDocumento = "";
  idPerfil =  "";

  fechaActual: any = "";
  

  usuarios: Usuarios = {
    id_usuario: 0,
    us_apellidos: "",
    us_nombres: "",
    us_numeroDocumento: "", 
    us_direccion: "",
    us_telefono: "",
    us_email: "",
    us_fechaRegistro: "",
    us_login: "",
    us_clave: "",
    us_activo: "",
    fk_id_perfil: "",
    fk_id_tipoDocumento: ""
  }
  usuarioPermisos: UsuarioPermiso = {
    id_UsuarioPermiso: 0,
    fk_id_permiso: "",
    fk_id_usuario: ""
  }

  selected: any = [
    {id: 1, text:"Configuracion", value:"false"},
    {id: 2,text:"Maestro", value:"false"}
  ];
  

  edit: boolean = false;

  
  formUsuarios: FormGroup = this.fb.group({
    us_apellidos: [, [Validators.required]],
    us_nombres: [, [Validators.required]],
    us_numeroDocumento: ['', [Validators.required]],
    us_direccion: [, []],
    us_telefono: [, []],
    us_email: [, [Validators.required]],
    us_fechaRegistro: [, []],
    us_activo: [, [Validators.required]],
    us_perfil: [, [Validators.required]],
    us_tipoDocumento: [, [Validators.required]],
    us_login: [, [Validators.required]],
    us_clave: [, [Validators.required, Validators.minLength(6)]],
    Configuracion: [,[]],
    Maestro: [,[]],
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private usuarioService : UsuarioService,
              private perfilService: PerfilService,
              private tipoDocumentoService: TipoDocumentoService,
              private permisoService: PermisoService,
              private activatedRoute: ActivatedRoute,
              private usuarioPermisoService: UsuarioPermisoService,
              private datePipe: DatePipe ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.edit = false;
    if(this.idUsuario){
      this.usuarioService.getUsuario(this.idUsuario)
      .subscribe(
        res => {
          this.usuarios = res;
          this.edit = true;
        },
        err => console.log(err)
      )
      this.usuarioPermisoService.getUsuarioPermiso(this.idUsuario)
      .subscribe(
        res => {
          this.usuarioPermiso = res;
          // console.log(this.usuarioPermiso);
          // console.log(this.selected);
          for(let i=0; i<this.usuarioPermiso.length; i++){

            for(let k=0; k<this.selected.length; k++){

              if(this.usuarioPermiso[i].Permisos.perm_nombre == this.selected[k].text) {
  
                this.selected[k].checked  = true;
                // console.log(this.usuarioPermiso[i].Permisos.perm_nombre);
                // console.log(this.selected[i].text);
              }
            }

          }

        },
        err => console.log(err)
      )
    }else{
      this.fechaActual = this.datePipe.transform(new Date().toISOString(), 'yyyy-MM-dd');
      this.usuarios.us_fechaRegistro = this.fechaActual;
      this.usuarios.us_activo = "true";
    }

    this.edit = false;
    this.getTipoDocumento()
    this.getPerfil();
    this.getPermiso();
  }

  getPerfil(){

    this.perfilService.getPerfiles()
    .subscribe(resp =>{
      this.perfil = resp;
      this.perfil = this.perfil.perfil;
    },
    err => console.error(err)
    );
  }
  getTipoDocumento(){
    this.tipoDocumentoService.getDocumentos()
    .subscribe(resp =>{
      this.tipoDocumentos = resp;
      this.tipoDocumentos = this.tipoDocumentos.tiposDocumentos;
    },
    err => console.error(err)
    );
  }
  getPermiso(){
    this.permisoService.getPermisos()
    .subscribe(resp => {
      this.permiso = resp;
      this.permiso = this.permiso.permiso;
    },
    err => console.log(err)
    );
  }



  guardarUsuario(){
    this.usuarioService.saveUsuario(this.usuarios)
    .subscribe(resp =>{
      
      if( resp.ok == true && this.formUsuarios.valid ) {

        for(let i=0; i<this.selected.length; i++){

          if(this.selected[i].checked == true){
    
            this.usuarioPermisos.fk_id_permiso = this.selected[i].id;
            this.usuarioPermisos.fk_id_usuario = resp.usuario.id_usuario;
            this.usuarioPermisoService.saveUsuarioPermiso(this.usuarioPermisos)
            .subscribe(ok =>{
              console.log('usuario Permiso Guardado');
            },
            err => console.log(err)
            );
          }
    
        }
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario Creado Exitosamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.formUsuarios.reset();
        this.router.navigateByUrl('/dashboard/listaUsuarios');
        this.handleCancelUsuario();

      }else{
        this.formUsuarios.markAllAsTouched();
        Swal.fire('Error', resp, 'error');
        console.log(resp);
      }
      
    });

  }
  updateUsuario(){
    const params = this.activatedRoute.snapshot.params;
    this.usuarioPermisoService.deleteUsuarioPermisoByUsuario(this.idUsuario).subscribe(
      res => {
        this.usuarioService.updateUsuario(this.idUsuario, this.usuarios)
        .subscribe(resp =>{
        if( this.formUsuarios.valid ) {

          for(let i=0; i<this.selected.length; i++){
  
            if(this.selected[i].checked == true){
      
              this.usuarioPermisos.fk_id_permiso = this.selected[i].id;
              this.usuarioPermisos.fk_id_usuario = this.idUsuario;
              this.usuarioPermisoService.saveUsuarioPermiso(this.usuarioPermisos)
              .subscribe(ok =>{
                console.log('usuario Permiso Guardado');
              },
              err => console.log(err)
              );
            }
      
          }
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario Actualizado Exitosamente!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl('/dashboard/listaUsuarios');
          this.formUsuarios.reset();
          this.handleCancelUsuario();

      }else{
        this.formUsuarios.markAllAsTouched();
        Swal.fire('Error', resp, 'error');
      }
    });
  });
}

  campoEsValido(campo: string){
    return this.formUsuarios.controls[campo].errors && this.formUsuarios.controls[campo].touched;
  }

  handleCancelUsuario(): void{
    this.isVisibleUsuario = false;
    this.formUsuarios.reset();
    this.usuarios.id_usuario = 0;
    this.usuarios.us_apellidos ="";
    this.usuarios.us_nombres ="";
    this.usuarios.us_numeroDocumento ="";
    this.usuarios.us_direccion ="";
    this.usuarios.us_telefono ="";
    this.usuarios.us_email ="";
    this.usuarios.us_fechaRegistro ="";
    this.usuarios.us_login = "";
    this.usuarios.us_clave = "";
    this.usuarios.us_activo = "";
    this.usuarios.fk_id_perfil = "";
    this.usuarios.fk_id_tipoDocumento ="";
    this.newVisibleUsuario.emit(this.isVisibleUsuario);
  }

  showModalTipoDocumento(): void {
    console.log(this.isVisibleTipoDocumento);
    this.isVisibleTipoDocumento = true; 
    this.idTipoDocumento = ""; 
  }
  nuevoDatoDocumento(){
    this.ngOnInit();
    this.isVisibleTipoDocumento = false;
    
  }
  
  showModalPerfil(): void {
    console.log(this.isVisiblePerfil);
    this.isVisiblePerfil = true;
    this.idPerfil = "";  
  }
  nuevoDatoPerfil(){
    this.ngOnInit();
    this.isVisiblePerfil = false;
    
  }








  



}
