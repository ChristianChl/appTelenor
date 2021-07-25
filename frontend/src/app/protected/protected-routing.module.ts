import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListCategoriaComponent } from './pages/list-categoria/list-categoria.component';
import { ListClienteComponent } from './pages/list-cliente/list-cliente.component';
import { ListMarcaComponent } from './pages/list-marca/list-marca.component';
import { ListMedidaComponent } from './pages/list-medida/list-medida.component';
import { ListPerfilComponent } from './pages/list-perfil/list-perfil.component';
import { ListProductoComponent } from './pages/list-producto/list-producto.component';
import { ListProveedorComponent } from './pages/list-proveedor/list-proveedor.component';

import { ListTipoProductoComponent } from './pages/list-tipo-producto/list-tipo-producto.component';
import { UsuariosComponent } from './pages/list-usuarios/usuarios.component';
import { ListTipoDocumentoComponent } from './pages/list-tipo-documento/list-tipo-documento.component';
import { FormIngresoComponent } from './pages/form-ingreso/form-ingreso.component'
import { ListPermisoComponent } from './pages/list-permiso/list-permiso.component';
import { ListIngresoComponent } from './pages/list-ingreso/list-ingreso.component';

import { FormVentasComponent } from './pages/form-ventas/form-ventas.component';
import { ListVentasComponent } from './pages/list-ventas/list-ventas.component';

import { ValidarPermisoConfiguracionGuard } from '../guards/validar-permiso-configuracion.guard';
import { ErrorAcessoComponent } from './pages/error-acesso/error-acesso.component';

import { ListCotizacionComponent } from './pages/list-cotizacion/list-cotizacion.component';
import { HomeComponent } from './pages/home/home.component';
import { ReporteProductosComponent } from './pages/reporte-productos/reporte-productos.component';
import { ReporteVentasComponent } from './pages/reporte-ventas/reporte-ventas.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
      {
        path: 'listaUsuarios',
        component: UsuariosComponent,
        // canActivate: [ ValidarPermisoConfiguracionGuard ],
        // canLoad: [ ValidarPermisoConfiguracionGuard ]
      },
      {
        path: 'listaPerfil',
        component: ListPerfilComponent,
        // canActivate: [ ValidarPermisoConfiguracionGuard ],
        // canLoad: [ ValidarPermisoConfiguracionGuard ]
      },
      {
        path: 'listaPermiso',
        component: ListPermisoComponent,
        // canActivate: [ ValidarPermisoConfiguracionGuard ],
        // canLoad: [ ValidarPermisoConfiguracionGuard ]
      },
      {
        path: 'errorAcesso',
        component: ErrorAcessoComponent
      },
      {
        path: 'listaTipoDocumento',
        component: ListTipoDocumentoComponent
      },
      {
        path: 'listaCategoria',
        component: ListCategoriaComponent
      },
      {
        path: 'listaMarca',
        component: ListMarcaComponent
      },
      {
        path: 'listaMedida',
        component: ListMedidaComponent
      },
      {
        path: 'listaTipoProducto',
        component: ListTipoProductoComponent
      },
      {
        path: 'listaProducto',
        component: ListProductoComponent
      },
      {
        path: 'listaProveedor',
        component: ListProveedorComponent
      },
      {
        path: 'listaCliente',
        component: ListClienteComponent
      },
      {
        path: 'agregarIngreso',
        component: FormIngresoComponent
      },
      {
        path: 'listaIngreso',
        component: ListIngresoComponent
      },
      {
        path: 'agregarVenta',
        component: FormVentasComponent
      },
      {
        path: 'listaVentas',
        component: ListVentasComponent
      },
      {
        path: 'listaCotizaciones',
        component: ListCotizacionComponent
      },
      {
        path: 'graficas',
        component: HomeComponent
      },
      {
        path: 'reporteProducto',
        component: ReporteProductosComponent
      },
      {
        path: 'reporteVenta',
        component: ReporteVentasComponent
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
