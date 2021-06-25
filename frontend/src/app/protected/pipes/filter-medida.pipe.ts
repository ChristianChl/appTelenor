import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMedida'
})
export class FilterMedidaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultMedida = [];
    for(const data of value){
      if(data.med_unidad.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultMedida.push(data);
      };
    };
    return resultMedida;
  }

}
