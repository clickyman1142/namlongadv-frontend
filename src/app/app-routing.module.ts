import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: 'login',
    loadChildren: './shared/pages/login/login.module#LoginModule'
  },
  // { path: AppConfig.routes.auth, loadChildren: './modules/authorize/authorize.module#AuthorizeModule' },
  // { path: AppConfig.routes.error404, loadChildren: './core/pages/error404/error404.module#Error404Module' },
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
