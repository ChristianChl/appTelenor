import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import {ReactiveFormsModule} from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';


import { NzImageModule } from 'ng-zorro-antd/image';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { NzMessageModule } from 'ng-zorro-antd/message';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzListModule } from 'ng-zorro-antd/list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[

    NzTableModule,
    NzCardModule,
    NzIconModule,
    NzButtonModule,
    NzCardModule,
    NzToolTipModule,
    NzFormModule,
    NzInputModule,
    NzSwitchModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzSelectModule,
    NzModalModule,
    NzImageModule,
    NzMessageModule,
    NzSpaceModule,
    NzAutocompleteModule,
    NzAlertModule,
    NzCollapseModule,
    NzListModule
  ]
})
export class ZorroModule { }
