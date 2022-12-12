import { Attribute, Component, ViewChild, ViewEncapsulation, OnInit, ErrorHandler } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CrudService } from '../../../services/crud.service';
import { FormControl, FormGroup } from '@angular/forms';
import { isIdentifier, Node } from '@angular/compiler';
import { catchError, count, retry, toArray } from 'rxjs';


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
  toggleNotFound:boolean=false;
  toggleProducto:boolean=false;
  toggleTransporte:boolean=false;
  tienda:boolean=false;
  distri:boolean=false;
  latam:boolean=false;
  triwee:boolean=false;
  b2btri:boolean=false;
  //variables Any
  productos:any;
  transportes:any;
  producto:any;
  transporte:any;
  campos:any;
  vals:any;
  esFalso:any;
  productoIds:any[]=[];
  transporteIds:any[]=[];
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
  imagenes:any[]=[];

  myGroup = new FormGroup({
    Producto: new FormGroup({
      id: new FormControl(),
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
      description_short: new FormControl(),
    })
  })

  Transportistas = new FormGroup({
    Transporte: new FormGroup({
    })
  })


  constructor(private servicio:CrudService) {
  }

  ngOnInit() {
    let  row= <HTMLElement> document.getElementsByClassName("row")[0];
    row.style.marginRight="0px";
    this.esFalso=false;
  };

  getUnProducto(iden:string){
    let uri = "prueba";
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
    if (this.triwee) {
      console.log("Cargando Producto de triwee");
      uri="triwee";
    }
    if (this.b2btri) {
      console.log("Cargando Producto de b2b");
      uri="b2btri";
    }
    this.toggleLst=false;
    if(this.toggleBuscar==1)this.toggleBuscar=2;
    if (this.producto==undefined || this.producto["id"]!=iden) {
      this.imagenes=[];
      this.producto=undefined;
      this.servicio.getProducto(iden,uri).subscribe((resultado)=>{
        console.log(resultado)
        this.campos=Object.keys(resultado);
        this.vals=Object.values(resultado);
        let controles=this.myGroup.controls.Producto
        let activo=this.myGroup.controls.Producto.get("active");
        for (let key in this.campos) {
          this.myGroup.controls.Producto.get(this.campos[key])?.setValue("");
          if(this.triwee || this.b2btri){
            if(this.vals[key]!="[object Object]"){
              this.myGroup.controls.Producto.get(this.campos[key])?.setValue(this.vals[key]);
            }else{
              if(this.vals[key]["language"]!="[object Object]" && this.vals[key]["language"]!=undefined){
                if(Object.keys(this.vals[key]["language"][0])[0]!="@attributes")
                  this.myGroup.controls.Producto.get(this.campos[key])?.setValue(this.vals[key]["language"][0]);
                // this.myGroup.controls.Producto.get(this.campos[key])?.setValue(this.vals[key]["language"]);
              }else{
                this.myGroup.controls.Producto.get(this.campos[key])?.setValue(this.vals[key]["language"]);
              }
            }
          }else{
            if(this.vals[key]!="[object Object]"){
              this.myGroup.controls.Producto.get(this.campos[key])?.setValue(this.vals[key]);
            }else{
              if(this.vals[key]["language"]!="[object Object]" && this.vals[key]["language"]!=6){
                this.myGroup.controls.Producto.get(this.campos[key])?.setValue(this.vals[key]["language"]);
              }
            }
          }
          if(this.campos[key]=="associations" && this.vals[key]["images"]["image"]!=undefined){
            if(Object.keys(this.vals[key]["images"]["image"]).length > 1){
              for (let i = 0; i < this.vals[key]["images"]["image"].length; i++) {
                let texto="";
                if(this.tienda){
                  texto="http://tienda.sicnova3d.com/img/p/";
                }
                if(this.b2btri){
                  texto="http://b2b.triwee.shop/img/p/";
                }
                if(this.distri){
                  texto="http://distribuidor.sicnova3d.com/img/p/";
                }
                if(this.latam){
                  texto="http://latam.sicnova3d.com/img/p/";
                }
                if(this.triwee){
                  texto="http://triwee.shop/img/p/";
                }
                /**-----------------------------------------------------Elimnar despues de terminar las pruebas----------------------------------------------------- */
                if(!this.latam && !this.tienda && !this.distri && !this.b2btri && !this.triwee){
                  texto="http://prueba.sicnova3d.com/img/p/";
                }
                /**^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Elimnar despues de terminar las pruebas^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
                for (let j = 0; j < this.vals[key]["images"]["image"][i]["id"].length; j++) {
                  texto+=this.vals[key]["images"]["image"][i]["id"][j] + "/";
                }
                texto+=this.vals[key]["images"]["image"][i]["id"] + ".jpg";
                this.vals[key]["images"]["image"][i]=texto;
              }
              this.imagenes=this.vals[key]["images"]["image"];
            }else{
              let texto="";
              if(this.tienda){
                texto="http://tienda.sicnova3d.com/img/p/";
              }
              if(this.b2btri){
                texto="http://b2b.triwee.shop/img/p/";
              }
              if(this.distri){
                texto="http://distribuidor.sicnova3d.com/img/p/";
              }
              if(this.latam){
                texto="http://latam.sicnova3d.com/img/p/";
              }
              if(this.triwee){
                texto="http://triwee.shop/img/p/";
              }
              /**-----------------------------------------------------Elimnar despues de terminar las pruebas----------------------------------------------------- */
              if(!this.latam && !this.tienda && !this.distri && !this.b2btri && !this.triwee){
                texto="http://prueba.sicnova3d.com/img/p/";
              }
              /**^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Elimnar despues de terminar las pruebas^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
              for (let j = 0; j < this.vals[key]["images"]["image"]["id"].length; j++) {
                texto+=this.vals[key]["images"]["image"]["id"][j] + "/";
              }
              texto+=this.vals[key]["images"]["image"]["id"] + ".jpg";
              this.imagenes.push(texto);
            }
          }
        }
        this.producto=resultado;
        this.back2Top();
      });
    }
  };

  back2Top(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getUnTransporte(iden:string){
    /**-----------------------------------------------------Elimnar despues de terminar las pruebas----------------------------------------------------- */
    let uri = "prueba";
    if (this.tienda) {
      console.log("Cargando Transporte de Tienda");
      uri="tienda";
    }
    if (this.distri) {
      console.log("Cargando Transporte de Distribuidor");
      uri="distribuidor";
    }
    if (this.latam) {
      console.log("Cargando Transporte de Latam");
      uri="latam";
    }
    if (this.triwee) {
      console.log("Cargando Producto de triwee");
      uri="triwee";
    }
    if (this.b2btri) {
      console.log("Cargando Producto de b2b");
      uri="b2btri";
    }
    /**^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Elimnar despues de terminar las pruebas^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */

    this.toggleLst=false;
    if(this.toggleBuscar==1)this.toggleBuscar=2;
    if (this.transporte==undefined || this.transporte["id"]!=iden) {
      this.transporte=undefined;
      this.servicio.getTransporte(iden,uri).subscribe((resultado)=>{
        console.log(resultado);
        this.campos=Object.keys(resultado);
        this.vals=Object.values(resultado);
        let controles=this.Transportistas.controls.Transporte
        let activo=this.Transportistas.controls.Transporte.get("active");
        for (let key in this.campos) {
          this.Transportistas.controls.Transporte.get(this.campos[key])?.setValue("");
          if(this.vals[key]!="[object Object]"){
            this.Transportistas.controls.Transporte.get(this.campos[key])?.setValue(this.vals[key]);
          }else{
            if(this.vals[key]["language"]!="[object Object]" && this.vals[key]["language"]!=6){
              this.Transportistas.controls.Transporte.get(this.campos[key])?.setValue(this.vals[key]["language"]);
            }
          }
        }
        this.transporte=resultado;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      });
    }
  };

  comprobarModificaciones(){
    let uri="prueba";
    let cambiado:boolean = false
    if(this.tienda){uri= "tienda"}
    if(this.distri){uri= "distribuidor"}
    if(this.latam){uri= "latam"}
    if(this.triwee){uri= "triwee"}
    if (this.b2btri) {uri="b2btri"}

    let retorno="";
    for (let key in this.campos) {
      let controlDato = this.myGroup.controls.Producto.get(this.campos[key])
      if(controlDato!=null){
        if(this.vals[key]!="[object Object]" && controlDato?.value!=this.vals[key]){
          this.vals[key]=controlDato?.value
          cambiado=true
        }
        if(this.vals[key]["language"]!=null && controlDato?.value!=this.vals[key]["language"]){
          if(this.vals[key]["language"]!="[object Object]"){
            this.vals[key]["language"]=controlDato?.value
            cambiado=true
          }
          if(this.vals[key]["language"]=="[object Object]"){
            if(controlDato?.value!="" && controlDato?.value!=null && controlDato?.value!="null"){
              this.vals[key]["language"]=controlDato?.value
              cambiado=true
            }
          }
        }
      }
    }
    let pro:any;
    if(cambiado){
      this.servicio.modificarProducto(uri,this.myGroup).subscribe((resultado)=>{
        if(resultado){
          /**-----------------------------------------------------Elimnar despues de terminar las pruebas----------------------------------------------------- */
          console.log("Se ha modificado")
          /**^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Elimnar despues de terminar las pruebas^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
          this.getUnProducto(this.myGroup.controls.Producto.get("id")?.value)
        }
      });
    }
  }

  cancelarModificaciones(){
    let retorno="";
    for (let key in this.campos) {
      if(this.myGroup.controls.Producto.get(this.campos[key])!=null){
        if(this.vals[key]!="[object Object]"){
          if(this.myGroup.controls.Producto.get(this.campos[key])?.value==this.vals[key]){
          }else{
            this.myGroup.controls.Producto.get(this.campos[key])?.setValue(this.vals[key]);
          }
        /**-----------------------------------------------------Elimnar despues de terminar las pruebas----------------------------------------------------- */ 
        }else{
          if(this.vals[key]["language"]!="[object Object]" && this.vals[key]["language"]!=6){
            if(this.myGroup.controls.Producto.get(this.campos[key])?.value==this.vals[key]["language"]){
              console.log("iguales")
            }else{
              console.log("Nuevo valor: "+
              this.myGroup.controls.Producto.get(this.campos[key])?.setValue(this.vals[key]["language"])
              )
            }
          }
        /**^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Elimnar despues de terminar las pruebas^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
        }
      }
    }
  }

  /**-----------------------------------------------------Elimnar despues de terminar las pruebas----------------------------------------------------- */ 
  showMygroup(){
    console.log(this.myGroup);
  }
  /**^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Elimnar despues de terminar las pruebas^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */

  getAllProducts(recurso:string){
    this.toggleError=false;
    this.toggleNotFound=false;
    if(this.toggleProducto){
      if(this.toggleExport==true){
        this.toggleExport=!this.toggleExport;
        this.productoIds=[];
      }
      if(this.toggleBuscar==1)this.pagina=0;
      this.toggleBuscar=0;
      this.toggleLst=true;
      this.productos=null;
      this.servicio.damePaginas(recurso).subscribe((resultado)=>{this.paginas=Math.floor(Object.values(resultado).length/100)});
      this.servicio.getProductos(recurso,this.pagina).subscribe((resultado)=>{
        if(resultado==null){this.productos=resultado;}
        else{this.productos=resultado;}
      },
      (err)=>{
        if(err.name=="HttpErrorResponse"){
          this.toggleError=true
          console.log(this.productos)
        }
      });
    }
  }

  getAllTransports(recurso:string){
    this.toggleError=false;
    this.toggleNotFound=false;
    if(this.toggleTransporte){
      if(this.toggleExport==true){
        this.toggleExport=!this.toggleExport;
        this.transporteIds=[];
      }
      if(this.toggleBuscar==1)this.pagina=0;
      this.toggleBuscar=0;
      this.toggleLst=true;
      this.transportes=null;
      this.servicio.getTransportes(recurso).subscribe((resultado)=>{
        if(resultado==null){this.transportes=resultado;}
        else{this.transportes=resultado;}
      },
      (err)=>{
        if(err.name=="HttpErrorResponse"){
          this.toggleError=true;
          console.log(this.transportes);
        }
      });
    }
  }

  getProductosPrueba(){
    this.tienda=false;
    this.distri=false;
    this.latam=false;
    this.triwee=false;
    this.b2btri=false;
    this.getAllProducts("prueba");
  };

  getTransportesPrueba(){
    this.tienda=false;
    this.distri=false;
    this.latam=false;
    this.triwee=false;
    this.b2btri=false;
    this.getAllTransports("prueba");
  };

  getProductosTienda(){
    if(this.tienda==false || this.paginas==0){
      this.tienda=true;
      this.distri=false;
      this.latam=false;
      this.triwee=false;
      this.b2btri=false;
    }
    this.getAllProducts("tienda");
  };

  getTransportesTienda(){
    if(this.tienda==false || this.paginas==0){
      this.tienda=true;
      this.distri=false;
      this.latam=false;
      this.triwee=false;
      this.b2btri=false;
    }
    this.getAllTransports("tienda");
  };

  getProductosDistribuidor(){
    if(this.distri==false || this.paginas==0){
      this.tienda=false;
      this.distri=true;
      this.latam=false;
      this.triwee=false;
      this.b2btri=false;
    }
    this.getAllProducts("distribuidor");
  };

  getTransportesDistribuidor(){
    if(this.distri==false || this.paginas==0){
      this.tienda=false;
      this.distri=true;
      this.latam=false;
      this.triwee=false;
      this.b2btri=false;
    }
    this.getAllTransports("distribuidor");
  };


  getProductosLatam(){
    if(this.latam==false || this.paginas==0){
      this.tienda=false;
      this.distri=false;
      this.latam=true;
      this.triwee=false;
      this.b2btri=false;
    }
    this.getAllProducts("latam");
  };

  getTransportesLatam(){
    if(this.latam==false || this.paginas==0){
      this.tienda=false;
      this.distri=false;
      this.latam=true;
      this.triwee=false;
      this.b2btri=false;
    }
    this.getAllTransports("latam");
  };

  getProductosTriwee(){
    if(this.triwee==false || this.paginas==0){
      this.tienda=false;
      this.distri=false;
      this.latam=false;
      this.triwee=true;
      this.b2btri=false;
    }
    this.getAllProducts("triwee");
  };

  getTransportesTriwee(){
    if(this.triwee==false || this.paginas==0){
      this.tienda=false;
      this.distri=false;
      this.latam=false;
      this.triwee=true;
      this.b2btri=false;
    }
    this.getAllTransports("triwee");
  };

  getProductosB2B(){
    if(this.b2btri==false || this.paginas==0){
      this.tienda=false;
      this.distri=false;
      this.latam=false;
      this.triwee=false;
      this.b2btri=true;
    }
    this.getAllProducts("b2btri");
  };

  getTransportesB2B(){
    if(this.b2btri==false || this.paginas==0){
      this.tienda=false;
      this.distri=false;
      this.latam=false;
      this.triwee=false;
      this.b2btri=true;
    }
    this.getAllTransports("b2btri");
  };

  exprtrProductos(){
    let info;
    let url;

    if(this.tienda){
      info={origen:"tienda",destino:this.selectedOpt,Producto:this.productoIds};
    }
    if(this.distri){
      info={origen:"distribuidor",destino:this.selectedOpt,Producto:this.productoIds};
    }
    if(this.latam){
      info={origen:"latam",destino:this.selectedOpt,Producto:this.productoIds};
    }
    if(this.triwee){
      info={origen:"triwee",destino:this.selectedOpt,Producto:this.productoIds};
    }
    if(this.b2btri){
      info={origen:"b2btri",destino:this.selectedOpt,Producto:this.productoIds};
    }
    
    if(this.destino==""){
      this.toggleError=true;
    }else{
      this.toggleBuscar=0;
      this.toggleError=false;
      console.log("info:"); // Eliminar despues de terminar con las pruebas
      console.log(info); // Eliminar despues de terminar con las pruebas
      this.servicio.exportarProductos(info,url).subscribe((resultado)=>{console.log(resultado);if(typeof resultado=="object"){this.toggleExporting=false;this.toggleDone=true}},
      (err)=>{
        if(err.name=="HttpErrorResponse"){
          this.toggleError=true
          this.toggleExporting=false
          console.log(err);
        }
      });
    }

  }

  exprtrTransportes(){
    let info;

    if(this.tienda){
      info={origen:"tienda",destino:this.selectedOpt,Transporte:this.transporteIds};
    }
    if(this.distri){
      info={origen:"distribuidor",destino:this.selectedOpt,Transporte:this.transporteIds};
    }
    if(this.latam){
      info={origen:"latam",destino:this.selectedOpt,Transporte:this.transporteIds};
    }
    if(this.triwee){
      info={origen:"triwee",destino:this.selectedOpt,Transporte:this.transporteIds};
    }
    if(this.b2btri){
      info={origen:"b2btri",destino:this.selectedOpt,Transporte:this.transporteIds};
    }
    console.log(this.transporteIds);
    if(this.destino==""){
      this.toggleError=true;
    }else{
      this.toggleBuscar=0;
      this.toggleError=false;
      this.servicio.exportarTransportes(info,this.selectedOpt).subscribe((resultado)=>{console.log(resultado);if(typeof resultado=="object"){this.toggleExporting=false;this.toggleDone=true}},
      (err)=>{
        if(err.name=="HttpErrorResponse"){
          this.toggleError=true;
          this.toggleExporting=false;
          console.log(err.error.text);
        }
      });
    }

  }

  //Actualiza los Productos seleccionados de la lista
  updtSelected(id:string){
    if(this.toggleProducto){
      if (this.productoIds.length==0 || this.productoIds.indexOf(id)==-1) {
        this.productoIds.push(id);
        // if (this.toggleExport==false) {
        //   this.toggleExport=!this.toggleExport;
        // }
      }else{
        this.productoIds.splice(this.productoIds.indexOf(id),1);
        // if(this.productoIds.length==0){
        //   this.toggleExport=false;
        // }
      }
      console.log(this.productoIds); // Eliminar despues de terminar con las pruebas
    }
    if(this.toggleTransporte){
      if (this.transporteIds.length==0 || this.transporteIds.indexOf(id)==-1) {
        this.transporteIds.push(id);
        // if (this.toggleExport==false) {
        //   this.toggleExport=!this.toggleExport;
        // }
      }else{
        this.transporteIds.splice(this.transporteIds.indexOf(id),1);
        // if(this.transporteIds.length==0){
        //   this.toggleExport=false;
        // }
      }
      // console.log(this.transporteIds); // Eliminar despues de terminar con las pruebas
    }
  }

  getUltima(){
    if (this.tienda){this.pagina=this.paginas;this.getProductosTienda();}
    if(this.distri){this.pagina=this.paginas;this.getProductosDistribuidor();}
    if(this.latam){this.pagina=this.paginas;this.getProductosLatam();}
    if(this.triwee){this.pagina=this.paginas;this.getProductosTriwee();}
    if(this.b2btri){this.pagina=this.paginas;this.getProductosB2B();}
  }

  getPagina(){
    if (this.tienda){this.getProductosTienda();}
    if(this.distri){this.getProductosDistribuidor();}
    if(this.latam){this.getProductosLatam();}
    if(this.triwee){this.getProductosTriwee();}
    if(this.b2btri){this.getProductosB2B();}
  }

  getPrimera(){
    this.pagina=0;
    if (this.tienda) {this.getProductosTienda();}
    if(this.distri){this.getProductosDistribuidor();}
    if(this.latam){this.getProductosLatam();}
    if(this.triwee){this.getProductosTriwee();}
    if(this.b2btri){this.getProductosB2B();}
  }

  UltPagBuscar(paginas:number){return Math.floor(paginas/100);}

  buscarProductos(){
    this.productos=null;
    this.toggleError=false;
    this.toggleNotFound=false;
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
      if (this.tienda) {dir="tienda";}
      if (this.distri) {dir="distribuidor";}
      if (this.latam) {dir="latam";}
      if (this.triwee) {dir="triwee";}
      if (this.b2btri) {dir="b2btri";}
      if(salida=="" || salida=="null"){
        console.log("No hay datos de Busqueda"); // Eliminar despues de terminar con las pruebas
        this.toggleBuscar=0;
      }else{
        this.productos="";
        this.pagina=0;
        this.servicio.buscarProductos(dir,salida).subscribe((resultado)=>{
          if(resultado!=null){
            this.productos=resultado;
            this.paginas=Object.values(resultado).length;
            console.log(resultado); // Eliminar despues de terminar con las pruebas
          }else{
            this.toggleNotFound=true;
          }
        })
      }
  }


  limpiarCampos(){
    this.searchMinId="";
    this.searchMaxId="";
    this.searchName="";
    this.searchRef="";
    this.searchActive="";
    
    if (this.tienda) {this.getProductosTienda()}
    if(this.distri){this.getProductosDistribuidor()}
    if(this.latam){this.getProductosLatam()}
    if(this.triwee){this.getProductosTriwee()}
    if(this.b2btri){this.getProductosB2B()}

    this.pagina=0;
    this.toggleBuscar=0;
  }
}
