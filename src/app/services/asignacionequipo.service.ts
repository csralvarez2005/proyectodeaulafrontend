import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsignacionEquipo } from '../models/asignacionequipo.model';

@Injectable({
  providedIn: 'root'
})
export class AsignacionEquipoService {
  private apiUrl = 'http://localhost:8080/api/asignaciones';

  constructor(private http: HttpClient) {}

getAsignaciones(page: number, size: number): Observable<any> {
      let params = new HttpParams()
         .set('page', page.toString())
         .set('size', size.toString());
    return this.http.get<any>(`${this.apiUrl}/pageable?page=${page}&size=${size}`);
  }

  getAllAsignaciones(): Observable<AsignacionEquipo[]> {
    return this.http.get<AsignacionEquipo[]>(this.apiUrl);
  }

  getAsignacionById(id: number): Observable<AsignacionEquipo> {
    return this.http.get<AsignacionEquipo>(`${this.apiUrl}/${id}`);
  }

  createAsignacion(asignacion: AsignacionEquipo): Observable<AsignacionEquipo> {
    return this.http.post<AsignacionEquipo>(this.apiUrl, asignacion);
  }

  updateAsignacion(id: number, asignacion: AsignacionEquipo): Observable<AsignacionEquipo> {
    return this.http.put<AsignacionEquipo>(`${this.apiUrl}/${id}`, asignacion);
  }

  deleteAsignacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAsignacionesByEquipoId(equipoId: number): Observable<AsignacionEquipo[]> {
    return this.http.get<AsignacionEquipo[]>(`${this.apiUrl}/equipo/${equipoId}`);
  }

  getAsignacionesByFuncionarioId(funcionarioId: number): Observable<AsignacionEquipo[]> {
    return this.http.get<AsignacionEquipo[]>(`${this.apiUrl}/funcionario/${funcionarioId}`);
  }

  getAsignacionesByAreaId(areaId: number): Observable<AsignacionEquipo[]> {
    return this.http.get<AsignacionEquipo[]>(`${this.apiUrl}/area/${areaId}`);
  }
}