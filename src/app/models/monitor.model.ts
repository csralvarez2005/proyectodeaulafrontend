export interface Monitor {
  id: number;
  marca: string;
  modelo: string;
  numeroSerie: string;
  ordenDeCompra: string;
  tamanoPantalla: string;
  resolucion: string;
  tipoConector: string;
  estado: string;
  observaciones: string;
  esAjustable: boolean;
  tieneAltavoces: boolean;
  factura: string;
  fechaDeCompra: Date;
  fechaFinGarantia: Date;
  garantia: string;
  precio: number;
  recibidoPor: string;
  proveedor: string;
}