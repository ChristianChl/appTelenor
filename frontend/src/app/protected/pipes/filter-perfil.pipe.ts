import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPerfil'
})
export class FilterPerfilPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPerfil = [];
    for(const data of value){
      if(data.perf_nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.perf_descripcion.toLowerCase().indexOf(arg.toLowerCase()) > -1
      ){
        resultPerfil.push(data);
      };
    };
    return resultPerfil;

  }

}
