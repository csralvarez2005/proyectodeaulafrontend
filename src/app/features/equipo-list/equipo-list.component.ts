import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipo } from '../../models/equipo.model';
import { EquipoService } from '../../services/equipo.service';

@Component({
  selector: 'app-equipo-list',
  templateUrl: './equipo-list.component.html',
  styleUrls: ['./equipo-list.component.css']
})
export class EquipoListComponent implements OnInit {
  equipos: Equipo[] = [];
  loading = false;
  error = '';
  isEditMode: boolean = false;
  
  // Variables para paginación
  currentPage = 0;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  constructor(
    private equipoService: EquipoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEquipos();
  }

  loadEquipos(): void {
    this.loading = true;
    this.equipoService.getEquiposPaginados(this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          this.equipos = data.content;
          this.totalItems = data.totalElements;
          this.totalPages = data.totalPages;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar equipos: ' + (err.error?.message || err.message);
          this.loading = false;
        }
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadEquipos();
  }

  viewDetails(id: number): void {
    this.router.navigate(['/equipo', id]);
  }

editEquipo(id: number): void {
    this.router.navigate(['/dashboard/equipo/edit', id]);
  }

  deleteEquipo(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este equipo?')) {
      this.equipoService.deleteEquipo(id)
        .subscribe({
          next: () => {
            this.loadEquipos();
          },
          error: (err) => {
            this.error = 'Error al eliminar equipo: ' + (err.error?.message || err.message);
          }
        });
    }
  }

  crearEquipo() {
    this.router.navigate(['/dashboard/equipo/crear']);
  }

  
}
