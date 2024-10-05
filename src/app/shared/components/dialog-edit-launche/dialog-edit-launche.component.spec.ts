import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditLauncheComponent } from './dialog-edit-launche.component';

describe('DialogEditLauncheComponent', () => {
  let component: DialogEditLauncheComponent;
  let fixture: ComponentFixture<DialogEditLauncheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditLauncheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditLauncheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
