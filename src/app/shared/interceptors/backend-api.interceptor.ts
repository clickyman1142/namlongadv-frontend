import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpHeaders,
    HttpResponse
} from '@angular/common/http';
import { AuthService } from 'src/app/modules/authorize/services/auth.service';
import { AppConfig } from 'src/app/config/app.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Injectable } from '@angular/core';

@Injectable()
export class BackendAPIInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

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
                return Observable.throw(response);
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