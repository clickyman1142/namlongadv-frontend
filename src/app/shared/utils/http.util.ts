import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HttpUtils {
    constructor(private httpClient: HttpClient) {}

    getAll(url: string, queryParams: any) {
        const options = {
            params: {
                query: JSON.stringify(queryParams.queryParams),
                pageIndex: queryParams.pageIndex,
                pageSize: queryParams.pageSize
            }
        };

        return this.httpClient.get<any>(url, options);
    }

    get(api: string, options?: any): Observable<any> {
        return this.httpClient.get(api, options);
    }

    post(api: string, data: any, options?: any): Observable<any> {
        if (!options) { options = {}; }
        return this.httpClient.post(api, data, options);
    }

    put(api: string, data: any, options?: any): Observable<any> {
        if (!options) { options = {}; }
        return this.httpClient.put(api, data, options);
    }

    delete(api: string): Observable<any> {
        return this.httpClient.delete(api);
    }
}
