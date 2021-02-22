import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceroComponent } from './cabecero/cabecero.component';
import { ClientesComponent } from './clientes/clientes.component';
import { PiePaginaComponent } from './pie-pagina/pie-pagina.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    CabeceroComponent,
    ClientesComponent,
    PiePaginaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [CabeceroComponent,
    ClientesComponent,
    PiePaginaComponent]
})
export class ComponentsModule { }
