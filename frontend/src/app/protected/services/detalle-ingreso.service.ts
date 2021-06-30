import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DetalleIngreso } from '../interfaces/DetalleIngreso';

@Injectable({
  providedIn: 'root'
})
export class DetalleIngresoService {

  private baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  getIngresos(){
    return this.http.get(`${this.baseUrl}/detalleIngreso`);
  }

  getIngreso(id: string){
    return this.http.get(`${this.baseUrl}/detalleIngreso/${id}`);
  }

  deleteIngreso(id: string){
    return this.http.delete(`${this.baseUrl}/detalleIngreso/${id}`);
  }

  saveIngreso(detalleIngreso: DetalleIngreso):Observable<any>{
    return this.http.post<DetalleIngreso>(`${this.baseUrl}/detalleIngreso`, detalleIngreso).pipe(
      tap(resp =>{
        if(resp.ok){
          console.log('Perfil Guardado')
        }
      }),
      map(resp => resp.ok),
      catchError(err => {
        
        if(err.error.errors.ing_tipoComprobante?.msg){
          return of(err.error.errors.ing_tipoComprobante.msg)
        }
        if(err.error.errors.ing_serieComprobante?.msg){
          return of(err.error.errors.ing_serieComprobante.msg)
        }
        if(err.error.errors.ing_numeroComprobante?.msg){
          return of(err.error.errors.ing_numeroComprobante.msg)
        }
        if(err.error.errors.ing_fechaHora?.msg){
          return of(err.error.errors.ing_fechaHora.msg)
        }
        if(err.error.errors.fk_id_persona?.msg){
          return of(err.error.errors.fk_id_persona.msg)
        }
        return of('Hable con el Administrador') 
      })
    );

  }

  updateProducto(id: string|number, updatedDetalleIngreso: DetalleIngreso): Observable<any> {
    return this.http.put<DetalleIngreso>(`${this.baseUrl}/detalleIngreso/${id}`, updatedDetalleIngreso);
  }
}
