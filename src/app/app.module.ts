import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from "../environments/environment";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS  } from "@angular/fire/firestore";

import { AngularFireAuthModule } from '@angular/fire/auth';

import { FlashMessagesModule } from 'angular2-flash-messages';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    NoEncontradoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firestore, 'control-clientes'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlashMessagesModule,
    AuthModule,
    PagesModule
  ],
  providers: [
    {provide: SETTINGS, useValue:{}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
