import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
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
    EquipoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
     HttpClientModule,
     ReactiveFormsModule,
     CommonModule
  ],
  providers: [
    authInterceptorProviders,
    DashboardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
