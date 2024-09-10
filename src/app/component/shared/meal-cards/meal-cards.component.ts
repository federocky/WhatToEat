import { Component, Input } from '@angular/core';
import { Meal } from 'src/app/models/meal';
import { Router } from '@angular/router';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-meal-cards',
  templateUrl: './meal-cards.component.html'
})
export class MealCardsComponent {
  @Input() meals: Meal[] = [];

  constructor(private router: Router, private _mealService: MealService) {}

  seeDetail(mealId: string){
    const meal = this.meals.find(meal => meal.id === mealId);
    if(meal === null || meal === undefined) return;
    
    this._mealService.setMeal(meal);
    this.router.navigate(['/meal-detail']);
  }
}
