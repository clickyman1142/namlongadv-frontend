import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GeoLocationService {
    public getPosition(): Observable<Position> {
        return new Observable(observable => {
            navigator.geolocation.watchPosition((pos: Position) => {
                observable.next(pos);
            });
        });
    }
}
