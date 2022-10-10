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
import { AccessComponent } from './components/access/access.component';
import { LoginComponent } from './components/access/login/login.component';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { MenuComponent } from './components/access/menu/menu.component';
import { LogoutComponent } from './components/access/logout/logout.component';
import { RegistroComponent } from './components/access/registro/registro.component';
import { EditarComponent } from './components/access/editar/editar.component';
import { PerfilComponent } from './components/access/perfil/perfil.component';
import { ServiceAuth } from './services/auth.service';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



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
    ApiComponent,
    AccessComponent,
    LoginComponent,
    MenuComponent,
    LogoutComponent,
    PerfilComponent,
    RegistroComponent,
    EditarComponent,
    SpinnerComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [ ServiceAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
