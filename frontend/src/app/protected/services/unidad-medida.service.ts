import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medida } from '../interfaces/Medida';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {

  private baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  getMedidas(){
    return this.http.get(`${this.baseUrl}/medida`);
  }

  getMedida(id: string){
    return this.http.get(`${this.baseUrl}/medida/${id}`);
  }

  deleteMedida(id: string){
    return this.http.delete(`${this.baseUrl}/medida/${id}`);
}

  saveMedida(medida: Medida){

    return this.http.post(`${this.baseUrl}/medida`, medida);
  }

  updateMedida(id: string|number, updatedMedida: Medida): Observable<Medida> {
    return this.http.put(`${this.baseUrl}/medida/${id}`, updatedMedida);
  }
}
