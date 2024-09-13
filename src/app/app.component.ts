import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'whatToEat';
  showBackButton = false;

  constructor(private router: Router){
    this.initializeApp();
  }

  initializeApp() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd)) // Filtra para solo escuchar cuando la navegación ha terminado
      .subscribe((event: any) => {
        if (event.url === '/food-add' || event.url === '/meal-add') {
          this.showBackButton = true;  
        } else {
          this.showBackButton = false;
        }
      });
  }
}
