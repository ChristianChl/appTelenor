import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { UsuarioPermisoService } from '../protected/services/usuario-permiso.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarPermisoPreciosGuard implements CanActivate {
  constructor(private authService: AuthService,
    private usuarioPermisoService: UsuarioPermisoService,
    private router: Router) { }

  get usuario() {
    return this.authService.usuario;
  }

  canActivate(): Observable<boolean> | boolean {
    return this.usuarioPermisoService.getUsuarioByPerId(this.usuario.uid, "Precios")
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/dashboard/errorAcesso');
          }
        })
      );
  }
  
}
