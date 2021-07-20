import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cotizacion } from '../interfaces/Cotizacion';


@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  private baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  getCotizacions(){
    return this.http.get(`${this.baseUrl}/cotizacion`);
  }

  getCotizacion(id: string){
    return this.http.get(`${this.baseUrl}/cotizacion/${id}`);
  }

  deleteCotizacion(id: string){
    return this.http.delete(`${this.baseUrl}/cotizacion/${id}`);
  }

  saveCotizacion(Cotizacion: Cotizacion):Observable<any>{
    return this.http.post<Cotizacion>(`${this.baseUrl}/cotizacion`, Cotizacion).pipe(
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

  updateCotizacion(id: string|number, updatedCotizacion: Cotizacion): Observable<any> {
    return this.http.put<Cotizacion>(`${this.baseUrl}/cotizacion/${updatedCotizacion.id_cotizacion}`, updatedCotizacion).pipe(
      tap(resp => {
        if(resp.ok){
          console.log("se guardo")
        }
      }),
      map(resp => resp.ok),
      catchError(err =>{
        if(err.error?.msg){
          return of(err.error.msg)
        }
        if(err.error.errors.mar_nombre?.msg){
          return of(err.error.errors.mar_nombre.msg)
        }
        return of('Hable con el Administrador') 
      })
    );
  }
}
