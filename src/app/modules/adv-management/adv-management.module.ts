import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvManagementRoutingModule } from './adv-management-routing.module';
import { AdvManagementMainComponent } from './pages/adv-management-main/adv-management-main.component';
import { AdvManagementDetailComponent } from './pages/adv-management-detail/adv-management-detail.component';
import { AdvManagementComponent } from './adv-management.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AdvManagementMainComponent,
    AdvManagementDetailComponent,
    AdvManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdvManagementRoutingModule
  ],
  exports: [
    AdvManagementRoutingModule
  ]
})
export class AdvManagementModule { }
