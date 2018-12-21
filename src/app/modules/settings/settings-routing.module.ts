import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsMainComponent } from './pages/settings-main/settings-main.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
