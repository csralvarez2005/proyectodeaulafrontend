import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from '../../models/equipo.model';
import { EquipoService } from '../../services/equipo.service';
import { Monitor } from '../../models/monitor.model';
import { MonitorService } from '../../services/monitor.service';
import { Area } from 'src/app/models/area.model';
import { AreaService } from 'src/app/services/area.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipo-form',
  templateUrl: './equipo-form.component.html',
  styleUrls: ['./equipo-form.component.css']
})
export class EquipoFormComponent implements OnInit {

  equipoForm: FormGroup;
  isEditMode: boolean = false;
  equipoId: number = 0;
  loading = false;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  monitoresDisponibles: Monitor[] = [];
  monitoresAsignados: Monitor[] = [];
  monitorSeleccionado: number | null = null;

  areas: any[] = [];
  areasSeleccionadas: Area[] = [];
  areaSeleccionada: number | null = null;

  abreviaturasPorArea: { [key: string]: string } = {
    'Oficina Sistemas': 'SIS',
    'Recurso Humano': 'RHUM',
    'Oficina Cartera': 'OFCART'
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private equipoService: EquipoService,
    private monitorService: MonitorService,
    private areaService: AreaService
  ) {
    this.equipoForm = this.formBuilder.group({
      codigoEquipo: [{ value: '', disabled: true }, Validators.required],
      descripcion: [''],
      tipo: ['', Validators.required],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      serie: ['', Validators.required],
      ubicacionDelEquipo: [''],
      utilizacion: [''],
      recibidoPor: [''],
      proveedor: [''],
      ordenDeCompra: [''],
      factura: [''],
      fechaDeCompra: ['', Validators.required],
      fechaFinGarantia: [''],
      garantia: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      procesador: [''],
      memoriaRamGB: [0],
      almacenamientoGB: [0],
      tipoAlmacenamiento: [''],
      placaBase: [''],
      fuentePoderWatts: [0],
      tarjetaGrafica: [''],
      tieneTarjetaRed: [false],
      tieneTarjetaSonido: [false],
      gabinete: [''],
      perifericosEntrada: [''],
      perifericosSalida: [''],
      componentes: [''],
      accesorios: [''],
      sistemaOperativo: [''],
      versionSO: [''],
      driversInstalados: [''],
      programasInstalados: [''],
      utilidadesSistema: [''],
      direccionIP: [''],
      direccionMAC: [''],
      estado: ['Activo', Validators.required],
      monitorIds: [[]],
      areaIds: [[]],
      areaSeleccionada: [null]
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.cargarMonitoresDisponibles();
    this.cargarAreas();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.equipoId = +params['id'];
        this.loadEquipo(this.equipoId);
        this.cargarMonitoresAsignados(this.equipoId);
        this.cargarAreasAsignadas(this.equipoId);
      }
    });
  }

  get f() { return this.equipoForm.controls; }

  initForm(): void {}

  loadEquipo(id: number): void {
    this.loading = true;
    this.equipoService.getEquipoById(id).subscribe(
      (equipo: Equipo) => {
        this.equipoForm.patchValue({
          ...equipo,
          fechaDeCompra: this.formatDate(equipo.fechaDeCompra),
          fechaFinGarantia: this.formatDate(equipo.fechaFinGarantia),
        });
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Error al cargar los datos del equipo';
        this.loading = false;
      }
    );
  }

  cargarMonitoresDisponibles(): void {
    this.monitorService.getAllMonitores().subscribe(
      (monitores: Monitor[]) => {
        this.monitoresDisponibles = monitores.filter(monitor => !monitor.equipo);
      },
      error => {
        this.errorMessage = 'Error al cargar monitores disponibles';
        console.error('Error al cargar monitores:', error);
      }
    );
  }

  cargarMonitoresAsignados(equipoId: number): void {
    this.equipoService.getMonitoresByEquipoId(equipoId).subscribe(
      (monitores: Monitor[]) => {
        this.monitoresAsignados = monitores;
        const monitorIds = monitores.map(m => m.id);
        this.equipoForm.patchValue({ monitorIds });
      },
      error => {
        this.errorMessage = 'Error al cargar monitores asignados';
        console.error('Error al cargar monitores asignados:', error);
      }
    );
  }

  agregarMonitor(monitorId: number): void {
    if (!monitorId) return;

    if (!this.isEditMode) {
      const monitorIds = this.equipoForm.get('monitorIds')?.value || [];
      if (!monitorIds.includes(monitorId)) {
        monitorIds.push(monitorId);
        this.equipoForm.patchValue({ monitorIds });
        const monitor = this.monitoresDisponibles.find(m => m.id === monitorId);
        if (monitor) {
          this.monitoresAsignados.push(monitor);
          this.monitoresDisponibles = this.monitoresDisponibles.filter(m => m.id !== monitorId);
        }
      }
      this.monitorSeleccionado = null;
    } else {
      this.loading = true;
      this.equipoService.agregarMonitor(this.equipoId, monitorId).subscribe(
        () => {
          Swal.fire('Éxito', 'Monitor agregado con éxito', 'success');
          this.loading = false;
          this.cargarMonitoresDisponibles();
          this.cargarMonitoresAsignados(this.equipoId);
          this.monitorSeleccionado = null;
        },
        error => {
          Swal.fire('Error', 'Error al agregar monitor', 'error');
          this.loading = false;
          console.error('Error al agregar monitor:', error);
        }
      );
    }
  }

  quitarMonitor(monitorId: number): void {
    if (!this.isEditMode) {
      let monitorIds = this.equipoForm.get('monitorIds')?.value || [];
      monitorIds = monitorIds.filter((id: number) => id !== monitorId);
      this.equipoForm.patchValue({ monitorIds });
      const monitor = this.monitoresAsignados.find(m => m.id === monitorId);
      if (monitor) {
        this.monitoresDisponibles.push(monitor);
        this.monitoresAsignados = this.monitoresAsignados.filter(m => m.id !== monitorId);
      }
    } else {
      this.loading = true;
      this.equipoService.quitarMonitor(this.equipoId, monitorId).subscribe(
        () => {
          Swal.fire('Éxito', 'Monitor quitado con éxito', 'success');
          this.loading = false;
          this.cargarMonitoresDisponibles();
          this.cargarMonitoresAsignados(this.equipoId);
        },
        error => {
          Swal.fire('Error', 'Error al quitar monitor', 'error');
          this.loading = false;
          console.error('Error al quitar monitor:', error);
        }
      );
    }
  }

  formatDate(date: Date | null | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.equipoForm.invalid) return;

    this.loading = true;
    const equipo: Equipo = this.equipoForm.getRawValue();
    if (this.isEditMode) {
      equipo.id = this.equipoId;
      this.equipoService.updateEquipo(this.equipoId, equipo).subscribe(
        () => {
          Swal.fire('Actualizado', 'Equipo actualizado con éxito', 'success');
          this.loading = false;
          setTimeout(() => this.goBack(), 2000);
        },
        () => {
          Swal.fire('Error', 'Error al actualizar el equipo', 'error');
          this.loading = false;
        }
      );
    } else {
      this.equipoService.createEquipo(equipo).subscribe(
        () => {
          Swal.fire('Creado', 'Equipo creado con éxito', 'success');
          this.loading = false;
          setTimeout(() => this.goBack(), 2000);
        },
        () => {
          Swal.fire('Error', 'Error al crear el equipo', 'error');
          this.loading = false;
        }
      );
    }
  }

  cargarAreas(): void {
    this.areaService.getAllAreas().subscribe(
      (areas: Area[]) => {
        this.areas = areas;
      },
      error => {
        this.errorMessage = 'Error al cargar áreas';
        console.error('Error al cargar áreas:', error);
      }
    );
  }

  cargarAreasAsignadas(equipoId: number): void {
    this.equipoService.getAreasByEquipoId(equipoId).subscribe(
      (areas: Area[]) => {
        this.areasSeleccionadas = areas;
        const areaIds = areas.map(a => a.id);
        this.equipoForm.patchValue({ areaIds });
      },
      error => {
        this.errorMessage = 'Error al cargar áreas asignadas';
        console.error('Error al cargar áreas asignadas:', error);
      }
    );
  }

  agregarArea(areaId: number): void {
    if (!areaId) return;

    if (!this.isEditMode) {
      const areaIds = this.equipoForm.get('areaIds')?.value || [];

      if (!areaIds.includes(areaId)) {
        areaIds.push(areaId);
        this.equipoForm.patchValue({ areaIds });

        const area = this.areas.find(a => a.id === areaId);
        if (area) {
          this.areasSeleccionadas.push(area);

          if (!this.equipoForm.get('codigoEquipo')?.value && (area as any).abreviatura) {
            this.equipoService.generarCodigoEquipo((area as any).abreviatura).subscribe({
              next: (codigo: string) => {
                this.equipoForm.patchValue({ codigoEquipo: codigo });
                Swal.fire('Código generado', `Código generado: ${codigo}`, 'info');
              },
              error: (error) => {
                Swal.fire('Error', 'Error al generar el código del equipo', 'error');
                console.error('Error al generar código:', error);
              }
            });
          }
        }
      }

      this.areaSeleccionada = null;
    } else {
      this.loading = true;
      this.loading = false;
      this.areaSeleccionada = null;
    }
  }

  quitarArea(areaId: number): void {
    if (!this.isEditMode) {
      let areaIds = this.equipoForm.get('areaIds')?.value || [];
      areaIds = areaIds.filter((id: number) => id !== areaId);
      this.equipoForm.patchValue({ areaIds });
      this.areasSeleccionadas = this.areasSeleccionadas.filter(a => a.id !== areaId);
      Swal.fire('Área eliminada', 'Área quitada correctamente', 'info');
    } else {
      this.loading = true;
      this.loading = false;
    }
  }

  onAreaSeleccionada(): void {
    const selectedId = this.equipoForm.get('areaSeleccionada')?.value;
    const area = this.areas.find(a => a.id === +selectedId);

    if (area && area.abreviatura) {
      this.equipoService.generarCodigoEquipo(area.abreviatura).subscribe({
        next: (codigo: string) => {
          this.equipoForm.patchValue({
            codigoEquipo: codigo,
            areaIds: [area.id]
          });
          this.areasSeleccionadas = [area];
        },
        error: (error) => {
          this.errorMessage = 'Error al generar el código del equipo';
          console.error('Error al generar código desde backend:', error);
        }
      });
    } else {
      console.warn('Área seleccionada no tiene abreviatura:', area);
    }
  }

  onAreaChange(areaId: number): void {
    const area = this.areas.find(a => a.id === +areaId);
    if (!area || !(area as any).abreviatura) {
      return;
    }

    this.equipoService.generarCodigoEquipo((area as any).abreviatura).subscribe(
      (codigo: string) => {
        this.equipoForm.patchValue({ codigoEquipo: codigo });
        this.equipoForm.patchValue({ areaIds: [area.id] });
        this.areasSeleccionadas = [area];
      },
      error => {
        console.error('Error al generar el código de equipo:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/dashboard/equipo']);
  }
}