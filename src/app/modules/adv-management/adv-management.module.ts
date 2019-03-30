import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvManagementRoutingModule } from './adv-management-routing.module';
import { AdvManagementMainComponent } from './pages/adv-management-main/adv-management-main.component';
import { AdvManagementDetailComponent } from './pages/adv-management-detail/adv-management-detail.component';
import { AdvManagementComponent } from './adv-management.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProvinceService } from 'src/app/shared/services/province.service';
import { AgmCoreModule } from '@agm/core';
import { DeferLoadModule } from '@trademe/ng-defer-load';

@NgModule({
  declarations: [
    AdvManagementMainComponent,
    AdvManagementDetailComponent,
    AdvManagementComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdvManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU'
    }),
    DeferLoadModule
  ],
  exports: [
    AdvManagementRoutingModule
  ],
  providers: [
    ProvinceService
  ]
})
export class AdvManagementModule {
}
