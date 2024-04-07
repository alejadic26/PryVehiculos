import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PageRegistroCliente',
  templateUrl: './PageRegistroCliente.component.html',
  styleUrls: ['./PageRegistroCliente.component.css']
})
export class PageRegistroClienteComponent implements OnInit {

  formularioCli:FormGroup;
  constructor(
    private fbcli:FormBuilder,
    private vehiculoServicio: VehiculoService
  ){
    this.formularioCli=this.fbcli.group({
      "id":['',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ],
      ],
      "nombre":['',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z]+$')
      ],],
      "apellido":['',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z]+$')
        ,
      ],],
      "password":['',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ],],
      "telefono":['',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(/^([0-9])*$/)
      ],],
      "email":['',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ],]
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

   guardarcli(){
    
    if(this.formularioCli.valid){
      this.vehiculoServicio.insertClientes({...this.formularioCli.value}).subscribe(
        respuestacli =>{
          console.log(respuestacli);
          if(respuestacli.codigo == '1'){
            console.log("lo que se guarda es:"+respuestacli);
            Swal.fire({
              title:"Mensaje",
              text:"Se grabó con éxito!",
              icon:"info"
            }).then(res =>{
              this.formularioCli.reset();
            });
            console.log("lo que se guarda es:"+respuestacli);
          }else{
  
            Swal.fire({
              title:"Mensaje",
              text:"No se pudo guardar con éxito: "+respuestacli.mensaje,
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




  
}
