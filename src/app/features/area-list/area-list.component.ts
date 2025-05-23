import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Area } from 'src/app/models/area.model';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css']
})
export class AreaListComponent implements OnInit {
  areas: Area[] = [];
  loading = false;
  error = '';

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
    if (confirm('¿Está seguro que desea eliminar esta área?')) {
      this.areaService.deleteArea(id).subscribe(
        () => {
          this.loadAreas();
        },
        error => {
          this.error = 'Error al eliminar el área';
        }
      );
    }
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