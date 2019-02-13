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

@Injectable()
export class BackendAPIInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService
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
                    // Do
                }
            })
            .catch(response => {
                if (response.status === 500) {
                    // this.dialog.info({
                    //     title: 'Error',
                    //     message: 'Server error, please contact help desk'
                    // });
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
