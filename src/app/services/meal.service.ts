import { Injectable } from '@angular/core';
import { Meal } from '../models/meal';
import { FoodCategory } from '../models/food';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private mealUrl = 'assets/data/meal.json';
  availableFood: string[] = [];
  meals: Meal[] = [];

  constructor(private storage: Storage,
    private http: HttpClient) { 
    this.loadAllMeals();
  }

  private async loadAllMeals() {
    this.http.get<Meal[]>(this.mealUrl)
    .subscribe({
      next: (res: Meal[]) => {
        this.meals = res;
      },
      error: err => console.log(err)
    })
  }

  setAvailableFood(foodList: FoodCategory[]){

    for (const category of foodList) {
      category.food.forEach(food => {
        if(food.selected) this.availableFood.push(food.name);
      });
    }
  }

  cook(): Meal[] {
    let cookedMeals: Meal[] = [];

    let haveAllneededFood = true;

    for (const meal of this.meals) {

      haveAllneededFood = true;

      for (const neededFood of meal.neededFood) {
        if(!this.availableFood.includes(neededFood)) haveAllneededFood = false;
      }

      if(haveAllneededFood) cookedMeals.push(meal);
    }

    return cookedMeals;
  } 

  // getMealsToShow(){
  //   return this.mealsToShow;
  // }

  getMeals(){
    return this.meals;
  }

}
