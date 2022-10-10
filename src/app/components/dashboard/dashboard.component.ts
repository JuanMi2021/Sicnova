import { Component, OnInit } from '@angular/core';
import { ServiceAuth } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public logueado : boolean;
  public usuario : any;
  public nombre : any;
  constructor(private _service : ServiceAuth) {
    this.logueado = false;
  }

  ngOnInit(): void {
    this.usuarioLogueado();
  }
  usuarioLogueado(){
    this._service.getInfoUsuarioLoggeado().subscribe(res=>{
      if(res != null){
        this.logueado = true;
        this.usuario = res;
        this.nombre = this.usuario.displayName;
      }
      else{
        this.logueado = false;
      }

    });
  }
}

