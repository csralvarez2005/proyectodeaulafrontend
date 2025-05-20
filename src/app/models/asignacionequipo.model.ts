import { Area } from './area.model';
import { Equipo } from './equipo.model';
import { Funcionario } from './funcionario.model';

export interface AsignacionEquipo {
  id: number;
  fechaAsignacion: Date;
  area: Area;
  equipo: Equipo;
  funcionario: Funcionario;
}