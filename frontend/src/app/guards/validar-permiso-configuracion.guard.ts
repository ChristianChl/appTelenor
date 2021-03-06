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

  get usuario() {
    return this.authService.usuario;
  }

  canActivate(): Observable<boolean> | boolean {
    return this.usuarioPermisoService.getUsuarioByPerId(this.usuario.uid, "Configuracion")
    .pipe(
      tap(valid =>{
        if(!valid){
          this.router.navigateByUrl('/dashboard/errorAcesso');
        }
      })
    );
  }
}

