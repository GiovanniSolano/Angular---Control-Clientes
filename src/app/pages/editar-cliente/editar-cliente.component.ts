import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';


import Swal from 'sweetalert2';
import { Sweetalert2Service } from '../../services/sweetalert2.service';


@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  };


  formularioEditar: FormGroup;

  id: string;
  estaCreado: boolean = false;


  constructor(private _clientesService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private _sweetAlertService: Sweetalert2Service) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];


    this._clientesService.getCliente(this.id).subscribe(cliente => {
      this.cliente = cliente;
      this.crearFormulario();

    });

  }


  crearFormulario() {

    this.formularioEditar = new FormGroup({
      nombre: new FormControl(this.cliente.nombre || '', Validators.required),
      apellido: new FormControl(this.cliente.apellido, Validators.required),
      email: new FormControl(this.cliente.email, [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]),
      saldo: new FormControl(this.cliente.saldo, [Validators.required])
    });

    this.estaCreado = true;

  }



  editar() {
    if(this.formularioEditar.invalid) {
      return;
    }

    this.formularioEditar

    this._clientesService.editarCliente(this.formularioEditar.value, this.id);
    this.router.navigate(['/']);


    this._sweetAlertService.mostrarMensaje('success', 'Los cambios fueron guardados correctamente');


  }




  get nombreRequerido() {
    return this.formularioEditar.get('nombre').invalid && this.formularioEditar.get('nombre').touched
  }
  get apellidoRequerido() {
    return this.formularioEditar.get('apellido').invalid && this.formularioEditar.get('apellido').touched
  }
  get emailRequerido() {
    return this.formularioEditar.get('email').hasError('required') && this.formularioEditar.get('email').touched
  }

  get emailNoValido() {
    return this.formularioEditar.get('email').hasError('pattern') && this.formularioEditar.get('email').touched;
  }

  get saldoRequerido() {
    return this.formularioEditar.get('saldo').invalid && this.formularioEditar.get('saldo').touched;
  }

}
