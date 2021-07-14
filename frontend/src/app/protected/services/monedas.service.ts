import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Moneda } from '../interfaces/Moneda';

@Injectable({
  providedIn: 'root'
})
export class MonedasService {

  private baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  getMonedas(){
    return this.http.get(`${this.baseUrl}/moneda`);
  }

  getMoneda(id: string){
    return this.http.get(`${this.baseUrl}/moneda/${id}`);
  }

  deleteMoneda(id: string){
    return this.http.delete(`${this.baseUrl}/moneda/${id}`);
}

  saveMoneda(moneda: Moneda):Observable<any>{

    return this.http.post<Moneda>(`${this.baseUrl}/moneda`, moneda);
  }

  updateMoneda(id: string|number, updatedMoneda: Moneda): Observable<any> {
    return this.http.put<Moneda>(`${this.baseUrl}/moneda/${updatedMoneda.id_moneda}`, updatedMoneda);
  
  }
}
