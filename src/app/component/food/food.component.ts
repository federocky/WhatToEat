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
  
async ngOnInit() {
  //this.loadFoodCategory();
  this.loadJson();
}

loadFoodCategory(){
  this._foodService.getFoodCategory()
    .subscribe({
      next: (res: FoodCategory[]) => this.foodCategory = res,
      error: res => console.log(res)
    })
}

async loadJson(){
  this.foodCategory = await this._foodService.getJson()
}

cook(){
  this._mealService.setAvailableFood(this.foodCategory);
  this._router.navigate(['meal']);
}

add(){
  this.foodCategory.push({name: "queso", food: [{name: 'gouda', selected: true}]})
  console.log("aaa")
  this._foodService.saveData(this.foodCategory);
}

}
