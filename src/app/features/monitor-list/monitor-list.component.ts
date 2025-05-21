import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Monitor } from '../../models/monitor.model';
import { MonitorService } from '../../services/monitor.service';

@Component({
  selector: 'app-monitor-list',
  templateUrl: './monitor-list.component.html',
  styleUrls: ['./monitor-list.component.css']
})
export class MonitorListComponent implements OnInit {
  monitores: Monitor[] = [];
  filteredMonitores: Monitor[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';
  searchTerm = '';
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  totalPages = 0;

  constructor(
    private monitorService: MonitorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadMonitores();
  }

  loadMonitores(): void {
    this.loading = true;
    this.monitorService.getMonitoresPaginated(this.currentPage, this.pageSize).subscribe(
      data => {
        this.monitores = data.content;
        this.filteredMonitores = [...this.monitores];
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Error al cargar los monitores';
        this.loading = false;
      }
    );
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredMonitores = [...this.monitores];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredMonitores = this.monitores.filter(monitor => 
      monitor.marca.toLowerCase().includes(term) ||
      monitor.modelo.toLowerCase().includes(term) ||
      monitor.numeroSerie.toLowerCase().includes(term) ||
      (monitor.estado && monitor.estado.toLowerCase().includes(term))
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredMonitores = [...this.monitores];
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadMonitores();
  }

  editMonitor(id: number): void {
    this.router.navigate(['/dashboard/monitores/editar', id]);
  }

  createMonitor(): void {
    this.router.navigate(['/dashboard/monitores/crear']);
  }

  deleteMonitor(id: number): void {
    if (confirm('¿Está seguro que desea eliminar este monitor?')) {
      this.loading = true;
      this.monitorService.deleteMonitor(id).subscribe(
        () => {
          this.successMessage = 'Monitor eliminado con éxito';
          this.loadMonitores();
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error => {
          this.errorMessage = 'Error al eliminar el monitor';
          this.loading = false;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      );
    }
  }

  getStatusClass(estado: string): string {
    switch (estado) {
      case 'Activo':
        return 'badge bg-success';
      case 'Inactivo':
        return 'badge bg-warning';
      case 'En reparación':
        return 'badge bg-info';
      case 'Dado de baja':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }
}
