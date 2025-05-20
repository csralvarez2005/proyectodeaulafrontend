import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from '../../models/equipo.model';
import { EquipoService } from '../../services/equipo.service';

@Component({
  selector: 'app-equipo-form',
  templateUrl: './equipo-form.component.html',
  styleUrls: ['./equipo-form.component.css']
})
export class EquipoFormComponent implements OnInit {
  
  equipoForm: FormGroup = this.formBuilder.group({ 
    codigoEquipo: ['', Validators.required],
    descripcion: [''],
    tipo: ['', Validators.required],
    modelo: ['', Validators.required],
    marca: ['', Validators.required],
    serie: ['', Validators.required],
    ubicacionDelEquipo: [''],
    utilizacion: [''],
    recibidoPor: [''],
    proveedor: [''],
    ordenDeCompra: [''],
    factura: [''],
    fechaDeCompra: ['', Validators.required],
    fechaFinGarantia: [''],
    garantia: [''],
    precio: [0, [Validators.required, Validators.min(0)]],
    procesador: [''],
    memoriaRamGB: [0],
    almacenamientoGB: [0],
    tipoAlmacenamiento: [''],
    placaBase: [''],
    fuentePoderWatts: [0],
    tarjetaGrafica: [''],
    tieneTarjetaRed: [false],
    tieneTarjetaSonido: [false],
    gabinete: [''],
    perifericosEntrada: [''],
    perifericosSalida: [''],
    componentes: [''],
    accesorios: [''],
    sistemaOperativo: [''],
    versionSO: [''],
    driversInstalados: [''],
    programasInstalados: [''],
    utilidadesSistema: [''],
    direccionIP: [''],
    direccionMAC: [''],
    estado: ['Activo', Validators.required]
  }); 

  isEditMode: boolean = false; 
  equipoId: number = 0; 
  loading = false; 
  submitted = false; 
  successMessage = ''; 
  errorMessage = ''; 

  constructor( 
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private equipoService: EquipoService 
  ) { } 

  ngOnInit(): void { 
    this.initForm(); 
    this.route.params.subscribe(params => { 
      if (params['id']) { 
        this.isEditMode = true; 
        this.equipoId = +params['id']; 
        this.loadEquipo(this.equipoId); 
      } 
    }); 
  } 

  get f() { return this.equipoForm.controls; } 

  initForm(): void { 
    this.equipoForm = this.formBuilder.group({ 
      codigoEquipo: ['', Validators.required],
      descripcion: [''],
      tipo: ['', Validators.required],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      serie: ['', Validators.required],
      ubicacionDelEquipo: [''],
      utilizacion: [''],
      recibidoPor: [''],
      proveedor: [''],
      ordenDeCompra: [''],
      factura: [''],
      fechaDeCompra: ['', Validators.required],
      fechaFinGarantia: [''],
      garantia: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      procesador: [''],
      memoriaRamGB: [0],
      almacenamientoGB: [0],
      tipoAlmacenamiento: [''],
      placaBase: [''],
      fuentePoderWatts: [0],
      tarjetaGrafica: [''],
      tieneTarjetaRed: [false],
      tieneTarjetaSonido: [false],
      gabinete: [''],
      perifericosEntrada: [''],
      perifericosSalida: [''],
      componentes: [''],
      accesorios: [''],
      sistemaOperativo: [''],
      versionSO: [''],
      driversInstalados: [''],
      programasInstalados: [''],
      utilidadesSistema: [''],
      direccionIP: [''],
      direccionMAC: [''],
      estado: ['Activo', Validators.required]
    }); 
  } 

  loadEquipo(id: number): void { 
    this.loading = true; 
    this.equipoService.getEquipoById(id).subscribe( 
      (equipo: Equipo) => { 
        this.equipoForm.patchValue({ 
          codigoEquipo: equipo.codigoEquipo,
          descripcion: equipo.descripcion,
          tipo: equipo.tipo,
          modelo: equipo.modelo,
          marca: equipo.marca,
          serie: equipo.serie,
          ubicacionDelEquipo: equipo.ubicacionDelEquipo,
          utilizacion: equipo.utilizacion,
          recibidoPor: equipo.recibidoPor,
          proveedor: equipo.proveedor,
          ordenDeCompra: equipo.ordenDeCompra,
          factura: equipo.factura,
          fechaDeCompra: this.formatDate(equipo.fechaDeCompra),
          fechaFinGarantia: this.formatDate(equipo.fechaFinGarantia),
          garantia: equipo.garantia,
          precio: equipo.precio,
          procesador: equipo.procesador,
          memoriaRamGB: equipo.memoriaRamGB,
          almacenamientoGB: equipo.almacenamientoGB,
          tipoAlmacenamiento: equipo.tipoAlmacenamiento,
          placaBase: equipo.placaBase,
          fuentePoderWatts: equipo.fuentePoderWatts,
          tarjetaGrafica: equipo.tarjetaGrafica,
          tieneTarjetaRed: equipo.tieneTarjetaRed,
          tieneTarjetaSonido: equipo.tieneTarjetaSonido,
          gabinete: equipo.gabinete,
          perifericosEntrada: equipo.perifericosEntrada,
          perifericosSalida: equipo.perifericosSalida,
          componentes: equipo.componentes,
          accesorios: equipo.accesorios,
          sistemaOperativo: equipo.sistemaOperativo,
          versionSO: equipo.versionSO,
          driversInstalados: equipo.driversInstalados,
          programasInstalados: equipo.programasInstalados,
          utilidadesSistema: equipo.utilidadesSistema,
          direccionIP: equipo.direccionIP,
          direccionMAC: equipo.direccionMAC,
          estado: equipo.estado
        }); 
        this.loading = false; 
      }, 
      error => { 
        this.errorMessage = 'Error al cargar los datos del equipo'; 
        this.loading = false; 
      } 
    ); 
  } 

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
    if (this.equipoForm.invalid) { 
      return; 
    } 
    this.loading = true; 
    const equipo: Equipo = this.equipoForm.value; 
    if (this.isEditMode) { 
      equipo.id = this.equipoId; 
      this.equipoService.updateEquipo(this.equipoId, equipo).subscribe( 
        response => { 
          this.successMessage = 'Equipo actualizado con éxito'; 
          this.loading = false; 
          setTimeout(() => this.goBack(), 2000); 
        }, 
        error => { 
          this.errorMessage = 'Error al actualizar el equipo'; 
          this.loading = false; 
        } 
      ); 
    } else { 
      this.equipoService.createEquipo(equipo).subscribe( 
        response => { 
          this.successMessage = 'Equipo creado con éxito'; 
          this.loading = false; 
          setTimeout(() => this.goBack(), 2000); 
        }, 
        error => { 
          this.errorMessage = 'Error al crear el equipo'; 
          this.loading = false; 
        } 
      ); 
    } 
  } 

  goBack(): void { 
    this.router.navigate(['/dashboard/equipo']); 
  } 
}