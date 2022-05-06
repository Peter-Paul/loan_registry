import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client, Person } from 'src/app/modals/users';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClientComponent implements OnInit {
  @Input() client:Client
  @Input() currentUser:Person
  @Input() action:string
  @Input() clientView:string
  @Output() cv:EventEmitter<any>=new EventEmitter()
  @Output() cc:EventEmitter<any> =new EventEmitter()
  @Output() pc:EventEmitter<any> =new EventEmitter()
  genders=["Male", "Female"]
  types=[ "CS Client", "LBF Client"]
  constructor() { }

  ngOnInit(): void {
    this.setClientType()
  }
  
  changeClientView(view:string){
    this.cv.emit(view)
  }
  clientPatch(){
    if (this.action === 'add'){
      let payload = ( ({ email,firstname,surname,dob,gender,contact1,contact2,type,status,created }) =>
                      ({ email,firstname,surname,dob:JSON.stringify(dob),gender,contact1,contact2,type,status,created:JSON.stringify(created),agent:this.currentUser.id }))
                    (this.client) 
      this.cc.emit(payload) // new client
    }else{
      let { fullname,agentName,...payload} = {...this.client,dob:JSON.stringify(this.client.dob), created:JSON.stringify(this.client.created)}
      console.log(payload)
      this.pc.emit(payload) //edited client
    }
  }
  setClientType(){
    if (this.currentUser.role ==='CS Agent' || this.currentUser.role ==='CS Leader'){
      this.client.type = 'CS Client'
    }else if ( this.currentUser.role ==='LBF Agent' || this.currentUser.role ==='LBF Leader'){
      this.client.type = 'LBF Client'
    }
  }
}
