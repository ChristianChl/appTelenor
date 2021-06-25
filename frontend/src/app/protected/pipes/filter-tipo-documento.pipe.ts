import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTipoDocumento'
})
export class FilterTipoDocumentoPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultTipoDocumento = [];
    for(const data of value){
      if(data.tipodoc_descripcion.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultTipoDocumento.push(data);
      };

    };
    return resultTipoDocumento;

  }

}
