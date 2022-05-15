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
  @Input() markers: any = [];

  previous;

  constructor(
    private geoLocationService: GeoLocationService,
    private spinner: Spinner,
    private locationService: LocationService
  ) { }

  private getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
  }

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
      // this.markers = rs;
      for (let i = 0; i < 1000; i++) {
        this.markers.push({
          longitude: this.getRandomInRange(-180, 180, 8),
          latitude: this.getRandomInRange(-180, 180, 8),
          advId: 1234,
          avatar: {
            url: 'https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_1280.jpg',
            scaledSize: {
              width: 40,
              height: 40
            }
          }
        });
      }
      // this.markers.splice(0, 3500);
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
