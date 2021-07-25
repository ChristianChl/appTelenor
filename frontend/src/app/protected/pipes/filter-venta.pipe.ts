import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterVenta'
})
export class FilterVentasPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultVentas = [];
    for(const data of value){
      if(data.ven_numeroComprobante.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.Personas.per_numeroDocumento.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.Personas.per_razonSocial.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.Monedas.mon_nombre.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.ven_total.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.createdAt.toLowerCase().indexOf(arg.toLowerCase()) > -1
      ){
        resultVentas.push(data);
      };
    };
    return resultVentas;
  }

}
