import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerManagementRoutingModule } from './customer-management-routing.module';
import { CustomerManagementMainComponent } from './pages/customer-management-main/customer-management-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerManagementComponent } from './customer-management.component';
import { CustomerManagementDetailComponent } from './pages/customer-management-detail/customer-management-detail.component';

@NgModule({
  declarations: [
    CustomerManagementComponent,
    CustomerManagementMainComponent,
    CustomerManagementDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomerManagementRoutingModule
  ]
})
export class CustomerManagementModule { }
