import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodComponent } from './component/food/food.component';
import { MealComponent } from './component/meal/meal.component';
import { CookedMealsComponent } from './component/cooked-meals/cooked-meals.component';
import { FoodAddComponent } from './component/food/food-add/food-add.component';
import { MealAddComponent } from './component/meal/meal-add/meal-add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'food',
    pathMatch: 'full'
  },
  {
    path: 'food',
    component: FoodComponent
  },
  {
    path: 'meal',
    component: MealComponent
  },
  {
    path: 'cookead-meal',
    component: CookedMealsComponent
  },
  {
    path: 'food-add',
    component: FoodAddComponent
  },
  {
    path: 'meal-add',
    component: MealAddComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
