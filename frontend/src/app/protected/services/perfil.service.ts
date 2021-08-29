import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Perfil } from '../interfaces/Perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getPerfiles(): Observable<Perfil[]>{
    return this.http.get<Perfil[]>(`${this.baseUrl}/perfil`);
  }
  getPerfil(id: string): Observable<Perfil>{

    return this.http.get<Perfil>(`${this.baseUrl}/perfil/${id}`);
  }
  deletePerfil (id: string): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/perfil/${id}`);
  }
  savePerfil(perfil: Perfil): Observable<any>{
    return this.http.post<Perfil>(`${this.baseUrl}/perfil`, perfil)
    .pipe(
      tap(resp =>{
        if(resp.ok){
          console.log('Perfil Guardado')
        }
      }),
      map(resp => resp.ok),
      catchError(err => {
        if(err.error?.msg){
          return of(err.error.msg)
        }
        if(err.error.errors.perf_nombre?.msg){
          return of(err.error.errors.perf_nombre.msg)
        }
        if(err.error.errors.perf_descripcion?.msg){
          return of(err.error.errors.perf_descripcion.msg)
        }
        return of('Hable con el Administrador') 
      })
    );
  }

  updatePerfil(id: string|number, updatePerfil: Perfil): Observable<any>{
    return this.http.put<Perfil>(`${this.baseUrl}/perfil/${updatePerfil.id_perfil}`, updatePerfil)
    .pipe(
      tap(resp =>{
        if(resp.ok){
          console.log('Perfil Actualizado')
        }
      }),
      map(resp => resp.ok),
      catchError(err => {
        if(err.error?.msg){
          return of(err.error.msg)
        }
        if(err.error.errors.perf_nombre?.msg){
          return of(err.error.errors.perf_nombre.msg)
        }
        if(err.error.errors.perf_descripcion?.msg){
          return of(err.error.errors.perf_descripcion.msg)
        }
        return of('Hable con el Administrador') 
      })
    );
  }



}
