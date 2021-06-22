import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const data of value){
      if(data.us_login.toLowerCase().indexOf(arg.toLowerCase()) > -1 || 
         data.us_nombres.toLowerCase().indexOf(arg.toLowerCase()) > -1 || 
         data.us_apellidos.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.us_activo.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.TipoDocumentos.tipodoc_descripcion.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.us_numeroDocumento.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.us_telefono.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.Perfils.perf_nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1
         ){
        resultPosts.push(data);
        
      };
    };
    return resultPosts;
  }

}
