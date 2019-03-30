import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Router } from '@angular/router';
import { UserInfo } from '../../models/user-info';
import { TranslateService } from '@ngx-translate/core';

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
    lang: string;

    constructor(
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,
        private router: Router,
        private translate: TranslateService) {
        iconRegistry.addSvgIcon(
            'toggleMenuIcon',
            sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/baseline-view_list-24px.svg')
        );
    }

    ngOnInit() {
        this.userInfo = JSON.parse(localStorage.getItem('user_info'));
        this.lang = localStorage.getItem('lang') || 'vi';
        this.translate.setDefaultLang(this.lang);
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    switchLang() {
        if (this.lang === 'vi') {
            localStorage.setItem('lang', 'en');
        } else {
            localStorage.setItem('lang', 'vi');
        }
        this.lang = localStorage.getItem('lang') || 'vi';
        this.translate.setDefaultLang(this.lang);
    }
}
