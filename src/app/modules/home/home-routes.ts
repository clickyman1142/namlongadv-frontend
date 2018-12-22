import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                redirectTo: '/adv-management',
                pathMatch: 'full',
            },
            {
                path: 'adv-management',
                loadChildren: '../adv-management/adv-management.module#AdvManagementModule'
            },
            {
                path: 'company-management',
                loadChildren: '../company-management/company-management.module#CompanyManagementModule'
            },
            {
                path: 'customer-management',
                loadChildren: '../customer-management/customer-management.module#CustomerManagementModule'
            },
            {
                path: 'user-management',
                loadChildren: '../user-management/user-management.module#UserManagementModule'
            },
            {
                path: 'settings',
                loadChildren: '../settings/settings.module#SettingsModule'
            }
        ]
    }
];
export const HomeRoutes = RouterModule.forChild(routes);
