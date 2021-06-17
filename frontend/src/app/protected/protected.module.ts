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


@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    FormUsuarioComponent,
    FormTipoDocumentoComponent,
    FormPerfilComponent
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
