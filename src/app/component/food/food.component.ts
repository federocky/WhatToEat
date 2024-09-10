import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodCategory } from 'src/app/models/foodCategory';
import { FoodService } from 'src/app/services/food.service';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent{

  foodCategoryList: FoodCategory[] = []

  constructor(private _foodService: FoodService,
              private _mealService: MealService,
              private _router: Router
              ){}
    
  async ionViewWillEnter() {
    await this.getAllFoodCategory();
  }

  private async getAllFoodCategory(){
    if(this.foodCategoryList.length === 0){
      this.foodCategoryList = await this._foodService.getAllFoodCategory();
    }
  }

  cookMeal(){
    this._mealService.setAvailableFood(this.foodCategoryList);
    this._router.navigate(['cookead-meal']);
  }

  cookWeeklyMenu(){
    this._mealService.setAvailableFood(this.foodCategoryList);
    this._router.navigate(['weekly-menu']);
  }

  async add(){
    this.foodCategoryList = [];
    this._router.navigate(['food-add']);
  }
}
