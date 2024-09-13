import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  /**
   * @param message 
   */
  async showSuccess(message: string = 'La operación se ha realizado con éxito'){
      const toast = await this.toastController.create({
        message: message,
        duration: 2000,
        color: 'success',
        position: 'top' 
      });
      await toast.present();
  }

    /**
   * @param message 
   */
    async showError(message: string = 'Oops, ha ocurrido un error, intentelo de nuevoo mas tarde'){
      const toast = await this.toastController.create({
        message: message,
        duration: 2000,
        color: 'danger',
        position: 'top' 
      });
      await toast.present();
  }
}
