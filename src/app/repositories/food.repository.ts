import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, firstValueFrom } from 'rxjs';
import { FoodCategory } from '../models/foodCategory';

@Injectable({
  providedIn: 'root'
})
export class FoodRepository {

  constructor(private firestore: Firestore) { }

  async getAllFoodCategory(): Promise<FoodCategory[]>{
    const foodRef = collection(this.firestore, 'food');
    var allFood = collectionData(foodRef, { idField: 'id' }) as Observable<FoodCategory[]>
    return firstValueFrom(allFood);
  }

}
