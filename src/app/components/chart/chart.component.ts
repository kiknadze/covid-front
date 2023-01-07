import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartData } from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  standalone: true
})
export class ChartComponent implements AfterViewInit {
  @Input() chartData!: ChartData;
  @ViewChild('mychart') mychart!: ElementRef;
  chart!: Chart;

  constructor() { }

  ngAfterViewInit(): void {
    const canvas: HTMLCanvasElement = this.mychart.nativeElement;
    const context: any = canvas.getContext('2d');
    this.chart = new Chart(context, {
      type: 'bar',
      data: { ...this.chartData }
    });
  }

}
