import { Injectable } from '@angular/core';
import { Meal } from '../models/meal';
import { FoodCategory } from '../models/foodCategory';
import { BehaviorSubject, Observable } from 'rxjs';
import { MealRepository } from '../repositories/meal.repository';
import { WeeklyMenu } from '../models/weeklyMenu';
import { MealType } from '../enums/mealType';
import { MealCategory } from '../enums/mealCategory';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  availableFood: string[] = [];
  private mealSubject: BehaviorSubject<Meal> = new BehaviorSubject<Meal>(<Meal>{});

  constructor(
              private _mealRepository: MealRepository
              ) { }

  async add(meal: Meal): Promise<void>{
    await this._mealRepository.add(meal);
  }

  get(): Observable<Meal>{
    return this.mealSubject.asObservable();
  }

  async getAll(): Promise<Meal[]>{
    return await this._mealRepository.getAll()
  }

  async update(meal: Meal): Promise<void>{
    await this._mealRepository.update(meal);
  }

  setSelected(meal:Meal): void{
    this.mealSubject.next(meal);
  }

  async delete(id: string): Promise<void>{
    await this._mealRepository.delete(id);
  }

  setAvailableFood(foodList: FoodCategory[]): void{
    this.availableFood = [];
    for (const category of foodList) {
      category.food.forEach(food => {
        if(food.selected) this.availableFood.push(food.name);
      });
    }
  }

  async cook() {
    try {
      const allMeals = await this._mealRepository.getAll()

      let availableMeals = allMeals.filter(meal =>
        meal.neededFood.every(food =>
          this.availableFood.some(availableFood =>
             availableFood.toLowerCase() === food.toLowerCase()
            )
          )
      );

      const sides = availableMeals.filter(meal => meal.category == MealCategory.Side);
      const mains = availableMeals.filter(meal => meal.category == MealCategory.Main);
      availableMeals = availableMeals.filter(meal => meal.category == MealCategory.Full)

      mains.forEach(main => {
        sides.forEach(side => {
          availableMeals.push({
            id: '',
            name: main.name + ' con ' + side.name,
            optionalFood: main.optionalFood.concat(side.optionalFood),
            neededFood: main.neededFood.concat(side.neededFood),
            recipe: main.recipe + ' ' + side.recipe,
            imageUrl: '',
            type: main.type,
            category: MealCategory.Full
          })
        })
      })

      return availableMeals;
    } catch (error) {
      console.error('Error getting meals:', error);
      return [];
    }
  }

  async cookWeaklyMenu(): Promise<WeeklyMenu>{
    
    const availableMeals = await this.cook();

    const availableLunch = availableMeals.filter(meal => meal.type === MealType.Any || meal.type === MealType.Lunch);
    const availableDinner = availableMeals.filter(meal => meal.type === MealType.Any || meal.type === MealType.Dinner);

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
