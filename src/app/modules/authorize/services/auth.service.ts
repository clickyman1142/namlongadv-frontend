import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { HttpUtils } from 'src/app/shared/utils/http.util';
import { AppConfig } from 'src/app/config/app.config';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private storage: LocalStorageService,
        private httpUtils: HttpUtils) {

    }

    isLegalAccount(): Observable<boolean> {
        const userInfo = this.storage.get('user_info');
        const accessToken = this.storage.get('access_token');
        const expiresIn = this.storage.get('expires_in');
        let isLegalAccount = false;
        if (userInfo && accessToken && expiresIn) {
            isLegalAccount = expiresIn - moment().unix() > 0;
            if (!isLegalAccount) {
                this.logout();
            }
        }
        return of(isLegalAccount);
    }

    login(username: string, password: string): Observable<any> {
        const basicAuth = AppConfig.generalConfig.basicAuth;
        const loginToken = btoa(`${basicAuth.username}:${basicAuth.password}`);
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            Authorization: `Basic ${loginToken}`
        };
        const data = new URLSearchParams();
        data.set('grant_type', 'password');
        data.set('username', username);
        data.set('password', password);

        return this.httpUtils.post(AppConfig.endpoints.uaa, data.toString(), { headers: headers }).pipe(
            tap(res => this.storeSession(res))
        );
    }

    logout() {
        this.storage.clear();
    }

    storeSession(res) {
        const jwtHelper = new JwtHelperService();
        of(jwtHelper.decodeToken(res.access_token)).subscribe(data => {
            if (data) {
                this.storage.set('user_info', JSON.stringify(data));
                this.storage.set('access_token', res.access_token);
                this.storage.set('refresh_token', res.refresh_token);
                this.storage.set('expires_in', data.exp);
                this.storage.set('token_type', res.token_type);
            }
        });
    }

    getJwtToken() {
        return {
            accessToken: this.storage.get('access_token'),
            type: this.storage.get('token_type')
        };
    }
}
