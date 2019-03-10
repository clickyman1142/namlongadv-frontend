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
        // Process images list
        advert.imageMeta = [];
        advert.images.forEach((image, index) => {
            advert.imageMeta.push({
                weight: index,
                selected: image.selected
            });
            if (image.file) { // New file
                image = image.file;
            } else {
                image = JSON.stringify(image);
            }
            formData.set(`images[${index}]`, image);
        });
        formData.delete('images');
        formData.set('imageMeta', JSON.stringify(advert.imageMeta));
        // Process map
        if (advert.map) {
            formData.set('map', advert.map.file ? advert.map.file : JSON.stringify({url: advert.map.url}));
        } else {
            formData.delete('map');
        }
        return this.httpClient.post(AppConfig.endpoints.advert, formData);
    }

    findById(advId) {
        return this.httpClient.get(`${AppConfig.endpoints.advert}/${advId}`);
    }

    deleteById(advId) {
        return this.httpClient.delete(`${AppConfig.endpoints.advert}/${advId}`);
    }

    getChangeHistory(advId) {
        return this.httpClient.get(`${AppConfig.endpoints.advertHistory}/${advId}`);
    }

    checkPublished(publishedId) {
        return this.httpClient.get(`${AppConfig.endpoints.billBoard}/${publishedId}`);
    }

    updatePublication(publishedId, data) {
        const params = Object.keys(data).map(key => `${key}=${data[key]}`).join('&');
        return this.httpClient.get(`${AppConfig.endpoints.billBoard}/${publishedId}?${params}`);
    }

    createPublication(data) {
        return this.httpClient.post(`${AppConfig.endpoints.billBoard}`, data);
    }

    unpublish(publishedId) {
        return this.httpClient.delete(`${AppConfig.endpoints.billBoard}/${publishedId}`);
    }
}
