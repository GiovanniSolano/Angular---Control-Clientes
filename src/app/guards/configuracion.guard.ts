import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ConfiguracionService } from '../services/configuracion.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionGuard implements CanActivate {


  constructor(private router: Router,
    private afAuth: AngularFireAuth,
    private _configuracionService: ConfiguracionService){}

  canActivate(): Observable<boolean> {
    return this._configuracionService.getConfiguracion().pipe(
      map(configuracion => {
        if(configuracion.permitirRegistro) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    )
  }
  
}
