import { Injectable } from '@angular/core';
import { Meal } from '../models/meal';
import { FoodCategory } from '../models/food';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, arrayUnion, updateDoc } from '@angular/fire/firestore';
import { Observable, first, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  availableFood: string[] = [];

  constructor(private firestore: Firestore) { }

  addMeal(meal: Meal){
    const mealRef = collection(this.firestore, 'meal');
    addDoc(mealRef, meal);
  }

  setAvailableFood(foodList: FoodCategory[]){

    for (const category of foodList) {
      category.food.forEach(food => {
        if(food.selected) this.availableFood.push(food.name);
      });
    }
  }

  // cook() {
  //   let cookedMeals: Meal[] = [];

  //   let haveAllneededFood = true;

  //   let allMeals: Meal[] = [];
    
  //   this.getAllMeals()
  //     .subscribe((allMealsResult) => {
        
  //       allMeals = allMealsResult;

  //       for (const meal of allMeals) {
    
  //         haveAllneededFood = true;
    
  //         for (const neededFood of meal.neededFood) {
  //           if(!this.availableFood.includes(neededFood)) haveAllneededFood = false;
  //         }
    
  //         if(haveAllneededFood) cookedMeals.push(meal);
  //       }
    
  //       return cookedMeals;
  //     });
  // } 

  async cook(){
    try {
      const allMeals = await this.getAllMeals()
        .pipe(
          first(),
          map((meals) => {
            return meals.filter(meal =>
              meal.neededFood.every(food =>
                this.availableFood.some(availableFood =>
                  availableFood.toLowerCase() === food.toLowerCase()
                )
              )
            );
          })
        )
        .toPromise();
  
      return allMeals;
    } catch (error) {
      console.error('Error getting meals:', error);
      return [];
    }
  }

  getAllMeals(): Observable<Meal[]>{
    const foodRef = collection(this.firestore, 'meal');
    return collectionData(foodRef, { idField: 'id' }) as Observable<Meal[]>  
  }

}
