import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormUsuarioComponent } from './pages/form-usuarios/form-usuario.component';
import { ListCategoriaComponent } from './pages/list-categoria/list-categoria.component';
import { ListMarcaComponent } from './pages/list-marca/list-marca.component';
import { ListMedidaComponent } from './pages/list-medida/list-medida.component';
import { ListProductoComponent } from './pages/list-producto/list-producto.component';
import { ListTipoProductoComponent } from './pages/list-tipo-producto/list-tipo-producto.component';
import { UsuariosComponent } from './pages/list-usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
      {
        path: 'listaUsuarios',
        component: UsuariosComponent,
      },
      {
        path: 'agregarUsuarios',
        component: FormUsuarioComponent,
      },
      {
        path: 'editarUsuarios',
        component: FormUsuarioComponent,
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
