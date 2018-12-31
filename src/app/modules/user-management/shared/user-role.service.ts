import { HttpUtils } from 'src/app/shared/utils/http.util';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/config/app.config';

@Injectable({
    providedIn: 'root'
})
export class UserRoleService {
    constructor(private httpClient: HttpUtils) {
    }

    getAll() {
        return this.httpClient.get(AppConfig.endpoints.userRole);
    }
}
