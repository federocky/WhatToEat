import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodComponent } from './component/food/food.component';
import { MealListComponent } from './component/meal/meal-list.component';
import { CookedMealsComponent } from './component/cooked-meals/cooked-meals.component';
import { FoodAddComponent } from './component/food/food-add/food-add.component';
import { MealAddComponent } from './component/meal/meal-add/meal-add.component';
import { MealDetailComponent } from './component/meal/meal-detail/meal-detail.component';
import { WeeklyMenuComponent } from './component/weekly-menu/weekly-menu/weekly-menu.component';

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
    component: MealListComponent
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
  },
  {
    path: 'meal-detail',
    component: MealDetailComponent
  },
  {
    path: 'weekly-menu',
    component: WeeklyMenuComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
