import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
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
import { MonitorFormComponent } from './features/monitor-form/monitor-form.component';
import { MonitorListComponent } from './features/monitor-list/monitor-list.component';
import { ImpresoraFormComponent } from './features/impresora-form/impresora-form.component';
import { ImpresoraListComponent } from './features/impresora-list/impresora-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    NotFoundComponent,
    FuncionarioListComponent,
    FuncionarioFormComponent,
    AreaListComponent,
    AreaFormComponent,
    EquipoFormComponent,
    EquipoListComponent,
    AsignacionesListComponent,
    AsignacionesFormComponent,
    MonitorFormComponent,
    MonitorListComponent,
    ImpresoraFormComponent,
    ImpresoraListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
     HttpClientModule,
     ReactiveFormsModule,
     CommonModule,
     FormsModule
  ],
  providers: [
    authInterceptorProviders,
    DashboardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
