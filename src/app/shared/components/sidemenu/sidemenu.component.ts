import { Component, Inject, OnInit } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../../config/app.config';

@Component({
    selector: 'app-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: [
        './sidemenu.component.scss'
    ],
    providers: [
        { provide: APP_CONFIG, useValue: AppConfig }
    ]
})
export class SideMenuComponent implements OnInit {
    appConfig: any;
    menuItems = [];

    constructor(@Inject(APP_CONFIG) appConfig) {
        this.appConfig = appConfig;
    }

    ngOnInit() {
        this.buildSideMenu();
    }

    buildSideMenu() {
        this.menuItems = [
            {
                id: 1,
                name: 'Quản lý địa điểm',
                route: this.appConfig.routes.advManagement,
                icon: 'management',
                children: []
            },
            {
                id: 2,
                name: 'Quản lý công ty',
                route: this.appConfig.routes.companyManagement,
                icon: 'management',
                children: []
            },
            {
                id: 3,
                name: 'Quản lý khách hàng',
                route: this.appConfig.routes.customerManagement,
                icon: 'management',
                children: []
            },
            {
                id: 4,
                name: 'Quản lý tài khoản',
                route: this.appConfig.routes.userManagement,
                icon: 'management',
                children: []
            },
            {
                id: 5,
                name: 'Cài đặt',
                route: this.appConfig.routes.settings,
                icon: 'management',
                children: []
            }
        ];
    }

}
