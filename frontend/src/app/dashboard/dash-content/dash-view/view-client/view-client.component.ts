import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client, Person } from 'src/app/modals/users';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {
  @Input() currentUser:Person
  @Input() client:Client
  @Input() clientView:string
  @Output() cv:EventEmitter<any>=new EventEmitter()
  stagePermission:boolean
  constructor() { }

  ngOnInit(): void {
    this.permissions()
  }

  permissions(){
    this.stagePermission = this.currentUser.role.slice(-5,) !== 'Agent'
  }
  changeClientView(view){
    this.cv.emit(view)
  }
}
