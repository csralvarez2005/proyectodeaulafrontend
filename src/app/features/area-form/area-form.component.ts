import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/models/area.model';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css']
})
export class AreaFormComponent implements OnInit{
   areaForm: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    tipo: ['', Validators.required]
  });
  
  isEditMode: boolean = false;
  areaId: number = 0;
  loading = false;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private areaService: AreaService
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    // Verificar si estamos en modo edición
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.areaId = +params['id'];
        this.loadArea(this.areaId);
      }
    });
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() { return this.areaForm.controls; }

  initForm(): void {
    this.areaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required]
    });
  }

  loadArea(id: number): void {
    this.loading = true;
    this.areaService.getAreaById(id).subscribe(
      (area: Area) => {
        this.areaForm.patchValue({
          nombre: area.nombre,
          tipo: area.tipo
        });
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Error al cargar los datos del área';
        this.loading = false;
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    
    // Detener si el formulario es inválido
    if (this.areaForm.invalid) {
      return;
    }

    this.loading = true;
    const area: Area = this.areaForm.value;
    
    if (this.isEditMode) {
      area.id = this.areaId;
      this.areaService.updateArea(this.areaId, area).subscribe(
        response => {
          this.successMessage = 'Área actualizada con éxito';
          this.loading = false;
          setTimeout(() => this.goBack(), 2000);
        },
        error => {
          this.errorMessage = 'Error al actualizar el área';
          this.loading = false;
        }
      );
    } else {
      this.areaService.createArea(area).subscribe(
        response => {
          this.successMessage = 'Área creada con éxito';
          this.loading = false;
          setTimeout(() => this.goBack(), 2000);
        },
        error => {
          this.errorMessage = 'Error al crear el área';
          this.loading = false;
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard/areas']);
  }

}
