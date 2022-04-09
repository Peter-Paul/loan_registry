import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from 'src/app/modals/users';

@Component({
  selector: 'app-form-client-stages',
  templateUrl: './form-client-stages.component.html',
  styleUrls: ['./form-client-stages.component.css']
})
export class FormClientStagesComponent implements OnInit {
  @Input() client:Client
  @Input() action:string
  @Input() clientView:string
  @Output() cv:EventEmitter<any>=new EventEmitter()
  stage:string='One'
  mstatuses= [  "Pending Tracking", "Branch Appraisal", 
                "Credit Appraisal", "Credit Rejected", "Declined",
                "Disbursed", "On Appointment", "Pending Caveat Placement",
                "Pending Offer Signing", "Valuation" ]
  constructor() { }

  ngOnInit(): void {
  }
  changeClientView(view:string){
    this.cv.emit(view)
  }
  stage1(){}
  stage2(){}
  stage3(){}
  stage4(){}

}
