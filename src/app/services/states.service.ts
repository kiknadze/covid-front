import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { map, Observable, shareReplay, take } from "rxjs";
import { State } from "../models";

@Injectable({
    providedIn: 'root'
})
export class StatesService {
    url: string = environment.API_URL + '/states/';

    constructor(private http: HttpClient) { }

    getStates(): Observable<State[]> {
        return this.http.get(this.url)
            .pipe(
                take(1),
                shareReplay(1),
                map((list: any) => list.map((item: any) => State.fromDTO(item)))
            )
    }
}