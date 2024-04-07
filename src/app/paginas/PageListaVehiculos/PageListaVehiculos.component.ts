import { Component, Input, OnInit } from '@angular/core';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PageListaVehiculos',
  templateUrl: './PageListaVehiculos.component.html',
  styleUrls: ['./PageListaVehiculos.component.css']
})
export class PageListaVehiculosComponent implements OnInit {
  mostrarImagen=false;
  //filtro:string="";
  //private _filtro:string="";
  public filtro:string="";
  public rows:number=10;
  public page:number=1;
  public pages:number=0
  /*get filtro(){
    return this._filtro
  }
  set filtro(filtro:string){
    this._filtro=filtro;
    //this.consulaVehiculos();
  }*/

  @Input() valor:string='';
  listaVehiculos:Array<any>=[];


  constructor(
    private vehiculoService:VehiculoService
  ) { 
   
  }

  ngOnInit() {
   this.consultarVehiculo();
  
   }
 mostrar(){
  this.mostrarImagen=!this.mostrarImagen
 }
consultarVehiculo(){
  this.vehiculoService.getVehiculos(this.filtro,this.rows,this.page).subscribe(respuesta =>{
    console.log(respuesta);
    if(respuesta.codigo =='1'){
      this.listaVehiculos=respuesta.data;
      this.pages=respuesta.pages;
      this.paginar(respuesta.pages)
    }

   });
}

cambiarPagina(pagina:number){
  this.page=pagina;
  this.consultarVehiculo();
}

listaPaginas:Array<number>=[];
paginar(pages:number){
  this.listaPaginas=[];
  for(let i=1;i<=pages;i++){
    this.listaPaginas.push(i);
  }
}

siguiente(){
  if(this.page<this.pages){
    this.page++;
    this.consultarVehiculo();
  }
}

atras(){
  if(this.page>1){
    this.page--;
    this.consultarVehiculo();
  }
}
 eliminar(codigo:string){
  Swal.fire({
    title:"Estas seguro que deseas eliminar?",
    showCancelButton:true,
    confirmButtonText:"Si",
    cancelButtonText:"No",
    icon:"question"
  }).then((res)=>{
    if(res.isConfirmed){
      this.vehiculoService.eliminarVehiculo(codigo).subscribe(data =>{
        if(data.codigo=='1'){
          this.consultarVehiculo();
          Swal.fire({
            title:"Mensaje",
            text:"Vehículo Eliminado con éxito!",
            icon:"success"
          });
        }
      });
    }
  }

  );
 }

 /*consulaVehiculos(){
 this.vehiculoService.getVehiculos(this.filtro).subscribe(data=>{
    this.listaVehiculos=data;
  });
 }*/

 recepcion(dato:number){

 }

}
