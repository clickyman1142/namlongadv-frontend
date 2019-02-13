import { HttpUtils } from 'src/app/shared/utils/http.util';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AutocompleteService {
    constructor(private httpClient: HttpUtils) {
    }

    filter(endpoint, filter) {
        const options = {
            params: {
                filter,
                page: 1,
                size: 10
            }
        };
        return this.httpClient.get(endpoint, options);
    }
}
