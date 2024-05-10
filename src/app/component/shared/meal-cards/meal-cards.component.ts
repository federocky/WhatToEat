import { Component, Input } from '@angular/core';
import { Meal } from 'src/app/models/meal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal-cards',
  templateUrl: './meal-cards.component.html',
  styleUrls: ['./meal-cards.component.scss']
})
export class MealCardsComponent {
  @Input() meals: Meal[] = [];

  constructor(private router: Router) {}

  seeDetail(mealId: string){
    const meal = this.meals.find(meal => meal.id === mealId);
    this.router.navigate(['/meal-detail'], { state: { meal: meal } });

  }
}
