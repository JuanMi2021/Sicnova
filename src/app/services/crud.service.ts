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
  
  url:string="";
  data:any;
  constructor(private http: HttpClient) { }

  getProducto(id:any, uri:any){
    this.url=addUrl(uri);
    return this.http.get(`${this.url}callTiendas.php?id=${id}&uri=${uri}`);
  }

  getTransporte(id:any, uri:any){
    this.url=addUrl(uri);
    return this.http.get(`${this.url}callTiendas.php?Transporte&id=${id}&uri=${uri}`);
  }

  damePaginas(direccion:string){
    this.url=addUrl(direccion);
    let salida;
    salida = this.http.get(`${this.url}callTiendas.php?uri=${direccion}`);
    return salida;
  }

  buscarProductos(direccion:string,filtro:string){
    this.url=addUrl(direccion);
    let salida;
    salida = this.http.get(`${this.url}callTiendas.php?uri=${direccion}&Buscar=${filtro}`);
    return salida;
  }

  getProductos(direccion:string,pag:number){
    this.url=addUrl(direccion);
    let salida;
    salida = this.http.get(`${this.url}callTiendas.php?uri=${direccion}&pag=${pag}`);
    return salida;
  }

  getTransportes(direccion:string){
    this.url=addUrl(direccion);
    let salida;
    salida = this.http.get(`${this.url}callTiendas.php?Transporte&uri=${direccion}`);
    return salida;
  }

  modificarProducto(uri:string,formulario:FormGroup){
    this.url=addUrl(uri);
    var info = {origen:uri,id:formulario.getRawValue()["Producto"]["id"],modificar:JSON.stringify(formulario.getRawValue())};
    return this.http.post(`${this.url}callTiendas.php`,JSON.stringify(info));
  }

  exportarProductos(infoImport:any,uri:any){
    this.url = addUrl(uri)
    return this.http.post(`${this.url}callTiendas.php`,JSON.stringify(infoImport));
  }
  
  exportarTransportes(infoImport:any,uri:any){
    this.url = addUrl(uri)
    console.log(this.url);
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

function addUrl(data:string){
  let url;
  switch (data) {
    case 'tienda':
        url = "https://tienda.sicnova3d.com/CRUD/";
      break;
    case 'distribuidor':
        url = "https://distribuidor.sicnova3d.com/CRUD/";
      break;
    case 'latam':
        url = "https://latam.sicnova3d.com/CRUD/";
      break;
    case 'triwee':
        url = "https://triwee.shop/CRUD/";
      break;
    case 'b2btri':
        url = "https://b2b.triwee.shop/CRUD/";
      break;
    default:
        url = "https://prueba.sicnova3d.com/CRUD/";
      break;
  }
  return url
}
