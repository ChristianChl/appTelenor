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
import { ValidarPermisoMaestroGuard } from '../guards/validar-permiso-maestro.guard';

import { ValidarPermisoConfiguracionGuard } from '../guards/validar-permiso-configuracion.guard';
import { ErrorAcessoComponent } from './pages/error-acesso/error-acesso.component';

import { ListCotizacionComponent } from './pages/list-cotizacion/list-cotizacion.component';
import { HomeComponent } from './pages/home/home.component';
import { ReporteProductosComponent } from './pages/reporte-productos/reporte-productos.component';
import { ReporteVentasComponent } from './pages/reporte-ventas/reporte-ventas.component';
import { KardexComponent } from './pages/kardex/kardex.component';
import { PreciosProductosComponent } from './pages/precios-productos/precios-productos.component';
import { ValidarPermisoAlmacenGuard } from '../guards/validar-permiso-almacen.guard';
import { ValidarPermisoComprasGuard } from '../guards/validar-permiso-compras.guard';
import { ValidarPermisoVentasGuard } from '../guards/validar-permiso-ventas.guard';
import { ValidarPermisoPreciosGuard } from '../guards/validar-permiso-precios.guard';
import { ValidarPermisoClientProvGuard } from '../guards/validar-permiso-client-prov.guard';
import { ValidarPermisoReportesGuard } from '../guards/validar-permiso-reportes.guard';
import { BuscarIngresosComponent } from './pages/buscar-ingresos/buscar-ingresos.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
      {
        path: 'listaUsuarios',
        canActivate: [ValidarPermisoConfiguracionGuard ],
        component: UsuariosComponent,
      },
      {
        path: 'listaPerfil',
        canActivate: [ValidarPermisoConfiguracionGuard ],
        component: ListPerfilComponent,
      },
      {
        path: 'listaPermiso',
        canActivate: [ValidarPermisoConfiguracionGuard ],
        component: ListPermisoComponent,
      },
      {
        path: 'errorAcesso',
        component: ErrorAcessoComponent
      },
      {
        path: 'listaTipoDocumento',
        canActivate: [ ValidarPermisoMaestroGuard ],
        component: ListTipoDocumentoComponent
      },
      {
        path: 'listaCategoria',
        canActivate: [ ValidarPermisoMaestroGuard ],
        component: ListCategoriaComponent
      },
      {
        path: 'listaMarca',
        canActivate: [ ValidarPermisoMaestroGuard ],
        component: ListMarcaComponent
      },
      {
        path: 'listaMedida',
        canActivate: [ ValidarPermisoMaestroGuard ],
        component: ListMedidaComponent
      },
      {
        path: 'listaTipoProducto',
        canActivate: [ValidarPermisoAlmacenGuard],
        component: ListTipoProductoComponent
      },
      {
        path: 'listaProducto',
        canActivate: [ValidarPermisoAlmacenGuard],
        component: ListProductoComponent
      },
      {
        path: 'kardex',
        canActivate: [ValidarPermisoAlmacenGuard],
        component: KardexComponent
      },
      {
        path: 'buscarCompras',
        canActivate: [ValidarPermisoAlmacenGuard],
        component: BuscarIngresosComponent
      },
      {
        path: 'listaIngreso',
        canActivate: [ValidarPermisoComprasGuard],
        component: ListIngresoComponent
      },
      {
        path: 'agregarIngreso',
        canActivate: [ValidarPermisoComprasGuard],
        component: FormIngresoComponent
      },
      {
        path: 'listaVentas',
        canActivate: [ValidarPermisoVentasGuard],
        component: ListVentasComponent
      },
      {
        path: 'agregarVenta',
        canActivate: [ValidarPermisoVentasGuard],
        component: FormVentasComponent
      },
      {
        path: 'listaCotizaciones',
        canActivate: [ValidarPermisoVentasGuard],
        component: ListCotizacionComponent
      },
      {
        path: 'precioProductos',
        canActivate: [ValidarPermisoPreciosGuard],
        component: PreciosProductosComponent
      },
      {
        path: 'listaCliente',
        canActivate: [ValidarPermisoClientProvGuard],
        component: ListClienteComponent
      },
      {
        path: 'listaProveedor',
        canActivate: [ValidarPermisoClientProvGuard],
        component: ListProveedorComponent
      },
      {
        path: 'graficas',
        component: HomeComponent
      },
      {
        path: 'reporteProducto',
        canActivate: [ValidarPermisoReportesGuard],
        component: ReporteProductosComponent
      },
      {
        path: 'reporteVenta',
        canActivate: [ValidarPermisoReportesGuard],
        component: ReporteVentasComponent
      },
      {
        path: '**',
        redirectTo: 'dashboard/graficas'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
