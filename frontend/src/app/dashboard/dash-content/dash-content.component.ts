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
  @Output() uuser:EventEmitter<any> =new EventEmitter()
  @Output() aps:EventEmitter<any> =new EventEmitter()
  @Output() dps:EventEmitter<any> =new EventEmitter()
  @Output() upatch:EventEmitter<any> =new EventEmitter()
  @Output() mall:EventEmitter<any> =new EventEmitter()
  @Output() mnew:EventEmitter<any> =new EventEmitter()
  @Output() mupdated:EventEmitter<any> =new EventEmitter()
  @Output() sendMediator:EventEmitter<any> =new EventEmitter()
  @Input() currentView:string
  @Input() user:Person
  @Input() currentUser:Person
  @Input() users:Person[]
  constructor() { }

  ngOnInit(): void {
  }
  userPatch(data){
    this.upatch.emit(data)
  }
  updateUser(user:User){
    this.uuser.emit(user)
  }
  updateView(view:string){
    this.uview.emit(view)
  }
  userUpdateForm(data:any){
    this.updateform.emit(data)
  }
  addperformances(data:any){
    this.aps.emit(data)
  }
  deleteperformances(data:any){
    this.dps.emit(data)
  }
}
