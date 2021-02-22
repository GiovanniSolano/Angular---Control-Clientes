import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  formulario: FormGroup;

  clientesPage: number = 5;

  @ViewChild('botonCerrar') botonCerrar: ElementRef;


  constructor(private _clientesService: ClienteService,
              private _sweetAlertService: Sweetalert2Service) { }

  ngOnInit(): void {

    this.crearFormulario();
    this.getClientes(5);

  

  }

  crearFormulario() {

    
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]),
      saldo: new FormControl(0, [Validators.required])
    });


  }


  getClientes(paginacion: number) {

    this._clientesService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
  });

  }

  getSaldoTotal() {

    let saldoTotal: number = 0;
    if(this.clientes) {
      this.clientes.forEach(cliente => {

        saldoTotal += cliente.saldo;

      });
    }

    return saldoTotal;

  }


  agregar() {

    if(this.formulario.invalid) {
      return;
    }

    this._clientesService.agregarCliente(this.formulario.value);

    this.formulario.reset();
    this.cerrarModal();

    this._sweetAlertService.mostrarMensaje('success', 'Cliente agregado correctamente');


  }

  private cerrarModal() {
    this.botonCerrar.nativeElement.click();

  }

  eliminar(cliente: Cliente){

    Swal.fire({
      title: `Estás seguro de eliminar a ${cliente.nombre}`,
      text: "Está acción no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this._clientesService.eliminarCliente(cliente);
        // this.router.navigate(['/']);

        this._sweetAlertService.mostrarMensaje('success', 'El cliente fue eliminado correctamente')
        
      }
    })


  }



  get nombreRequerido() {
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched
  }
  get apellidoRequerido() {
    return this.formulario.get('apellido').invalid && this.formulario.get('apellido').touched
  }
  get emailRequerido() {
    return this.formulario.get('email').hasError('required') && this.formulario.get('email').touched
  }

  get emailNoValido() {
    return this.formulario.get('email').hasError('pattern') && this.formulario.get('email').touched;
  }

  get saldoRequerido() {
    return this.formulario.get('saldo').invalid && this.formulario.get('saldo').touched;
  }

}
