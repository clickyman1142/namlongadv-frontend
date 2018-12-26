import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.scss'
    ]
})
export class HeaderComponent implements OnInit {
    @Input() sideMenu;

    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'toggleMenuIcon',
            sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/baseline-view_list-24px.svg')
        );
    }

    ngOnInit() {
        console.log(this.sideMenu)
    }
}
