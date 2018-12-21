import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementMainComponent } from './pages/user-management-main/user-management-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserManagementDetailComponent } from './pages/user-management-detail/user-management-detail.component';
import { UserManagementComponent } from './user-management.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    UserManagementMainComponent,
    UserManagementDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
