import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Meal } from '../models/meal';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MealRepository {

  constructor(private firestore: Firestore) { }

  async getAll():  Promise<Meal[]>{
    const foodRef = collection(this.firestore, 'meal');
    var mealObservable =  collectionData(foodRef, { idField: 'id' }) as Observable<Meal[]>  
    return firstValueFrom(mealObservable);
  }

  async add(meal: Meal){
    const mealRef = collection(this.firestore, 'meal');
    await addDoc(mealRef, meal);
  }

  async update(meal: Meal): Promise<void> {
    const foodRef = collection(this.firestore, 'meal');
    const mealDoc = doc(foodRef, meal.id)              
    await updateDoc(mealDoc, { ...meal });
  }

  async delete(id: string): Promise<void>{
    const foodRef = doc(this.firestore, `meal/${id}`);
    await deleteDoc(foodRef);
  }

}
