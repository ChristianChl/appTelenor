import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCompra'
})
export class FilterComprasPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultCompras = [];
    for(const data of value){
      if(data.ing_numeroComprobante.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.Personas.per_numeroDocumento.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.Personas.per_razonSocial.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.ing_totalCompra.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.createdAt.toLowerCase().indexOf(arg.toLowerCase()) > -1
      ){
        resultCompras.push(data);
      };
    };
    return resultCompras;
  }

}
