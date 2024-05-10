import { Component } from '@angular/core';
import { Meal } from 'src/app/models/meal';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-meal-add',
  templateUrl: './meal-add.component.html',
  styleUrls: ['./meal-add.component.scss']
})
export class MealAddComponent {
  
  mealName: string = '';
  neededFood: string[] = [];
  optionalFood: string[] = [];
  newNeededFood: string = '';
  newOptionalFood: string = '';
  recipe: string = '';

  constructor(private _mealService: MealService){}

  add(){
    //TODO: refactor, this can be in the class
    const meal: Meal = {
      id: '',
      name: this.mealName,
      neededFood: this.neededFood,
      optionalFood: this.optionalFood,
      recipe: this.recipe
    }

    this._mealService.addMeal(meal);
  }


  addFood(type: 'neededFood' | 'optionalFood', food: string) {
    if (food.trim() !== '') {
      this[type].push(food);
      this.clearInput(type);
    }
  }

  removeFood(type: 'neededFood' | 'optionalFood', food: string) {
    const index = this[type].indexOf(food);
    if (index !== -1) {
      this[type].splice(index, 1);
    }
  }

  clearInput(type: 'neededFood' | 'optionalFood') {
    if (type === 'neededFood') {
      this.newNeededFood = '';
    } else {
      this.newOptionalFood = '';
    }
  }
}
