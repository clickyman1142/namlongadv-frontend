import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpUtils } from './utils/http.util';
import { DialogComponent } from './components/dialog/dialog.component';
import { Dialog } from './services/dialog.service';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule
    ],
    declarations: [
        DialogComponent
    ],
    entryComponents: [
        DialogComponent
    ],
    providers: [
        HttpUtils,
        Dialog
    ]
})
export class SharedModule {

}
