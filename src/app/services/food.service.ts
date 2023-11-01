import { Injectable } from '@angular/core';
import { FoodCategory } from '../models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  foodCategory: FoodCategory[] = [
    {
      name: 'verduras', 
      food: [
        {name: 'cebolla', selected: true},
        {name: 'zanahoria', selected: true},
      ]
    },
    {
      name: 'pasta-arroz', 
      food: [
        {name: 'pasta', selected: true},
        {name: 'arroz', selected: true},
      ]
    },
    {
      name: 'salsas', 
      food: [
        {name: 'tomate frito', selected: true},
        {name: 'tomate triturado', selected: true},
      ]
    }
  ];

  constructor() { }

  getFoodCategory(){
    return this.foodCategory;
  }
}
