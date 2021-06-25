import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMarca'
})
export class FilterMarcaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultMarca = [];
    for(const data of value){
      if(data.mar_nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.mar_descripcion.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.mar_activo.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1
      ){
        resultMarca.push(data);
      };
    };
    return resultMarca;
  }

}
