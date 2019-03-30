import { Component, Inject, OnInit, Input } from '@angular/core';
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
    @Input() sideMenu;
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
                name: 'module.adv_management',
                route: this.appConfig.routes.advManagement,
                icon: 'management',
                children: []
            },
            {
                id: 2,
                name: 'module.comp_management',
                route: this.appConfig.routes.companyManagement,
                icon: 'management',
                children: []
            },
            {
                id: 3,
                name: 'module.cust_management',
                route: this.appConfig.routes.customerManagement,
                icon: 'management',
                children: []
            },
            {
                id: 4,
                name: 'module.user_management',
                route: this.appConfig.routes.userManagement,
                icon: 'management',
                children: []
            },
            {
                id: 5,
                name: 'module.settings',
                route: this.appConfig.routes.settings,
                icon: 'management',
                children: []
            }
        ];
    }

}
