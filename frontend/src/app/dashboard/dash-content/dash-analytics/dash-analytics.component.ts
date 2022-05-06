import { Component,  OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-analytics',
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.css']
})
export class DashAnalyticsComponent implements OnInit {
  analyticView="general"
  active = 'top'
  rProgress = [
    {metric:"Prospects",value:70,total:1679,icon:"plus",color:"navy"},
    {metric:"Leads",value:40,total:1309,icon:"spinner",color:"orange"},
    {metric:"Converted",value:90,total:1590,icon:"check",color:"green"}]
  teama = {
            team:[
              {name:"Peter",holding:70},
              {name:"Paul",holding:120},
              {name:"Jane",holding:400},
              {name:"Cissy",holding:80},
            ],
            history:[
              {x:new Date(2022,0,1),y:20},
              {x:new Date(2022,1,1),y:80},
              {x:new Date(2022,2,1),y:78},
              {x:new Date(2022,3,1),y:80},
              {x:new Date(2022,4,1),y:50},
              {x:new Date(2022,5,1),y:40},
              {x:new Date(2022,6,1),y:60},
            ]
          }
  teamb = {
            team:[
            {name:"James",holding:70},
            {name:"Bolton",holding:220},
            {name:"Daniel",holding:40},
            {name:"Karen",holding:80},
          ],
          history:[
            {x:new Date(2022,0,1),y:88},
            {x:new Date(2022,1,1),y:20},
            {x:new Date(2022,2,1),y:90},
            {x:new Date(2022,3,1),y:78},
            {x:new Date(2022,4,1),y:85},
            {x:new Date(2022,5,1),y:59},
            {x:new Date(2022,6,1),y:80},
          ]
        }
  // @HostBinding('style.--degree')
  // degree:string="-360deg"
  constructor() { }

  ngOnInit(): void {
  }


}
