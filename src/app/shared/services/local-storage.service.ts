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
        return value ? JSON.parse(value) : null;
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }
}
