import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permiso } from '../interfaces/Permiso';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getPermisos() : Observable<Permiso[]>{
    return this.http.get<Permiso[]>(`${this.baseUrl}/permiso`);
  }
  getPermiso(id: string): Observable<Permiso>{
    return this.http.get<Permiso>(`${this.baseUrl}/permiso/${id}`);
  }
  updatePermiso(id: string|number, updatePermiso: Permiso): Observable<any>{
    return this.http.put<Permiso>(`${this.baseUrl}/permiso/${updatePermiso.id_permiso}`, updatePermiso);
  }
}
