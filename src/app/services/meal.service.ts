import { Injectable } from '@angular/core';
import { Meal } from '../models/meal';
import { FoodCategory } from '../models/food';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  meals: Meal[] = 
  [
    {
      name: 'pasta bolo',
      neededFood: ['pasta', 'tomate frito'],
      optionalFood: ['cebolla', 'pimiento', 'zanahoria']
    },
    {
      name: 'arroz cubana',
      neededFood: ['arroz', 'tomate frito', 'huevo'],
      optionalFood: ['cebolla', 'pimiento', 'zanahoria']
    },
    {
      name: 'curry',
      neededFood: ['arroz', 'leche coco', 'zanahoria'],
      optionalFood: ['cebolla', 'pimiento']
    }
  ];

  mealsToShow: Meal[] = [];
  availableFood: string[] = [];

  constructor() { }

  setAvailableFood(foodCategory: FoodCategory[]){

    for (const category of foodCategory) {
      category.food.forEach(food => {
        if(food.selected) this.availableFood.push(food.name);
      });
    }
  }

  prepareMeals(){
    this.mealsToShow.splice(0, this.mealsToShow.length);

    let haveAllneededFood = true;

    for (const meal of this.meals) {

      haveAllneededFood = true;

      for (const neededFood of meal.neededFood) {
        if(!this.availableFood.includes(neededFood)) haveAllneededFood = false;
      }

      if(haveAllneededFood) this.mealsToShow.push(meal);
    }
  } 

  getMealsToShow(){
    return this.mealsToShow;
  }

}
