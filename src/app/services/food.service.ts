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

  async addFood(category: string, foodName: string){

    const allFoodCategory = await this.foodRepository.getAllFoodCategory()        

    let foodCategory = allFoodCategory.find(cat => cat.name == category);
    if(foodCategory == undefined) return;

    const foodToAdd: Food = {name: foodName, selected: false};
    
    this.addFoodToCategory(foodCategory.id, foodToAdd);
        
  }

  async getAllFoodCategory(): Promise<FoodCategory[]>{
    return await this.foodRepository.getAllFoodCategory();
  }
          
  // deleteFood(foodCategoryId: number){
  //   const foodRef = doc(this.firestore, `food/${foodCategoryId}`);
  //   return deleteDoc(foodRef);
  // }

  private addFoodToCategory(categoryId: string, food: Food): Promise<void> {
    const foodCollection = collection(this.firestore, 'food');

    const foodDoc = doc(foodCollection, categoryId);

    const updatedFoodData = {
      food: arrayUnion(food)
    };

    return updateDoc(foodDoc, updatedFoodData);
  }
  
}
