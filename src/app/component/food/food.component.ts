import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodCategory } from 'src/app/models/foodCategory';
import { FoodService } from 'src/app/services/food.service';
import { MealService } from 'src/app/services/meal.service';
import { ModalController } from '@ionic/angular';
import { FoodEditComponent } from './food-edit/food-edit.component';
import { HeaderService } from 'src/app/services/header.service';
import { ToastService } from 'src/app/services/toast.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent{

  foodCategoryList: FoodCategory[] = []
  isEditMode = false;

  constructor(private _foodService: FoodService,
              private _mealService: MealService,
              private _router: Router,
              private _modalController: ModalController,
              private _headerService: HeaderService,
              private _toastService: ToastService,
              private _alertService: AlertService
              ){}


    
  async ionViewWillEnter(): Promise<void> {
    this._headerService.setTitle('Ingredientes');
    this._headerService.setShowBackButton(false);
    await this.getAllFoodCategory();
  }

  private async getAllFoodCategory(): Promise<void>{
    if(this.foodCategoryList.length === 0){
      this.foodCategoryList = await this._foodService.getAllCategory();
    }
  }

  cookMeal(): void{
    this._mealService.setAvailableFood(this.foodCategoryList);
    this._router.navigate(['cookead-meal']);
  }

  cookWeeklyMenu(): void{
    this._mealService.setAvailableFood(this.foodCategoryList);
    this._router.navigate(['weekly-menu']);
  }

  add(): void{
    this.foodCategoryList = [];
    this._router.navigate(['food-add']);
  }

  async openEditFoodModal(categoryName: string, food: any): Promise<void> {
    const modal = await this._modalController.create({
      component: FoodEditComponent,
      componentProps: {
        food: food,
        categoryName: categoryName
      }
    });
    return await modal.present();
  }

  async delete(categoryId: string, foodName: string): Promise<void>{
    var isDeleteConfirm = await this._alertService.showDeleteAlert();

    if(!isDeleteConfirm) return;

    try {
      await this._foodService.delete(categoryId, foodName)
      await this._toastService.showSuccess();
      this.foodCategoryList = [];
      await this.getAllFoodCategory();      
    } catch (error) {
      console.log(error);
      await this._toastService.showError();
    }
  }
}
