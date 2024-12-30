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
import { Subscription } from 'rxjs';
import { MealCategory } from 'src/app/enums/mealCategory';


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

  private subscription: Subscription = new Subscription();

  constructor(private storage: Storage,
              private _mealService: MealService,
              private _router: Router,
              private _toastService: ToastService,
              private _headerService: HeaderService,
              private _route: ActivatedRoute
            ){}

  async ionViewWillEnter(): Promise<void> {
    await this.initializeMeal();
    await this.checkIsEditMode();
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

    console.log(image);

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
      console.log("task: ", task);
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
    this.subscription = this._mealService.get().subscribe(meal => {
      this.meal = meal;
    });    
  }
}
