import { Component, OnInit } from '@angular/core';
import { AsignacionEquipo } from '../../models/asignacionequipo.model';
import { AsignacionEquipoService } from '../../services/asignacionequipo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignaciones-list',
  templateUrl: './asignaciones-list.component.html',
  styleUrls: ['./asignaciones-list.component.css']
})
export class AsignacionesListComponent implements OnInit {
  asignaciones: AsignacionEquipo[] = [];
  loading = false;
  error = '';
  currentPage = 0;
  totalPages = 1;
   totalElements = 0;
 

  constructor(
    private asignacionService: AsignacionEquipoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAsignaciones();
  }

getAsignaciones(page: number = 0): void {
    this.loading = true;
    const size = 10; // Definimos un tamaño de página predeterminado
    this.asignacionService.getAsignaciones(page, size).subscribe(
      (data: any) => {
        this.asignaciones = data.content || data;
        this.totalPages = data.totalPages || 1;
        this.totalElements = data.totalElements || 0; // Capturamos el total de elementos
        this.currentPage = page;
        this.loading = false;
      },
      error => {
        this.error = 'Error al cargar las asignaciones';
        this.loading = false;
      }
    );
  }

    onPageChange(page: number): void {
    this.getAsignaciones(page);
  }

 editAsignacion(id: number): void {
    this.router.navigate(['/dashboard/asignaciones/editar', id]);
  }

  deleteAsignacion(id: number): void {
    // Lógica para eliminar
  }

  viewDetails(id: number): void {
    // Lógica para ver detalles
  }
}