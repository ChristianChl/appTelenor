import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioPermiso } from '../interfaces/UsuarioPermiso';

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
  deleteUsuarioPermiso(id: string): Observable<any>{
    
    return this.http.delete<any>(`${this.baseUrl}/usuarioPermiso/${id}`);
  }
  saveUsuarioPermiso(usuarioPermiso: UsuarioPermiso): Observable<any>{

    return this.http.post<UsuarioPermiso>(`${this.baseUrl}/usuarioPermiso`, usuarioPermiso);
  }
  updateUsuarioPermiso(id: string|number, updateUsuarioPermiso: UsuarioPermiso): Observable<any>{

    return this.http.put<UsuarioPermiso>(`${this.baseUrl}/usuarioPermiso/${updateUsuarioPermiso.id_UsuarioPermiso}`, updateUsuarioPermiso);

  }
}
