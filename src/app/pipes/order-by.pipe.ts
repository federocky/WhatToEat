import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: any[], field: string): any[] {
    if (!Array.isArray(array) || array.length <= 1) {
      return array;
    }

    return array.sort((a, b) => {
      const valueA = a[field].toUpperCase();
      const valueB = b[field].toUpperCase();

      return valueA.localeCompare(valueB);
    });
  }

}
