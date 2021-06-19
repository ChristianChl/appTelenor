import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoPersona } from '../interfaces/TipoPersona';

@Injectable({
  providedIn: 'root'
})
export class TipoPersonaService {

    private baseUrl: string = environment.baseUrl
    constructor(private http: HttpClient) { }

    getTipoPersonas(){
      return this.http.get(`${this.baseUrl}/tipoPersona`);
    }

    getTipoPersona(id: string){
      return this.http.get(`${this.baseUrl}/tipoPersona/${id}`);
    }

    deleteTipoPersona(id: string){
      return this.http.delete(`${this.baseUrl}/tipoPersona/${id}`);
  }

    saveTipoPersona(tipoPersona: TipoPersona){

      return this.http.post(`${this.baseUrl}/tipoPersona`, tipoPersona);
    }

    updateTipoPersona(id: string|number, updatedTipoPersona: TipoPersona): Observable<TipoPersona> {
      return this.http.put(`${this.baseUrl}/tipoPersona/${id}`, updatedTipoPersona);
    }
}
