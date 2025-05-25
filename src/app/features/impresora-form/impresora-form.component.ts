import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ImpresoraService } from '../../services/impresora.service'; 
import { ActivatedRoute, Router } from '@angular/router'; 
import { Impresora } from '../../models/impresora.model'; 
import Swal from 'sweetalert2'; // Importar SweetAlert2

@Component({ 
  selector: 'app-impresora-form', 
  templateUrl: './impresora-form.component.html', 
  styleUrls: ['./impresora-form.component.css'] 
}) 
export class ImpresoraFormComponent implements OnInit { 
  impresoraForm: FormGroup; 
  isEditMode = false; 
  submitted = false; 
  successMessage = ''; 
  errorMessage = ''; 
  idImpresora?: number; 
  loading = false; 

  constructor( 
    private fb: FormBuilder, 
    private impresoraService: ImpresoraService, 
    private route: ActivatedRoute, 
    private router: Router 
  ) { 
    this.impresoraForm = this.fb.group({ 
      numeroSerie: ['', Validators.required], 
      codigoPatrimonial: [''], 
      marca: ['', Validators.required], 
      modelo: ['', Validators.required], 
      tipoImpresora: [''], 
      tecnologiaImpresion: [''], 
      tipoConexion: [''], 
      tieneEscaner: [false], 
      tieneWifi: [false], 
      tieneDuplex: [false], 
      estadoFisico: [''], 
      condicion: [''], 
      asignadoA: [''], 
      areaDepartamento: [''], 
      ubicacionFisica: [''], 
      fechaAdquisicion: [''], 
      proveedor: [''], 
      precio: [null], 
      numeroFactura: [''], 
      garantiaVigente: [false], 
      fechaVencimientoGarantia: [''], 
      observaciones: [''], 
      recibidoPor: [''] 
    }); 
  } 

  ngOnInit(): void { 
    this.idImpresora = Number(this.route.snapshot.paramMap.get('id')); 
    if (this.idImpresora) { 
      this.isEditMode = true; 
      this.loading = true;
      this.impresoraService.getById(this.idImpresora).subscribe({ 
        next: (data) => {
          this.impresoraForm.patchValue(data);
          this.loading = false;
        }, 
        error: () => {
          this.loading = false;
          Swal.fire({
            title: 'Error',
            text: 'No se pudo cargar la impresora',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        } 
      }); 
    } 
  } 

  get f() { return this.impresoraForm.controls; } 

  onSubmit(): void { 
    this.submitted = true; 
    if (this.impresoraForm.invalid) return; 

    // Mostrar loading mientras se procesa
    Swal.fire({
      title: 'Procesando',
      text: 'Guardando información...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    if (this.isEditMode && this.idImpresora) { 
      this.impresoraService.update(this.idImpresora, this.impresoraForm.value).subscribe({ 
        next: () => { 
          Swal.fire({
            title: '¡Éxito!',
            text: 'Impresora actualizada correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/dashboard/impresoras']);
          });
        }, 
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'Error al actualizar la impresora',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        } 
      }); 
    } else { 
      this.impresoraService.create(this.impresoraForm.value).subscribe({ 
        next: () => { 
          Swal.fire({
            title: '¡Éxito!',
            text: 'Impresora creada correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.impresoraForm.reset();
            this.submitted = false;
            this.router.navigate(['/dashboard/impresoras']);
          });
        }, 
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'Error al crear la impresora',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        } 
      }); 
    } 
  } 

  goBack(): void { 
    this.router.navigate(['/dashboard/impresoras']); 
  }
  
  // Método para confirmar eliminación (si lo necesitas en este componente)
  confirmarEliminacion(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarImpresora(id);
      }
    });
  }
  
  private eliminarImpresora(id: number): void {
    this.impresoraService.delete(id).subscribe({
      next: () => {
        Swal.fire(
          '¡Eliminado!',
          'La impresora ha sido eliminada.',
          'success'
        ).then(() => {
          this.router.navigate(['/dashboard/impresoras']);
        });
      },
      error: () => {
        Swal.fire(
          'Error',
          'No se pudo eliminar la impresora.',
          'error'
        );
      }
    });
  }
} 