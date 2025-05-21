import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Monitor } from '../../models/monitor.model';
import { MonitorService } from '../../services/monitor.service';

@Component({
  selector: 'app-monitor-form',
  templateUrl: './monitor-form.component.html',
  styleUrls: ['./monitor-form.component.css']
})
export class MonitorFormComponent implements OnInit {
  
  monitorForm: FormGroup = this.formBuilder.group({
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    numeroSerie: ['', Validators.required],
    tamanoPantalla: [''],
    resolucion: [''],
    tipoConector: [''],
    estado: ['Activo', Validators.required],
    observaciones: [''],
    esAjustable: [false],
    tieneAltavoces: [false],
    ordenDeCompra: [''],
    factura: [''],
    fechaDeCompra: ['', Validators.required],
    fechaFinGarantia: [''],
    garantia: [''],
    precio: [0, [Validators.required, Validators.min(0)]],
    recibidoPor: [''],
    proveedor: ['']
  });

  isEditMode: boolean = false;
  monitorId: number = 0;
  loading = false;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private monitorService: MonitorService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.monitorId = +params['id'];
        this.loadMonitor(this.monitorId);
      }
    });
  }

  get f() { return this.monitorForm.controls; }

  initForm(): void {
    this.monitorForm = this.formBuilder.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      numeroSerie: ['', Validators.required],
      tamanoPantalla: [''],
      resolucion: [''],
      tipoConector: [''],
      estado: ['Activo', Validators.required],
      observaciones: [''],
      esAjustable: [false],
      tieneAltavoces: [false],
      ordenDeCompra: [''],
      factura: [''],
      fechaDeCompra: ['', Validators.required],
      fechaFinGarantia: [''],
      garantia: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      recibidoPor: [''],
      proveedor: ['']
    });
  }

  loadMonitor(id: number): void {
    this.loading = true;
    this.monitorService.getMonitorById(id).subscribe(
      (monitor: Monitor) => {
        this.monitorForm.patchValue({
          marca: monitor.marca,
          modelo: monitor.modelo,
          numeroSerie: monitor.numeroSerie,
          tamanoPantalla: monitor.tamanoPantalla,
          resolucion: monitor.resolucion,
          tipoConector: monitor.tipoConector,
          estado: monitor.estado,
          observaciones: monitor.observaciones,
          esAjustable: monitor.esAjustable,
          tieneAltavoces: monitor.tieneAltavoces,
          ordenDeCompra: monitor.ordenDeCompra,
          factura: monitor.factura,
          fechaDeCompra: this.formatDate(monitor.fechaDeCompra),
          fechaFinGarantia: this.formatDate(monitor.fechaFinGarantia),
          garantia: monitor.garantia,
          precio: monitor.precio,
          recibidoPor: monitor.recibidoPor,
          proveedor: monitor.proveedor
        });
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Error al cargar los datos del monitor';
        this.loading = false;
      }
    );
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.monitorForm.invalid) {
      return;
    }
    this.loading = true;
    const monitor: Monitor = this.monitorForm.value;
    if (this.isEditMode) {
      this.monitorService.updateMonitor(this.monitorId, monitor).subscribe(
        response => {
          this.successMessage = 'Monitor actualizado con éxito';
          this.loading = false;
          setTimeout(() => this.goBack(), 2000);
        },
        error => {
          this.errorMessage = 'Error al actualizar el monitor';
          this.loading = false;
        }
      );
    } else {
      this.monitorService.createMonitor(monitor).subscribe(
        response => {
          this.successMessage = 'Monitor creado con éxito';
          this.loading = false;
          setTimeout(() => this.goBack(), 2000);
        },
        error => {
          this.errorMessage = 'Error al crear el monitor';
          this.loading = false;
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard/monitores']);
  }
}
