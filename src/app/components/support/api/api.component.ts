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
  toggleCategoria:boolean=false;
  toggleDscrptn:boolean=true;
  toggleDscrptnshrt:boolean=true;
  toggleLst:boolean=false;
  toggleError:boolean=false;
  toggleExport:boolean=false;
  toggleExporting:boolean=false;
  toggleDone:boolean=false;
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
  toggleBuscar:number=0;
  //variables string
  searchActive:string  = "";
  searchMinId:string  = "";
  searchMaxId:string  = "";
  searchRef:string  = "";
  searchName:string  = "";
  origen:string="";
  destino:string="";
  selectedOpt:string="";

  constructor(private servicio:CrudService) {
  }

  ngOnInit() {
    this.esFalso=false;
    console.log("inicio");
  };

  getUnProducto(iden:string){
    let uri;
    if (this.tienda) {
      console.log("Cargando Producto de Tienda");
      uri="tienda";
    }
    if (this.distri) {
      console.log("Cargando Producto de Distribuidor");
      uri="distribuidor";
    }
    if (this.latam) {
      console.log("Cargando Producto de Latam");
      uri="latam";
    }
    this.toggleLst=false;
    if(this.toggleBuscar==1)this.toggleBuscar=2;
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
    if(this.toggleExport==true){
      this.toggleExport=!this.toggleExport;
      this.productoIds=[];
    }
    if(this.toggleBuscar==1)this.pagina=0;
    this.toggleBuscar=0;
    this.toggleLst=true;
    this.productos=null;
    this.servicio.damePaginas("tienda").subscribe((resultado)=>{this.paginas=Math.floor(Object.values(resultado).length/100)});
    if(this.tienda==false || this.paginas==0){
      this.tienda=true;
      this.distri=false;
      this.latam=false;
    }
    console.log("pagina cargando: " + this.pagina);
    console.log("carga las paginas: " + this.paginas);
    console.log("toggle buscar: " + this.toggleBuscar);
    this.servicio.getProductos("tienda",this.pagina).subscribe((resultado)=>{this.productos=resultado;console.log(resultado)});
  };


  getProductosDistribuidor(){
    if(this.toggleExport==true){
      this.toggleExport=!this.toggleExport;
      this.productoIds=[];
    }
    if(this.toggleBuscar==1)this.pagina=0;
    this.toggleBuscar=0;
    this.toggleLst=true;
    this.productos=null;
    this.servicio.damePaginas("distribuidor").subscribe((resultado)=>{this.paginas= Math.floor(Object.values(resultado).length/100)});
    if(this.distri==false || this.paginas==0){
      this.tienda=false;
      this.distri=true;
      this.latam=false;
    }
    this.servicio.getProductos("distribuidor",this.pagina).subscribe((resultado)=>{this.productos=resultado;console.log(resultado)});
  };


  getProductosLatam(){
    if(this.toggleExport==true){
      this.toggleExport=!this.toggleExport;
      this.productoIds=[];
    }
    if(this.toggleBuscar==1)this.pagina=0;
    this.toggleBuscar=0;
    this.toggleLst=true;
    this.productos=null;
    this.servicio.damePaginas("latam").subscribe((resultado)=>{this.paginas=Math.floor(Object.values(resultado).length/100)})
    if(this.latam==false || this.paginas==0){
      this.tienda=false;
      this.distri=false;
      this.latam=true;
    }
    this.servicio.getProductos("latam",this.pagina).subscribe((resultado)=>{this.productos=resultado;console.log(resultado)});
  };

  exprtrProductos(){
    let info
    if(this.tienda){
      info={origen:"tienda",destino:this.selectedOpt,Id:this.productoIds};
    }
    if(this.distri){
      info={origen:"distribuidor",destino:this.selectedOpt,Id:this.productoIds};
    }
    if(this.latam){
      info={origen:"latam",destino:this.selectedOpt,Id:this.productoIds};
    }
    if(this.triwee){
      info={origen:"triwee",destino:this.selectedOpt,Id:this.productoIds};
    }

    if(this.destino==""){
      this.toggleError=true;
    }else{
      this.toggleBuscar=0;
      this.toggleError=false;
      this.servicio.exportarProductos(info).subscribe((resultado)=>{if(typeof resultado=="object"){this.toggleExporting=false;this.toggleDone=true}});
    }

    /*
    for (let i = 0; i < ids.length; i++) {
      console.log(ids[i]);
    }
    */
  }

  updSelected(id:string){
    if (this.productoIds.length==0 || this.productoIds.indexOf(id)==-1) {
      this.productoIds.push(id);
      if (this.toggleExport==false) {
        this.toggleExport=!this.toggleExport;
      }
    }else{
      this.productoIds.splice(this.productoIds.indexOf(id),1);
      if(this.productoIds.length==0){
        this.toggleExport=false;
      }
    }
    console.log(this.productoIds);
  }

  getUltima(){
    console.log("before:" + this.pagina + "/" + this.paginas);
    if (this.tienda){
      this.pagina=this.paginas;
      this.getProductosTienda();
    }

    if(this.distri){
      this.pagina=this.paginas;
      this.getProductosDistribuidor();
    }

    if(this.latam){
      this.pagina=this.paginas;
      this.getProductosLatam();
    }
    console.log("after:" + this.pagina + "/" + this.paginas);
  }

  getPagina(){
    if (this.tienda){
      this.getProductosTienda();
    }
    if(this.distri){
      this.getProductosDistribuidor();
    }
    if(this.latam){
      this.getProductosLatam();
    }
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

  buscarProductos(){
    this.toggleBuscar=1;
    var salida:string="";
			if(this.searchMinId!="" && this.searchMaxId!=""){
				if(this.searchMaxId<this.searchMinId || isNaN(parseInt(this.searchMinId)) || isNaN(parseInt(this.searchMaxId))){
					salida="null";
				}else{
					salida+="id:"+this.searchMinId+"|"+this.searchMaxId;
				}
			}else{
				if(this.searchMinId!="" && this.searchMaxId=="" && salida!="null"){
					salida+="id:"+this.searchMinId+"|";
				}
				if(this.searchMinId=="" && this.searchMaxId!="" && salida!="null"){
					salida+="id:0|"+this.searchMaxId;
				}
			}
			if(salida!="null"){
				if(this.searchRef!=""){
					if(salida.length>0)salida+="%";
				salida+="ref:"+this.searchRef;
				}
				if(this.searchName!=""){
					if(salida.length>0)salida+="%";
					salida+="name:"+this.searchName;
				}
				if(this.searchActive!=""){
					if(salida.length>0)salida+="%";
          if (this.searchActive=="2") {
            salida+="is:0";
          }else{
            salida+="is:"+this.searchActive;
          }
				}
			}
      let dir="";
      if (this.tienda) {
        dir="tienda";
      }
      if (this.distri) {
        dir="distribuidor";
      }
      if (this.latam) {
        dir="latam";
      }
      if(salida=="" || salida=="null"){
        console.log("No hay datos de Busqueda");
        this.toggleBuscar=0;
      }else{
        this.productos="";
        this.pagina=0;
        this.servicio.buscarProductos(dir,salida).subscribe((resultado)=>{this.productos=resultado;this.paginas=Object.values(resultado).length;console.log(resultado)})
      }
  }

  UltPagBuscar(paginas:number){
    return Math.floor(paginas/100);
  }

  limpiarCampos(){
    this.searchMinId="";
    this.searchMaxId="";
    this.searchName="";
    this.searchRef="";
    this.searchActive="";
    if (this.tienda) {
      this.getProductosTienda();
    }

    if(this.distri){
      this.getProductosDistribuidor();
    }

    if(this.latam){
      this.getProductosLatam();
    }
    this.pagina=0;
    this.toggleBuscar=0;
  }
}
