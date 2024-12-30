import { Pipe, PipeTransform } from '@angular/core';
import { MealCategory } from '../enums/mealCategory';

@Pipe({
  name: 'mealCategoryTranslate'
})
export class MealCategoryTranslatePipe implements PipeTransform {

  transform(value: MealCategory): string {
    console.log(value)
    switch (value) {
      case MealCategory.Full:
        return 'Completa';
      case MealCategory.Side:
        return 'Guarnición';
      case MealCategory.Main:
        return 'Principal';
      default:
        return value; 
    }  }

}
