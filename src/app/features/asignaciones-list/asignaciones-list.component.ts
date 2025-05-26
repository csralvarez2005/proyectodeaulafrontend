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
   migracionMensaje: string = '';
migrando: boolean = false;
 

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
  migrarSiMongoEstaVacio(): void {
  this.migrando = true;
  this.migracionMensaje = '';
  this.asignacionService.migrarSiMongoVacio().subscribe({
    next: (mensaje) => {
      this.migracionMensaje = mensaje;
      this.getAsignaciones(); // Recargar lista si cambió
      this.migrando = false;
    },
    error: (err) => {
      this.migracionMensaje = '❌ Error al migrar';
      console.error(err);
      this.migrando = false;
    }
  });
}

// 🔁 Migración forzada
migrarForzado(): void {
  this.migrando = true;
  this.migracionMensaje = '';
  this.asignacionService.migrarForzado().subscribe({
    next: (cantidad) => {
      this.migracionMensaje = `✔️ Se migraron ${cantidad} registros`;
      this.getAsignaciones();
      this.migrando = false;
    },
    error: (err) => {
      this.migracionMensaje = '❌ Error al migrar forzadamente';
      console.error(err);
      this.migrando = false;
    }
  });
}

// 🧾 Generar PDF
descargarReportePdf(): void {
  this.asignacionService.migrarYGenerarPdf().subscribe(blob => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reporte-migracion.pdf';
    link.click();
  }, error => {
    console.error('Error al generar PDF', error);
    this.migracionMensaje = '❌ Error al generar PDF';
  });
}
}