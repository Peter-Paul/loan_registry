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
  stageThreeAllowed = ["Admin","LBF Branch Manager", "CS Branch Manager", "CS Region Manager"  ]
  stageFourAllowed = [ "Admin", "LBF Branch Manager", "CS Region Manager" ]
  stage:string
  stageThreeError=true
  saved:boolean=false
  mstatuses= [  "On Appointment","Declined","Valuation", "Branch Appraisal", 
                "Credit Appraisal", "Credit Rejected", "Pending Offer Signing",
                "Pending Tracking","Pending Caveat Placement","Pending PD Call","Pending Disbursement","Disbursed"]
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
    console.log(this.stage)
    console.log(this.client)
  }


  updateStage(){
    let { fullname,agentName,days,label,...payload} = {...this.client,dob:JSON.stringify(this.client.dob), created:JSON.stringify(this.client.created)}
    switch (this.stage) {
      case 'One':
        this.pc.emit(payload) // this.client already changed to Valid Prospect
        this.saved=true
        break;
      case 'Two':
        this.client = {...this.client,status:"Lead"}
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
        this.client = {...this.client,status:"Converted"}
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
    let { fullname,agentName,days,label,...payload} = {  ...this.client,
                                              dob:JSON.stringify(this.client.dob), 
                                              created:JSON.stringify(this.client.created)
                                            }
    console.log(payload)
    this.pc.emit(payload)
    this.stage="One"
  }

}
