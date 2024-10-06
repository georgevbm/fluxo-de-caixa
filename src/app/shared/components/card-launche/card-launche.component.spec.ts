import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLauncheComponent } from './card-launche.component';

describe('CardLauncheComponent', () => {
  let component: CardLauncheComponent;
  let fixture: ComponentFixture<CardLauncheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardLauncheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLauncheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
