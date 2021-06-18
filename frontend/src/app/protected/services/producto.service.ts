import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  getProductos(){
    return this.http.get(`${this.baseUrl}/producto`);
  }

  getProducto(id: string){
    return this.http.get(`${this.baseUrl}/producto/${id}`);
  }

  deleteProducto(id: string){
    return this.http.delete(`${this.baseUrl}/producto/${id}`);
  }

  saveProducto(producto: Producto):Observable<any>{
    console.log("Ver producto" + producto);
    console.log("Ver producto -----");
    return this.http.post<Producto>(`${this.baseUrl}/producto`, producto)
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
          
          if(err.error.errors.prod_modelo?.msg){
            return of(err.error.errors.prod_modelo.msg);
          }
          if(err.error.errors.prod_descripcion?.msg){
            return of(err.error.errors.prod_descripcion.msg);
          }
          if(err.error.errors.fk_id_categoria?.msg){
            return of(err.error.errors.fk_id_categoria.msg);
          }
          if(err.error.errors.fk_id_marca?.msg){
            return of(err.error.errors.fk_id_marca.msg);
          }
          if(err.error.errors.fk_id_medida?.msg){
            return of(err.error.errors.fk_id_medida.msg);
          }
          if(err.error.errors.fk_id_tipo?.msg){
            return of(err.error.errors.fk_id_tipo.msg);
          }
          console.log('Hable con el administrador dfdf')
          return of('Hable con el administrador')
          
      })
    );

  }

  updateProducto(id: string|number, updatedProducto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.baseUrl}/producto/${id}`, updatedProducto)
    .pipe(
      tap(resp => {
        if(resp.ok){
          console.log('Producto Guardado')
        }
      }),
      map(resp => resp.ok),
      catchError(err =>{
          if(err.error.errors.prod_modelo?.msg){
            return of(err.error.errors.prod_modelo.msg);
          }
          if(err.error.errors.prod_descripcion?.msg){
            return of(err.error.errors.prod_descripcion.msg);
          }
          if(err.error.errors.fk_id_categoria?.msg){
            return of(err.error.errors.fk_id_categoria.msg);
          }
          if(err.error.errors.fk_id_marca?.msg){
            return of(err.error.errors.fk_id_marca.msg);
          }
          if(err.error.errors.fk_id_medida?.msg){
            return of(err.error.errors.fk_id_medida.msg);
          }
          if(err.error.errors.fk_id_tipo?.msg){
            return of(err.error.errors.fk_id_tipo.msg);
          }
          console.log('Hable con el administrador dfdf')
          return of('Hable con el administrador')
          
      })
    );
  }
}
