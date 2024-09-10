import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Meal } from '../models/meal';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MealRepository {

  constructor(private firestore: Firestore) { }

  async getAllMeals():  Promise<Meal[]>{
    const foodRef = collection(this.firestore, 'meal');
    var mealObservable =  collectionData(foodRef, { idField: 'id' }) as Observable<Meal[]>  
    return firstValueFrom(mealObservable);
  }

  

}
