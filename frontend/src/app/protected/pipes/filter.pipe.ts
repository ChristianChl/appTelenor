import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const data of value){
      if(data.us_login.indexOf(arg) > -1){
        resultPosts.push(data);
      };
    };
    return resultPosts;
  }

}
