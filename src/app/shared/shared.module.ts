import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpUtils } from './utils/http.util';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AutocompleteService } from './components/autocomplete/service/autocomplete.service';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TranslateModule } from '@ngx-translate/core';

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
        MatMomentDateModule,
        TranslateModule
    ],
    declarations: [
        AutocompleteComponent
    ],
    providers: [
        HttpUtils,
        AutocompleteService
    ]
})
export class SharedModule {

}
