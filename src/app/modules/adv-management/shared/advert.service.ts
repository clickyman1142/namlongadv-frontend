import { Injectable } from '@angular/core';
import { SearchForm } from 'src/app/shared/models/search-form';
import { HttpUtils } from 'src/app/shared/utils/http.util';
import { AppConfig } from 'src/app/config/app.config';
import { Advert } from '../pages/adv-management-detail/adv-management-detail.component';
import * as moment from 'moment';

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

    save(advert: Advert) {
        const formData = new FormData();
        Object.keys(advert).forEach(field => {
            let value = advert[field];
            if (value) {
                if (value instanceof moment) {
                    value = value.valueOf();
                }
                formData.append(field, value);
            }
        });
        advert.images.forEach((image, index) => {
            if (!(image instanceof File)) {
                image = JSON.stringify(image);
            }
            formData.set(`images[${index}]`, image);
        });
        return this.httpClient.post(AppConfig.endpoints.advert, formData);
    }

    findById(advId) {
        return this.httpClient.get(`${AppConfig.endpoints.advert}/${advId}`);
    }
}
