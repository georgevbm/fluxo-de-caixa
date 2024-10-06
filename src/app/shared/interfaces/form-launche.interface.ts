import { TypeLauncheEnum } from '../enums/type-launch.enum';

export interface FormLaunche {
  id?: number;
  description: string;
  value: number;
  type: TypeLauncheEnum;
}
