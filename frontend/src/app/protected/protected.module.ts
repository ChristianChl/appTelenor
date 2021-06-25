import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { ZorroModule } from '../zorro/zorro.module';
import { FormUsuarioComponent } from './pages/form-usuarios/form-usuario.component';
import { UsuariosComponent } from './pages/list-usuarios/usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormTipoDocumentoComponent } from './pages/form-tipo-documento/form-tipo-documento.component';
import { FormPerfilComponent } from './pages/form-perfil/form-perfil.component';
import { FormCategoriaComponent } from './pages/form-categoria/form-categoria.component';
import { ListCategoriaComponent } from './pages/list-categoria/list-categoria.component';
import { ListMarcaComponent } from './pages/list-marca/list-marca.component';
import { FormMarcaComponent } from './pages/form-marca/form-marca.component';
import { ListMedidaComponent } from './pages/list-medida/list-medida.component';
import { FormMedidaComponent } from './pages/form-medida/form-medida.component';
import { ListTipoProductoComponent } from './pages/list-tipo-producto/list-tipo-producto.component';
import { FormTipoProductoComponent } from './pages/form-tipo-producto/form-tipo-producto.component';
import { ListProductoComponent } from './pages/list-producto/list-producto.component';
import { FormProductoComponent } from './pages/form-producto/form-producto.component';
import { ListProveedorComponent } from './pages/list-proveedor/list-proveedor.component';
import { FormProveedorComponent } from './pages/form-proveedor/form-proveedor.component';
import { FilterPipe } from './pipes/filter-usuario.pipe';
import { FilterProveedorPipe } from './pipes/filter-proveedor.pipe';
import { ListPerfilComponent } from './pages/list-perfil/list-perfil.component';
<<<<<<< HEAD
import { ListClienteComponent } from './pages/list-cliente/list-cliente.component';
import { FormClienteComponent } from './pages/form-cliente/form-cliente.component';
=======
import { FilterPerfilPipe } from './pipes/filter-perfil.pipe';
import { ListTipoDocumentoComponent } from './pages/list-tipo-documento/list-tipo-documento.component';
import { FilterTipoDocumentoPipe } from './pipes/filter-tipo-documento.pipe';
>>>>>>> 78c8c7329817a1ee3b2a1a1f8be199d57b1481fa



@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    FormUsuarioComponent,
    FormTipoDocumentoComponent,
    FormPerfilComponent,
    FormCategoriaComponent,
    ListCategoriaComponent,
    ListMarcaComponent,
    FormMarcaComponent,
    ListMedidaComponent,
    FormMedidaComponent,
    ListTipoProductoComponent,
    FormTipoProductoComponent,
    ListProductoComponent,
    FormProductoComponent,
    ListProveedorComponent,
    FormProveedorComponent,
    FilterPipe,
    FilterProveedorPipe,
    ListPerfilComponent,
<<<<<<< HEAD
    ListClienteComponent,
    FormClienteComponent
=======
    FilterPerfilPipe,
    ListTipoDocumentoComponent,
    FilterTipoDocumentoPipe
>>>>>>> 78c8c7329817a1ee3b2a1a1f8be199d57b1481fa
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ZorroModule,
    ReactiveFormsModule,
    FormsModule,
    ProtectedRoutingModule
  ],
  entryComponents: [
    FormUsuarioComponent
  ]
})
export class ProtectedModule { }
