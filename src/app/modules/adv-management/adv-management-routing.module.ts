import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvManagementMainComponent } from './pages/adv-management-main/adv-management-main.component';
import { AdvManagementDetailComponent } from './pages/adv-management-detail/adv-management-detail.component';
import { AdvManagementComponent } from './adv-management.component';

const routes: Routes = [
  {
    path: '',
    component: AdvManagementComponent,
    children: [
      {
        path: '',
        component: AdvManagementMainComponent,
        pathMatch: 'full',
        data: {
          breadcrumb: 'Quản lý địa điểm'
        }
      },
      {
        path: 'create',
        component: AdvManagementDetailComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: AdvManagementDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvManagementRoutingModule { }
