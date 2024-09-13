import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, firstValueFrom } from 'rxjs';
import { FoodCategory } from '../models/foodCategory';
import { Food } from '../models/food';

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


  async updateFoodInCategory(categoryId: string, originalFoodName:string, updatedFood: Food){
    const foodCollection = collection(this.firestore, 'food');
    const foodDoc = doc(foodCollection, categoryId);
    try {

      const categoryDoc = await getDoc(foodDoc);
      if (!categoryDoc.exists()) {
        console.error('Categoría no encontrada');
        return;
      }

      // Obtener los datos del documento
      const categoryData = categoryDoc.data() as FoodCategory;

      // Encontrar el índice del alimento a actualizar
      const foodIndex = categoryData.food.findIndex(food => food.name === originalFoodName);
      if (foodIndex === -1) {
        console.error('Alimento no encontrado');
        return;
      }

      // Actualizar el alimento en la lista
      categoryData.food[foodIndex].name = updatedFood.name;
      categoryData.food[foodIndex].price = updatedFood.price;
      categoryData.food[foodIndex].selected = updatedFood.selected;


      // Guardar el documento actualizado
      await updateDoc(foodDoc, { ...categoryData });
    } catch (error) {
      console.error('Error actualizando el alimento:', error);
    }
  }

}
