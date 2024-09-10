import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meal } from 'src/app/models/meal';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html'
})
export class MealListComponent implements OnInit{

  meals: Meal[] = [];
  filteredMeals: Meal[] = [];


  constructor(private _mealService: MealService,
              private _router: Router){
  }

  ngOnInit() {
    this.getAllMeals();
  }
  
  private async getAllMeals(){
    const allMeals = await this._mealService.getAllMeals()
      this.meals = allMeals;
      this.filteredMeals = allMeals
  }

  add(){
    this._router.navigate(['meal-add']);
  }

  onSearch(event: any) {
    const searchText = event.detail.value.toLowerCase();
    if (!searchText) {
      this.filteredMeals = this.meals;
      return;
    }

    this.filteredMeals = this.meals.filter(meal =>
      meal.name.toLowerCase().includes(searchText)
    );
  }
}
