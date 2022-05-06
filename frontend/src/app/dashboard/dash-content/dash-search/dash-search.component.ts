import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Client, Person, User } from 'src/app/modals/users';

@Component({
  selector: 'app-dash-search',
  templateUrl: './dash-search.component.html',
  styleUrls: ['./dash-search.component.css']
})
export class DashSearchComponent implements OnInit {
  @Output() uview:EventEmitter<any> = new EventEmitter()
  @Output() updateform:EventEmitter<any> = new EventEmitter()
  @Output() cu:EventEmitter<any> = new EventEmitter()
  @Output() pu:EventEmitter<any> = new EventEmitter()
  @Output() du:EventEmitter<any> = new EventEmitter()
  @Output() cc:EventEmitter<any> = new EventEmitter()
  @Output() pc:EventEmitter<any> = new EventEmitter()
  @Output() dc:EventEmitter<any> = new EventEmitter()
  @Input() currentUser:Person
  @Input() currentView:string
  action:string='add'
  worker:Person
  client:Client
  pageSettings:PageSettingsModel = { pageSize: 6 }
  editPermission:boolean
  createPermission:boolean
  constructor() { }

  ngOnInit(): void {
    this.permissions()
  }

  permissions(){
    this.editPermission = this.currentUser.role==='Admin' || 
    (this.currentUser.role==='CS Agent' && this.currentView==='clients') || 
    (this.currentUser.role==='LBF Agent' && this.currentView==='clients') || 
    (this.currentUser.role==='CS Leader' && this.currentView==='clients') || 
    (this.currentUser.role==='LBF Leader' && this.currentView==='clients')

    this.createPermission = (this.currentUser.role==='CS Agent' && this.currentView==='clients') || 
    (this.currentUser.role==='LBF Agent' && this.currentView==='clients') || 
    (this.currentUser.role==='CS Leader' && this.currentView==='clients') || 
    (this.currentUser.role==='LBF Leader' && this.currentView==='clients') || 
    (this.currentUser.role==='Admin' && this.currentView==='users')
  }

  createUser(data){
    this.cu.emit(data)
  }
  patchUser(data){
    this.pu.emit(data)
  }
  deleteUser(data){
    const user = this.setUser(data)
    if (confirm( `Are you sure you want to delete ${user.fullname}?` )) this.du.emit(user.id)
  }
  createClient(data){
    this.cc.emit(data)
  }
  patchClient(data){
    this.pc.emit(data)
  }
  deleteClient(data){
    const client = this.setUser(data)
    if (confirm( `Are you sure you want to delete ${client.fullname}?` )) this.dc.emit(client.id)
  }
  
  setNewUser(){
    if (this.currentView === "users") this.worker=new Person() 
    else this.client=new Client()
  }
  
  setUser(user){
    const {index,foreignKeyData,column,...data}=user
    if (this.currentView === "users") return this.worker=data 
    else return this.client=data
  }

  updateView(){
    this.uview.emit('details')
  }
  userUpdateForm(data:any){
    this.updateform.emit(data)
  }
}
