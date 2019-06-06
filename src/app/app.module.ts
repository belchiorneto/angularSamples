import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
 // MatInputModule,
 // MatRippleModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from  '@angular/common/http';
import {FormBuilder} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { ClientesComponent } from './clientes/clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    FuncionariosComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
