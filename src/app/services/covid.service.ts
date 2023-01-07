import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { map, Observable, shareReplay, take } from "rxjs";
import { generateQueryParams } from "../utils";
import { CovidHistory, CovidInfo, CovidState, ICovidInfoQueryArgs } from "../models";

@Injectable({
    providedIn: 'root'
})
export class CovidService {
    url: string = environment.API_URL + '/covid/';

    constructor(private http: HttpClient) { }

    getLastWeekHistory(): Observable<CovidHistory[]> {
        return this.http.get(this.url + `history`)
            .pipe(
                take(1),
                shareReplay(1),
                map((list: any) => list.slice(0, 7).reverse()),
                map((list: any[]) => list.map(item => CovidHistory.fromDTO(item)))
            )
    }

    getLastData(params: ICovidInfoQueryArgs): Observable<CovidInfo> {
        const queryString: string = generateQueryParams(params);
        return this.http.get(this.url + `last?${queryString}`)
            .pipe(
                take(1),
                shareReplay(1),
                map(item => CovidInfo.fromDTO(item))
            )
    }

    getStateData(state: string, params: ICovidInfoQueryArgs): Observable<CovidState> {
        const queryString: string = generateQueryParams(params);
        return this.http.get(this.url + `states/${state}?${queryString}`)
            .pipe(
                take(1),
                shareReplay(1),
                map(item => CovidState.fromDTO(item))
            )
    }
}