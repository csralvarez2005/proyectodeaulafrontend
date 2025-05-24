import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo } from '../models/equipo.model';
import { Monitor } from '../models/monitor.model';
import { Area } from '../models/area.model';


@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  private baseUrl = 'http://localhost:8080/api/equipos';

  constructor(private http: HttpClient) { }

  getEquiposPaginados(page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    return this.http.get<any>(`${this.baseUrl}/pageable`, { params });
  }

  getAllEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.baseUrl);
  }

  getEquipoById(id: number): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.baseUrl}/${id}`);
  }

  createEquipo(equipo: Equipo): Observable<Equipo> {
    return this.http.post<Equipo>(this.baseUrl, equipo);
  }

  updateEquipo(id: number, equipo: Equipo): Observable<Equipo> {
    return this.http.put<Equipo>(`${this.baseUrl}/${id}`, equipo);
  }

  deleteEquipo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getEquiposByTipo(tipo: string): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.baseUrl}/tipo/${tipo}`);
  }

  getEquiposByMarca(marca: string): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.baseUrl}/marca/${marca}`);
  }

  getEquiposByEstado(estado: string): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.baseUrl}/estado/${estado}`);
  }
// Nuevos métodos para la relación con monitores
  agregarMonitor(equipoId: number, monitorId: number): Observable<Equipo> {
    return this.http.put<Equipo>(`${this.baseUrl}/${equipoId}/agregar-monitor/${monitorId}`, {});
  }

  quitarMonitor(equipoId: number, monitorId: number): Observable<Equipo> {
    return this.http.put<Equipo>(`${this.baseUrl}/${equipoId}/quitar-monitor/${monitorId}`, {});
  }

  findByMonitoresIsEmpty(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.baseUrl}/sin-monitores`);
  }

  getMonitoresByEquipoId(equipoId: number): Observable<Monitor[]> {
    return this.http.get<Monitor[]>(`${this.baseUrl}/${equipoId}/monitores`);
  }

   getAreasByEquipoId(equipoId: number): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.baseUrl}/${equipoId}/areas`);
  }

generarCodigoEquipo(abreviatura: string): Observable<string> {
    const params = new HttpParams().set('abreviatura', abreviatura);
    return this.http.get(`${this.baseUrl}/generar-codigo`, { params, responseType: 'text' });
  }

  // Llama al endpoint POST para forzar la migración
 // Forzar la migración
  forzarMigracion(): Observable<any> {
    return this.http.post(`${this.baseUrl}/forzar`, {});
  }

// Llama al endpoint GET para descargar el PDF
 descargarReporteMigracion(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/reporte`, {
      responseType: 'blob'
    });
  }
}

