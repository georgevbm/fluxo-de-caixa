import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TypeLauncheEnum } from '../../enums/type-launch.enum';
import { Launche } from '../../interfaces/launches.interface';

@Component({
  selector: 'app-card-launche',
  templateUrl: './card-launche.component.html',
  styleUrls: ['./card-launche.component.scss'],
})
export class CardLauncheComponent {
  @Input() launche!: Launche;
  @Output() clickButtonEdit = new EventEmitter<Launche>();
  @Output() clickButtonDelete = new EventEmitter<Launche>();

  TypeLauncheEnum = TypeLauncheEnum;
}
