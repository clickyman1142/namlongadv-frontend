import { Injectable } from '@angular/core';
import { HttpUtils } from 'src/app/shared/utils/http.util';
import { AppConfig } from 'src/app/config/app.config';

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    constructor(private httpClient: HttpUtils) {}

    getAdvPosition() {
        return this.httpClient.get(`${AppConfig.endpoints.appConfig}/ADV_POSITION`);
    }
}
