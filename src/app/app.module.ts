import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { IbanComponent } from './components/administracion/iban/iban.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { DhlComponent } from './components/pedidos/dhl/dhl.component';
import { CeaceroComponent } from './components/pedidos/ceacero/ceacero.component';
import { FacturacionComponent } from './components/facturacion/facturacion.component';

import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SupportComponent } from './components/support/support.component';
import { ApiComponent } from './components/support/api/api.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdministracionComponent,
    IbanComponent,
    PedidosComponent,
    DhlComponent,
    CeaceroComponent,
    FacturacionComponent,
    NavbarComponent,
    SupportComponent,
    ApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
