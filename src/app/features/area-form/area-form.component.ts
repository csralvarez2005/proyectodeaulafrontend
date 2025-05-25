import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/models/area.model';
import { AreaService } from 'src/app/services/area.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css']
})
export class AreaFormComponent implements OnInit {

  areaForm: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    tipo: ['', Validators.required],
    abreviatura: ['', [Validators.required, Validators.maxLength(5)]]
  });

  isEditMode: boolean = false;
  areaId: number = 0;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private areaService: AreaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.areaId = +params['id'];
        this.loadArea(this.areaId);
      }
    });
  }

  get f() { return this.areaForm.controls; }

  loadArea(id: number): void {
    this.loading = true;
    this.areaService.getAreaById(id).subscribe(
      (area: Area) => {
        this.areaForm.patchValue({
          nombre: area.nombre,
          tipo: area.tipo,
          abreviatura: area.abreviatura
        });
        this.loading = false;
      },
      error => {
        Swal.fire('Error', 'Error al cargar los datos del área', 'error');
        this.loading = false;
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.areaForm.invalid) {
      return;
    }

    this.loading = true;
    const area: Area = this.areaForm.value;

    if (this.isEditMode) {
      area.id = this.areaId;
      this.areaService.updateArea(this.areaId, area).subscribe(
        () => {
          Swal.fire('Actualizado', 'Área actualizada con éxito', 'success');
          this.loading = false;
          setTimeout(() => this.goBack(), 1500);
        },
        error => {
          Swal.fire('Error', 'Error al actualizar el área', 'error');
          this.loading = false;
        }
      );
    } else {
      this.areaService.createArea(area).subscribe(
        () => {
          Swal.fire('Creado', 'Área creada con éxito', 'success');
          this.loading = false;
          setTimeout(() => this.goBack(), 1500);
        },
        error => {
          Swal.fire('Error', 'Error al crear el área', 'error');
          this.loading = false;
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard/areas']);
  }
}