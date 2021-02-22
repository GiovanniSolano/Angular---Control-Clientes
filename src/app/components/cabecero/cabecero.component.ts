import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ConfiguracionService } from '../../services/configuracion.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  permitirRegistro: boolean;

  constructor(private loginService: LoginService,
    private router: Router,
    private _configuracionServicio: ConfiguracionService) { }

  ngOnInit(): void {

    this.loginService.getAuth().subscribe(auth => {

      if(auth) {
        this.isLoggedIn = true;
        this.loggedInUser= auth.email;
      } else {
        this.isLoggedIn = false;
      }

    });

    this._configuracionServicio.getConfiguracion().subscribe(configuracion => {

      this.permitirRegistro = configuracion.permitirRegistro;
      
    });

  }

  logout() {

    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);

  }

}
