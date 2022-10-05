import { Attribute, Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../../services/crud.service';
import { FormControl, FormGroup } from '@angular/forms';
import { isIdentifier } from '@angular/compiler';
import { count, toArray } from 'rxjs';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})

@Injectable({
  providedIn: 'root'
})


export class ApiComponent implements OnInit {
  //variables Bool
  toggleDscrptn:boolean=true;
  toggleDscrptnshrt:boolean=true;
  toggleLst:boolean=false;
  toggleError:boolean=false;
  toggleImport:boolean=false;
  tienda:boolean=false;
  distri:boolean=false;
  latam:boolean=false;
  triwee:boolean=false;
  //variables Any
  productos:any;
  producto:any;
  campos:any;
  vals:any;
  esFalso:any;
  productoIds:any[]=[];
  //variables number
  paginas: number = 0;
  pagina: number = 0;
  //variables string
  origen:string="";
  destino:string="";
  selectedOpt:string="";

  constructor(private servicio:CrudService) {
  }

  ngOnInit() {
    this.esFalso=false
    console.log("inicio")
  };

  getUnProducto(iden:string){
    let uri
    if (this.tienda) {
      console.log("Cargando Producto de Tienda")
      uri="tienda"
    }
    if (this.distri) {
      console.log("Cargando Producto de Distribuidor")
      uri="distribuidor"
    }
    if (this.latam) {
      console.log("Cargando Producto de Latam")
      uri="latam"
    }
    this.toggleLst=false;
    if (this.producto==undefined || this.producto["id"]!=iden) {
      this.producto=undefined;
      this.servicio.getProducto(iden,uri).subscribe((resultado)=>{
        this.vals=Object.values(resultado);
        this.campos=Object.keys(resultado);
        this.producto=resultado;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      });
    }
  };

  getProductosTienda(){
    this.toggleLst=true;
    this.productos=null;
    if(this.tienda==false || this.paginas==0){
      this.servicio.damePaginas("tienda").subscribe((resultado)=>{this.paginas= Math.floor(Object.values(resultado).length/100)})
      this.tienda=true;
      this.distri=false;
      this.latam=false;
    }
    this.servicio.getProductos("tienda",this.pagina).subscribe((resultado)=>{this.productos=resultado;});
  };


  getProductosDistribuidor(){
    this.toggleLst=true;
    this.productos=null;
    if(this.distri==false || this.paginas==0){
      this.servicio.damePaginas("distribuidor").subscribe((resultado)=>{this.paginas= Math.floor(Object.values(resultado).length/100)})
      this.tienda=false;
      this.distri=true;
      this.latam=false;
    }
    this.servicio.getProductos("distribuidor",this.pagina).subscribe((resultado)=>{this.productos=resultado;console.log(resultado)});
  };


  getProductosLatam(){
    this.toggleLst=true;
    this.productos=null;
    if(this.latam==false || this.paginas==0){
      this.servicio.damePaginas("latam").subscribe((resultado)=>{this.paginas= Math.floor(Object.values(resultado).length/100)})
      this.tienda=false;
      this.distri=false;
      this.latam=true;
    }
    this.servicio.getProductos("latam",this.pagina).subscribe((resultado)=>{this.productos=resultado;console.log(resultado)});
  };

  imprtrProductos(){
    let info
    if(this.tienda){
      info={origen:"tienda",destino:this.selectedOpt,Id:this.productoIds}
    }
    if(this.distri){
      info={origen:"distribuidor",destino:this.selectedOpt,Id:this.productoIds}
    }
    if(this.latam){
      info={origen:"latam",destino:this.selectedOpt,Id:this.productoIds}
    }
    if(this.triwee){
      info={origen:"triwee",destino:this.selectedOpt,Id:this.productoIds}
    }

    if(this.destino==""){
      this.toggleError=true;
    }else{
      this.toggleError=false;
      this.servicio.importarProductos(info).subscribe((resultado)=>{console.log(resultado)})
    }

      /*
    for (let i = 0; i < ids.length; i++) {
      console.log(ids[i]);
    }*/
  }

  getPagina(){
    if (this.tienda) {
      this.getProductosTienda();
    }
    if(this.distri){
      this.getProductosDistribuidor();
    }
    if(this.latam){
      this.getProductosLatam();
    }
  }

  getUltima(){
    if (this.tienda) {
      this.pagina=this.paginas
      this.getProductosTienda();
    }

    if(this.distri){
      this.pagina=this.paginas
      this.getProductosDistribuidor();
    }

    if(this.latam){
      this.pagina=this.paginas
      this.getProductosLatam();
    }
  }

  updSelected(id:string){
    if (this.productoIds.length==0 || this.productoIds.indexOf(id)==-1) {
      this.productoIds.push(id)
      if (this.toggleImport==false) {
        this.toggleImport=!this.toggleImport
      }
    }else{
      this.productoIds.splice(this.productoIds.indexOf(id),1)
      if(this.productoIds.length==0){
        this.toggleImport=false
      }
    }
    console.log(this.productoIds)
  }

  getPrimera(){

    if (this.tienda) {
      this.pagina=0;
      this.getProductosTienda();
    }

    if(this.distri){
      this.pagina=0;
      this.getProductosDistribuidor();
    }

    if(this.latam){
      this.pagina=0;
      this.getProductosLatam();
    }

  }
}
