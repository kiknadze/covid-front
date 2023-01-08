import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ChartData } from 'chart.js';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CardItemComponent, CardBodyComponent, CardComponent, ChartComponent } from 'src/app/components';
import { CovidHistory, CovidState, State } from 'src/app/models';
import { CovidInfo, ICovidInfoQueryArgs } from 'src/app/models/covid.model';
import { CovidService, StatesService } from 'src/app/services';
import { CHART_DATA } from './chart-data';
import { IOverviewItems, OVERVIEW_ITEMS } from './overview-items';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

interface IcovidStates {
  name: string;
  code: string;
  cases?: number;
  tests?: number;
  hospitalization?: number;
  deaths?: number;
  date?: string;
}

@Component({
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.scss'],
  standalone: true,
  imports: [CommonModule, CardComponent, CardBodyComponent, CardItemComponent, ChartComponent, InfiniteScrollModule]
})
export class CovidComponent implements OnDestroy {
  filter: ICovidInfoQueryArgs = { date: '2021-03-01' };
  overviewData$: Observable<CovidInfo> = this.covidService.getLastData(this.filter);
  usaOverviewItems: IOverviewItems[] = OVERVIEW_ITEMS;
  chartData: ChartData = CHART_DATA;
  chartLoading: boolean = true;
  states: any[] = [];
  covidStates: IcovidStates[] = [];
  statePage: number = 0;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private covidService: CovidService,
              private statesService: StatesService) { 
    this.getLastWeekHistory();
    this.getStates();
  }

  getLastWeekHistory(): void {
    this.chartLoading = true;
    this.covidService.getLastWeekHistory()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: CovidHistory[]) => {
          for (const item of res) {
            this.chartData.datasets[0].data.push(item['cases'] || 0);
            this.chartData.datasets[1].data.push(item['tests'] || 0);
            this.chartData.datasets[2].data.push(item['hospitalization'] || 0);
            this.chartData.datasets[3].data.push(item['deaths'] || 0);
            this.chartData.labels?.push(item['date']);
          };
          this.chartLoading = false;
        },
        error: (e) => {
          this.chartLoading = false;
          console.error(e);
        }
      });
  }

  getStates(): void {
    this.statesService.getStates()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: State[]) => {
            this.states = res;
            this.getStateCovidData(this.states[this.statePage].code, this.filter);
        },
        error: (e) => {
          console.error(e);
        }
      });
  }

  onScroll(): void {
    if (this.statePage === this.states.length) return;
    this.getStateCovidData(this.states[this.statePage].code, this.filter);
  }

  getStateCovidData(state: string, filter: ICovidInfoQueryArgs): void {
    this.covidService.getStateData(state, filter)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: CovidState) => {
          this.covidStates.push({ ...res, ...this.states[this.statePage] });
          this.statePage++;
        },
        error: (e) => {
          console.error(e);
        }
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
