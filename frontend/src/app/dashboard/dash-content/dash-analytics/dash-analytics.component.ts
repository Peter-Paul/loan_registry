import { Component,  Input,  OnInit } from '@angular/core';
import { Client, Person } from 'src/app/modals/users';

@Component({
  selector: 'app-dash-analytics',
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.css']
})
export class DashAnalyticsComponent implements OnInit {
  @Input() currentUser:Person
  analyticView="current"
  active = 'top'
  currentProgress:Array<any> 
  generalProgress:Array<any> 
  columnProspects:Object[]
  columnConverted:Object[]
  bubbleData:Object[]
  agentTypes = [ "LBF Agent", "CS Agent" ]
  bManagerTypes = [ "LBF Branch Manager", "CS Branch Manager"]
  rManagerTypes = [ "LBF Region Manager", "CS Region Manager"]
  leaderTypes = [ "LBF Leader", "CS Leader"]
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
    this.generalProgress = [
      {metric:"Prospects",value:this.currentUser.gprate,total:this.currentUser.gnprospects,icon:"plus",color:"navy"},
      {metric:"Leads",value:this.currentUser.glrate,total:this.currentUser.gnleads,icon:"spinner",color:"orange"},
      {metric:"Converted",value:this.currentUser.gcrate,total:this.currentUser.gnconversions,icon:"check",color:"green"}
    ]
    this.currentProgress =  [
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

      if( this.currentUser.role == "Admin"){
        this.columnProspects =  this.analyticView == "current" ? 
                                mapData(this.currentUser.workers.filter(w => w.clients.length>0 ).map( w=> { return  {name:`${w.region}/${w.branch}`, total:w.nprospects} })) :
                                mapData(this.currentUser.workers.filter(w => w.archives.length>0 ).map( w=> { return  {name:`${w.region}/${w.branch}`, total:w.gnprospects} })) 
        this.columnConverted =  this.analyticView == "current" ?
                                mapData(this.currentUser.workers.filter(w => w.clients.length>0 ).map( w=> {return  {name:`${w.region}/${w.branch}`, total:w.nconversions}})):
                                mapData(this.currentUser.workers.filter(w => w.archives.length>0 ).map( w=> {return  {name:`${w.region}/${w.branch}`, total:w.gnconversions}}))
      }

      if(this.bManagerTypes.includes(this.currentUser.role)){
        this.columnProspects =  this.analyticView == "current" ? 
                                mapData(this.currentUser.workers.filter(w => w.clients.length>0 ).map( w=> { return  {name:`${w.team}`, total:w.nprospects} })) :
                                mapData(this.currentUser.workers.filter(w => w.archives.length>0 ).map( w=> { return  {name:`${w.team}`, total:w.gnprospects} })) 
        this.columnConverted =  this.analyticView == "current" ?
                                mapData(this.currentUser.workers.filter(w => w.clients.length>0 ).map( w=> {return  {name:`${w.team}`, total:w.nconversions}})):
                                mapData(this.currentUser.workers.filter(w => w.archives.length>0 ).map( w=> {return  {name:`${w.team}`, total:w.gnconversions}}))
      }

      if(this.rManagerTypes.includes(this.currentUser.role)){
        this.columnProspects =  this.analyticView == "current" ? 
                                mapData(this.currentUser.workers.filter(w => w.clients.length>0 ).map( w=> { return  {name:`${w.branch}`, total:w.nprospects} })) :
                                mapData(this.currentUser.workers.filter(w => w.archives.length>0 ).map( w=> { return  {name:`${w.branch}`, total:w.gnprospects} })) 
        this.columnConverted =  this.analyticView == "current" ?
                                mapData(this.currentUser.workers.filter(w => w.clients.length>0 ).map( w=> {return  {name:`${w.branch}`, total:w.nconversions}})):
                                mapData(this.currentUser.workers.filter(w => w.archives.length>0 ).map( w=> {return  {name:`${w.branch}`, total:w.gnconversions}}))
      }

      if(this.leaderTypes.includes(this.currentUser.role)){
        
        const cp =  this.analyticView == "current" ? 
                                mapData(  [{...this.currentUser,clients:this.currentUser.clients.filter( c => c.agent == this.currentUser.id )}] // since team lead also has their own clients, map them and filter out only their clients
                                          .concat(this.currentUser.workers).filter(w => w.nprospects>0 ).map( w=> { return  {name:`${w.fullname}`, total:w.nprospects} })):
                                mapData(  [{...this.currentUser,archives:this.currentUser.archives.filter( a => a.agent == this.currentUser.id )}]
                                          .concat(this.currentUser.workers).filter(w => w.gnconversions>0 ).map( w=> { return  {name:`${w.fullname}`, total:w.gnprospects} })) 
        
        const cc =  this.analyticView == "current" ?
                                mapData(  [{...this.currentUser,clients:this.currentUser.clients.filter( c => c.agent == this.currentUser.id )}]
                                          .concat(this.currentUser.workers).filter(w => w.nprospects>0 ).map( w=> {return  {name:`${w.fullname}`, total:w.nconversions}})):
                                mapData(  [{...this.currentUser,archives:this.currentUser.archives.filter( a => a.agent == this.currentUser.id )}]
                                          .concat(this.currentUser.workers).filter(w => w.gnconversions>0 ).map( w=> {return  {name:`${w.fullname}`, total:w.gnconversions}}))
        const adjust = mapping => { // so that we can subtract all totals added to the team lead that don't belong to him/her
          // can only work after using mapData()
          return mapping.map( c => { return c.name  == this.currentUser.fullname ? 
                                            {...c,total: c.total - mapping.filter( c => c.name != this.currentUser.fullname ).map( c => {return c.total}).reduce((a, b) => a + b, 0) } : 
                                            c } )
        }
                
        this.columnProspects = adjust(cp)
        this.columnConverted = adjust(cc)

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
          // Math.ceil() if 0.5, takes it to 1
          size:mapping[k].map( m => { return m.size } ).reduce((a, b) => a + b, 0) ,
          x:average(mapping[k].map( m => { return m.x } ) ), 
          y:average(mapping[k].map( m => { return m.y } ) ),
        })
      }
      return result
    }

    const prospectNconverted = (w:Person) => {return w.nconversions+w.nprospects}
    const gprospectNconverted = (w:Person) => {return w.gnconversions+w.gnprospects}

    if( this.currentUser.role == "Admin"){
      this.bubbleData = this.analyticView == "current" ? 
                        mapData(this.currentUser.workers.filter(w => prospectNconverted(w) > 0 ).map( w=> {return { text:`${w.region}/${w.branch}`, size:prospectNconverted(w), y:w.crate, x:w.prate}})):
                        mapData(this.currentUser.workers.filter(w => gprospectNconverted(w) > 0 ).map( w=> {return { text:`${w.region}/${w.branch}`, size:gprospectNconverted(w), y:w.gcrate, x:w.gprate}}))
    }

    if(this.bManagerTypes.includes(this.currentUser.role)){
      this.bubbleData = this.analyticView == "current" ?
                        mapData(this.currentUser.workers.filter(w => prospectNconverted(w) > 0 ).map( w=> {return {  text:`${w.team}`, size:prospectNconverted(w),y:w.crate,x:w.prate}})):
                        mapData(this.currentUser.workers.filter(w => gprospectNconverted(w) > 0 ).map( w=> {return {  text:`${w.team}`, size:gprospectNconverted(w),y:w.gcrate,x:w.gprate}}))
    }

    if(this.rManagerTypes.includes(this.currentUser.role)){
      this.bubbleData = this.analyticView == "current" ?
                        mapData(this.currentUser.workers.filter(w => prospectNconverted(w) > 0 ).map( w=> {return {  text:`${w.branch}`, size:prospectNconverted(w),y:w.crate,x:w.prate}})):
                        mapData(this.currentUser.workers.filter(w => gprospectNconverted(w) > 0 ).map( w=> {return {  text:`${w.branch}`, size:gprospectNconverted(w),y:w.gcrate,x:w.gprate}}))
    }
    
    if(this.leaderTypes.includes(this.currentUser.role)){
      const bd = this.analyticView == "current" ?
                        mapData(  [{...this.currentUser,clients:this.currentUser.clients.filter( c => c.agent == this.currentUser.id )}]
                                  .concat(this.currentUser.workers).filter(w => prospectNconverted(w) > 0 ).map( w=> {return {  text:w.fullname, size:prospectNconverted(w),y:w.crate,x:w.prate}})):
                        mapData(  [{...this.currentUser,archives:this.currentUser.archives.filter( a => a.agent == this.currentUser.id )}]
                                  .concat(this.currentUser.workers).filter(w => gprospectNconverted(w) > 0 ).map( w=> {return {  text:w.fullname, size:gprospectNconverted(w),y:w.gcrate,x:w.gprate}}))
      const adjust = mapping => { 
        return mapping.map( c => { return c.text  == this.currentUser.fullname ? 
                                          {...c,size: c.size - mapping.filter( c => c.text != this.currentUser.fullname ).map( c => {return c.size}).reduce((a, b) => a + b, 0) } : 
                                          c } )
      }
      this.bubbleData = adjust(bd)
      console.log(this.bubbleData)
    }

  }

}
