import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLauncheComponent } from './form-launche.component';

describe('FormLauncheComponent', () => {
  let component: FormLauncheComponent;
  let fixture: ComponentFixture<FormLauncheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLauncheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLauncheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
