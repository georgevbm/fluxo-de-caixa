import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { TypeLauncheEnum } from '../../enums/type-launch.enum';
import { Launche } from '../../interfaces/launches.interface';
import { CardLauncheComponent } from './card-launche.component';

describe('CardLauncheComponent', () => {
  let component: CardLauncheComponent;
  let fixture: ComponentFixture<CardLauncheComponent>;

  const mockLaunche: Launche = {
    id: 1,
    description: 'Test Launche',
    type: TypeLauncheEnum.ENTRADA,
    value: 100,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [CardLauncheComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardLauncheComponent);
    component = fixture.componentInstance;
    component.launche = mockLaunche;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should receive launche as input', () => {
    expect(component.launche).toEqual(mockLaunche);
  });

  it('should emit clickButtonEdit when edit button is clicked', () => {
    const spyEmit = jest.spyOn(component.clickButtonEdit, 'emit');

    const button = fixture.debugElement.query(By.css('.btn-edit'));
    button.triggerEventHandler('click', null);

    expect(spyEmit).toHaveBeenCalledWith(mockLaunche);
  });

  it('should emit clickButtonDelete when delete button is clicked', () => {
    const spyEmit = jest.spyOn(component.clickButtonDelete, 'emit');

    const button = fixture.debugElement.query(By.css('.btn-delete'));
    button.triggerEventHandler('click', null);

    expect(spyEmit).toHaveBeenCalledWith(mockLaunche);
  });
});
