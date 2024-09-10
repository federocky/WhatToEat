import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Meal } from 'src/app/models/meal';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.scss']
})
export class MealDetailComponent implements OnInit {

  meal: Meal = <Meal>{};
  private subscription: Subscription = new Subscription();

  constructor(private _mealService: MealService) {}

  ngOnInit(): void {
    this.subscription = this._mealService.getMeal().subscribe(meal => {
      this.meal = meal;
    });  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
