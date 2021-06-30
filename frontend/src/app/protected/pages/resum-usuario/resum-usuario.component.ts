import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuarios } from '../../interfaces/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-resum-usuario',
  templateUrl: './resum-usuario.component.html',
  styleUrls: ['./resum-usuario.component.css']
})
export class ResumUsuarioComponent implements OnInit {

  @Input() isVisbleResumenUsuario: any;
  @Input() idUsuario: any;
  @Output() newVisibleResumenUsuario : EventEmitter<boolean>  = new EventEmitter<boolean>();

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

  formUsuarios: FormGroup = this.fb.group({
    us_apellidos: [, []],
    us_nombres: [, []],
    us_numeroDocumento: [, []],
    us_direccion: [, []],
    us_telefono: [, []],
    us_email: [, []],
    us_perfil: [, []],
    us_tipoDocumento: [, []],
    us_login: [, []],
  });





  constructor(private usuarioService: UsuarioService,
              private fb: FormBuilder,
              private activateRoute: ActivatedRoute,
              private message: NzMessageService) { }

  ngOnInit(): void {
    const params = this.activateRoute.snapshot.params;
    if(this.idUsuario){
      this.usuarioService.getUsuario(this.idUsuario)
      .subscribe(
        res => {
          this.usuarios = res;
          
        },
        err => console.log(err)
      )
    }
  }

  handleCancelResumen(): void{
    this.isVisbleResumenUsuario = false;
    this.newVisibleResumenUsuario.emit(this.isVisbleResumenUsuario);
    

  }
 
  mensajeCopiado(type: string): void {
    this.message.create(type, '¡Copiado Exitosamente!');
  }

}
