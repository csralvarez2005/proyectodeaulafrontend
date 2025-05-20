import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
 // Inicializar el FormGroup para evitar el error TS2564
  registerForm: FormGroup = new FormGroup({});
  isSubmitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  // Validador personalizado para verificar que las contraseñas coincidan
  passwordMatchValidator(formGroup: FormGroup) {
    // Usar operador de encadenamiento opcional para evitar errores TS2531
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    
    // Verificar que ambos valores existan antes de compararlos
    if (password === undefined || confirmPassword === undefined) {
      return { mismatch: true };
    }
    
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Getter para acceder fácilmente a los campos del formulario
  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;

    // Detener si el formulario es inválido
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(
      this.registerForm.value.username,
      this.registerForm.value.email,
      this.registerForm.value.password
    ).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: err => {
        this.errorMessage = err.error.message || 'Error en el registro';
        this.isSignUpFailed = true;
      }
    });
  }

}
