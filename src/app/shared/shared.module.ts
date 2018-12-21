import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    ]
})
export class SharedModule {

}
