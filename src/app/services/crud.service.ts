import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { BehaviorSubject, catchError, count, observable, Observable, retry, throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';
// import { Dhli } from './dhli';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //myData: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  //url='https://development.sicnova3d.com/test/proyect/classes/'; // disponer url de su servidor que tiene las páginas PHP
  url = "https://prueba.sicnova3d.com/CRUD/";
  data:any;
  constructor(private http: HttpClient) { }

  getProducto(id:any, uri:any){
    return this.http.get(`${this.url}callTiendas.php?id=${id}&uri=${uri}`);
  }

  getTransporte(id:any, uri:any){
    return this.http.get(`${this.url}callTiendas.php?Transporte&id=${id}&uri=${uri}`);
  }

  damePaginas(direccion:string){
    let salida;
    salida = this.http.get(`${this.url}callTiendas.php?uri=${direccion}`);
    return salida;
  }

  buscarProductos(direccion:string,filtro:string){
    let salida;
    salida = this.http.get(`${this.url}callTiendas.php?uri=${direccion}&Buscar=${filtro}`);
    return salida;
  }

  getProductos(direccion:string,pag:number){
    let salida;
    //const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    //salida = this.http.get(`${this.url}`,{headers, responseType:'text' });
    salida = this.http.get(`${this.url}callTiendas.php?uri=${direccion}&pag=${pag}`);
    return salida;
  }

  getTransportes(direccion:string){
    let salida;
    salida = this.http.get(`${this.url}callTiendas.php?Transporte&uri=${direccion}`);
    return salida;
  }

  modificarProducto(uri:string,formulario:FormGroup){
    var info = {origen:uri,id:formulario.getRawValue()["Producto"]["id"],modificar:JSON.stringify(formulario.getRawValue())};
    return this.http.post(`${this.url}callTiendas.php`,JSON.stringify(info));
  }

  exportarProductos(infoImport:any){
    return this.http.post(`${this.url}callTiendas.php`,JSON.stringify(infoImport));
  }
  
  exportarTransportes(infoImport:any){
    return this.http.post(`${this.url}callTiendas.php`,JSON.stringify(infoImport));
  }

  // alta(articulo:any) {
  //   return this.http.post(`${this.url}test.php`, JSON.stringify(articulo));
  // }

  // baja(codigo:number) {
  //   return this.http.get(`${this.url}baja.php?codigo=${codigo}`);
  // }

  // seleccionar(codigo:number) {
  //   return this.http.get(`${this.url}seleccionar.php?codigo=${codigo}`);
  // }

  // modificacion(articulo:any) {
  //   return this.http.post(`${this.url}modificacion.php`, JSON.stringify(articulo));
  // }


}
