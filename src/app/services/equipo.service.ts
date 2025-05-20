import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo } from '../models/equipo.model';

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
}