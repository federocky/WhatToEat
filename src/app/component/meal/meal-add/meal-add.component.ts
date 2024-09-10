import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/meal';
import { MealService } from 'src/app/services/meal.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage'
import { MealType } from 'src/app/enums/mealType';
import { Router } from '@angular/router';


@Component({
  selector: 'app-meal-add',
  templateUrl: './meal-add.component.html',
  styleUrls: ['./meal-add.component.scss']
})
export class MealAddComponent implements OnInit {
  
  mealName: string = '';
  neededFood: string[] = [];
  optionalFood: string[] = [];
  newNeededFood: string = '';
  newOptionalFood: string = '';
  recipe: string = '';


  selectedImage: any;
  imageUrl: string = '';
  mealType: MealType = MealType.Any;

  constructor(private storage: Storage,
              private _mealService: MealService,
              private _router: Router
            ){}

  ngOnInit(): void {
    //Camera.requestPermissions();
  }

  async add(){      
    //TODO: refactor, this can be in the class
    const meal: Meal = {
      id: '',
      name: this.mealName,
      neededFood: this.neededFood,
      optionalFood: this.optionalFood,
      recipe: this.recipe,
      imageUrl: this.imageUrl,
      mealType: this.mealType
    }

    await this._mealService.addMeal(meal);
    this._router.navigate(['meal']);
  }

  checkPlatformForWeb(){
    return Capacitor.getPlatform() == 'web';
  }


  async takePhoto(){
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
    this.imageUrl = url || ''; 
} 



  dataURLtoBlob(dataUrl: any){
    var arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, uBarr = new Uint8Array(n);
      while(n--){
        uBarr[n] = bstr.charCodeAt(n);
      }
      return new Blob([uBarr], {type:mime});
  }

  async uploadImage(blob: any, imageData: any){
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
      return
    }
  }
  

  addFood(type: 'neededFood' | 'optionalFood', food: string) {
    if (food.trim() !== '') {
      this[type].push(food);
      this.clearInput(type);
    }
  }

  removeFood(type: 'neededFood' | 'optionalFood', food: string) {
    const index = this[type].indexOf(food);
    if (index !== -1) {
      this[type].splice(index, 1);
    }
  }

  clearInput(type: 'neededFood' | 'optionalFood') {
    if (type === 'neededFood') {
      this.newNeededFood = '';
    } else {
      this.newOptionalFood = '';
    }
  }
}
