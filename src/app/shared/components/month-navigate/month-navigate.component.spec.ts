import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthNavigateComponent } from './month-navigate.component';

describe('MonthNavigateComponent', () => {
  let component: MonthNavigateComponent;
  let fixture: ComponentFixture<MonthNavigateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthNavigateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
