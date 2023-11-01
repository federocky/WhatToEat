import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodComponent } from './component/food/food.component';
import { MealComponent } from './component/meal/meal.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
