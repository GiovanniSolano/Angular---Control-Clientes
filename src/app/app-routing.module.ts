import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [


  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: '**', component: NoEncontradoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    AuthRoutingModule,
  PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
