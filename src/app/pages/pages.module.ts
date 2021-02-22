import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { TableroComponent } from './tablero/tablero.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages.routing';



@NgModule({
  declarations: [
    TableroComponent,
    EditarClienteComponent,
    ConfiguracionComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    PagesRoutingModule
  ],
  exports: [
    TableroComponent,
    EditarClienteComponent,
    ConfiguracionComponent,
  ]
})
export class PagesModule { }
