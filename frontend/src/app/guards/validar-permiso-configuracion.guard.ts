import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, timeout } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { UsuarioPermisoService } from '../protected/services/usuario-permiso.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarPermisoConfiguracionGuard implements CanActivate {

  constructor(private authService: AuthService,
              private usuarioPermisoService: UsuarioPermisoService,
              private router: Router ){}

  usuarioPermiso: any = [];
  permiso: boolean = false;
  get usuario() {
    return this.authService.usuario;
  }

  canActivate(): Observable<boolean> | boolean {
    console.log('canActivate');
    this.getPermisoC();

    return this.authService.validarToken()
    .pipe(
      timeout(2000),
      tap(valid =>{
        if(valid && !this.permiso){
          this.router.navigateByUrl('/dashboard/errorAcesso');
        }
      })
    );
  }

  getPermisoC() {
    
    this.usuarioPermisoService.getUsuarioPermiso(this.usuario.uid)
      .subscribe(
        resp => {
          this.usuarioPermiso = resp;
          for (let i = 0; i < this.usuarioPermiso.length; i++) {

            if (this.usuarioPermiso[i].Permisos.perm_nombre == "Configuracion") {

              this.permiso = true;
              console.log('permiso dentro del bucle Si');
              console.log(this.permiso);
              console.log(this.usuarioPermiso[i].Permisos.perm_nombre);

            }

          }

        },
        err => console.log(err)
      )
  }

}

