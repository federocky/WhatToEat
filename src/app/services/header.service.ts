import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private title = new BehaviorSubject<string>('What To Eat');
  private showBackButton = new BehaviorSubject<boolean>(false);
  private backButtonHref = new BehaviorSubject<string>('/');

  currentTitle = this.title.asObservable();
  currentShowBackButton = this.showBackButton.asObservable();
  currentBackButtonHref = this.backButtonHref.asObservable();

  setTitle(newTitle: string) {
    this.title.next(newTitle);
  }

  setShowBackButton(show: boolean) {
    this.showBackButton.next(show);
  }

  setBackButtonHref(href: string) {
    this.backButtonHref.next(href);
  }
}
