import { Component } from '@angular/core';
import { WeeklyMenu } from 'src/app/models/weeklyMenu';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-weekly-menu',
  templateUrl: './weekly-menu.component.html',
  styleUrls: ['./weekly-menu.component.scss']
})
export class WeeklyMenuComponent {

  weeklyMenu: WeeklyMenu = <WeeklyMenu>{}
  
  constructor(private _mealService: MealService){
  }


  async ionViewWillEnter() {
    await this.loadWeeklyMenu();
  }

  async loadWeeklyMenu(){
    this.weeklyMenu = await this._mealService.cookWeaklyMenu();
  }

  dayOfWeek(index: number): string {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    return days[index];
  }

}
