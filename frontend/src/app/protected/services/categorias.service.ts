import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Categoria} from '../interfaces/Categoria';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

     private baseUrl: string = environment.baseUrl
    constructor(private http: HttpClient) { }

    getCategorias(){
      return this.http.get(`${this.baseUrl}/categoria`);
    }

    getCategoria(id: string){
      return this.http.get(`${this.baseUrl}/categoria/${id}`);
    }

    deleteCategoria(id: string){
      return this.http.delete(`${this.baseUrl}/categoria/${id}`);
  }

    saveCategoria(categoria: Categoria){

      return this.http.post(`${this.baseUrl}/categoria`, categoria);
    }

    updateCategoria(id: string|number, updatedCategoria: Categoria): Observable<Categoria> {
      return this.http.put(`${this.baseUrl}/categoria/${id}`, updatedCategoria);
    }
}
