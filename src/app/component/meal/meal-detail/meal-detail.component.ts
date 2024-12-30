import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Meal } from 'src/app/models/meal';
import { HeaderService } from 'src/app/services/header.service';
import { MealService } from 'src/app/services/meal.service';
import { ToastService } from 'src/app/services/toast.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.scss']
})
export class MealDetailComponent implements OnInit {

  meal: Meal = <Meal>{};
  private subscription: Subscription = new Subscription();

  constructor(private _mealService: MealService,
    private _headerService: HeaderService,
    private _router: Router,
    private _toastService: ToastService,
    private _alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.subscription = this._mealService.get().subscribe(meal => {
      this.meal = meal;
      console.log(this.meal)
    });  
  }

  ionViewWillEnter(): void {
    this._headerService.setShowBackButton(true);
    this._headerService.setBackButtonHref("/meal");
  }

  edit(): void{
    this._mealService.setSelected(this.meal);
    this._router.navigate(['/meal/edit', this.meal.id]);
  }

  async delete(): Promise<void>{

    var isDeleteConfirm = await this._alertService.showDeleteAlert();
    if(!isDeleteConfirm) return;

    try {
      this._mealService.delete(this.meal.id);
      await this._toastService.showSuccess();
    } catch (error) {
      await this._toastService.showError();
    }
    this._router.navigate(['meal']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
