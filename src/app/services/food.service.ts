import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodCategory } from '../models/food';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private foodCategoryUrl = 'assets/data/food.json';
  allFood: FoodCategory[] = [];


  constructor(private storage: Storage,
              private http: HttpClient) {
     this.loadAllFood();
  }

  private loadAllFood() {
    this.http.get<FoodCategory[]>(this.foodCategoryUrl)
    .subscribe({
      next: (res: FoodCategory[]) => {
        this.allFood = res;
      },
      error: err => console.log(err)
    })
  }

  addFood(category: string, foodName: string){
    let foodCategory = this.allFood.find(cat => cat.name = category);

    if(foodCategory == undefined) return;

    foodCategory.food.push({name: foodName, selected: false})
    
    this.saveData(this.allFood);
  }

  
  getFood(){
    console.log("llamo a getFood")
    console.log(this.allFood)
    return this.allFood;
  }
              
  // async getJson() {
  //   await this.storage.create();

  //   if (this.jsonData.length === 0) {
  //     // Si el JSON aún no está cargado, intenta cargarlo desde el almacenamiento local
  //     this.jsonData = (await this.storage.get('food')) || [];

  //     // Si aún no hay datos, inicializa el JSON con algún valor predeterminado
  //     if (this.jsonData.length === 0) {
  //       this.jsonData = this.getDefaultData();
  //       this.saveData(this.jsonData);
  //     }

  //     return this.jsonData
  //   }

  //   return this.jsonData;
  // }

  async saveData(data: FoodCategory[]) {
    await this.storage.create();
    await this.storage.set('food', data);
  }

  
}
