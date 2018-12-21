import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyManagementRoutingModule } from './company-management-routing.module';
import { CompanyManagementMainComponent } from './pages/company-management-main/company-management-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyManagementDetailComponent } from './pages/company-management-detail/company-management-detail.component';
import { CompanyManagementComponent } from './company-management.component';

@NgModule({
  declarations: [
    CompanyManagementComponent,
    CompanyManagementMainComponent,
    CompanyManagementDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CompanyManagementRoutingModule
  ]
})
export class CompanyManagementModule { }
