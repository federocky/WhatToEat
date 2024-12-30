import { Injectable } from '@angular/core';
import { Food} from '../models/food';
import { FoodCategory } from '../models/foodCategory';
import { FoodRepository } from '../repositories/food.repository';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private _foodRepository: FoodRepository) {}

  async addCategory(categoryName: string): Promise<void>{
    await this._foodRepository.addCategory(categoryName);
  }

  async add(category: string, food: Food): Promise<void>{

    const allFoodCategory = await this._foodRepository.getAllCategory()        

    let foodCategory = allFoodCategory.find(cat => cat.name == category);
    if(foodCategory == undefined) return;

    const foodToAdd: Food = {name: food.name, selected: false, price: food.price};
    
    await this._foodRepository.add(foodCategory.id, foodToAdd);        
  }
  
  async edit(categoryName: string, originalFoodName: string, updatedFood: Food): Promise<void> {

    const allFoodCategories = await this._foodRepository.getAllCategory();
  
    let foodCategory = allFoodCategories.find(cat => cat.name === categoryName);
    if (!foodCategory) return;
  
    const foodToUpdate = foodCategory.food.find(f => f.name === originalFoodName);
    if (!foodToUpdate) return;    

    await this._foodRepository.update(foodCategory.id, originalFoodName, updatedFood);
  }  

  async getAllCategory(): Promise<FoodCategory[]>{
    return await this._foodRepository.getAllCategory();
  }
          
  async delete(categoryId: string, foodName: string): Promise<void>{
    await this._foodRepository.delete(categoryId, foodName);
  }
  
}
