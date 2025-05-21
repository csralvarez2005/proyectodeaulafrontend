import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Impresora } from '../models/impresora.model';

@Injectable({
  providedIn: 'root'
})
export class ImpresoraService {
  private apiUrl = 'http://localhost:8080/api/impresoras';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Impresora[]> {
    return this.http.get<Impresora[]>(this.apiUrl);
  }

  getById(id: number): Observable<Impresora> {
    return this.http.get<Impresora>(`${this.apiUrl}/${id}`);
  }

  create(impresora: Impresora): Observable<Impresora> {
    return this.http.post<Impresora>(this.apiUrl, impresora);
  }

  update(id: number, impresora: Impresora): Observable<Impresora> {
    return this.http.put<Impresora>(`${this.apiUrl}/${id}`, impresora);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}