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
  toggleDone:boolean=false;
  toggleDscrptn:boolean=true;
  toggleDscrptnshrt:boolean=true;
  toggleError:boolean=false;
  toggleExport:boolean=false;
  toggleExporting:boolean=false;
  toggleLst:boolean=false;
  toggleMod:boolean=false;
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

  myGroup = new FormGroup({
    Producto: new FormGroup({
      name: new FormControl(),
      reference: new FormControl(),
      price: new FormControl(),
      id_category_default	: new FormControl(),
      new	: new FormControl(),
      id_default_image	: new FormControl(),
      id_default_combination	: new FormControl(),
      id_tax_rules_group	: new FormControl(),
      type	: new FormControl(),
      supplier_reference	: new FormControl(),
      location	: new FormControl(),
      width	: new FormControl(),
      height	: new FormControl(),
      depth	: new FormControl(),
      weight	: new FormControl(),
      quantity_discount	: new FormControl(),
      ean13	: new FormControl(),
      isbn	: new FormControl(),
      upc	: new FormControl(),
      mpn	: new FormControl(),
      cache_is_pack	: new FormControl(),
      cache_has_attachments	: new FormControl(),
      is_virtual	: new FormControl(),
      state	: new FormControl(),
      additional_delivery_times: new FormControl(),	
      delivery_in_stock	: new FormControl(),
      delivery_out_stock	: new FormControl(),
      on_sale	: new FormControl(),
      online_only	: new FormControl(),
      ecotax	: new FormControl(),
      minimal_quantity	: new FormControl(),
      low_stock_threshold	: new FormControl(),
      low_stock_alert	: new FormControl(),
      wholesale_price	: new FormControl(),
      unity	: new FormControl(),
      unit_price_ratio	: new FormControl(),
      additional_shipping_cost: new FormControl(),	
      customizable	: new FormControl(),
      text_fields	: new FormControl(),
      uploadable_files	: new FormControl(),
      active	: new FormControl(),
      redirect_type	: new FormControl(),
      id_type_redirected	: new FormControl(),
      available_for_order	: new FormControl(),
      available_date	: new FormControl(),
      show_condition	: new FormControl(),
      condition	: new FormControl(),
      show_price	: new FormControl(),
      indexed	: new FormControl(),
      visibility	: new FormControl(),
      advanced_stock_management: new FormControl(),	
      pack_stock_type	: new FormControl(),
      meta_description	: new FormControl(),
      meta_keywords	: new FormControl(),
      meta_title	: new FormControl(),
      link_rewrite	: new FormControl(),
      description	: new FormControl(),
      description_short: new FormControl()
    })
  })

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
        console.log(resultado)
        this.campos=Object.keys(resultado);
        this.vals=Object.values(resultado);
        let controles=this.myGroup.controls.Producto
        let activo=this.myGroup.controls.Producto.get("active");
        for (let key in this.campos) {
          if(this.vals[key]!="[object Object]"){
            this.myGroup.controls.Producto.get(this.campos[key])?.setValue(this.vals[key]);
          }else{
            if(this.vals[key]["language"]!="[object Object]" && this.vals[key]["language"]!=6){
              this.myGroup.controls.Producto.get(this.campos[key])?.setValue(this.vals[key]["language"]);
            }
          }
        }
        this.producto=resultado;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      });
    }
  };

  comprobarModificaciones(){
    let retorno="";
    for (let key in this.campos) {
      if(this.vals[key]!="[object Object]"){
        if(this.myGroup.controls.Producto.get(this.campos[key])?.value==this.vals[key]){
          
        }
      }else{
        if(this.vals[key]["language"]!="[object Object]" && this.vals[key]["language"]!=6){
          this.myGroup.controls.Producto.get(this.campos[key])?.setValue(this.vals[key]["language"]);
        }
      }
    }
  }

  showMygroup(){
    console.log(this.myGroup);
  }

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
