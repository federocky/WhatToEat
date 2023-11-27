import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoodCategory } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food.service';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent {

foodList: FoodCategory[] = []

constructor(private _foodService: FoodService,
            private _mealService: MealService,
            private _router: Router
            ){}

ionViewWillEnter (){
  this.foodList = this._foodService.getFood();
  console.log(this.foodList)
}


cook(){
  this._mealService.setAvailableFood(this.foodList);
  this._router.navigate(['cookead-meal']);
}

add(){
  this._router.navigate(['food-add']);
}

}
