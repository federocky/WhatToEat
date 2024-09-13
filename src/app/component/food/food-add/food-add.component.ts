import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodCategory } from 'src/app/models/foodCategory';
import { FoodService } from 'src/app/services/food.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
import { Food } from 'src/app/models/food';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.component.html',
  styleUrls: ['./food-add.component.scss']
})
export class FoodAddComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  categoryList: FoodCategory[] = [];
  food: Food = <Food>{};
  selectedCategory: string = '';
  categoryName:string = '';

  constructor(private _foodService: FoodService,
              private _router: Router,
              private _toastService: ToastService
  ){}

  ngOnInit (){
    this.getAllFoodCategory();
  }

  private async getAllFoodCategory(){
    this.categoryList = await this._foodService.getAllFoodCategory();
  }

  async add(){
    try {
      await this._foodService.add(this.selectedCategory, this.food);
      await this._toastService.showSuccess();
      this.clearForm();
      
    } catch (error) {
      await this._toastService.showError();
    }

    this._router.navigate(['food']);
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.detail.value;
  }


  //TODO: move modal to a component
  onModalCancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onModalConfirm() {
    this._foodService.addCategory(this.categoryName);
    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  private clearForm(){
    this.selectedCategory = '';
    this.food.name = '';
    this.food.price = '';
  }
}
