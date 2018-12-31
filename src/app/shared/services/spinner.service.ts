import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Spinner {
    spinner: any;

    constructor() {
        this.spinner = document.getElementsByName('app-spinner')[0];
    }

    show() {
        if (!this.spinner) {
            this.spinner = document.getElementsByTagName('app-spinner')[0];
        }
        this.spinner.classList.remove('undisplayed');
    }

    hide() {
        if (!this.spinner) {
            this.spinner = document.getElementsByTagName('app-spinner')[0];
        }
        this.spinner.classList.add('undisplayed');
    }
}