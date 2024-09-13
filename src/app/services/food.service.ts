import { Injectable } from '@angular/core';
import { Food} from '../models/food';
import { Firestore, collection, addDoc, doc, arrayUnion, updateDoc } from '@angular/fire/firestore';
import { FoodCategory } from '../models/foodCategory';
import { FoodRepository } from '../repositories/food.repository';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private firestore: Firestore,
              private foodRepository: FoodRepository) {}

  addCategory(categoryName: string){
    const foodRef = collection(this.firestore, 'food');

    let foodCat: FoodCategory = {
      id: '',
      name: categoryName,
      food: []
    }
    addDoc(foodRef, foodCat);
  }

  async add(category: string, food: Food){

    const allFoodCategory = await this.foodRepository.getAllFoodCategory()        

    let foodCategory = allFoodCategory.find(cat => cat.name == category);
    if(foodCategory == undefined) return;

    const foodToAdd: Food = {name: food.name, selected: false, price: food.price};
    
    await this.addFoodToCategory(foodCategory.id, foodToAdd);        
  }

  async edit(categoryName: string, originalFoodName: string, updatedFood: Food) {

    const allFoodCategories = await this.foodRepository.getAllFoodCategory();
  
    let foodCategory = allFoodCategories.find(cat => cat.name === categoryName);
    if (!foodCategory) return;  
  
    const foodToUpdate = foodCategory.food.find(f => f.name === originalFoodName);
    if (!foodToUpdate) return;  
  
    try {
      await this.foodRepository.updateFoodInCategory(foodCategory.id, originalFoodName, updatedFood);
    } catch (error) {
      console.error('Error actualizando el alimento:', error);
    }
  }
  

  async getAllFoodCategory(): Promise<FoodCategory[]>{
    return await this.foodRepository.getAllFoodCategory();
  }
          
  // deleteFood(foodCategoryId: number){
  //   const foodRef = doc(this.firestore, `food/${foodCategoryId}`);
  //   return deleteDoc(foodRef);
  // }

  private async addFoodToCategory(categoryId: string, food: Food): Promise<void> {
    const foodCollection = collection(this.firestore, 'food');

    const foodDoc = doc(foodCollection, categoryId);

    const updatedFoodData = {
      food: arrayUnion(food)
    };

    return await updateDoc(foodDoc, updatedFoodData);
  }
  
}
