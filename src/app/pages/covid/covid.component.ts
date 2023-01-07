import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChartData } from 'chart.js';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CardItemComponent, CardBodyComponent, CardComponent, ChartComponent } from 'src/app/components';
import { CovidHistory } from 'src/app/models';
import { CovidInfo, ICovidInfoQueryArgs } from 'src/app/models/covid.model';
import { CovidService } from 'src/app/services';
import { CHART_DATA } from './chart-data';
import { IOverviewItems, OVERVIEW_ITEMS } from './usa-overview-items';

@Component({
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.scss'],
  standalone: true,
  imports: [CommonModule, CardComponent, CardBodyComponent, CardItemComponent, ChartComponent, MatProgressSpinnerModule]
})
export class CovidComponent implements OnInit, OnDestroy {
  filter: ICovidInfoQueryArgs = { date: '2021-03-01' }
  overviewData$: Observable<CovidInfo> = this.covidService.getLastData(this.filter);
  usaOverviewItems: IOverviewItems[] = OVERVIEW_ITEMS;
  chartData: ChartData = CHART_DATA;
  chartLoading: boolean = true;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private covidService: CovidService) { 
    this.getAllStateData('ca', this.filter);
    this.getLastWeekHistory();
  }

  ngOnInit(): void {
  }

  getLastWeekHistory(): void {
    this.chartLoading = true;
    this.covidService.getLastWeekHistory()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: CovidHistory[]) => {
          for (const item of res) {
            this.chartData.datasets[0].data.push(item['cases'] || 0)
            this.chartData.datasets[1].data.push(item['tests'] || 0)
            this.chartData.datasets[2].data.push(item['hospitalization'] || 0)
            this.chartData.datasets[3].data.push(item['deaths'] || 0)
            this.chartData.labels?.push(item['date'])
          };
          this.chartLoading = false;
        },
        error: (e) => {
          this.chartLoading = false;
          console.error(e);
        }
      });
  }

  getAllStateData(state: string, filter: ICovidInfoQueryArgs) {
    this.covidService.getStateData(state, filter)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        console.log(res);
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
