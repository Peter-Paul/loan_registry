import { Component, OnInit, ViewChild } from '@angular/core';
import { AccumulationChartComponent, AccumulationChart, IAccLoadedEventArgs, AccumulationTheme } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  data: Object[] = [
    { 'x': 'Chrome', y: 37, text: '37%' }, { 'x': 'UC Browser', y: 17, text: '17%' },
    { 'x': 'iPhone', y: 19, text: '19%' },
    { 'x': 'Others', y: 4, text: '4%' }, { 'x': 'Opera', y: 11, text: '11%' },
    { 'x': 'Android', y: 12, text: '12%' }
  ];
  center: Object = {x: '50%', y: '50%'};
  startAngle: number = 0;
  endAngle: number = 360;
  explode: boolean = true;
  enableAnimation: boolean = false;
  tooltip: Object = { enable: true, format: '${point.x} : <b>${point.y}%</b>' };
  title: string = 'Individual Performances';

  animation: Object = {
    enable: false
  };
  //Initializing Legend
  legendSettings: Object = {
      visible: false,
  };
  //Initializing Datalabel
  dataLabel: Object = {
      visible: true,
      position: 'Inside', name: 'text',
      font: {
          fontWeight: '600'
      }
  };
  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('pie')
  pie: AccumulationChartComponent | AccumulationChart;
  pieangle(e: Event): void {
      let angle: string = (document.getElementById('pieangle') as HTMLInputElement).value;
      this.pie.series[0].startAngle = parseFloat(angle);
      this.pie.series[0].endAngle = parseFloat(angle);
      this.pie.series[0].animation.enable = false;
      document.getElementById('pieangleText').innerHTML = angle;
      this.pie.removeSvg();
      this.pie.refreshSeries();
      this.pie.refreshChart();
  };
  pieradius(e: Event): void {
      let radius: string = (document.getElementById('pieradius') as HTMLInputElement).value;
      this.pie.series[0].radius = radius + '%';
      document.getElementById('pieradiusText').innerHTML = (parseInt(radius, 10) / 100).toFixed(2);
      this.pie.series[0].animation.enable = false;
      this.pie.removeSvg();
      this.pie.refreshSeries();
      this.pie.refreshChart();
  };
  pieexploderadius(e: Event): void {
      let radius: string = (document.getElementById('pieexploderadius') as HTMLInputElement).value;
      this.pie.visibleSeries[0].explodeOffset = radius + '%';
      document.getElementById('pieexploderadiusText').innerHTML = (parseInt(radius, 10) / 100).toFixed(2);
      this.pie.series[0].animation.enable = false;
      this.pie.removeSvg();
      this.pie.refreshSeries();
      this.pie.refreshChart();
  };
  pieexplodeindex(e: Event): void {
      let index: number = +(document.getElementById('pieexplodeindex') as HTMLInputElement).value;
      this.pie.visibleSeries[0].explodeIndex = index;
      document.getElementById('pieexplodeindexText').innerHTML = index.toString();
      this.pie.series[0].animation.enable = false;
      this.pie.removeSvg();
      this.pie.refreshSeries();
      this.pie.refreshChart();
  };
  piecenterx(e: Event): void {
      let x: string = (document.getElementById('x') as HTMLInputElement).value;
      this.pie.center.x = x + '%';
      document.getElementById('xvalue').innerHTML = x + '%';
      this.pie.series[0].animation.enable = false;
      this.pie.removeSvg();
      this.pie.refreshSeries();
      this.pie.refreshChart();
  }
  piecentery(e: Event): void {
      let y: string = (document.getElementById('y') as HTMLInputElement).value;
      this.pie.center.y = y + '%';
      document.getElementById('yvalue').innerHTML = y + '%';
      this.pie.series[0].animation.enable = false;
      this.pie.removeSvg();
      this.pie.refreshSeries();
      this.pie.refreshChart();
  }
  load(args: IAccLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
  };

}
