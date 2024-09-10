import { Injectable } from '@angular/core';
import { Meal } from '../models/meal';
import { FoodCategory } from '../models/foodCategory';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { MealRepository } from '../repositories/meal.repository';
import { WeeklyMenu } from '../models/weeklyMenu';
import { MealType } from '../enums/mealType';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  availableFood: string[] = [];
  private mealSubject: BehaviorSubject<Meal> = new BehaviorSubject<Meal>(<Meal>{});

  constructor(private firestore: Firestore,
              private mealRepository: MealRepository
              ) { }

  addMeal(meal: Meal){
    const mealRef = collection(this.firestore, 'meal');
    addDoc(mealRef, meal);
  }

  async getAllMeals(): Promise<Meal[]>{
    return await this.mealRepository.getAllMeals()
  }

  setAvailableFood(foodList: FoodCategory[]){
    this.availableFood = [];
    for (const category of foodList) {
      category.food.forEach(food => {
        if(food.selected) this.availableFood.push(food.name);
      });
    }
  }

  setMeal(meal:Meal){
    this.mealSubject.next(meal);
  }

  getMeal(){
    return this.mealSubject.asObservable();
  }


  async cook(){
    try {
      const allMeals = await this.mealRepository.getAllMeals()

      const availableMeals = allMeals.filter(meal =>
        meal.neededFood.every(food =>
          this.availableFood.some(availableFood =>
             availableFood.toLowerCase() === food.toLowerCase()
            )
          )
      );

      console.log(availableMeals)

      return availableMeals;
    } catch (error) {
      console.error('Error getting meals:', error);
      return [];
    }
  }

  async cookWeaklyMenu(): Promise<WeeklyMenu>{
    
    const availableMeals = await this.cook();

    const availableLunch = availableMeals.filter(meal => meal.mealType === MealType.Any || meal.mealType === MealType.Lunch);
    const availableDinner = availableMeals.filter(meal => meal.mealType === MealType.Any || meal.mealType === MealType.Dinner);

    let weeklyMenu: WeeklyMenu = <WeeklyMenu>{};

    weeklyMenu.dayFoods = this.getRandomFiveMeals(availableLunch);
    weeklyMenu.nightFoods = this.getRandomFiveMeals(availableDinner);

    return weeklyMenu;
  }

  //ordena aleatoriamente y devuelve 5 elementos
  private getRandomFiveMeals(meals: any[]): any[] {
    return meals
      .sort(() => Math.random() - 0.5) // Mezcla aleatoria
      .slice(0, 5);
  }
  
}
