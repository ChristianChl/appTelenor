import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TipoDocumento } from '../interfaces/TipoDocumento';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  private baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getDocumentos(): Observable<TipoDocumento[]>{
    return this.http.get<TipoDocumento[]>(`${this.baseUrl}/tipoDocumento`);
  }
  getDocumento(id: string): Observable<TipoDocumento>{

    return this.http.get<TipoDocumento>(`${this.baseUrl}/tipoDocumento/${id}`);
  }
  deleteDocumento (id: string): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/tipoDocumento/${id}`);
  }
  saveDocumento(tipoDocumento: TipoDocumento): Observable<any>{
    return this.http.post<TipoDocumento>(`${this.baseUrl}/tipoDocumento`, tipoDocumento)
    .pipe(
      tap(resp =>{
        if(resp.ok){
          console.log('Tipo Documento Guardado')
        }
      }),
      map(resp => resp.ok),
      catchError(err => {
        if(err.error?.msg){
          return of(err.error.msg)
        }
        if(err.error.errors.tipodoc_descripcion?.msg){
          return of(err.error.errors.tipodoc_descripcion.msg)
        }
        return of('Hable con el Administrador') 
      })
    );
  }
  updateDocumento(id: string|number, updateDocumento: TipoDocumento): Observable<any>{
    return this.http.put<TipoDocumento>(`${this.baseUrl}/tipoDocumento/${updateDocumento.id_tipoDocumento}`, updateDocumento)
    .pipe(
      tap(resp =>{
        if(resp.ok){
          console.log('Tipo Documento Actualizado')
        }
      }),
      map(resp => resp.ok),
      catchError(err => {
        if(err.error?.msg){
          return of(err.error.msg)
        }
        if(err.error.errors.tipodoc_descripcion?.msg){
          return of(err.error.errors.tipodoc_descripcion.msg)
        }
        return of('Hable con el Administrador') 
      })
    );
  }
}
