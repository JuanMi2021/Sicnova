import { Component, OnInit } from '@angular/core';
import { ServiceAuth } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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

