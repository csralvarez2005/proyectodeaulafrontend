import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImpresoraService } from '../../services/impresora.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Impresora } from '../../models/impresora.model';


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
      this.impresoraService.getById(this.idImpresora).subscribe({
        next: (data) => this.impresoraForm.patchValue(data),
        error: () => this.errorMessage = 'No se pudo cargar la impresora'
      });
    }
  }

  get f() { return this.impresoraForm.controls; }

 onSubmit(): void { 
  this.submitted = true; 
  if (this.impresoraForm.invalid) return; 

  if (this.isEditMode && this.idImpresora) { 
    this.impresoraService.update(this.idImpresora, this.impresoraForm.value).subscribe({ 
      next: () => {
        this.successMessage = 'Impresora actualizada correctamente';
        this.router.navigate(['/dashboard/impresoras']); // Redirección tras actualizar
      }, 
      error: () => this.errorMessage = 'Error al actualizar la impresora' 
    }); 
  } else { 
    this.impresoraService.create(this.impresoraForm.value).subscribe({ 
      next: () => { 
        this.successMessage = 'Impresora creada correctamente'; 
        this.impresoraForm.reset(); 
        this.submitted = false;
        this.router.navigate(['/dashboard/impresoras']); // Redirección tras crear
      }, 
      error: () => this.errorMessage = 'Error al crear la impresora' 
    }); 
  } 
}

  goBack(): void {
    this.router.navigate(['/dashboard/impresoras']);
  }
}