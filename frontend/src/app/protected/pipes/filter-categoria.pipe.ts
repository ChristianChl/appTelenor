import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategoria'
})
export class FilterCategoriaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultCategoria = [];
    for(const data of value){
      if(data.cat_nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.cat_descripcion.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.cat_activo.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1
      ){
        resultCategoria.push(data);
      };
    };
    return resultCategoria;
  }

}
