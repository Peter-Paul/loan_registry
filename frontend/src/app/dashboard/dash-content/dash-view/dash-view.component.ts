import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Client, Person, User}  from 'src/app/modals/users'

@Component({
  selector: 'app-dash-view',
  templateUrl: './dash-view.component.html',
  styleUrls: ['./dash-view.component.css']
})
export class DashViewComponent implements OnInit {
  @Output() updateform:EventEmitter<any> =new EventEmitter()
  @Output() aps:EventEmitter<any> =new EventEmitter()
  @Output() dps:EventEmitter<any> =new EventEmitter()
  @Output() upatch:EventEmitter<any> =new EventEmitter()
  @Input() worker:Person
  @Input() client:Client
  @Input() currentUser:Person
  @Input() currentView:string
  @Input() action:string
  clientView:string="details"
  edit:Boolean=false
  // user:Users=new Users()
  // leave:Product=new Product()

  constructor() { }

  ngOnInit(): void {
  }
  changeClientView(view:string){
    this.clientView=view
  }
  userPatch(data){
    this.upatch.emit(data)
  }
  userUpdateForm(data:any){
    this.updateform.emit(data)
  }
  addperformances(data:any){
    this.aps.emit(data)
  }
  deleteperformances(data:any){
    console.log(data)
    this.dps.emit(data)
  }

}
