import { Component, Input } from '@angular/core';
import { Meal } from 'src/app/models/meal';

@Component({
  selector: 'app-meal-cards',
  templateUrl: './meal-cards.component.html',
  styleUrls: ['./meal-cards.component.scss']
})
export class MealCardsComponent {
  @Input() meals: Meal[] = [];

}
