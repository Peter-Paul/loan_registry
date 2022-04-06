import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Person, User } from 'src/app/modals/users';

@Component({
  selector: 'app-dash-sidebar',
  templateUrl: './dash-sidebar.component.html',
  styleUrls: ['./dash-sidebar.component.css']
})
export class DashSidebarComponent implements OnInit,OnChanges {
  @Output() uview:EventEmitter<any> =new EventEmitter()
  @Input() currentUser:Person
  @Input() users:Person[]
  totalUsers:number
  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes: any): void {
    this.totalUsers=changes.users.currentValue.filter(user=> user.updated==1 ).length
    // console.log(changes.users.currentValue.filter(user=> user.updated==1 ))
    // console.log(changes.users.currentValue.filter(user=> user.updated==1 ).length)
  }

  updateView(view:string){
    this.uview.emit(view)
  }

}
