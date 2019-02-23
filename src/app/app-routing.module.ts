import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConfig } from './config/app.config';

const routes: Routes = [
  {
    path: AppConfig.routes.home,
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: AppConfig.routes.login,
    loadChildren: './modules/authorize/authorize.module#AuthorizeModule'
  },
  {
    path: AppConfig.routes.error404,
    loadChildren: './shared/pages/error404/error404.module#Error404Module'
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: true })
  ],
  exports: [
    RouterModule
  ],
  // providers: [AuthGuard]
})
export class AppRoutingModule {

}
