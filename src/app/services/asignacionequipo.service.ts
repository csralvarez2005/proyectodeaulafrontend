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

  // ☁️ Migrar solo si Mongo está vacío
// Migrar si Mongo está vacío (con token)
migrarSiMongoVacio(): Observable<string> {
  const token = localStorage.getItem('auth-token');
  return this.http.get(`${this.apiUrl}/migrar/mongo`, {
    responseType: 'text',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

// 🔁 Migración forzada (retorna cantidad de registros migrados)
migrarForzado(): Observable<number> {
  const token = localStorage.getItem('auth-token');
  return this.http.get<number>(`${this.apiUrl}/migrar/forzado`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

// 🧾 Generar y descargar PDF (como Blob)
migrarYGenerarPdf(): Observable<Blob> {
  const token = localStorage.getItem('auth-token');
  return this.http.get(`${this.apiUrl}/migrar/pdf`, {
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
}