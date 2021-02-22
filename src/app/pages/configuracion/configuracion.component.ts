import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionService } from '../../services/configuracion.service';
import { Configuracion } from '../../models/configuracion.model';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {


  permitirRegistro = false;

  constructor(private router: Router,
    private _configuracionService: ConfiguracionService) { }

  ngOnInit(): void {

    this._configuracionService.getConfiguracion().subscribe((configuracion: Configuracion) => {

      this.permitirRegistro = configuracion.permitirRegistro;



    });

  }

  guardar(){

    let configuracion = {permitirRegistro: this.permitirRegistro};

    this._configuracionService.modificarConfiguracion(configuracion);
    this.router.navigate(['/']);

  }

}
