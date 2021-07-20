import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DetalleCotizacion } from '../interfaces/DetalleCotizacion';

@Injectable({
  providedIn: 'root'
})
export class DetalleCotizacionService {

  private baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  getDetalleCotizacions(){
    return this.http.get(`${this.baseUrl}/detalleCotizacion`);
  }

  getDetalleCotizacion(id: string){
    return this.http.get(`${this.baseUrl}/detalleCotizacion/${id}`);
  }

  deleteDetalleCotizacion(id: string){
    return this.http.delete(`${this.baseUrl}/detalleCotizacion/${id}`);
  }

  saveDetalleCotizacion(detalleCotizacion: DetalleCotizacion):Observable<any>{
    return this.http.post<DetalleCotizacion>(`${this.baseUrl}/detalleCotizacion`, detalleCotizacion).pipe(
      tap(resp =>{
        if(resp.ok){
          console.log('Detalle Producto - Coti - Guardado')
        }
      }),
      map(resp => resp.ok),
      catchError(err => {
        
        if(err.error.errors.inv_tipoComprobante?.msg){
          return of(err.error.errors.inv_tipoComprobante.msg)
        }

        return of('Hable con el Administrador') 
      })
    );

  }

  updateDetalleCotizacion(id: string|number, detalleCotizacion: DetalleCotizacion): Observable<any> {
    return this.http.put<DetalleCotizacion>(`${this.baseUrl}/detalleCotizacion/${detalleCotizacion.id_detalleCotizacion}`, detalleCotizacion);
    }
}
