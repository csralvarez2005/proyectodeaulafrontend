import { Area } from './area.model';
import { Monitor } from './monitor.model';
export interface Equipo {
  id: number;

  // Información general
  codigoEquipo: string;
  descripcion: string;
  tipo: string;
  modelo: string;
  marca: string;
  serie: string;
  ubicacionDelEquipo: string;
  utilizacion: string;
  recibidoPor: string;

  // Información de compra y garantía
  proveedor: string;
  ordenDeCompra: string;
  factura: string;
  fechaDeCompra: Date;
  fechaFinGarantia: Date;
  garantia: string;
  precio: number;

  // Hardware
  procesador: string;
  memoriaRamGB: number;
  almacenamientoGB: number;
  tipoAlmacenamiento: string;
  placaBase: string;
  fuentePoderWatts: number;
  tarjetaGrafica: string;
  tieneTarjetaRed: boolean;
  tieneTarjetaSonido: boolean;
  gabinete: string;
  perifericosEntrada: string;
  perifericosSalida: string;
  componentes: string;
  accesorios: string;

  // Software
  sistemaOperativo: string;
  versionSO: string;
  driversInstalados: string;
  programasInstalados: string;
  utilidadesSistema: string;

  // Red / Configuración técnica
  direccionIP: string;
  direccionMAC: string;

  // Estado
  estado: string;

    
   // Relaciones
   monitores?: Monitor[]; 
    areas?: Area[]; // Relación con áreas
}