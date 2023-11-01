import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodCategory } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food.service';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

foodCategory: FoodCategory[] = []

constructor(private _foodService: FoodService,
            private _mealService: MealService,
            private _router: Router
            ){}
  
ngOnInit(): void {
  this.loadFoodCategory();
}

loadFoodCategory(){
  this.foodCategory = this._foodService.getFoodCategory();
}

cook(){
  this._mealService.setAvailableFood(this.foodCategory);
  this._router.navigate(['meal']);
}

}
