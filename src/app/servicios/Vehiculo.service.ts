import { Injectable } from '@angular/core';
import { Vehiculo } from '../utilitarios/modulos/Vehiculo';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { __param } from 'tslib';
import { Cliente } from '../utilitarios/modulos/Clientes';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

constructor(private http: HttpClient) {}
  baseUrl="http://www.epico.gob.ec/vehiculo/public/api/";
   httpOptions ={
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

  baseUrlCli="http://www.epico.gob.ec/vehiculo/public/api/";
  httpOptionsCli ={
   headers: new HttpHeaders({'Content-Type':'application/json'})
 };


/*getVehiculos(filtro:any):Observable<Array<Vehiculo>>{
    const escucha:Observable<Array<Vehiculo>> = new Observable(escuchando=>{
    let lista=this.listaVehiculos.filter(elem => elem.marca.toLowerCase().includes(filtro.toLowerCase()))
    escuchando.next(lista);
    });
    return escucha;
}*/

getVehiculos(filtro?:string, rows?:number,page?:number):Observable<Respuesta>{
    let body=new HttpParams();
    body = filtro ? body.set('filtro',filtro):body;
    body = rows ? body.set('rows',rows):body;
    body = page? body.set('page',page):body;
    /*return this.http.get<Respuesta>(this.baseUrl+"vehiculos/",{params:body}).pipe(
      map(respuesta => respuesta.data)
    );*/
    return this.http.get<Respuesta>(this.baseUrl+"vehiculos/",{params:body});
}

getClientes(rows?:number,page?:number):Observable<RespuestaCli>{
  let bodycli=new HttpParams();

  bodycli = rows ? bodycli.set('rows',rows):bodycli;
  bodycli = page? bodycli.set('page',page):bodycli;
 /* return this.http.get<RespuestaCli>(this.baseUrlCli+"clientes/",{params:bodycli}).pipe(
    map(respuestacli => respuestacli.data)
  );*/
  return this.http.get<RespuestaCli>(this.baseUrlCli+"clientes/",{params:bodycli});
}

insertVehiculos(vehiculo:Vehiculo){
  return this.http.post<Respuesta>(this.baseUrl+"vehiculo/",vehiculo, this.httpOptions);
}

insertClientes(cliente:Cliente){
  return this.http.post<RespuestaCli>(this.baseUrlCli+"cliente/",cliente, this.httpOptionsCli);
  console.log(this.httpOptionsCli);
}

getVehiculo(codigo:string){
  return this.http.get<Respuesta>(this.baseUrl+"vehiculo/"+codigo);
}

/*getCliente(codigo:string){
  return this.http.get<RespuestaCli>(this.baseUrl+"cliente/"+codigo);
}*/

actualizarVehiculo(vehiculo:Vehiculo,codigo:string){
  return this.http.put<Respuesta>(this.baseUrl+"vehiculo/"+codigo,vehiculo,this.httpOptions);
}

eliminarVehiculo(codigo:string){
    return this.http.delete<Respuesta>(this.baseUrl+"vehiculo/"+codigo);
}

eliminarCliente(codigo:string){
  return this.http.delete<Respuesta>(this.baseUrlCli+"cliente/"+codigo);
}

///

/*getVehiculo(codigo:string):Observable<Vehiculo|undefined>{
  const escucha:Observable<Vehiculo|undefined> = new Observable(escuchando=>{
  let vehiculo=this.listaVehiculos.find(ele => ele.codigo === codigo);
  escuchando.next(vehiculo);
  });
  return escucha;
}*/

getVehiculoDet(codigo:string){
  
}

/*addVehiculo(vehiculo:Vehiculo){
  this.listaVehiculos.push(vehiculo);
}


private listaVehiculos:Array<Vehiculo>=[
  {"codigo":"A001","marca":"BMW","modelo":"I-3","color":"Plateado","kilometraje":"35000","precio":27500,"imagen":"https://www.autofacil.es/wp-content/uploads/2021/05/BMW_I3-e1621030134902.jpg","anio":2012,"calificacion":4},
  {"codigo":"A002","marca":"Audi","modelo":"A4","color":"Rabbit","kilometraje":"25000","precio":27500,"imagen":"https://www.autofacil.es/wp-content/uploads/2022/06/Audi-A4-2020-1600-01-e1654974558624.jpg","anio":2016,"calificacion":5},
  {"codigo":"A003","marca":"Citroën","modelo":"C Crosser","color":"Negro","kilometraje":"15500","precio":27500,"imagen":"https://www.autofacil.es/wp-content/uploads/2021/07/citroen_c-crosser_65.jpg","anio":2018,"calificacion":1},
  {"codigo":"A004","marca":"Ford","modelo":"Focus","color":"Cafe","kilometraje":"5000","precio":22500,"imagen":"https://www.autofacil.es/wp-content/uploads/2021/05/FORD_FOCUS_2019-e1621156792322.jpg","anio":2022,"calificacion":4},
  {"codigo":"A005","marca":"Mazda","modelo":"3","color":"Rojo","kilometraje":"65000","precio":12500,"imagen":"https://www.autofacil.es/wp-content/uploads/2021/05/mazda3-skyactiv-xaction10.jpg","anio":2021,"calificacion":3},
  
];*/
}

export interface Respuesta{
  codigo:string;
  mensaje:string;
  data:any;
  rows:number;
  pages:number;
  records:number;
  page:number;
}

export interface RespuestaCli{
  codigo:string;
  mensaje:string;
  data:any;
  rows:number;
  pages:number;
  records:number;
  page:number;
}