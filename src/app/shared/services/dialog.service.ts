import { MatDialog } from '@angular/material';
import { DialogType } from '../models/DialogType';
import { DialogComponent } from '../components/dialog/dialog.component';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Dialog {
    constructor(
        private dialog: MatDialog
    ) {}

    confirm(params) {
        params.type = DialogType.CONFIRM;
        return this.open(params);
    }

    info(params) {
        params.type = DialogType.INFO;
        return this.open(params);
    }

    open(params) {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '400px',
            disableClose: true,
            data: params,
            id: params.type
        });
        return dialogRef.afterClosed().toPromise();
    }
}
