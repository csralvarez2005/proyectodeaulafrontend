import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/funcionario.model';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {
  
funcionarioForm: FormGroup = this.formBuilder.group({
    nombreFuncionario: ['', Validators.required],
    apellidoFuncionario: ['', Validators.required],
    tipoDocumento: ['', Validators.required],
    identificacion: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    fechaNacimiento: ['', Validators.required],
    genero: ['', Validators.required],
    estadoCivil: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    celular: ['', Validators.pattern('^[0-9]*$')],
    cargo: ['', Validators.required],
    direccion: [''],
    estado: ['Activo', Validators.required]
  });
  
  isEditMode: boolean = false;
  funcionarioId: number = 0; // Inicializar con un valor por defecto
  loading = false;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private funcionarioService: FuncionarioService
  ) { }


  ngOnInit(): void {
    this.initForm();
    
    // Verificar si estamos en modo edición
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.funcionarioId = +params['id'];
        this.loadFuncionario(this.funcionarioId);
      }
    });
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() { return this.funcionarioForm.controls; }

  initForm(): void {
    this.funcionarioForm = this.formBuilder.group({
      nombreFuncionario: ['', Validators.required],
      apellidoFuncionario: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      identificacion: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.pattern('^[0-9]*$')],
      cargo: ['', Validators.required],
      direccion: [''],
      estado: ['Activo', Validators.required]
    });
  }

  loadFuncionario(id: number): void {
    this.loading = true;
    this.funcionarioService.getFuncionarioById(id).subscribe(
      (funcionario: Funcionario) => {
        this.funcionarioForm.patchValue({
          nombreFuncionario: funcionario.nombreFuncionario,
          apellidoFuncionario: funcionario.apellidoFuncionario,
          tipoDocumento: funcionario.tipoDocumento,
          identificacion: funcionario.identificacion,
          fechaNacimiento: this.formatDate(funcionario.fechaNacimiento),
          genero: funcionario.genero,
          estadoCivil: funcionario.estadoCivil,
          email: funcionario.email,
          celular: funcionario.celular,
          cargo: funcionario.cargo,
          direccion: funcionario.direccion,
          estado: funcionario.estado
        });
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Error al cargar los datos del funcionario';
        this.loading = false;
      }
    );
  }

  // Formatear fecha para el input type="date"
  formatDate(date: Date): string {
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
    
    // Detener si el formulario es inválido
    if (this.funcionarioForm.invalid) {
      return;
    }

    this.loading = true;
    const funcionario: Funcionario = this.funcionarioForm.value;
    
if (this.isEditMode) {
  funcionario.id = this.funcionarioId;
  this.funcionarioService.updateFuncionario(this.funcionarioId, funcionario).subscribe(
    response => {
      this.successMessage = 'Funcionario actualizado con éxito';
      this.loading = false;
      setTimeout(() => this.goBack(), 2000);
    },
    error => {
      this.errorMessage = 'Error al actualizar el funcionario';
      this.loading = false;
    }
  );
} else {
      this.funcionarioService.createFuncionario(funcionario).subscribe(
        response => {
          this.successMessage = 'Funcionario creado con éxito';
          this.loading = false;
          setTimeout(() => this.goBack(), 2000);
        },
        error => {
          this.errorMessage = 'Error al crear el funcionario';
          this.loading = false;
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard/funcionarios']);
  }editFuncionario(id: number): void {
  this.router.navigate(['/dashboard/funcionarios/edit', id]);
}


}