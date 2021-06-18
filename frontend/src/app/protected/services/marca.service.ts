import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Marca } from '../interfaces/Marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  getMarcas(){
    return this.http.get(`${this.baseUrl}/marca`);
  }

  getMarca(id: string){
    return this.http.get(`${this.baseUrl}/marca/${id}`);
  }

  deleteMarca(id: string){
    return this.http.delete(`${this.baseUrl}/marca/${id}`);
}

  saveMarca(marca: Marca){

    return this.http.post(`${this.baseUrl}/marca`, marca);
  }

  updateMarca(id: string|number, updatedMarca: Marca): Observable<Marca> {
    return this.http.put(`${this.baseUrl}/marca/${id}`, updatedMarca);
  }
}
