import { Component, OnInit, Input } from '@angular/core';
import { GeoLocationService } from 'src/app/shared/utils/geo-location.service';
import { Spinner } from 'src/app/shared/services/spinner.service';
import { LocationService } from '../../shared/location.service';
import { AppConfig } from 'src/app/config/app.config';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  baseUrl = AppConfig.endpoints.baseUrl;
  centerCoord: ICoord;
  @Input() markers = [];

  previous;

  constructor(
    private geoLocationService: GeoLocationService,
    private spinner: Spinner,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.centerCoord = JSON.parse(sessionStorage.getItem('position'));
    if (!this.centerCoord) {
      this.spinner.show();
      this.geoLocationService.getPosition().subscribe(rs => {
        this.centerCoord = {
          latitude: rs.coords.latitude,
          longitude: rs.coords.longitude
        } as ICoord;
        this.spinner.hide();
      });
    }

    this.spinner.show();
    this.locationService.getAdvPosition().subscribe(rs => {
      this.markers = rs;
      this.markers.splice(0, 3500);
      console.log(this.markers);
      this.spinner.hide();
    });
  }

  clickedMarker(infoWindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infoWindow;
  }

}

export interface ICoord {
  latitude: number;
  longitude: number;
}

export class IMarker implements ICoord {
  latitude: number;
  longitude: number;
  title: string;
  avatar: string;
  advId: string;
}
