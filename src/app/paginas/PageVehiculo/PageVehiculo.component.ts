import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../utilitarios/modulos/Vehiculo';
import { ActivatedRoute } from '@angular/router';
import { VehiculoService } from '../../servicios/Vehiculo.service';


@Component({
  selector: 'app-PageVehiculo',
  templateUrl: './PageVehiculo.component.html',
  styleUrls: ['./PageVehiculo.component.css']
})
export class PageVehiculoComponent implements OnInit {

  vehiculo?:Vehiculo={
    codigo:"",
    marca:"",
    modelo:"",
    anio:0,
    color:"",
    kilometraje:"",
    precio:0,
    calificacion:0,
    imagen:""

  };
 
  listaVehiculos:Array<any>=[];

  constructor(
    private route: ActivatedRoute,
    private vehiculoService:VehiculoService) {
    
   }
  
  ngOnInit() {
    /*this.route.params.subscribe(params =>{
      this.vehiculoService.getVehiculo(params['codigo']).subscribe(data =>{
        this.vehiculo=data;
      })
   
    }*/
    
    this.route.params.subscribe(params =>{
      this.vehiculoService.getVehiculo(params['codigo']).subscribe(data =>{
        this.vehiculo=data.data;
      })
   
    }
    );
  }

}
