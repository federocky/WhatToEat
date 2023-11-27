import { Component } from '@angular/core';
import { FoodCategory } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.component.html',
  styleUrls: ['./food-add.component.scss']
})
export class FoodAddComponent {

  categoryList: FoodCategory[] = [];
  foodName: string = '';
  selectedCategory: string = '';

  constructor(private _foodService: FoodService){}

  ionViewWillEnter (){
    this.categoryList = this._foodService.getFood();
  }

  add(){
    this._foodService.addFood(this.selectedCategory, this.foodName);
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.detail.value;
  }
}
