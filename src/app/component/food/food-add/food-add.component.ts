import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodCategory } from 'src/app/models/foodCategory';
import { FoodService } from 'src/app/services/food.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
import { Food } from 'src/app/models/food';
import { ToastService } from 'src/app/services/toast.service';
import { HeaderService } from 'src/app/services/header.service';


@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.component.html',
  styleUrls: ['./food-add.component.scss']
})
export class FoodAddComponent {
  @ViewChild(IonModal) modal!: IonModal;

  categoryList: FoodCategory[] = [];
  food: Food = <Food>{};
  selectedCategory: string = '';
  categoryName:string = '';

  constructor(private _foodService: FoodService,
              private _router: Router,
              private _toastService: ToastService,
              private _headerService: HeaderService
  ){}


  async ionViewWillEnter(): Promise<void> {
    this._headerService.setTitle('Agregar ingrediente');
    this._headerService.setShowBackButton(true);
    this._headerService.setBackButtonHref("/food");
    await this.getAllFoodCategory();
  }

  private async getAllFoodCategory(): Promise<void>{
    this.categoryList = await this._foodService.getAllCategory();
  }

  async add(): Promise<void>{
    try {
      await this._foodService.add(this.selectedCategory, this.food);
      await this._toastService.showSuccess();
      this.clearForm();
      
    } catch (error) {
      await this._toastService.showError();
    }

    this._router.navigate(['food']);
  }

  onCategoryChange(event: any): void {
    this.selectedCategory = event.detail.value;
  }


  //TODO: move modal to a component
  onModalCancel(): void {
    this.modal.dismiss(null, 'cancel');
  }

  onModalConfirm(): void {
    this._foodService.addCategory(this.categoryName);
    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event): void {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  private clearForm(): void{
    this.selectedCategory = '';
    this.food.name = '';
    this.food.price = '';
  }
}
