export interface FormLaunche {
  description: string;
  valueInput: number;
  type: TypeLauncheEnum;
}

export enum TypeLauncheEnum {
  ENTRADA = 'entrada',
  SAIDA = 'saida',
}
