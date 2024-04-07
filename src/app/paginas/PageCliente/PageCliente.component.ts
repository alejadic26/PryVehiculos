import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { Cliente } from '../../utilitarios/modulos/Clientes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-PageCliente',
  templateUrl: './PageCliente.component.html',
  styleUrls: ['./PageCliente.component.css']
})
export class PageClienteComponent implements OnInit {
  public rows:number=25;
  public page:number=1;
  public pages:number=0

  constructor(
   private route: ActivatedRoute,
    private vehiculoService:VehiculoService
  ) { 
   
  }

  ngOnInit() {
   this.consultarCliente();

   }

   @Input() valor:string='';
   listaClientes:Array<any>=[];

consultarCliente(){
  this.vehiculoService.getClientes(this.rows,this.page).subscribe(respuestacli =>{
   
      //this.listaClientes=respuestacli;
      //console.log(respuestacli);
      if(respuestacli.codigo =='1'){
        this.listaClientes=respuestacli.data;
        this.pages=respuestacli.pages;
        this.paginarcli(respuestacli.pages)
      }
   });
}
cambiarPaginaCliente(pagina:number){
  this.page=pagina;
  this.consultarCliente();
}

listaPaginasCliente:Array<number>=[];
paginarcli(pages:number){
  this.listaPaginasCliente=[];
  for(let i=1;i<=pages;i++){
    this.listaPaginasCliente.push(i);
  }
}
siguienteCliente(){
  if(this.page<this.pages){
    this.page++;
    this.consultarCliente();
  }
}

atrasCliente(){
  if(this.page>1){
    this.page--;
    this.consultarCliente();
  }
}

eliminarCli(codigo:string){
  Swal.fire({
    title:"Estas seguro que deseas eliminar este cliente?",
    showCancelButton:true,
    confirmButtonText:"Si",
    cancelButtonText:"No",
    icon:"question"
  }).then((res)=>{
    if(res.isConfirmed){
      this.vehiculoService.eliminarCliente(codigo).subscribe(data =>{
        if(data.codigo=='1'){
          this.consultarCliente();
          Swal.fire({
            title:"Mensaje",
            text:"Cliente Eliminado con éxito!",
            icon:"success"
          });
        }
      });
    }
  }

  );
 }
recepcioncli(dato:string){

}
}
