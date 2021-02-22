import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { ConfiguracionGuard } from '../guards/configuracion.guard';


const routes: Routes = [


    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegistroComponent, canActivate: [ConfiguracionGuard]},
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
