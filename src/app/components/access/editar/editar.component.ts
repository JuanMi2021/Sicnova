import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceAuth } from 'src/app/services/auth.service';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  @ViewChild("cajanombre") cajanombre! : ElementRef;
  @ViewChild("cajafoto") cajafoto! : ElementRef;

  constructor(private _service : ServiceAuth, private _router: Router) { }

  ngOnInit(): void {
  }

  modificar(){
    var nombre = this.cajanombre.nativeElement.value;
    var foto = this.cajafoto.nativeElement.value;

    this._service.updateUsuario(nombre, foto).then(res => {
      console.log(res);
      this._router.navigate(['perfil']);
    });
  }
}
