import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { MealComponent } from './component/meal/meal.component';
import { FoodComponent } from './component/food/food.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CookedMealsComponent } from './component/cooked-meals/cooked-meals.component';
import { MealCardsComponent } from './component/shared/meal-cards/meal-cards.component';
import { FoodAddComponent } from './component/food/food-add/food-add.component';
import { MealAddComponent } from './component/meal/meal-add/meal-add.component';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { OrderByPipe } from './pipes/order-by.pipe';
import { MealDetailComponent } from './component/shared/meal-cards/meal-detail/meal-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MealComponent,
    FoodComponent,
    CookedMealsComponent,
    MealCardsComponent,
    FoodAddComponent,
    MealAddComponent,
    OrderByPipe,
    MealDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    FormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
