import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirm } from './dialog-confirm.component';

describe('DialogConfirm', () => {
  let component: DialogConfirm;
  let fixture: ComponentFixture<DialogConfirm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogConfirm],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogConfirm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
