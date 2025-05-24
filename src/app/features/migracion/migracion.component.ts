import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MigracionService } from 'src/app/services/migracion.service';

@Component({
  selector: 'app-migracion',
  templateUrl: './migracion.component.html',
  styleUrls: ['./migracion.component.css']
})
export class MigracionComponent {
  mensaje: string = '';
  cargando: boolean = false;

  constructor(
    private migracionService: MigracionService,
    private router: Router // Inyectar Router si necesitas redirigir
  ) {}

  forzarMigracion() {
    this.cargando = true;
    this.migracionService.forzarMigracion().subscribe({
      next: (response) => {
        this.mensaje = `${response.mensaje} Se migraron ${response.cantidad} equipos.`;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error en migración:', error);
        this.mensaje = 'Error al realizar la migración';
        this.cargando = false;
      }
    });
  }

  descargarReporte() {
    // Verificar token antes de hacer la petición
    const token = localStorage.getItem('auth-token');
    
    if (!token) {
      console.error('No se encontró token de autenticación');
      this.mensaje = 'Debe iniciar sesión para descargar el reporte';
      // Opcional: redirigir al login
      // this.router.navigate(['/login']);
      return;
    }

    this.cargando = true;
    this.mensaje = 'Descargando reporte...';

    this.migracionService.descargarReportePdf().subscribe({
      next: (blob: Blob) => {
        // Verificar que el blob tenga contenido
        if (blob.size === 0) {
          console.error('El archivo descargado está vacío');
          this.mensaje = 'Error: El reporte está vacío';
          this.cargando = false;
          return;
        }

        // Crear y descargar el archivo
        const fileURL = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = 'reporte_equipos_migrados.pdf';
        document.body.appendChild(a); // Agregar al DOM
        a.click();
        document.body.removeChild(a); // Remover del DOM
        window.URL.revokeObjectURL(fileURL);
        
        this.mensaje = 'Reporte descargado exitosamente';
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al descargar reporte:', error);
        this.cargando = false;

        // Manejar diferentes tipos de errores
        if (error.status === 401) {
          console.log('Error de autenticación - Token inválido o expirado');
          this.mensaje = 'Sesión expirada. Por favor, inicie sesión nuevamente.';
          
          // Limpiar token inválido
          localStorage.removeItem('auth-token');
          
          // Opcional: redirigir automáticamente al login
          // this.router.navigate(['/login']);
          
        } else if (error.status === 403) {
          this.mensaje = 'No tiene permisos para descargar este reporte';
        } else if (error.status === 500) {
          this.mensaje = 'Error interno del servidor';
        } else if (error.status === 0) {
          this.mensaje = 'Error de conexión. Verifique su conexión a internet.';
        } else {
          this.mensaje = `Error al descargar el reporte: ${error.message || 'Error desconocido'}`;
        }
      }
    });
  }

  // Método auxiliar para verificar el estado del token
  verificarAutenticacion(): boolean {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      return false;
    }

    // Opcional: verificar si el token no ha expirado (si tienes la lógica)
    // return !this.isTokenExpired(token);
    
    return true;
  }

  // Método para limpiar mensajes
  limpiarMensaje() {
    this.mensaje = '';
  }
}
