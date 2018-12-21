import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyManagementMainComponent } from './pages/company-management-main/company-management-main.component';
import { CompanyManagementComponent } from './company-management.component';
import { CompanyManagementDetailComponent } from './pages/company-management-detail/company-management-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyManagementComponent,
    children: [
      {
        path: '',
        component: CompanyManagementMainComponent
      },
      {
        path: 'create',
        component: CompanyManagementDetailComponent
      },
      {
        path: ':id',
        component: CompanyManagementDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyManagementRoutingModule { }
