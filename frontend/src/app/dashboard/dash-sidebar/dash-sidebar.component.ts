import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from 'src/app/modals/users';

@Component({
  selector: 'app-dash-sidebar',
  templateUrl: './dash-sidebar.component.html',
  styleUrls: ['./dash-sidebar.component.css']
})
export class DashSidebarComponent implements OnInit {
  @Output() uview:EventEmitter<any> =new EventEmitter()
  @Output() updateform:EventEmitter<any> =new EventEmitter()
  @Output() pu:EventEmitter<any> =new EventEmitter()
  @Input() currentUser:Person
  @Input() users:Person[]
  totalUsers:number
  constructor() { }

  ngOnInit(): void {}

  updateView(view:string){
    this.uview.emit(view)
  }

  patchUser(data){
    this.pu.emit(data)
  }

  userUpdateForm(data:any){
    this.updateform.emit(data)
  }
}
