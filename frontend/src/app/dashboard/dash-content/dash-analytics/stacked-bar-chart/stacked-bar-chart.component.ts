import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StackedBarChartComponent implements OnInit {
  chartArea: Object = {
    border: {
        width: 0
    }
  };
  //Initializing Chart Width
//   width: string = Browser.isDevice ? '100%' : '60%';
  data: Object[] = [
      { x: 'Team A', y: 67 }, { x: 'Team B', y: 49 },
      // { x: 'Team C', y: 95 }, { x: 'Team D', y: 61 }
  ];
  data1: Object[] = [
      { x: 'Team A', y: 60 }, { x: 'Team B', y: 60 },
      // { x: 'Team C', y: 85 }, { x: 'Team D', y: 78 }
  ];
  //Initializing Marker
  marker: Object = {
      dataLabel: {
          visible: true,
          position: 'Top',
          font: {
              fontWeight: '600', color: '#ffffff'
          }
      }
  }
  //Initializing Primary X Axis
  primaryXAxis: Object = {
      valueType: 'Category',
      title: 'Teams',
      interval: 1,
      majorGridLines: { width: 0 }
  };
  //Initializing Primary Y Axis
  primaryYAxis: Object = {
      labelFormat: '{value}%',
      edgeLabelPlacement: 'Shift',
      majorGridLines: { width: 0 },
      majorTickLines: { width: 0 },
      lineStyle: { width: 0 },
      labelStyle: {
          color: 'transparent'
      }
  };
  tooltip: Object = {
      enable: true
  };

  //legend
  legendSettings: Object = { visible: true,position: 'Top' }
  
    // custom code end
  title: string = 'Team Performances For Past Month';

  constructor() { }

  ngOnInit(): void {
  }

    // custom code start
  load(args: ILoadedEventArgs): void {
      let selectedTheme: string = location.hash.split('/')[1];
      selectedTheme = selectedTheme ? selectedTheme : 'Material';
      args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
  };
}
