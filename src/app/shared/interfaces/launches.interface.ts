import { TypeLauncheEnum } from '../enums/type-launch.enum';

export interface Launches {
  launches: Launche[];
}

export interface Launche {
  id: number;
  description: string;
  value: number;
  type: TypeLauncheEnum;
}

export interface MonthAndYears {
  month: string;
  year: string;
}
