import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerManagementMainComponent } from './pages/customer-management-main/customer-management-main.component';
import { CustomerManagementComponent } from './customer-management.component';
import { CustomerManagementDetailComponent } from './pages/customer-management-detail/customer-management-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerManagementComponent,
    children: [
      {
        path: '',
        component: CustomerManagementMainComponent,
        data: {
          breadcrumb: 'Quản lý khách hàng'
        }
      },
      {
        path: 'create',
        component: CustomerManagementDetailComponent
      },
      {
        path: ':id',
        component: CustomerManagementDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }
