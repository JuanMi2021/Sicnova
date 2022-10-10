import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessComponent } from './components/access/access.component';
import { EditarComponent } from './components/access/editar/editar.component';
import { LoginComponent } from './components/access/login/login.component';
import { LogoutComponent } from './components/access/logout/logout.component';
import { MenuComponent } from './components/access/menu/menu.component';
import { PerfilComponent } from './components/access/perfil/perfil.component';
import { RegistroComponent } from './components/access/registro/registro.component';
import { IbanComponent } from './components/administracion/iban/iban.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CeaceroComponent } from './components/pedidos/ceacero/ceacero.component';
import { DhlComponent } from './components/pedidos/dhl/dhl.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ApiComponent } from './components/support/api/api.component';
import { SupportComponent } from './components/support/support.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'iban', component: IbanComponent },
  { path: 'dhl', component: DhlComponent },
  { path: 'ceacero', component: CeaceroComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'logistica', component: PedidosComponent },
  { path: 'support', component: SupportComponent },
  { path: 'api', component: ApiComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil', component : PerfilComponent },
  { path: 'logout', component : LogoutComponent },
  { path: 'editar', component : EditarComponent },
  { path: 'login', component: LoginComponent},
  { path: 'access', component: AccessComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
