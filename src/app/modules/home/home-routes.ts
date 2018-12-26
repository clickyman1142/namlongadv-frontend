import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AppConfig } from 'src/app/config/app.config';
import { AuthGuard } from '../authorize/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                redirectTo: AppConfig.routes.advManagement,
                pathMatch: 'full',
            },
            {
                path: AppConfig.routes.advManagement,
                loadChildren: '../adv-management/adv-management.module#AdvManagementModule',
                canActivate: [ AuthGuard ]
            },
            {
                path: AppConfig.routes.companyManagement,
                loadChildren: '../company-management/company-management.module#CompanyManagementModule'
            },
            {
                path: AppConfig.routes.customerManagement,
                loadChildren: '../customer-management/customer-management.module#CustomerManagementModule'
            },
            {
                path: AppConfig.routes.userManagement,
                loadChildren: '../user-management/user-management.module#UserManagementModule'
            },
            {
                path: AppConfig.routes.settings,
                loadChildren: '../settings/settings.module#SettingsModule'
            }
        ]
    }
];
export const HomeRoutes = RouterModule.forChild(routes);
