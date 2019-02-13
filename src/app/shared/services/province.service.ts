import { Injectable } from '@angular/core';
import { HttpUtils } from '../utils/http.util';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/config/app.config';

@Injectable({
    providedIn: 'root'
})
export class ProvinceService {
    constructor(private httpClient: HttpUtils) { }

    getAll(): Observable<any> {
        return this.httpClient.get(AppConfig.endpoints.province);
    }
}
