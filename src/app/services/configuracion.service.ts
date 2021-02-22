import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Configuracion } from '../models/configuracion.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  configuracionDoc: AngularFirestoreDocument<Configuracion>;
  configuracion: Observable<Configuracion>;


  // id único de la colección de configuración
  id = '1';

  constructor(private db: AngularFirestore) { }


  getConfiguracion(): Observable<Configuracion> {
    this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
    this.configuracion = this.configuracionDoc.valueChanges();
    return this.configuracion;
  }

  modificarConfiguracion(configuracion: Configuracion) {
    this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
    this.configuracionDoc.update(configuracion);

  }

}
