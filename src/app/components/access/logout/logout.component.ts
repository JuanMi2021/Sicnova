import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceAuth } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _service : ServiceAuth, private _router : Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this._service.logOut();
    console.log("Deslogueado");
    this._router.navigate(["/"]);
  }
}
