import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  email: string;
  password: string;
  formularioRegistro: FormGroup;

  constructor(private router: Router,
    private _loginService: LoginService,
    private _sweetAlertService: Sweetalert2Service) { 


   }

  ngOnInit(): void {

    this._loginService.getAuth().subscribe(auth => {
      
      if(auth) {
        this.router.navigate(['/']);
      }

    });

    this.formularioRegistro = new FormGroup({

      email: new FormControl('', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]), 
      password: new FormControl('', Validators.required)


    });
  }


  registro() {
        
    this.email = this.formularioRegistro.controls['email'].value;
    this.password = this.formularioRegistro.controls['password'].value;

    if(this.formularioRegistro.invalid) {
      this._sweetAlertService.mostrarMensaje('error', 'Ingresa correctamente tus datos');
      return;
    }

    this._loginService.registrarse(this.email, this.password)
      .then(resp => {
        this.router.navigate(['/']);
        this._sweetAlertService.mostrarMensaje('success', 'Te registraste correctamente');
      }).catch((err) => {
        this._sweetAlertService.mostrarMensaje('error', 'Problema al registrarse / Email en uso');
      });

  }

  get emailRequerido() {
    return this.formularioRegistro.get('email').hasError('required') && this.formularioRegistro.get('email').touched
  }

  get emailNoValido() {
    return this.formularioRegistro.get('email').hasError('pattern') && this.formularioRegistro.get('email').touched;
  }

  get passwordRequerido() {
    return this.formularioRegistro.get('password').hasError('required') && this.formularioRegistro.get('password').touched
  }

}
