import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    set(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    get(key: string) {
        const value = localStorage.getItem(key);
        if (value && value !== 'undefined') {
            try {
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        }
        return null;
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }
}
