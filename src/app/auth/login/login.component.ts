import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Sweetalert2Service } from '../../services/sweetalert2.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfiguracionService } from '../../services/configuracion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email: string;
  password: string;

  permitirRegistro: boolean;

  contador: number;

  segundosRestantes: number = 60;


  formularioLogin: FormGroup;

  constructor(private router: Router,
    private _loginService: LoginService,
    private _sweetAlertService: Sweetalert2Service,
    private _configuracionServicio: ConfiguracionService) { }

  ngOnInit(): void {

    this.borrarMensajeDeAviso();


    this._loginService.getAuth().subscribe(auth => {
      
      if(auth) {
        this.router.navigate(['/']);
      }

    });

    this._configuracionServicio.getConfiguracion().subscribe(configuracion => {

      this.permitirRegistro = configuracion.permitirRegistro;
      
    });

    this.formularioLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]), 
      password: new FormControl('', Validators.required)
      });

  }

  borrarMensajeDeAviso() {

    this.contador = 0;
    const interval = setInterval(() => {

      if(this.contador === 60) {        
        clearInterval(interval);

      } else  {
        this.contador ++;
        this.segundosRestantes--;
      }

    }, 1000);

  }

  permitirRegistroDeClientes() {

    if(this.permitirRegistro) {
      this.router.navigate(['/registro']);
    } else {
      this._sweetAlertService.mostrarMensaje('error', 'No se pueden realizar registros, hable con el administardor');
    }

  }

  login(){
    
    this.email = this.formularioLogin.controls['email'].value;
    this.password = this.formularioLogin.controls['password'].value;

    if(this.formularioLogin.invalid) {
      this._sweetAlertService.mostrarMensaje('error', 'Verifica tus datos');
      return;
    }
    
    this._loginService.login(this.email, this.password)
      .then(resp => {
        this.router.navigate(['/']);
      }).catch((err) => {
        this._sweetAlertService.mostrarMensaje('error', `Email/Password son incorrectos`);
      });
  }

  get emailRequerido() {
    return this.formularioLogin.get('email').hasError('required') && this.formularioLogin.get('email').touched
  }

  get emailNoValido() {
    return this.formularioLogin.get('email').hasError('pattern') && this.formularioLogin.get('email').touched;
  }

  get passwordRequerido() {
    return this.formularioLogin.get('password').hasError('required') && this.formularioLogin.get('password').touched
  }

}
