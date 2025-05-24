import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FuncionarioListComponent } from './features/funcionario-list/funcionario-list.component';
import { FuncionarioFormComponent } from './features/funcionario-form/funcionario-form.component';
import { AreaListComponent } from './features/area-list/area-list.component';
import { AreaFormComponent } from './features/area-form/area-form.component';
import { EquipoFormComponent } from './features/equipo-form/equipo-form.component';
import { EquipoListComponent } from './features/equipo-list/equipo-list.component';
import { AsignacionesListComponent } from './features/asignaciones-list/asignaciones-list.component';
import { AsignacionesFormComponent } from './features/asignaciones-form/asignaciones-form.component';
import { MonitorListComponent } from './features/monitor-list/monitor-list.component';
import { MonitorFormComponent } from './features/monitor-form/monitor-form.component';
import { ImpresoraListComponent } from './features/impresora-list/impresora-list.component';
import { ImpresoraFormComponent } from './features/impresora-form/impresora-form.component';
import { MigracionComponent } from './features/migracion/migracion.component';
const routes: Routes = [ 
   { path: '', redirectTo: 'login', pathMatch: 'full' }, // redirección al login 
   { path: 'login', component: LoginComponent }, 
   { path: 'register', component: RegisterComponent }, // ruta para el registro 
   { path: 'dashboard', component: DashboardComponent, 
     children: [ 
       { path: 'funcionarios', component: FuncionarioListComponent }, 
       { path: 'funcionarios/crear', component: FuncionarioFormComponent }, 
       { path: 'funcionarios/editar/:id', component: FuncionarioFormComponent }, 
       { path: 'areas', component: AreaListComponent }, 
       { path: 'areas/crear', component: AreaFormComponent }, 
       { path: 'areas/edit/:id', component: AreaFormComponent }, 
       { path: 'equipo', component: EquipoListComponent }, 
       { path: 'equipo/crear', component: EquipoFormComponent }, 
       { path: 'equipo/edit/:id', component: EquipoFormComponent },
       { path: 'asignaciones', component: AsignacionesListComponent },
       { path: 'asignaciones/crear', component: AsignacionesFormComponent },
       { path: 'asignaciones/editar/:id', component: AsignacionesFormComponent },
       { path: 'monitores', component: MonitorListComponent },
       { path: 'monitores/crear', component: MonitorFormComponent },
       { path: 'monitores/editar/:id', component: MonitorFormComponent },
        { path: 'impresoras', component: ImpresoraListComponent },
       { path: 'impresoras/crear', component: ImpresoraFormComponent },
       { path: 'impresoras/editar/:id', component: ImpresoraFormComponent },
         { path: 'migracion', component: MigracionComponent },
     ] 
   }, 
   { path: '**', component: NotFoundComponent } // ruta wildcard para página 404 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
