import { Component, OnInit } from '@angular/core';
import { ImpresoraService } from '../../services/impresora.service';
import { Impresora } from '../../models/impresora.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-impresora-list',
  templateUrl: './impresora-list.component.html',
  styleUrls: ['./impresora-list.component.css']
})
export class ImpresoraListComponent implements OnInit {
 impresoras: Impresora[] = [];
  loading = false;
  error = '';

  constructor(
    private impresoraService: ImpresoraService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getImpresoras();
  }

  getImpresoras(): void {
    this.loading = true;
    this.impresoraService.getAll().subscribe({
      next: (data) => {
        this.impresoras = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar las impresoras';
        this.loading = false;
      }
    });
  }

  deleteImpresora(id: number): void {
    if (confirm('¿Está seguro de eliminar esta impresora?')) {
      this.impresoraService.delete(id).subscribe({
        next: () => this.getImpresoras(),
        error: () => this.error = 'Error al eliminar la impresora'
      });
    }
  }

editarImpresora(id?: number): void {
  if (id !== undefined) {
    this.router.navigate(['/dashboard/impresoras/editar', id]);
  }
}

 crearImpresora(): void {
    this.router.navigate(['/dashboard/impresoras/crear']);
  }

  verImpresora(id?: number): void {
  if (id !== undefined) {
    this.router.navigate(['/dashboard/impresoras', id]);
  }
}

}
