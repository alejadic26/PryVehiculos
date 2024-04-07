import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/Home/Home.component';
import { PageListaVehiculosComponent } from './paginas/PageListaVehiculos/PageListaVehiculos.component';
import { PageNotFoundComponent } from './paginas/PageNotFound/PageNotFound.component';
import { PageVehiculoComponent } from './paginas/PageVehiculo/PageVehiculo.component';
import { PageVehiculoRegistroComponent } from './paginas/PageVehiculoRegistro/PageVehiculoRegistro.component';
import { PageEditarVehiculoComponent } from './paginas/PageEditarVehiculo/PageEditarVehiculo.component';
import { PageClienteComponent } from './paginas/PageCliente/PageCliente.component';
import { PageRegistroClienteComponent } from './paginas/PageRegistroCliente/PageRegistroCliente.component';

const routes: Routes = [
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"vehiculos",
    component:PageListaVehiculosComponent
  },
   {
    path:"vehiculo/:codigo",
    component:PageVehiculoComponent
  }, {
    path:"vehiculo",
    component:PageVehiculoRegistroComponent
  },
  {
    path:"vehiculoEdit/:codigo",
    component:PageEditarVehiculoComponent
  },
  {
    path:"clientes",
    component:PageClienteComponent
  },
  {
    path:"cliente",
    component:PageRegistroClienteComponent
  },
  {
    path:"",
    component:HomeComponent,
    pathMatch:"full"
  },
  {
    path:"**",
    component:PageNotFoundComponent,
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
