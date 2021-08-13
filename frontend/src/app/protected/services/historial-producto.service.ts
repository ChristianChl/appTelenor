import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HistorialProducto } from '../interfaces/HistorialProducto';

@Injectable({
  providedIn: 'root'
})
export class HistorialProductoService {

  

  private baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  getHistorialProductos(){
    return this.http.get(`${this.baseUrl}/historialProducto`);
  }

  geHistorialtProducto(id: string){
    return this.http.get(`${this.baseUrl}/historialProducto/${id}`);
  }

  deleteHistorialProducto(id: string){
    return this.http.delete(`${this.baseUrl}/historialProducto/${id}`);
  }

  saveHistorialProducto(producto: HistorialProducto):Observable<any>{
    
    return this.http.post<HistorialProducto>(`${this.baseUrl}/historialProducto`, producto)
    .pipe(
      tap(resp => {
        if(resp.ok){
          console.log('Producto Guardado')
        }
      }),
      map(resp => resp.ok),
      catchError(err =>{
          if(err.error?.msg){
            return of(err.error.msg)
          }
          console.log('Hable con el administrador dfdf')
          return of('Hable con el administrador')
          
      })
    );

  }
}
