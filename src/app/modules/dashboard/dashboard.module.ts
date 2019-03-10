import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MapComponent } from './components/map/map.component';
import { DashboardRoutes } from './dashboard-routes';
import { AgmCoreModule } from '@agm/core';
import { GeoLocationService } from 'src/app/shared/utils/geo-location.service';
import { LocationService } from './shared/location.service';

@NgModule({
  declarations: [
    DashboardComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutes,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU'
    })
  ],
  providers: [
    GeoLocationService,
    LocationService
  ]
})
export class DashboardModule { }
