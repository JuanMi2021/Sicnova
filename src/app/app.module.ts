import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { IbanComponent } from './components/administracion/iban/iban.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { DhlComponent } from './components/pedidos/dhl/dhl.component';
import { CeaceroComponent } from './components/pedidos/ceacero/ceacero.component';
import { FacturacionComponent } from './components/facturacion/facturacion.component';
import { ShopComponent } from './components/shop/shop.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';

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
    ShopComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
