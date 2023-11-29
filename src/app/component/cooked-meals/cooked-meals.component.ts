import { Component } from '@angular/core';
import { Meal } from 'src/app/models/meal';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-cooked-meals',
  templateUrl: './cooked-meals.component.html',
  styleUrls: ['./cooked-meals.component.scss']
})
export class CookedMealsComponent {

  cookedMeals: Meal[] = []

  constructor(private _mealService: MealService){
  }

  async ionViewWillEnter() {
    await this.loadMeals();
  }

  async loadMeals(){
    this._mealService.cook().then((meals) => {
      this.cookedMeals = meals || [];
    }).catch((error) => {
      console.error('Error al cocinar:', error);
    });
  }
}
