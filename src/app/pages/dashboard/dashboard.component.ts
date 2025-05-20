import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

// Registrar todos los componentes de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit{
  isDarkTheme = false;
  isSidebarOpen = false;
  iconTheme = 'bi-moon';
  
  @ViewChild('equiposChart') equiposChartRef: ElementRef | undefined;
  @ViewChild('funcionariosChart') funcionariosChartRef: ElementRef | undefined;
  
  equiposChart: Chart | undefined;
  funcionariosChart: Chart | undefined;
  
  constructor(
    public tokenStorage: TokenStorageService,
    private renderer: Renderer2,
    public router: Router
  ) { }

  ngOnInit(): void {
    // Verificar si hay una preferencia de tema guardada
    const selectedTheme = localStorage.getItem('selected-theme');
    
    if (selectedTheme === 'dark') {
      this.isDarkTheme = true;
      this.renderer.addClass(document.body, 'dark-theme');
      this.iconTheme = 'bi-sun';
    } else {
      this.isDarkTheme = false;
      this.renderer.removeClass(document.body, 'dark-theme');
      this.iconTheme = 'bi-moon';
    }
  }
  
  ngAfterViewInit(): void {
    // Inicializar gráficos solo si estamos en la ruta principal del dashboard
    if (this.router.url === '/dashboard') {
      setTimeout(() => {
        this.initCharts();
      }, 100);
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    
    if (this.isDarkTheme) {
      this.renderer.addClass(document.body, 'dark-theme');
      this.iconTheme = 'bi-sun';
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      this.iconTheme = 'bi-moon';
    }
    
    // Guardar preferencia de tema
    localStorage.setItem('selected-theme', this.isDarkTheme ? 'dark' : 'light');
    
    // Actualizar gráficos si existen
    if (this.equiposChart) {
      this.equiposChart.destroy();
    }
    if (this.funcionariosChart) {
      this.funcionariosChart.destroy();
    }
    
    if (this.router.url === '/dashboard') {
      this.initCharts();
    }
  }

  initCharts(): void {
    // Gráfico de Equipos por Área
    const equiposCtx = document.getElementById('equiposChart') as HTMLCanvasElement;
    if (equiposCtx) {
      this.equiposChart = new Chart(equiposCtx, {
        type: 'bar',
        data: {
          labels: ['Administración', 'Ventas', 'IT', 'RRHH', 'Finanzas', 'Marketing', 'Operaciones', 'Legal'],
          datasets: [{
            label: 'Equipos',
            data: [12, 8, 15, 5, 7, 3, 9, 4],
            backgroundColor: [
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 99, 132, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)',
              'rgba(199, 199, 199, 0.7)',
              'rgba(83, 102, 255, 0.7)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(199, 199, 199, 1)',
              'rgba(83, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0
              }
            }
          }
        }
      });
    }
    
    // Gráfico de Funcionarios por Área
    const funcionariosCtx = document.getElementById('funcionariosChart') as HTMLCanvasElement;
    if (funcionariosCtx) {
      this.funcionariosChart = new Chart(funcionariosCtx, {
        type: 'doughnut',
        data: {
          labels: ['Administración', 'Ventas', 'IT', 'RRHH', 'Finanzas', 'Marketing', 'Operaciones', 'Legal'],
          datasets: [{
            label: 'Funcionarios',
            data: [4, 6, 3, 2, 3, 2, 3, 1],
            backgroundColor: [
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 99, 132, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)',
              'rgba(199, 199, 199, 0.7)',
              'rgba(83, 102, 255, 0.7)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(199, 199, 199, 1)',
              'rgba(83, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right'
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          }
        }
      });
    }
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
