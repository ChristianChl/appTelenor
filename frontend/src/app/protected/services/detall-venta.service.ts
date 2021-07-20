import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DetalleVenta } from '../interfaces/DetalleVenta';

@Injectable({
  providedIn: 'root'
})
export class DetallVentaService {

  private baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  getDetalleVentas(){
    return this.http.get(`${this.baseUrl}/detalleVenta`);
  }

  getDetalleVenta(id: string){
    return this.http.get(`${this.baseUrl}/detalleVenta/${id}`);
  }

  deleteDetalleVenta(id: string){
    return this.http.delete(`${this.baseUrl}/detalleVenta/${id}`);
  }

  saveDetalleVenta(detalleVenta: DetalleVenta):Observable<any>{
    return this.http.post<DetalleVenta>(`${this.baseUrl}/detalleVenta`, detalleVenta).pipe(
      tap(resp =>{
        if(resp.ok){
          console.log('Venta Guardado')
        }
      }),
      map(resp => resp.ok),
      catchError(err => {
        
        if(err.error.errors.inv_tipoComprobante?.msg){
          return of(err.error.errors.inv_tipoComprobante.msg)
        }
        if(err.error.errors.inv_serieComprobante?.msg){
          return of(err.error.errors.inv_serieComprobante.msg)
        }
        if(err.error.errors.inv_numeroComprobante?.msg){
          return of(err.error.errors.inv_numeroComprobante.msg)
        }
        if(err.error.errors.inv_fechaHora?.msg){
          return of(err.error.errors.inv_fechaHora.msg)
        }
        if(err.error.errors.fk_id_persona?.msg){
          return of(err.error.errors.fk_id_persona.msg)
        }
        return of('Hable con el Administrador') 
      })
    );

  }
  
}
