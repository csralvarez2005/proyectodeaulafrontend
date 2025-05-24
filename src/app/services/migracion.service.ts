import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MigracionService {
  private apiUrl = 'http://localhost:8080/api/migracion'; // Ajusta el puerto si es necesario

  constructor(private http: HttpClient) {}

  forzarMigracion(): Observable<any> {
    return this.http.post(`${this.apiUrl}/forzar`, {});
  }

descargarReportePdf(): Observable<Blob> {
  const token = localStorage.getItem('auth-token');
  return this.http.get(`${this.apiUrl}/reporte`, {
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
}