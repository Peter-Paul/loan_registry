import { Component, Input, OnInit } from '@angular/core';
import { IPointRenderEventArgs, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit {
    @Input() bubbleData
  data: Object[] = [
    { x: 92.2, y: 78, size: 1.347, text: 'Team A' },
    { x: 74, y: 65, size: 1.241, text: 'Team B' },
    { x: 90.4, y: 60, size: 0.238, text: 'Team C' },
    { x: 99.4, y: 22, size: 0.312, text: 'Team D' },
    { x: 65, y: 13, size: 0.197, text: 'Team E' },
  ];
  tooltip: Object = {
    enable: true,
    format: "${point.text}<br/>Prospect Rate : <b>${point.x}%</b>" +
        "<br/>Converstion Rate : <b>${point.y}%</b><br/>Clients : <b>${point.size} </b>"
  }
  minRadius: number = 3
  maxRadius: number = Browser.isDevice ? 6 : 8
  legend: Object = {
    visible: false
  }
  marker: Object = {
    dataLabel: { name: 'text' }
  }
  primaryXAxis: any = {
    title: 'Conversion Rate',
    minimum: 60,
    maximum: 100,
    interval: 10
  };
  primaryYAxis: any = {
      title: 'Prospect Rate',
      minimum: 0,
      maximum: 100,
      interval: 10
  }
  chartArea: Object = {
      border: {
          width: 0
      }
  }
  title: string = 'Prospect Rate - Conversion Rate'
  constructor() { }

  ngOnInit(): void {
      this.primaryXAxis.minimum = Math.trunc(Math.min(...this.bubbleData.map( b=> {return b.x}))-5)
      this.primaryXAxis.maximum = Math.trunc(Math.max(...this.bubbleData.map( b=> {return b.x}))+5)
      this.primaryYAxis.minimum = Math.trunc(Math.min(...this.bubbleData.map( b=> {return b.y}))-5)
      this.primaryYAxis.maximum = Math.trunc(Math.max(...this.bubbleData.map( b=> {return b.y}))+5)
  }

  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
  }
  pointRender(args: IPointRenderEventArgs): void {
    let materialColors: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb',
        '#ea7a57', '#404041', '#00bdae'];
    let fabricColors: string[] = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
        '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300', '#4472c4', '#70ad47', '#ffc000', '#ed7d31'];
    let bootstrapColors: string[] = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e', '#ff6ea6',
        '#7953ac', '#b99b4f', '#407c92', '#5ea716', '#b91c52'];
    let highContrastColors: string[] = ['#79ECE4', '#E98272', '#DFE6B6', '#C6E773', '#BA98FF',
        '#FA83C3', '#00C27A', '#43ACEF', '#D681EF', '#D8BC6E'];
    let fluentColors: string[] = ['#614570', '#4C6FB1', '#CC6952', '#3F579A', '#4EA09B', '#6E7A89', '#D4515C', '#E6AF5D', '#639751',
        '#9D4D69'];
    let fluentDarkColors: string[] = ['#8AB113', '#2A72D5', '#43B786', '#584EC6', '#E85F9C', '#6E7A89', '#EA6266', '#EBA844', '#26BC7A', 
        '#BC4870'];    
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index % 10];
    } else if (selectedTheme === 'material') {
        args.fill = materialColors[args.point.index % 10];
    } else if (selectedTheme === 'highcontrast') {
        args.fill = highContrastColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent') {
        args.fill = fluentColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent-dark') {
        args.fill = fluentDarkColors[args.point.index % 10];
    } else {
        args.fill = bootstrapColors[args.point.index % 10];
    }
}


}
