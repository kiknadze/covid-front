import { ChartData } from "chart.js";

export const CHART_DATA: ChartData = {
    labels: [],
    datasets: [
      {
        label: 'Cases',
        data: [],
        backgroundColor: '#4BDFFF',
        minBarLength: 8
      },
      {
        label: 'Tests',
        data: [],
        backgroundColor: '#5E97F5',
        minBarLength: 8
      },
      {
        label: 'Hospitalization',
        data: [],
        backgroundColor: '#BF90FF',
        minBarLength: 8
      },
      {
        label: 'Deaths',
        data: [],
        backgroundColor: '#232D3C',
        minBarLength: 8
      }
    ]
};