import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person, User } from 'src/app/modals/users';

@Component({
  selector: 'app-dash-content',
  templateUrl: './dash-content.component.html',
  styleUrls: ['./dash-content.component.css']
})
export class DashContentComponent implements OnInit {
  @Output() updateform:EventEmitter<any> =new EventEmitter()
  @Output() uview:EventEmitter<any> =new EventEmitter()
  @Output() cu:EventEmitter<any> =new EventEmitter()
  @Output() pu:EventEmitter<any> =new EventEmitter()
  @Output() du:EventEmitter<any> =new EventEmitter()
  @Output() cc:EventEmitter<any> =new EventEmitter()
  @Output() pc:EventEmitter<any> =new EventEmitter()
  @Output() dc:EventEmitter<any> =new EventEmitter()
  @Input() currentView:string
  @Input() user:Person
  @Input() currentUser:Person
  @Input() users:Person[]
  constructor() { }

  ngOnInit(): void {
  }
  createUser(data){
    this.cu.emit(data)
  }
  patchUser(data){
    this.pu.emit(data)
  }
  deleteUser(data){
    this.du.emit(data)
  }
  createClient(data){
    this.cc.emit(data)
  }
  patchClient(data){
    this.pc.emit(data)
  }
  deleteClient(data){
    this.dc.emit(data)
  }
  updateView(view:string){
    this.uview.emit(view)
  }
  userUpdateForm(data:any){
    this.updateform.emit(data)
  }
}
