import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TypeLauncheEnum } from '../../enums/type-launch.enum';
import { Launche } from '../../interfaces/launches.interface';
import { FormLauncheComponent } from '../form-launche/form-launche.component';
import { DialogEditLaunche } from './dialog-edit-launche.component';

describe('DialogEditLauncheComponent', () => {
  let component: DialogEditLaunche;
  let fixture: ComponentFixture<DialogEditLaunche>;
  let dialogRef: MatDialogRef<DialogEditLaunche>;

  beforeEach(async () => {
    dialogRef = { close: jest.fn() } as any;

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
      ],
      declarations: [DialogEditLaunche, FormLauncheComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: 1,
            description: 'Entrada',
            type: TypeLauncheEnum.ENTRADA,
            value: 100,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogEditLaunche);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with new Launche data', () => {
    const mockLaunche: Launche = {
      id: 1,
      description: 'Parcela carro',
      type: TypeLauncheEnum.SAIDA,
      value: 200,
    };

    component.saveOrCancel(mockLaunche);

    expect(dialogRef.close).toHaveBeenCalledWith({
      id: 1,
      description: 'Parcela carro',
      type: TypeLauncheEnum.SAIDA,
      value: 200,
    });
  });

  it('should close the dialog with undefined when no Launche data is provided', () => {
    component.saveOrCancel(undefined);

    expect(dialogRef.close).toHaveBeenCalled();
  });
});
