import { NgModule } from "@angular/core";
import { PageListaVehiculosComponent } from "./PageListaVehiculos/PageListaVehiculos.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UtilitariosModule } from "../utilitarios/UtilitariosModule";
import { PageVehiculoComponent } from "./PageVehiculo/PageVehiculo.component";
import { RouterModule } from "@angular/router";
import { PageVehiculoRegistroComponent } from "./PageVehiculoRegistro/PageVehiculoRegistro.component";
import { HomeComponent } from "./Home/Home.component";
import { PageEditarVehiculoComponent } from "./PageEditarVehiculo/PageEditarVehiculo.component";
import { PageClienteComponent } from "./PageCliente/PageCliente.component";
import { PageRegistroClienteComponent } from "./PageRegistroCliente/PageRegistroCliente.component";


@NgModule({
    declarations:[
        PageListaVehiculosComponent,
        PageVehiculoComponent,
        PageVehiculoRegistroComponent,
        HomeComponent,
        PageEditarVehiculoComponent,
        PageClienteComponent,
        PageRegistroClienteComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        UtilitariosModule,
        RouterModule,
        ReactiveFormsModule,
        
    ],
    exports:[
        PageListaVehiculosComponent,
        PageVehiculoComponent,
        PageVehiculoRegistroComponent,
        HomeComponent,
        PageEditarVehiculoComponent,
        PageClienteComponent,
        PageRegistroClienteComponent
    ]
})
export class PaginaModule{

}