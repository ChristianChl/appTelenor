import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UsuarioPermiso } from '../interfaces/UsuarioPermiso';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioPermisoService {

  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getUsuarioPermisos(): Observable<UsuarioPermiso[]>{

    return this.http.get<UsuarioPermiso[]>(`${this.baseUrl}/usuarioPermiso`);

  }
  getUsuarioPermiso(id: string): Observable<UsuarioPermiso>{
    
    return this.http.get<UsuarioPermiso>(`${this.baseUrl}/usuarioPermiso/${id}`);
  }
  // deleteUsuarioPermiso(id: string): Observable<any>{
    
  //   return this.http.delete<any>(`${this.baseUrl}/usuarioPermiso/${id}`);
  // }
  saveUsuarioPermiso(usuarioPermiso: UsuarioPermiso): Observable<any>{

    return this.http.post<UsuarioPermiso>(`${this.baseUrl}/usuarioPermiso`, usuarioPermiso);
  }
  updateUsuarioPermiso(id: string|number, updateUsuarioPermiso: UsuarioPermiso): Observable<any>{

    return this.http.put<UsuarioPermiso>(`${this.baseUrl}/usuarioPermiso/${updateUsuarioPermiso.id_UsuarioPermiso}`, updateUsuarioPermiso);

  }
  deleteUsuarioPermisoByUsuario(id: string): Observable<UsuarioPermiso>{

    return this.http.delete<any>(`${this.baseUrl}/usuarioPermiso/${id}`);

  }
  getUsuarioByPerId(fk_id_usuario: string, perm_nombre: string): Observable<any>{
    const url = `${this.baseUrl}/usuarioPermiso/data`;
    const body = {fk_id_usuario, perm_nombre};
    return this.http.post<UsuarioPermiso>(url, body)
    .pipe(
      map(resp =>{
        return resp.ok;
      }),
      catchError(err => of(false) )
    );

  }
}
