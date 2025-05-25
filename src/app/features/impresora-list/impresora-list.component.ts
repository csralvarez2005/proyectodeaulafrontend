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
  
  // Variables para paginación
  currentPage = 0;
  pageSize = 5;
  totalElements = 0;
  totalPages = 0;
 
  constructor( 
    private impresoraService: ImpresoraService, 
    private router: Router 
  ) {} 
 
  ngOnInit(): void { 
    this.getImpresoras(); 
  } 
 
  getImpresoras(): void { 
    this.loading = true; 
    this.impresoraService.getAllPaginated(this.currentPage, this.pageSize).subscribe({ 
      next: (data) => { 
        this.impresoras = data.content; 
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.loading = false; 
      }, 
      error: () => { 
        this.error = 'Error al cargar las impresoras'; 
        this.loading = false; 
      } 
    }); 
  } 
  
  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.getImpresoras();
    }
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
