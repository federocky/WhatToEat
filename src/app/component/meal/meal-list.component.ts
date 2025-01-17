import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Meal } from 'src/app/models/meal';
import { HeaderService } from 'src/app/services/header.service';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html'
})
export class MealListComponent{

  meals: Meal[] = [];
  filteredMeals: Meal[] = [];
  mealsToShow: Meal[] = [];

  constructor(private _mealService: MealService,
              private _router: Router,
              private _headerService: HeaderService
            ){
  }


  async ionViewWillEnter(): Promise<void> {
    this._headerService.setTitle('Comidas');
    this._headerService.setShowBackButton(false);
    await this.getAllMeals();
  }

  private async getAllMeals(): Promise<void>{
    const allMeals = await this._mealService.getAll()
      this.meals = allMeals;
      this.filteredMeals = allMeals;
      this.mealsToShow = allMeals;
  }

  add(): void{
    this._router.navigate(['meal-add']);
  }

  onSearch(event: any): void {
    const searchText = event.detail.value.toLowerCase();
    if (!searchText) {
      this.mealsToShow = this.filteredMeals;
      return;
    }

    this.mealsToShow = this.filteredMeals.filter(meal =>
      meal.name.toLowerCase().includes(searchText)
    );
  }

  onCategoryChange(event: any): void {
    const selectedCategory = event.detail.value;

    if(selectedCategory === 'all'){
      this.filteredMeals = [...this.meals];
    } else{
      this.filteredMeals = this.meals.filter(meal => meal.category.toLowerCase() == selectedCategory);
    }
    this.mealsToShow = this.filteredMeals;
  }

}
