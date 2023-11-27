import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/meal';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent {

  meals: Meal[] = [];

  constructor(private _mealService: MealService){
  }

  ionViewWillEnter() {
    this.meals = this._mealService.getMeals();
  }

}
