import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpUtils } from './utils/http.util';
import { DialogComponent } from './components/dialog/dialog.component';
import { Dialog } from './services/dialog.service';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AutocompleteService } from './components/autocomplete/service/autocomplete.service';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatMomentDateModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule,
        AutocompleteComponent,
        MatMomentDateModule
    ],
    declarations: [
        DialogComponent,
        AutocompleteComponent
    ],
    entryComponents: [
        DialogComponent
    ],
    providers: [
        HttpUtils,
        Dialog,
        AutocompleteService
    ]
})
export class SharedModule {

}
