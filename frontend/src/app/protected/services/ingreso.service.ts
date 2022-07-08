import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ingreso } from '../interfaces/Ingreso';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  private baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  getIngresos(){
    return this.http.get(`${this.baseUrl}/ingreso`);
  }

  getIngreso(id: string){
    return this.http.get(`${this.baseUrl}/ingreso/${id}`);
  }
  getIngresosByDates(createdAt: Date, ing_fechaHora: Date){
    const url = `${this.baseUrl}/ingreso/dates`;
    const body = {createdAt, ing_fechaHora};
    return this.http.post<Ingreso>(url, body);

  }
  getIngresosForDocuments(ing_numeroComprobante: string){
    const url = `${this.baseUrl}/ingreso/document`;
    const body = {ing_numeroComprobante};
    return this.http.post<Ingreso>(url, body);
  }

  deleteIngreso(id: string){
    return this.http.delete(`${this.baseUrl}/ingreso/${id}`);
  }

  saveIngreso(ingreso: Ingreso):Observable<any>{
    return this.http.post<Ingreso>(`${this.baseUrl}/ingreso`, ingreso).pipe(
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

  updateProducto(id: string|number, updatedIngreso: Ingreso): Observable<any> {
    return this.http.put<Ingreso>(`${this.baseUrl}/ingreso/${id}`, updatedIngreso);
  }
}
