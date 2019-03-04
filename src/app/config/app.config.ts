import {InjectionToken} from '@angular/core';
import { environment } from 'src/environments/environment';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig = {
    name: 'NamLongAdv',
    version: '0.0.1',
    routes: {
        home: '',
        login: 'login',
        error404: '404',
        advManagement: 'adv-management',
        companyManagement: 'company-management',
        customerManagement: 'customer-management',
        userManagement: 'user-management',
        settings: 'settings'
    },
    endpoints: {
        baseUrl: environment.baseUrl,
        uaa: environment.uaa,
        user: environment.user,
        userRole: environment.userRole,
        advert: environment.advert,
        province: environment.province,
        advertHistory: environment.advertHistory
    },
    generalConfig: {
        dateFormat: 'DD/MM/YYYY',
        dateTimeFormat: 'DD/MM/YYYY hh:mm:ss A',
        pageSize: 1000,
        basicAuth: {
            username: 'namlongAdv-client',
            password: '$2a$04$3z7DmA5Km6XRUc.jCqjQrupyTZH0waHJRyklNNXFIU050w0cQJ442'
        },
        snackBarDuration: 1500
    }
};
