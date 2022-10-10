import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceAuth } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  @ViewChild("cajamail") cajamail!: ElementRef;
  @ViewChild("cajapassword") cajapassword!: ElementRef;
  // PROBAR ESTA SOLUCION PARA EL DISPLAYNAME
  @ViewChild("cajanombre") cajanombre!: ElementRef;
  constructor(private _auth: ServiceAuth, private _router: Router, private _service: ServiceAuth) { }

  ngOnInit(): void {
  }

  registro(): void {
    var mail = this.cajamail.nativeElement.value;
    var contra = this.cajapassword.nativeElement.value;
    var nombre = this.cajanombre.nativeElement.value;
    var foto = '';
    this._auth.registro(mail, contra).then(res => {
      console.log(res);
      this._service.updateUsuario(nombre, foto).then(response => {
        this._service.logOut();



        this._router.navigate(['dashboard']);
        // });
        // this._router.navigate(['perfil']);
      })
    })
  }

}


// Se ha incluido el private _service y el var nombre,tambien el viewchild del nombre.
