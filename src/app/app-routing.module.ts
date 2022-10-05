import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IbanComponent } from './components/administracion/iban/iban.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CeaceroComponent } from './components/pedidos/ceacero/ceacero.component';
import { DhlComponent } from './components/pedidos/dhl/dhl.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ShopComponent } from './components/shop/shop.component';

const routes: Routes = [
  { path: 'iban', component: IbanComponent },
  { path: 'dhl', component: DhlComponent },
  { path: 'ceacero', component: CeaceroComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'logistica', component:PedidosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
