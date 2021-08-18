import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProducto'
})
export class FilterProductoPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultProducto = [];
    for(const data of value){
      if(data.prod_modelo.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.prod_caracteristica.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.Tipos.tip_nombre.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.Categorias.cat_nombre.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.Medidas.med_unidad.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.prod_stock.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.prod_activo.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
         data.prod_precioVenta.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1
      ){
        resultProducto.push(data);
      };
    };
    return resultProducto;
  }

}
