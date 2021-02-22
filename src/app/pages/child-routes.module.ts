import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { TableroComponent } from './tablero/tablero.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';


const childRoutes: Routes = [
    {path: '', component: TableroComponent},
    {path: 'configuracion', component: ConfiguracionComponent},
    {path: 'cliente/editar/:id', component: EditarClienteComponent}

]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
