import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProveedor'
})
export class FilterProveedorPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultProveedor = [];
    for(const data of value){
      if(data.per_email.toLowerCase().indexOf(arg.toLowerCase()) > -1||
      data.per_razonSocial.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
      data.TipoDocumentos.tipodoc_descripcion.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
      data.per_numeroDocumento.toLowerCase().indexOf(arg.toLowerCase()) > -1||
      data.per_celular.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
      data.per_activo.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ){
        resultProveedor.push(data);
      };
    };
    return resultProveedor;
  }

}
