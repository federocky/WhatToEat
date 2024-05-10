import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/meal';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.scss']
})
export class MealDetailComponent implements OnInit {

  meal: Meal = <Meal>{};


  ngOnInit(): void {
      this.meal = history.state.meal;
      console.log(this.meal)
  }

  
}
