import { Dose } from './dose';
export interface Medicamento {
  id: number,
  nome: string,
  dosesDisponiveis: number,
  vencimento: number,
  dose: Dose
}
