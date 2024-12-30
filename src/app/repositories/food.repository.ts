import { Injectable } from '@angular/core';
import { Firestore, addDoc, arrayUnion, collection, collectionData, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, firstValueFrom } from 'rxjs';
import { FoodCategory } from '../models/foodCategory';
import { Food } from '../models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodRepository {

  constructor(private firestore: Firestore) { }

  async addCategory(categoryName: string): Promise<void>{
    const foodRef = collection(this.firestore, 'food');

    let foodCat: FoodCategory = {
      id: '',
      name: categoryName,
      food: []
    }
    await addDoc(foodRef, foodCat);
  }

  async add(categoryId: string, food: Food): Promise<void> {
    const foodCollection = collection(this.firestore, 'food');

    const foodDoc = doc(foodCollection, categoryId);

    const updatedFoodData = {
      food: arrayUnion(food)
    };

    return await updateDoc(foodDoc, updatedFoodData);
  }

  async getAllCategory(): Promise<FoodCategory[]>{
    const foodRef = collection(this.firestore, 'food');
    var allFood = collectionData(foodRef, { idField: 'id' }) as Observable<FoodCategory[]>
    return await firstValueFrom(allFood);
  }

  async update(categoryId: string, originalFoodName:string, updatedFood: Food): Promise<void>{
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

  async delete(categoryId: string, foodName: string): Promise<void>{
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
      const foodIndex = categoryData.food.findIndex(food => food.name === foodName);
      if (foodIndex === -1) {
        console.error('Alimento no encontrado');
        return;
      }

      // Elimina elemento
      categoryData.food.splice(foodIndex, 1);


      // Guardar el documento actualizado
      await updateDoc(foodDoc, { ...categoryData });
    } catch (error) {
      console.error('Error actualizando el alimento:', error);
    }
  }

}
