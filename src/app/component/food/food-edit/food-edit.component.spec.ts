import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodEditComponent } from './food-edit.component';

describe('FoodEditComponent', () => {
  let component: FoodEditComponent;
  let fixture: ComponentFixture<FoodEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodEditComponent]
    });
    fixture = TestBed.createComponent(FoodEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
