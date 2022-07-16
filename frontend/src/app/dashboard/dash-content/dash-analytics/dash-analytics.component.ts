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
  columnProspects:Object[]
  columnConverted:Object[]
  bubbleData:Object[]
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
    this.setColumnChart()
    this.setBubbleChart()
  }

  setRates(){
    this.rProgress = [
      {metric:"Prospects",value:this.currentUser.prate,total:this.currentUser.nprospects,icon:"plus",color:"navy"},
      {metric:"Leads",value:this.currentUser.lrate,total:this.currentUser.nleads,icon:"spinner",color:"orange"},
      {metric:"Converted",value:this.currentUser.crate,total:this.currentUser.nconversions,icon:"check",color:"green"}
    ]
  }

  setColumnChart(){
    const mapData = array =>{
      let mapping = {}
      for (let x of array){
        //if key exsists add total to value else create and give value of total
        mapping[x.name] ? mapping[x.name]+=x.total : mapping[x.name]=x.total
      }
      let result = []
      for (let k of Object.keys(mapping)){
        result.push( { name:k, total:mapping[k] })
      }
      return result
    }
    switch (this.currentUser.role) {
      case "Admin":
          this.columnProspects = mapData(this.currentUser.workers.filter(w => w.clients && w.clients.length>0).map( w=> {
            return {name:`${w.region}/${w.branch}`, total:w.nprospects}
          }))

          this.columnConverted = mapData(this.currentUser.workers.filter(w => w.clients && w.clients.length>0).map( w=> {
            return {name:`${w.region}/${w.branch}`, total:w.nconversions}
          }))
          break
      case "LBF Branch Manager":
        this.columnProspects = mapData(this.currentUser.workers.filter(w => w.clients && w.clients.length>0).map( w=> {
          return {name:`${w.team}`, total:w.nprospects}
        }))

        this.columnConverted = mapData(this.currentUser.workers.filter(w => w.clients && w.clients.length>0).map( w=> {
          return {name:`${w.team}`, total:w.nconversions}
        }))
        break
      case "CS Branch Manager":
        this.columnProspects = mapData(this.currentUser.workers.filter(w => w.clients && w.clients.length>0).map( w=> {
          return {name:`${w.team}`, total:w.nprospects}
        }))

        this.columnConverted = mapData(this.currentUser.workers.filter(w => w.clients && w.clients.length>0).map( w=> {
          return {name:`${w.team}`, total:w.nconversions}
        }))
        break
      case "LBF Leader":
        this.columnProspects = this.currentUser.workers.filter(w => w.clients.length>0).map( w=> {
          return { name:w.fullname, total:w.nprospects}
        })
        this.columnConverted = this.currentUser.workers.filter(w => w.clients.length>0).map( w=> {
          return { name:w.fullname, total:w.nconversions}
        })
        break;
      case "CS Leader":
        this.columnProspects = this.currentUser.workers.filter(w => w.clients.length>0).map( w=> {
          return { name:w.fullname, total:w.nprospects}
        })
        this.columnConverted = this.currentUser.workers.filter(w => w.clients.length>0).map( w=> {
          return { name:w.fullname, total:w.nconversions}
        })
        break;
    
      default:
        break;
    }
  }

  setBubbleChart(){
    const average = (data) => {
      const addition = (accumulator, curr) => accumulator + curr
      return (data.reduce(addition))/data.length
    }
    const mapData = array =>{
      let mapping = {}
      for (let a of array){
        //if key exsists add total to value else create and give value of total
        mapping[a.text] ? mapping[a.text].push({size:a.size,y:a.y,x:a.x}) : mapping[a.text]=[{size:a.size,y:a.y,x:a.x}]
      }
      let result = []
      for (let k of Object.keys(mapping)){
        result.push( { 
          text:k, 
          size:average(mapping[k].map( m => { return m.size } ) ),
          x:average(mapping[k].map( m => { return m.x } ) ),
          y:average(mapping[k].map( m => { return m.y } ) ),
        })
      }
      return result
    }

    switch (this.currentUser.role) {
      case "Admin":
          this.bubbleData = mapData(this.currentUser.workers.filter(w => w.clients.length>0).map( w=> {
            return {  text:`${w.region}/${w.branch}`, 
                      size:w.nconversions+w.nleads+w.nprospects,
                      y:w.prate,
                      x:w.crate
                    }
          }))
          break
      case "LBF Branch Manager":
        this.bubbleData = mapData(this.currentUser.workers.filter(w => w.clients.length>0).map( w=> {
          return {  text:`${w.team}`, 
                    size:w.nconversions+w.nleads+w.nprospects,
                    y:w.prate,
                    x:w.crate
                  }
        }))
        break
      case "CS Branch Manager":
        this.bubbleData = mapData(this.currentUser.workers.filter(w => w.clients.length>0).map( w=> {
          return {  text:`${w.team}`, 
                    size:w.nconversions+w.nleads+w.nprospects,
                    y:w.prate,
                    x:w.crate
                  }
        }))
        break
      case "LBF Leader":
        this.bubbleData = this.currentUser.workers.filter(w => w.clients.length>0).map( w=> {
          return {  text:w.fullname, 
                    size:w.nconversions+w.nleads+w.nprospects,
                    y:w.prate,
                    x:w.crate
                  }
        })
        break;
      case "CS Leader":
        this.bubbleData = this.currentUser.workers.filter(w => w.clients.length>0).map( w=> {
          return {  text:w.fullname, 
                    size:w.nconversions+w.nleads+w.nprospects,
                    y:w.prate,
                    x:w.crate
                  }
        })
        break;
    
      default:
        break;
    }
  }

}
