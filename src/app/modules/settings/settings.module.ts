import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsMainComponent } from './pages/settings-main/settings-main.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SettingsMainComponent],
  imports: [
    CommonModule,
    SharedModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
