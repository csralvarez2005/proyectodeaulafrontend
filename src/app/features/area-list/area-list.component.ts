import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Area } from 'src/app/models/area.model';
import { AreaService } from 'src/app/services/area.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css']
})
export class AreaListComponent implements OnInit {
  areas: Area[] = [];
  loading = false;
  error = '';
    isEditMode = false; 
    submitted = false;

  // Variables para la paginación
  currentPage = 0;
  pageSize = 5;
  totalElements = 0;

  constructor(
    private areaService: AreaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAreas();
  }

  loadAreas(): void {
    this.loading = true;
    this.areaService.getAllAreasPaginated(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.areas = response.content; // contenido de la página
        this.totalElements = response.totalElements; // total de registros
        this.loading = false;
      },
      error => {
        this.error = 'Error al cargar las áreas';
        this.loading = false;
      }
    );
  }

  editArea(id: number): void {
    this.router.navigate(['/dashboard/areas/edit', id]);
  }

 deleteArea(id: number): void {
  Swal.fire({
    title: '¿Está seguro?',
    text: 'Esta acción eliminará el área permanentemente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.areaService.deleteArea(id).subscribe(
        () => {
          Swal.fire('Eliminado', 'El área ha sido eliminada.', 'success');
          this.loadAreas();
        },
        error => {
          Swal.fire('Error', 'Error al eliminar el área.', 'error');
        }
      );
    }
  });
}

  viewDetails(id: number): void {
    this.router.navigate(['/dashboard/areas/detail', id]);
  }

  nextPage(): void {
    if ((this.currentPage + 1) * this.pageSize < this.totalElements) {
      this.currentPage++;
      this.loadAreas();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadAreas();
    }
  }
}