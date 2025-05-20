import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario.model';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private apiUrl = `http://localhost:8080/api/funcionarios`;

  constructor(private http: HttpClient) { }

  // Obtener todos los funcionarios
  getAllFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl);
  }

  // Obtener funcionarios paginados
// Obtener funcionarios paginados 
getFuncionariosPaginados(page: number, size: number): Observable<any> { 
  const params = new HttpParams() 
    .set('page', page.toString()) 
    .set('size', size.toString()); 
  
  return this.http.get<any>(`${this.apiUrl}/pageable`, { params }); 
}

  // Obtener un funcionario por ID
  getFuncionarioById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/${id}`);
  }

  // Obtener funcionario por email
  getFuncionarioByEmail(email: string): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/email/${email}`);
  }

  // Obtener funcionarios por cargo
  getFuncionariosByCargo(cargo: string): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiUrl}/cargo/${cargo}`);
  }

  // Crear un nuevo funcionario
  createFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiUrl, funcionario);
  }

  // Actualizar un funcionario existente
  updateFuncionario(id: number, funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.apiUrl}/${id}`, funcionario);
  }

  // Eliminar un funcionario
  deleteFuncionario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}