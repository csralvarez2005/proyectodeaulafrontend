import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Monitor } from '../models/monitor.model';

const API_URL = 'http://localhost:8080/api/monitores';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  constructor(private http: HttpClient) { }

  getAllMonitores(): Observable<Monitor[]> {
    return this.http.get<Monitor[]>(API_URL)
      .pipe(
        catchError(error => {
          console.error('Error obteniendo monitores:', error);
          return throwError(() => error);
        })
      );
  }

  getMonitoresPaginated(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    return this.http.get<any>(`${API_URL}/pageable`, { params })
      .pipe(
        catchError(error => {
          console.error('Error obteniendo monitores paginados:', error);
          return throwError(() => error);
        })
      );
  }

  getMonitorById(id: number): Observable<Monitor> {
    return this.http.get<Monitor>(`${API_URL}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error obteniendo monitor con ID ${id}:`, error);
          return throwError(() => error);
        })
      );
  }

  getMonitoresByMarca(marca: string): Observable<Monitor[]> {
    return this.http.get<Monitor[]>(`${API_URL}/marca/${marca}`)
      .pipe(
        catchError(error => {
          console.error(`Error obteniendo monitores de marca ${marca}:`, error);
          return throwError(() => error);
        })
      );
  }

  getMonitoresByModelo(modelo: string): Observable<Monitor[]> {
    return this.http.get<Monitor[]>(`${API_URL}/modelo/${modelo}`)
      .pipe(
        catchError(error => {
          console.error(`Error obteniendo monitores de modelo ${modelo}:`, error);
          return throwError(() => error);
        })
      );
  }

  getMonitoresByEstado(estado: string): Observable<Monitor[]> {
    return this.http.get<Monitor[]>(`${API_URL}/estado/${estado}`)
      .pipe(
        catchError(error => {
          console.error(`Error obteniendo monitores en estado ${estado}:`, error);
          return throwError(() => error);
        })
      );
  }

  createMonitor(monitor: Monitor): Observable<Monitor> {
    return this.http.post<Monitor>(API_URL, monitor)
      .pipe(
        catchError(error => {
          console.error('Error creando monitor:', error);
          return throwError(() => error);
        })
      );
  }

  updateMonitor(id: number, monitor: Monitor): Observable<Monitor> {
    return this.http.put<Monitor>(`${API_URL}/${id}`, monitor)
      .pipe(
        catchError(error => {
          console.error(`Error actualizando monitor con ID ${id}:`, error);
          return throwError(() => error);
        })
      );
  }

  deleteMonitor(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`, { responseType: 'text' })
      .pipe(
        catchError(error => {
          console.error(`Error eliminando monitor con ID ${id}:`, error);
          return throwError(() => error);
        })
      );
  }
}