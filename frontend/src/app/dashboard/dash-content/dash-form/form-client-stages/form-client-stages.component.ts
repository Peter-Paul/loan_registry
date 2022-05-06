import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client, Person } from 'src/app/modals/users';

@Component({
  selector: 'app-form-client-stages',
  templateUrl: './form-client-stages.component.html',
  styleUrls: ['./form-client-stages.component.css']
})
export class FormClientStagesComponent implements OnInit {
  @Input() client:Client
  @Input() currentUser:Person
  @Input() action:string
  @Input() clientView:string
  @Output() cv:EventEmitter<any>=new EventEmitter()
  @Output() pc:EventEmitter<any> =new EventEmitter()
  stage:string
  stageThreeError=true
  saved:boolean=false
  mstatuses= [  "Pending Tracking", "Branch Appraisal", 
                "Credit Appraisal", "Credit Rejected", "Declined",
                "Disbursed", "On Appointment", "Pending Caveat Placement",
                "Pending Offer Signing", "Valuation" ]
  constructor() { }

  ngOnInit(): void {
    this.setStage()
  }
  changeClientView(view:string){
    this.cv.emit(view)
  }

  setStage(){
    if( this.client.status === 'Prospect' ){
      this.stage='One'
    }else if( this.client.status === 'Valid Prospect'){
      this.stage = 'Two'
    }else if( this.client.status === 'Lead'){
      this.stage = 'Three'
      if (this.client.type === 'LBF Client'){
        if (this.client.mstatus === 'Disbursed'){
          this.stage = 'Four'
          this.stageThreeError=false
        }
      }else{
        if (this.client.nin_doc && this.client.eid_doc && this.client.a_letter && this.client.i_letter){
          this.stage = 'Four'
          this.stageThreeError=false
        }
      }
    }
  }


  updateStage(){
    let { fullname,agentName,...payload} = {...this.client,dob:JSON.stringify(this.client.dob), created:JSON.stringify(this.client.created)}
    switch (this.stage) {
      case 'One':
        this.pc.emit({...payload,status:'Valid Prospect'})
        this.saved=true
        break;
      case 'Two':
        console.log({...payload,status:'Lead'})
        this.pc.emit({...payload,status:'Lead'})
        this.saved=true
        break;
      case 'Three':
        this.pc.emit(payload)
        if (this.client.mstatus === 'Disbursed' || this.client.nin_doc && this.client.eid_doc && this.client.a_letter && this.client.i_letter){
          this.saved=true
          this.stageThreeError=false
        }else{
          this.stageThreeError=true
        }
        break;
      case 'Four':
        this.pc.emit({...payload,status:'Converted'})
        break;
      default:
        break;
    }
  }
  
  reset(){
    this.client = {  ...this.client,
      status:'Prospect',
      mstatus:"Pending Tracking",
      affordability:"",
      reservation:"No",
      amount:"",
      nin:"",
      mid:null,
      nin_doc:false,
      eid_doc:false,
      a_letter:false,
      i_letter:false,
    }
    let { fullname,agentName,...payload} = {  ...this.client,
                                              dob:JSON.stringify(this.client.dob), 
                                              created:JSON.stringify(this.client.created)
                                            }
    console.log(payload)
    this.pc.emit(payload)
    this.stage="One"
  }

}
