import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private storage: LocalStorageService) {

    }

    isAuthenticated(): boolean {
        // return this.storage.get('username') !== null;
        return true;
    }

    login(username: string, password: string): Observable<any> {
        // TODO: implement login function
        if (username === 'admin' && password === '1234') {
            this.storeSession({username});
            return of(true);
        }
        return of(false);
    }

    logout() {
        this.storage.clear();
    }

    storeSession(res) {
        this.storage.set('username', res.username);
    }
}
