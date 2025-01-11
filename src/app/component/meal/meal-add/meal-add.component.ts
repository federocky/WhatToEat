import { Component } from '@angular/core';
import { Meal } from 'src/app/models/meal';
import { MealService } from 'src/app/services/meal.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage'
import { MealType } from 'src/app/enums/mealType';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { HeaderService } from 'src/app/services/header.service';
import { MealCategory } from 'src/app/enums/mealCategory';
import { FoodService } from 'src/app/services/food.service';


@Component({
  selector: 'app-meal-add',
  templateUrl: './meal-add.component.html',
  styleUrls: ['./meal-add.component.scss']
})
export class MealAddComponent {
  
  meal: Meal = <Meal>{};

  newNeededFood: string = '';
  newOptionalFood: string = '';

  selectedImage: any;

  isEditMode: boolean = false; 
  
  allFoods: string[] = []
  filteredFoods: string[] = [];
  activeNeededFoodList: boolean = false;
  activeOptionalFoodList: Boolean = false;

  constructor(private storage: Storage,
              private _mealService: MealService,
              private foodService: FoodService,
              private _router: Router,
              private _toastService: ToastService,
              private _headerService: HeaderService,
              private _route: ActivatedRoute
            ){}

  async ionViewWillEnter(): Promise<void> {
    await this.initializeMeal();
    await this.checkIsEditMode();
    await this.loadAllFoods();
    const title = this.isEditMode === true ? 'Modificar comida' : 'Agregar comida'
    this._headerService.setTitle(title);
    this._headerService.setShowBackButton(true);
    this._headerService.setBackButtonHref("/meal");
  }

  async upsert(): Promise<void>{      

    try {
      if(this.isEditMode){
        await this._mealService.update(this.meal);
      } else {
        await this._mealService.add(this.meal);
      }
      
      await this._toastService.showSuccess();
      this.initializeMeal();

    } catch (error) {
      await this._toastService.showError();
    }
    
    this._router.navigate(['meal']);
  }

  checkPlatformForWeb(): boolean{
    return Capacitor.getPlatform() == 'web';
  }

  async takePhoto(): Promise<void>{
    if(Capacitor.getPlatform() == 'web') await Camera.checkPermissions();

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.selectedImage = image.dataUrl;

    const blob = this.dataURLtoBlob(image.dataUrl);
    const url = await this.uploadImage(blob, image)
    this.meal.imageUrl = url || ''; 
  } 

  dataURLtoBlob(dataUrl: any): Blob{
    var arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, uBarr = new Uint8Array(n);
      while(n--){
        uBarr[n] = bstr.charCodeAt(n);
      }
      return new Blob([uBarr], {type:mime});
  }

  async uploadImage(blob: any, imageData: any): Promise<string>{
    try {
      const currentDate = Date.now();
      const filePath = `image/${currentDate}.${imageData.format}`;
      const fileRef = ref(this.storage, filePath);
      const task = await uploadBytes(fileRef, blob);
      const url = getDownloadURL(fileRef);
      return url;
    } catch (error) {
      console.log("error")
      console.log(error)
      return ''
    }
  }  

  addFood(type: 'neededFood' | 'optionalFood', food: string): void {
    if (food.trim() !== '') {
      var foodList = type === 'neededFood' ? this.meal.neededFood : this.meal.optionalFood;
      foodList.push(food);
      this.clearInput(type);
    }
  }

  removeFood(type: 'neededFood' | 'optionalFood', food: string): void {

    var foodList = type === 'neededFood' ? this.meal.neededFood : this.meal.optionalFood;
    const index = foodList.indexOf(food);

    if (index !== -1) {
      foodList.splice(index, 1);
    }
  }

  clearInput(type: 'neededFood' | 'optionalFood'): void {
    if (type === 'neededFood') {
      this.newNeededFood = '';
    } else {
      this.newOptionalFood = '';
    }
  }

  filterFoods(event: any, foodType: string): void {
    const foodToFind = event.target.value.toLowerCase();

    this.filteredFoods = this.allFoods.filter(food => 
      food.toLowerCase().includes(foodToFind) && !this.meal.neededFood.includes(food)
    );
    if(foodType === 'needed'){
      this.activeNeededFoodList = true;
    } else if(foodType === 'optional'){
      this.activeOptionalFoodList = true;
    }
  }

  selectFood(food: string, foodType: string): void {
    if(foodType === 'needed'){
      this.meal.neededFood.push(food);
      this.newNeededFood = '';
      this.activeNeededFoodList = false;
    } else if( foodType === 'optional'){
      this.meal.optionalFood.push(food);
      this.newOptionalFood = '';
      this.activeOptionalFoodList = false;
    }
    this.filteredFoods = [];
  }

  private initializeMeal(): void{
    this.meal = {
      id: '',
      name: '',
      neededFood: [],
      optionalFood: [],
      recipe: '',
      imageUrl: '',
      type: MealType.Any,
      category: MealCategory.Full
    };
  }

  private checkIsEditMode(): void{
    this._route.paramMap.subscribe(params => {
      const mealId = params.get('id');
      if (mealId) {
        this.isEditMode = true;
        this.loadMeal(mealId);  
      } else {
        this.isEditMode = false;
      }
    });
  }

  private async loadMeal(id: string): Promise<void>{
    this._mealService.get().subscribe(meal => {
        this.meal = meal;
      });    
  }

  private async loadAllFoods(): Promise<void>{
    const allFoodCategory = await this.foodService.getAllCategory();
    for (const foodCategory of allFoodCategory) {
      const foodNames = foodCategory.food.map(food => food.name);
      this.allFoods.push(...foodNames);
    }
    
  }
}
