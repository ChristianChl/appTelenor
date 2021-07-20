import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { UsuarioPermisoService } from '../protected/services/usuario-permiso.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarPermisoConfiguracionGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private usuarioPermisoService: UsuarioPermisoService,
              private router: Router ){}

  usuarioPermiso: any = [];
  permiso: string = "";

    get usuario(){
      return this.authService.usuario;
    }
    
  canActivate(): Observable<boolean> | boolean {
    console.log('canActivate');
    this.usuarioPermisoService.getUsuarioPermiso(this.usuario.uid)
    .subscribe(
      resp => {
        this.usuarioPermiso = resp;
        for(let i=0; i<this.usuarioPermiso.length; i++){

          if(this.usuarioPermiso[i].Permisos.perm_nombre  == "Configuracion"){

            this.permiso = this.usuarioPermiso[i].Permisos.perm_nombre;

          }

        }

      },
      err =>console.log(err)
    )

    if (this.permiso == ""){

       this.router.navigateByUrl('/dashboard/errorAcesso');
       return false;

    }
    else{
      return true;
    }
 



  
  }
  canLoad(): Observable<boolean> | boolean {
    console.log('canLoad');
    this.usuarioPermisoService.getUsuarioPermiso(this.usuario.uid)
    .subscribe(
      resp => {
        this.usuarioPermiso = resp;
        for(let i=0; i<this.usuarioPermiso.length; i++){

          if(this.usuarioPermiso[i].Permisos.perm_nombre  == "Configuracion"){

            this.permiso = this.usuarioPermiso[i].Permisos.perm_nombre;

          }

        }

      },
      err =>console.log(err)
    )
    console.log(this.permiso);

    if (this.permiso == ""){

       this.router.navigateByUrl('/dashboard/errorAcesso');
       return false;

    }
    else{
      return true;
    }
  }
}
