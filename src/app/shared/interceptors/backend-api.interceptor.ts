import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpHeaders,
    HttpResponse
} from '@angular/common/http';
import { AuthService } from 'src/app/modules/authorize/services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Dialog } from '../services/dialog.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class BackendAPIInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private dialog: Dialog,
        private translate: TranslateService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = req.url;

        const newReq = req.clone({
            setHeaders: this.cloneHeaders(req.headers)
        });

        return next
            .handle(newReq)
            .do(event => {
                if (event instanceof HttpResponse) {
                    // Do nothing
                }
            })
            .catch(response => {
                if (response.status === 500 || response.status === 405) {
                    this.dialog.error({
                        title: 'Thông báo',
                        message: this.translate.instant('common.error.server_error')
                    });
                } else {
                    return throwError(response);
                }
            });
    }

    cloneHeaders(headers: HttpHeaders) {
        if (!headers.has('Authorization')) {
            const jwtToken = this.authService.getJwtToken();
            return {
                'Authorization': `${jwtToken.type} ${jwtToken.accessToken}`
            };
        }
    }
}
