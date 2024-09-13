import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrls: ['./food-edit.component.scss']
})
export class FoodEditComponent implements OnInit {
  @Input() food: Food = <Food>{};
  @Input() categoryName: string = "";

  originalFoodName: string = '';

  constructor(private foodService: FoodService,
    private modalController: ModalController){}

  ngOnInit(): void {
      this.originalFoodName = this.food.name;
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async edit(){
    await this.foodService.edit(this.categoryName, this.originalFoodName,  this.food)
    this.modalController.dismiss();
  }
}
