import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCotizacion'
})
export class FilterCotizacionesPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultCotizaciones = [];
    for(const data of value){
      if(data.Personas.per_razonSocial.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.Personas.per_numeroDocumento.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.Monedas.mon_nombre.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.coti_total.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.createdAt.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1
      ){
        resultCotizaciones.push(data);
      };
    };
    return resultCotizaciones;
  }

}
