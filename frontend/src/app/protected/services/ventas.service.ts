import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Venta } from '../interfaces/Venta';
@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  getVentas(){
    return this.http.get(`${this.baseUrl}/venta`);
  }

  getVenta(id: string){
    return this.http.get(`${this.baseUrl}/venta/${id}`);
  }
  getVentasByDates(createdAt: Date, endDate: Date){
    const url = `${this.baseUrl}/venta/dates`;
    const body = {createdAt, endDate};
    return this.http.post<Venta>(url, body)
    .pipe(
      tap(resp =>{
        if(resp.ok){
          console.log('Ventas Obtenidas')
        }
      }),
      map(resp => resp),
      catchError(err =>{

        if(err.error?.msg){
          return of(err.error.msg)
        }
        return of('Hable con el Administrador')
      })

    );

  }

  deleteVenta(id: string){
    return this.http.delete(`${this.baseUrl}/venta/${id}`);
  }

  saveVenta(venta: Venta):Observable<any>{
    return this.http.post<Venta>(`${this.baseUrl}/venta`, venta).pipe(
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
        if(err.error.errors.ven_tipoComprobante?.msg){
          return of(err.error.errors.ven_tipoComprobante.msg)
        }
        if(err.error.errors.ven_serieComprobante?.msg){
          return of(err.error.errors.ven_serieComprobante.msg)
        }
        if(err.error.errors.ven_numeroComprobante?.msg){
          return of(err.error.errors.ven_numeroComprobante.msg)
        }
        if(err.error.errors.ven_total?.msg){
          return of(err.error.errors.ven_total.msg)
        }
        return of('Hable con el Administrador') 
      })
    );

  }

}
