import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterById'
})
export class FilterByIdPipe implements PipeTransform {
  transform(items:Array<any>, id?:number) {
    return items.find(item => item.id == id);
  }
}