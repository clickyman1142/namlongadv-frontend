import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Router } from '@angular/router';
import { UserInfo } from '../../models/user-info';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.scss'
    ]
})
export class HeaderComponent implements OnInit {
    @Input() sideMenu;
    userInfo: UserInfo;

    constructor(
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,
        private router: Router) {
        iconRegistry.addSvgIcon(
            'toggleMenuIcon',
            sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/baseline-view_list-24px.svg')
        );
    }

    ngOnInit() {
        this.userInfo = JSON.parse(localStorage.getItem('user_info'));
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/login']);
    }
}
