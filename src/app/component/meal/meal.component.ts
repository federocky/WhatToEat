import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meal } from 'src/app/models/meal';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit{

  meals: Meal[] = [];

  constructor(private _mealService: MealService,
              private _router: Router){
  }

  ngOnInit() {
    this.getAllMeals();
  }
  
  private getAllMeals(){
    this._mealService.getAllMeals()
      .subscribe( mealsResult => this.meals = mealsResult);
  }

  add(){
    this._router.navigate(['meal-add']);
  }
}
