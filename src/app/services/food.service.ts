import { Injectable } from '@angular/core';
import { Food, FoodCategory } from '../models/food';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, arrayUnion, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private firestore: Firestore) {}

  addCategory(categoryName: string){
    const foodRef = collection(this.firestore, 'food');

    let foodCat: FoodCategory = {
      id: '',
      name: categoryName,
      food: []
    }
    addDoc(foodRef, foodCat);
  }

  addFood(category: string, foodName: string){

    let allFood: FoodCategory[];

    this.getAllFood()
      .subscribe((allFoodResult) => {
        
        allFood = allFoodResult;

        let foodCategory = allFood.find(cat => cat.name == category);
        if(foodCategory == undefined) return;

        const foodToAdd: Food = {name: foodName, selected: false};
        
        this.addFoodToCategory(foodCategory.id, foodToAdd);
        
      });     
  }

  private addFoodToCategory(categoryId: string, food: Food): Promise<void> {
    const foodCollection = collection(this.firestore, 'food');

    const foodDoc = doc(foodCollection, categoryId);

    const updatedFoodData = {
      food: arrayUnion(food)
    };

    return updateDoc(foodDoc, updatedFoodData);
  }
  
  getAllFood(): Observable<FoodCategory[]>{
    const foodRef = collection(this.firestore, 'food');
    return collectionData(foodRef, { idField: 'id' }) as Observable<FoodCategory[]>
  }
          
  // deleteFood(foodCategoryId: number){
  //   const foodRef = doc(this.firestore, `food/${foodCategoryId}`);
  //   return deleteDoc(foodRef);
  // }
  
}
