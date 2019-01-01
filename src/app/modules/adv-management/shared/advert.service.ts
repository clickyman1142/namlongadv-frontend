import { Injectable } from '@angular/core';
import { AdvertSearchForm } from 'src/app/shared/models/advert-search-form';
import { HttpUtils } from 'src/app/shared/utils/http.util';
import { AppConfig } from 'src/app/config/app.config';

@Injectable({
    providedIn: 'root'
})
export class AdvertService {
    constructor(private httpClient: HttpUtils) {}

    getAll(searchForm: AdvertSearchForm) {
        return this.httpClient.post(`${AppConfig.endpoints.advert}/search`, searchForm);
    }
}
