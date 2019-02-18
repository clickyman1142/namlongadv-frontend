import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BackendAPIInterceptor } from './shared/interceptors/backend-api.interceptor';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatDialogModule } from '@angular/material';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { MaterialModule } from './shared/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddressConflictDialogComponent } from './modules/adv-management/components/address-conflict-dialog/address-conflict-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    AddressConflictDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatDialogModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BackendAPIInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent,
    AddressConflictDialogComponent
  ]
})
export class AppModule {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('vi');
  }
}

// required for AOT compilation
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
