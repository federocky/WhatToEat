import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodCategory } from 'src/app/models/foodCategory';
import { FoodService } from 'src/app/services/food.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.component.html',
  styleUrls: ['./food-add.component.scss']
})
export class FoodAddComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  categoryList: FoodCategory[] = [];
  foodName: string = '';
  selectedCategory: string = '';
  categoryName:string = '';

  constructor(private _foodService: FoodService){}

  ngOnInit (){
    this.getAllFoodCategory();
  }

  private async getAllFoodCategory(){
    this.categoryList = await this._foodService.getAllFoodCategory();
  }

  add(){
    this._foodService.addFood(this.selectedCategory, this.foodName);
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
}
