import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignacionEquipoService } from '../../services/asignacionequipo.service';
import { AsignacionEquipo } from '../../models/asignacionequipo.model';
import { AreaService } from '../../services/area.service';
import { EquipoService } from '../../services/equipo.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { Area } from '../../models/area.model';
import { Equipo } from '../../models/equipo.model';
import { Funcionario } from '../../models/funcionario.model';

@Component({
  selector: 'app-asignaciones-form',
  templateUrl: './asignaciones-form.component.html',
  styleUrls: ['./asignaciones-form.component.css']
})
export class AsignacionesFormComponent implements OnInit {
  asignacionForm: FormGroup;
  isEditMode = false;
  asignacionId = 0;
  loading = false;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  
  // Arrays para los selects
  areas: Area[] = [];
  equipos: Equipo[] = [];
  funcionarios: Funcionario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private asignacionService: AsignacionEquipoService,
    private areaService: AreaService,
    private equipoService: EquipoService,
    private funcionarioService: FuncionarioService
  ) {
    this.asignacionForm = this.formBuilder.group({
      fechaAsignacion: ['', Validators.required],
      area: [null, Validators.required],
      equipo: [null, Validators.required],
      funcionario: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.cargarAreas();
    this.cargarEquipos();
    this.cargarFuncionarios();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.asignacionId = +params['id'];
        this.loadAsignacion(this.asignacionId);
      }
    });
  }

  get f() { 
    return this.asignacionForm.controls; 
  }

  initForm(): void {
    this.asignacionForm = this.formBuilder.group({
      fechaAsignacion: ['', Validators.required],
      area: [null, Validators.required],
      equipo: [null, Validators.required],
      funcionario: [null, Validators.required]
    });
  }

  cargarAreas(): void {
    this.areaService.getAllAreas().subscribe(
      (areas: Area[]) => {
        this.areas = areas;
        console.log('Áreas cargadas:', this.areas);
      },
      error => {
        this.errorMessage = 'Error al cargar las áreas';
        console.error('Error al cargar áreas:', error);
      }
    );
  }

  cargarEquipos(): void {
    this.equipoService.getAllEquipos().subscribe(
      (equipos: Equipo[]) => {
        this.equipos = equipos;
        console.log('Equipos cargados:', this.equipos);
      },
      error => {
        this.errorMessage = 'Error al cargar los equipos';
        console.error('Error al cargar equipos:', error);
      }
    );
  }

  cargarFuncionarios(): void {
    this.funcionarioService.getAllFuncionarios().subscribe(
      (funcionarios: Funcionario[]) => {
        this.funcionarios = funcionarios;
        console.log('Funcionarios cargados:', this.funcionarios);
      },
      error => {
        this.errorMessage = 'Error al cargar los funcionarios';
        console.error('Error al cargar funcionarios:', error);
      }
    );
  }

  loadAsignacion(id: number): void {
    this.loading = true;
    this.asignacionService.getAsignacionById(id).subscribe(
      (asignacion: AsignacionEquipo) => {
        this.asignacionForm.patchValue({
          fechaAsignacion: this.formatDate(asignacion.fechaAsignacion),
          area: asignacion.area,
          equipo: asignacion.equipo,
          funcionario: asignacion.funcionario
        });
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Error al cargar la asignación';
        this.loading = false;
        console.error('Error al cargar asignación:', error);
      }
    );
  }

  formatDate(date: any): string {
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
    if (this.asignacionForm.invalid) {
      return;
    }
    
    this.loading = true;
    const asignacion: AsignacionEquipo = this.asignacionForm.value;
    
    if (this.isEditMode) {
      this.asignacionService.updateAsignacion(this.asignacionId, asignacion).subscribe(
        response => {
          this.successMessage = 'Asignación actualizada con éxito';
          this.loading = false;
          setTimeout(() => this.goBack(), 2000);
        },
        error => {
          this.errorMessage = 'Error al actualizar la asignación';
          this.loading = false;
          console.error('Error al actualizar:', error);
        }
      );
    } else {
      this.asignacionService.createAsignacion(asignacion).subscribe(
        response => {
          this.successMessage = 'Asignación creada con éxito';
          this.loading = false;
          setTimeout(() => this.goBack(), 2000);
        },
        error => {
          this.errorMessage = 'Error al crear la asignación';
          this.loading = false;
          console.error('Error al crear:', error);
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard/asignaciones']);
  }
}