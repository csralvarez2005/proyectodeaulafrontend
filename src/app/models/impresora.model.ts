export interface Impresora {
  idImpresora?: number;
  numeroSerie: string;
  codigoPatrimonial?: string;
  marca: string;
  modelo: string;
  tipoImpresora?: string;
  tecnologiaImpresion?: string;
  tipoConexion?: string;
  tieneEscaner?: boolean;
  tieneWifi?: boolean;
  tieneDuplex?: boolean;
  estadoFisico?: string;
  condicion?: string;
  asignadoA?: string;
  areaDepartamento?: string;
  ubicacionFisica?: string;
  fechaAdquisicion?: string;
  proveedor?: string;
  precio?: number;
  numeroFactura?: string;
  garantiaVigente?: boolean;
  fechaVencimientoGarantia?: string;
  observaciones?: string;
  recibidoPor?: string;
}