import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Persona } from '../interfaces/Persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  getPersonas(){
    return this.http.get(`${this.baseUrl}/persona`);
  }

  getPersona(id: string){
    return this.http.get(`${this.baseUrl}/persona/${id}`);
  }

  deletePersona(id: string){
    return this.http.delete(`${this.baseUrl}/persona/${id}`);
}

  savePersona(persona: Persona):Observable<any>{

    return this.http.post<Persona>(`${this.baseUrl}/persona`, persona)
    .pipe(
      tap(resp => {
        if(resp.ok){
          console.log('Persona Guardado')
        }
      }),
      map(resp => resp.ok),
      catchError(err =>{
        
          if(err.error.errors.per_numeroDocumento?.msg){
            return of(err.error.errors.per_numeroDocumento.msg);
          }
          if(err.error.errors.per_razonSocial?.msg){
            return of(err.error.errors.per_razonSocial.msg);
          }
          
          if(err.error.errors.per_direccion?.msg){
            return of(err.error.errors.per_direccion.msg);
          }
          if(err.error.errors.per_celular?.msg){
            return of(err.error.errors.per_celular.msg);
          }
          if(err.error.errors.per_email?.msg){
            return of(err.error.errors.per_email.msg);
          }
          
          console.log('Hable con el administrador dfdf')
          return of('Hable con el administrador')
          
      })
    );

  }

  updatePersona(id: string|number, updatedPersona: Persona): Observable<Persona> {
    return this.http.put(`${this.baseUrl}/Persona/${id}`, updatedPersona);
  }
}
