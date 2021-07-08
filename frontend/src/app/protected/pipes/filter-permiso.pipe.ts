import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPermiso'
})
export class FilterPermisoPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPermiso = [];
    for(const data of value){
      if(data.perm_nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPermiso.push(data);
      };

    };
    return resultPermiso;

  }

}
