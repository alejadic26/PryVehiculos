import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { Vehiculo } from '../../utilitarios/modulos/Vehiculo';
@Component({
  selector: 'app-PageVehiculoRegistro',
  templateUrl: './PageVehiculoRegistro.component.html',
  styleUrls: ['./PageVehiculoRegistro.component.css']
})

export class PageVehiculoRegistroComponent implements OnInit {
  formulario:FormGroup;
  constructor(
    private fb:FormBuilder,
    private vehiculoServicio: VehiculoService
  ){
    this.formulario=this.fb.group({
      "codigo":['',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(8)
        ],
      ],
      "marca":['',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.minLength(3)
      ],],
      
      "modelo":['',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
      ],],
      "kilometraje":['',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
        Validators.pattern(/^([0-9])*$/)
      ],],
      "precio":['',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10)
      ],],
      "imagen":['',
      [
        Validators.required,
        Validators.maxLength(100000)
      ],],
      "anio":['',
      [
        Validators.required,
        Validators.pattern(/^([0-9])*$/),
        Validators.maxLength(4)
      ],],
      "calificacion":['',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern(/^([0-9])*$/)
      ],],
    })
  }
  ngOnInit(){

  }
 /*guardar(){
    console.log(this.formulario)
    //let vehiculo:Vehiculo ={...this.formulario.value};
    //this.vehiculoServicio.addVehiculo(vehiculo);
    if(!this.formulario.valid){
      Swal.fire({
        title:"Mensaje",
        text:"Los datos son erroneos!",
        icon:"error"
      })
      return;
    }
    this.vehiculoServicio.addVehiculo({
      ...this.formulario.value,  
    });
    Swal.fire({
      title:"Mensaje",
      text:"Se grabó con éxito!",
      icon:"info"
    })*/

   guardar(){
    if(this.formulario.valid){
      this.vehiculoServicio.insertVehiculos({...this.formulario.value}).subscribe(
        respuesta =>{
          if(respuesta.codigo == '1'){
            Swal.fire({
              title:"Mensaje",
              text:"Se grabó con éxito!",
              icon:"info"
            }).then(res =>{
              this.formulario.reset();
            });
          }else{
            Swal.fire({
              title:"Mensaje",
              text:"No se pudo guardar con éxito: "+respuesta.mensaje,
              icon:"error"
            });
          }
        }
      );
    }else{
      Swal.fire({
        title:"Mensaje",
        text:"Falta llenar campos",
        icon:"error"
      });
    }
  }
    


/*export class PageVehiculoRegistroComponent implements OnInit {
  formulario:FormGroup;
  constructor(
    private vehiculoServicio: VehiculoService,
    private formBuilder:FormBuilder
  ) { 
 
    this.formulario=this.formBuilder.group({
      "codigo":[],
      "marca":[],
      "modelo":[],
      "anio":[],
      "color":[],
      "kilometraje":[],
      "precio":[],
      "calificacion":[],
      "imagen":[]
    });
  }

  ngOnInit() {
  }

  guardar(){
   let vehiculo:Vehiculo ={...this.formulario.value};
    this.vehiculoServicio.addVehiculo(vehiculo);
    Swal.fire({
      title:"Mensaje",
      text:"Se grabó con éxito!",
      icon:"info"
    })
  }*/
}

