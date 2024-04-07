import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { ActivatedRoute } from '@angular/router';
import { Vehiculo } from '../../utilitarios/modulos/Vehiculo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PageEditarVehiculo',
  templateUrl: './PageEditarVehiculo.component.html',
  styleUrls: ['./PageEditarVehiculo.component.css']
})
export class PageEditarVehiculoComponent implements OnInit {

  vehiculo?:Vehiculo;
  formularioEdita:FormGroup;
  constructor(
    private activatedroute: ActivatedRoute,
    private vehiculoService:VehiculoService,
    private fbEditar:FormBuilder,) {
      this.formularioEdita=fbEditar.group({
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
      });
      this.formularioEdita.controls['codigo'].disable();
   }
  
  ngOnInit() {
    this.activatedroute.params.subscribe(params =>{
      this.vehiculoService.getVehiculo(params['codigo']).subscribe(data =>{
        if(data.codigo =='1'){
          this.vehiculo=data.data;
          this.formularioEdita.controls['codigo'].setValue(this.vehiculo?.codigo);
        this.formularioEdita.controls['marca'].setValue(this.vehiculo?.marca);
        this.formularioEdita.controls['modelo'].setValue(this.vehiculo?.modelo);
       //this.formularioEdita.controls['color'].setValue(this.vehiculo?.color);
        this.formularioEdita.controls['anio'].setValue(this.vehiculo?.anio);
        this.formularioEdita.controls['kilometraje'].setValue(this.vehiculo?.kilometraje);
        this.formularioEdita.controls['precio'].setValue(this.vehiculo?.precio);
        this.formularioEdita.controls['calificacion'].setValue(this.vehiculo?.calificacion);
        this.formularioEdita.controls['imagen'].setValue(this.vehiculo?.imagen);
        }else{
          Swal.fire({
            title:"Mensaje de Alerta",
            text:"No se pudo cargar la información!",
            icon:"error"
          })
        }
        
        
      });
   
    });

    
  }
  guardarEditado(){
    console.log(this.formularioEdita)
    //let vehiculo:Vehiculo ={...this.formulario.value};
    //this.vehiculoServicio.addVehiculo(vehiculo);
    /*if(!this.formularioEdita.valid){
      Swal.fire({
        title:"Mensaje",
        text:"Los datos son erroneos!",
        icon:"error"
      })
      return;
    }
    this.vehiculoService.insertVehiculos({
      ...this.formularioEdita.value,
     
    });
    Swal.fire({
      title:"Mensaje",
      text:"Se grabó con éxito!",
      icon:"info"
    })*/
    if(this.formularioEdita.valid){
      this.vehiculoService.actualizarVehiculo({...this.formularioEdita.value},this.formularioEdita.controls['codigo'].value).subscribe(data=>{
        if(data.codigo=='1'){
          Swal.fire({
            title:"Mensaje",
            text:"Se actualizó con éxito!",
            icon:"info"
          }).then(res =>{
            this.formularioEdita.reset();
          });
        }
      });
    }else{
      Swal.fire({
        title:"Mensaje",
        text:"Faltan LLenar campos!",
        icon:"error"
      });
    }
  }
}
