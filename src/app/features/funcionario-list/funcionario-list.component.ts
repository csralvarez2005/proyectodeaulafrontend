import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Funcionario } from 'src/app/models/funcionario.model';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.css']
})
export class FuncionarioListComponent implements OnInit{
  funcionarios: Funcionario[] = [];
  loading = false;
  error = '';
    isEditMode: boolean = false;
  
  // Variables para paginación
  currentPage = 0;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFuncionarios();
  }

  loadFuncionarios(): void {
    this.loading = true;
    this.funcionarioService.getFuncionariosPaginados(this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          this.funcionarios = data.content;
          this.totalItems = data.totalElements;
          this.totalPages = data.totalPages;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar funcionarios: ' + (err.error?.message || err.message);
          this.loading = false;
        }
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadFuncionarios();
  }

  viewDetails(id: number): void {
    this.router.navigate(['/funcionarios', id]);
  }

editFuncionario(id: number): void {
  this.router.navigate(['/dashboard/funcionarios/editar', id]);
}

  deleteFuncionario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este funcionario?')) {
      this.funcionarioService.deleteFuncionario(id)
        .subscribe({
          next: () => {
            this.loadFuncionarios();
          },
          error: (err) => {
            this.error = 'Error al eliminar funcionario: ' + (err.error?.message || err.message);
          }
        });
    }
  }
  crearFuncionario() {
  this.router.navigate(['/dashboard/funcionarios/crear']);
}

}
