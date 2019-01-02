import { Injectable } from '@angular/core';
import { SearchForm } from 'src/app/shared/models/search-form';
import { HttpUtils } from 'src/app/shared/utils/http.util';
import { AppConfig } from 'src/app/config/app.config';

@Injectable({
    providedIn: 'root'
})
export class AdvertService {
    constructor(private httpClient: HttpUtils) {}

    getAll(filter: SearchForm[], page: number, size: number) {
        const options = {
            params: {
                page,
                size,
                filter: JSON.stringify(filter)
            }
        };
        return this.httpClient.get(`${AppConfig.endpoints.advert}/search`, options);
    }
}
