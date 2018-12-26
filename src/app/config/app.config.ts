import {InjectionToken} from '@angular/core';
import { environment } from 'src/environments/environment.prod';

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
        uaa: environment
    },
    generalConfig: {
        dateFormat: 'DD/MM/YYYY',
        dateTimeFormat: 'DD/MM/YYYY hh:mm:ss A',
        pageSize: 1000,
        basicAuth: {
            username: 'namlongAdv-client',
            password: '***'
        }
    }
}