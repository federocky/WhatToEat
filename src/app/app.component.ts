import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'whatToEat';
  showBackButton: boolean = false;
  backButtonHref: string = "/";

  constructor(private router: Router,
    private _headerService: HeaderService
  ){
    this.initializeApp();
  }

  initializeApp(): void {

      this._headerService.currentTitle.subscribe(newTitle => {
        this.title = newTitle;
      });

      this._headerService.currentShowBackButton.subscribe(show => {
        this.showBackButton = show;
      });

      this._headerService.currentBackButtonHref.subscribe(href => {
        this.backButtonHref = href;
      });
  }
}
