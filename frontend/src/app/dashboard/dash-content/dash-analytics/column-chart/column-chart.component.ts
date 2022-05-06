import { Component, OnInit } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';


@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.css']
})
export class ColumnChartComponent implements OnInit {
  chartArea: Object = {
    border: {
        width: 0
    }
  };
  data: Object[] = [
      { x: 'Team A', y: 67 }, { x: 'Team B', y: 49 },
      { x: 'Team C', y: 95 }, { x: 'Team D', y: 61 },
      { x: 'Team E', y: 95 }, 
      // { x: 'Team F', y: 61 },
      // { x: 'Team G', y: 95 }, { x: 'Team H', y: 61 },
  ]
  data1: Object[] = [
      { x: 'Team A', y: 60 }, { x: 'Team B', y: 60 },
      { x: 'Team C', y: 85 }, { x: 'Team D', y: 78 },
      { x: 'Team E', y: 95 },
      //  { x: 'Team F', y: 61 },
      // { x: 'Team G', y: 95 }, { x: 'Team H', y: 61 },
  ]
  primaryXAxis: Object = {
    valueType: 'Category', interval: 1, majorGridLines: { width: 0 }
  }
  primaryYAxis: Object = {
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
  }
  marker: Object = { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
  title: string = 'Olympic Medal Counts - RIO'
  tooltip: Object = {
    enable: true
  }
  legendSettings: Object = { visible: true,position: 'Right' }
  
  constructor() { }

  ngOnInit(): void {
  }

  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    if(selectedTheme === 'highcontrast'){
    args.chart.series[0].marker.dataLabel.font.color= '#000000';
    args.chart.series[1].marker.dataLabel.font.color= '#000000';
    args.chart.series[2].marker.dataLabel.font.color= '#000000';
    }
};

}
