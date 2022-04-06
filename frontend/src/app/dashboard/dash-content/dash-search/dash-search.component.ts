import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Client, Person, User } from 'src/app/modals/users';

@Component({
  selector: 'app-dash-search',
  templateUrl: './dash-search.component.html',
  styleUrls: ['./dash-search.component.css']
})
export class DashSearchComponent implements OnInit {
  @Output() sprofile:EventEmitter<any> = new EventEmitter()
  @Output() uview:EventEmitter<any> = new EventEmitter()
  @Output() updateform:EventEmitter<any> =new EventEmitter()
  @Input() currentUser:Person
  @Input() currentView:string
  action:string='add'
  worker:Person
  client:Client
  pageSettings:PageSettingsModel = { pageSize: 6 }
  data
  constructor() { }

  ngOnInit(): void {
    // this.mutateUsers()
  }
  setNewUser(){
    if (this.currentView === "users") this.worker=new Person() 
    else this.client=new Client()
  }
  
  setUser(user){
    const {index,foreignKeyData,column,...data}=user
    console.log(data)
    if (this.currentView === "users") this.worker=data 
    else this.client=data
  }

  showProfile(user){
    const {index,foreignKeyData,column,...data}=user
    // console.log(data)
    this.sprofile.emit(data)
  }
  updateView(){
    this.uview.emit('details')
  }
  userUpdateForm(data:any){
    this.updateform.emit(data)
  }
}
