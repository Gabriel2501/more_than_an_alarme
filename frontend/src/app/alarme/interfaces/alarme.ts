import { Medicamento } from './../../medicamento/interfaces/medicamento';
export interface Alarme {
  id: number,
  nome: string,
  dataInicio: string,
  usos: number,
  intervalo: number,
  avisos?: Date[],
  medicamento?: Medicamento,
  medicamentoId?: number,
  quantidade?: number,
  unidadeDeMedida?: number
}
