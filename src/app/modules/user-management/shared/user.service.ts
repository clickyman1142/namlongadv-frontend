import { HttpUtils } from 'src/app/shared/utils/http.util';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/config/app.config';
import { User } from '../pages/user-management-detail/user-management-detail.component';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private httpClient: HttpUtils) {
    }

    getAll(page: number, size: number) {
        return this.httpClient.get(AppConfig.endpoints.user);
    }

    getById(userId: string) {
        return this.httpClient.get(`${AppConfig.endpoints.user}/${userId}`);
    }

    create(user: User) {
        return this.httpClient.post(AppConfig.endpoints.user, user);
    }

    update(user: User) {
        return this.httpClient.put(AppConfig.endpoints.user, user);
    }

    delete(userId: string) {
        return this.httpClient.delete(`${AppConfig.endpoints.user}/${userId}`);
    }
}
