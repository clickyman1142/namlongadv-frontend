import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementMainComponent } from './pages/user-management-main/user-management-main.component';
import { UserManagementDetailComponent } from './pages/user-management-detail/user-management-detail.component';
import { UserManagementComponent } from './user-management.component';

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    children: [
      {
        path: '',
        component: UserManagementMainComponent
      },
      {
        path: 'create',
        component: UserManagementDetailComponent
      },
      {
        path: ':id',
        component: UserManagementDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
