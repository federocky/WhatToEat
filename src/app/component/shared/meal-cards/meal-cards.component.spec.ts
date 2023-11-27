import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealCardsComponent } from './meal-cards.component';

describe('MealCardsComponent', () => {
  let component: MealCardsComponent;
  let fixture: ComponentFixture<MealCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealCardsComponent]
    });
    fixture = TestBed.createComponent(MealCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
