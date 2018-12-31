import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/config/app.config';

@Injectable({
    providedIn: 'root'
})
export class SnackBar {
    constructor(private snackBar: MatSnackBar) {}

    open(message, duration?: number) {
        duration = duration ? duration : AppConfig.generalConfig.snackBarDuration;
        this.snackBar.open(message, 'OK', {
            duration
        });
    }
}
