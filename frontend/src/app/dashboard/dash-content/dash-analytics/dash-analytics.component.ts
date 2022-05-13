import { Component,  Input,  OnInit } from '@angular/core';
import { Person } from 'src/app/modals/users';

@Component({
  selector: 'app-dash-analytics',
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.css']
})
export class DashAnalyticsComponent implements OnInit {
  @Input() currentUser:Person
  analyticView="general"
  active = 'top'
  rProgress:Array<any> 
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
    this.setRates()
  }

  setRates(){
    this.rProgress = [
      {metric:"Prospects",value:this.currentUser.prate,total:this.currentUser.nprospects,icon:"plus",color:"navy"},
      {metric:"Leads",value:this.currentUser.lrate,total:this.currentUser.nleads,icon:"spinner",color:"orange"},
      {metric:"Converted",value:this.currentUser.crate,total:this.currentUser.nconversions,icon:"check",color:"green"}
    ]
  }

}
