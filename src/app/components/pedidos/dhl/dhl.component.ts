import { Component, OnInit } from '@angular/core';
import { __param } from 'tslib';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebaseApp from 'src/app/components/utils/credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FormBuilder, FormGroup } from '@angular/forms';



const firestore = getFirestore(firebaseApp);

@Component({
  selector: 'app-dhl',
  templateUrl: './dhl.component.html',
  styleUrls: ['./dhl.component.css']
})
export class DhlComponent implements OnInit {
  formDhl: FormGroup;
  controlCotizaciones: FormGroup;


  aduanas = 10;
  costPallet = 185;
  extraFuel = 0.3275;
  pallet = 0;
  transport = 0;
  fuel = 0;
  risk = 0;
  overheight = 0;
  emergency = 0;
  totIva = 0;
  desglose = 0;
  totReal = 0;
  price = 0;
  articulo = 'DHL';
  origen = 'JAEN';
  nombre = 'null';
  fecha = 'null';
  numRef = 'null';
  totalPrecio = 0;
  destino = 'JAEN';
  observacion = 'null';

  constructor(private formulario: FormBuilder, private dhlInfo: FormBuilder) {

    this.formDhl = this.formulario.group({
      pallet: [''],
      transport: [''],
      fuel: [''],
      risk: [''],
      overheight: [''],
      emergency: ['']
    })

    this.controlCotizaciones = this.dhlInfo.group({
      nombre: [''],
      fecha: [''],
      numRef: [''],
      totalPrecio: [''],
      origen: [''],
      destino: [''],
      observacion: ['']
    })
  }

  Operacion() {
    this.pallet = this.formDhl.value.pallet;
    this.transport = this.formDhl.value.transport;
    this.fuel = this.formDhl.value.fuel;
    this.risk = this.formDhl.value.risk;
    this.overheight = this.formDhl.value.overheight;
    this.emergency = this.formDhl.value.emergency;

    this.totIva = this.formDhl.value.transport + this.formDhl.value.fuel + this.formDhl.value.risk + this.formDhl.value.overheight + this.formDhl.value.emergency;
    this.desglose = this.transport + this.risk + this.overheight + this.emergency + (this.pallet * this.costPallet) + this.aduanas;
    this.totReal = this.desglose + this.fuel + (this.fuel * this.extraFuel);

    if (this.totReal < 500) {
      this.price = this.totReal * 1.12;
    }
    else if (this.totReal < 1000) {
      this.price = this.totReal * 1.1;
    }
    else if (this.totReal < 1500) {
      this.price = this.totReal * 1;
    }
    else {
      this.price = this.totReal * 0.5;
    }

  }

  enviarCotizacion() {

    this.nombre = this.controlCotizaciones.value.nombre;
    // this.fecha = this.controlCotizaciones.value.fecha;
    this.numRef = this.controlCotizaciones.value.numRef;
    this.totalPrecio = this.price;
    this.origen = this.controlCotizaciones.value.origen;
    this.destino = this.controlCotizaciones.value.destino;
    this.observacion = this.controlCotizaciones.value.observacion;
    const fechaCotizacion = new Date();

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {



        // Registro de datos en el Usuario

        var id = user.uid;
        var ref = this.numRef;

        const idFinal = id + "-" + ref + "-" + fechaCotizacion ;

        const docuRef = doc(firestore, `cotizaciones/${idFinal}`);

        setDoc(docuRef, { nombre: this.nombre, fecha: fechaCotizacion, referencia: this.numRef, precio: this.totalPrecio, origen: this.origen, destino: this.destino, observaciones: this.observacion });

      }
    });
  }

  ngOnInit(): void {

  }
}
