import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FoodCategory } from '../models/food';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private foodCategoryUrl = 'assets/data/food.json';
  private jsonData: FoodCategory[] = [];


  constructor(private storage: Storage,
              private http: HttpClient) {}

  //TODO: type this any
  getFoodCategory(): Observable<FoodCategory[]> {
    return this.http.get<FoodCategory[]>(this.foodCategoryUrl);
  }

  async getJson() {
    await this.storage.create();

    if (this.jsonData.length === 0) {
      // Si el JSON aún no está cargado, intenta cargarlo desde el almacenamiento local
      this.jsonData = (await this.storage.get('datos')) || [];

      // Si aún no hay datos, inicializa el JSON con algún valor predeterminado
      if (this.jsonData.length === 0) {
        this.jsonData = this.getDefaultData();
        this.saveData(this.jsonData);
      }

      return this.jsonData
    }

    return this.jsonData;
  }

  async saveData(data: FoodCategory[]) {
    console.log("hola")
    this.jsonData = data;
    await this.storage.set('datos', data);
    console.log((await this.storage.get('datos')))
  }

  
  private getDefaultData(): FoodCategory[] {
    // Puedes definir aquí tus datos predeterminados
    return [
      { name: 'verduras', 
        food: [
          { name: 'cebolla', selected: true }, 
          { name: 'zanahoria', selected: true }] 
        },
      { name: 'pasta-arroz', 
      food: [
        { name: 'pasta', selected: true }, 
        { name: 'arroz', selected: true }] },
      { name: 'salsas', 
      food: [
        { name: 'tomate frito', selected: true }, 
        { name: 'tomate triturado', selected: true }] }
    ];
  }
  
}
