import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineBreak'
})
export class LineBreakPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }
    let newValue = value.replace(/<br\s*\/?>/gi, '\n');
    // Elimina espacios en blanco al inicio y final
    newValue = newValue.trim();
    return newValue;
  }

}
