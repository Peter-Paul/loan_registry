import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-spline-area',
  templateUrl: './spline-area.component.html',
  styleUrls: ['./spline-area.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SplineAreaComponent implements OnInit {
  @Input() data
  //Initializing Primary X Axis
  primaryXAxis: Object = {
    valueType: 'DateTime',
    labelFormat: 'MMM',
    majorGridLines: { width: 0 },
    intervalType: 'Months',
    edgeLabelPlacement: 'Shift'
  };
  //Initializing Primary Y Axis
  primaryYAxis: Object = {
      labelFormat: '{value}%',
      lineStyle: { width: 0 },
      maximum: 100,
      interval: 20,
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 }
  };
  marker: Object = {
      visible: false
  };

  title: string = `Team's Historical Conversion Rate`

  constructor() { }

  ngOnInit(): void {
  }

  load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
  };

}
