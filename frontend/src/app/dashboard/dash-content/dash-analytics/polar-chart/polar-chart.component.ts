import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-polar-chart',
  templateUrl: './polar-chart.component.html',
  styleUrls: ['./polar-chart.component.css']
})
export class PolarChartComponent implements OnInit {
  data = [{ x: "Agents", y: 95 }, { x: "Internet", y: 70 },{ x: "Devices", y: 71 }, { x: "Mobility", y: 98 }];
  data2 = [{ x: "Agents", y: 80 }, { x: "Internet", y: 50 },{ x: "Devices", y: 70 }, { x: "Mobility", y: 78 }];
  data3 = [{ x: "Agents", y: 60 }, { x: "Internet", y: 54 },{ x: "Devices", y: 26 }, { x: "Mobility", y: 40 }];
  data4 = [{ x: "Agents", y: 75 }, { x: "Internet", y: 90 },{ x: "Devices", y: 97 }, { x: "Mobility", y: 100 }];
  primaryXAxis = {
                    title: 'Strength',
                    valueType:"Category"
                  };
  primaryYAxis = {
                    minimum:0, maximum:100, interval: 20,
                    title: 'Efficiency',
                    labelFormat: '{value}%'
                  };
  
                  //legend
  legendSettings: Object = { visible: true,position: 'Top' }
  
  title = 'Team Strength Comparison';
  constructor() { }

  ngOnInit(): void {
  }

}
