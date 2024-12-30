import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController,
  ) { }

  async showDeleteAlert(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.alertController.create({
        header: 'Eliminar',
        message: '¿Estás seguro de que deseas eliminar?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => resolve(false)
          },
          {
            text: 'Eliminar',
            role: 'destructive',
            handler: () => resolve(true)
          }
        ]
      }).then(alert => alert.present());
    });
  }

}
