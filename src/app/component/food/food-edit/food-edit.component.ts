import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrls: ['./food-edit.component.scss']
})
export class FoodEditComponent implements OnInit {
  @Input() food: Food = <Food>{};
  @Input() categoryName: string = "";

  originalFoodName: string = '';

  constructor(private _foodService: FoodService,
    private _modalController: ModalController,
    private _toastService: ToastService){}

  ngOnInit(): void {
      this.originalFoodName = this.food.name;
  }

  dismiss(): void {
    this._modalController.dismiss();
  }

  async edit(): Promise<void>{
    await this._foodService.edit(this.categoryName, this.originalFoodName,  this.food);
    await this._toastService.showSuccess();
    this._modalController.dismiss();
  }
}
