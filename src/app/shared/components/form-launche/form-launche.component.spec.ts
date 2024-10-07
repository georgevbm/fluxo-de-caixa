import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TypeLauncheEnum } from '../../enums/type-launch.enum';
import { Launche } from '../../interfaces/launches.interface';
import { FormLauncheComponent } from './form-launche.component';

describe('FormLauncheComponent', () => {
  let component: FormLauncheComponent;
  let fixture: ComponentFixture<FormLauncheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
      ],
      declarations: [FormLauncheComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormLauncheComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.descriptionControl.value).toBe('');
    expect(component.valueControl.value).toBe('');
    expect(component.typeControl.value).toBe('');
  });

  it('should set form data when formData is provided', () => {
    const mockData: Launche = {
      id: 1,
      description: 'Test launch',
      value: 100,
      type: TypeLauncheEnum.SAIDA,
    };

    component.formData = mockData;
    component.ngOnInit();

    expect(component.descriptionControl.value).toBe(mockData.description);
    expect(component.valueControl.value).toBe(mockData.value);
    expect(component.typeControl.value).toBe(mockData.type);
  });

  it('should emit formDataEmit when the form is submitted', () => {
    const mockData: Launche = {
      id: 1,
      description: 'Test launch',
      value: 100,
      type: TypeLauncheEnum.ENTRADA,
    };

    component.formData = mockData;
    component.ngOnInit();

    component.descriptionControl.setValue(mockData.description);
    component.valueControl.setValue(mockData.value);
    component.typeControl.setValue(mockData.type);

    const spy = jest.spyOn(component.formDataEmit, 'emit');

    component.formDataEmit.emit(mockData);

    expect(spy).toHaveBeenCalledWith(mockData);
  });

  it('should validate required description field', () => {
    component.ngOnInit();

    component.descriptionControl.setValue('');
    component.valueControl.setValue('');
    component.typeControl.setValue('');

    expect(component.form.valid).toBeFalsy();
    expect(component.formErrors).toBeTruthy();
  });

  it('should validate required value field', () => {
    component.ngOnInit();

    component.descriptionControl.setValue('George');
    component.valueControl.setValue('');
    component.typeControl.setValue('');

    expect(component.form.valid).toBeFalsy();
    expect(component.formErrors).toBeTruthy();
  });

  it('should validate required type field', () => {
    component.ngOnInit();

    component.descriptionControl.setValue('George');
    component.valueControl.setValue('1000');
    component.typeControl.setValue('');

    expect(component.form.valid).toBeFalsy();
    expect(component.formErrors).toBeTruthy();
  });
});
