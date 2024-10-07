// dialog-confirm.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypeLauncheEnum } from '../../enums/type-launch.enum';
import { Launche } from '../../interfaces/launches.interface';
import { DialogConfirm } from './dialog-confirm.component';

describe('DialogConfirm', () => {
  let component: DialogConfirm;
  let fixture: ComponentFixture<DialogConfirm>;
  let dialogRef: MatDialogRef<DialogConfirm>;

  const mockLaunch: Launche = {
    id: 123,
    description: 'Teste',
    type: TypeLauncheEnum.ENTRADA,
    value: 1000,
  };

  beforeEach(async () => {
    dialogRef = { close: jest.fn() } as any;

    await TestBed.configureTestingModule({
      declarations: [DialogConfirm],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockLaunch },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogConfirm);
    component = fixture.componentInstance;
  });

  it('should create the component and inject data correctly', () => {
    expect(component).toBeTruthy();
    expect(component.data).toEqual(mockLaunch);
  });

  it('should call dialogRef.close with the correct id when deleteOrCancel is called with false', () => {
    component.deleteOrCancel(false);
    expect(dialogRef.close).toHaveBeenCalledWith(mockLaunch.id);
  });

  it('should call dialogRef.close with undefined when deleteOrCancel is called with true', () => {
    component.deleteOrCancel(true);
    expect(dialogRef.close).toHaveBeenCalledWith(undefined);
  });
});
