import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookedMealsComponent } from './cooked-meals.component';

describe('CookedMealsComponent', () => {
  let component: CookedMealsComponent;
  let fixture: ComponentFixture<CookedMealsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CookedMealsComponent]
    });
    fixture = TestBed.createComponent(CookedMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
