import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/modals/users';

@Component({
  selector: 'app-dash-profile',
  templateUrl: './dash-profile.component.html',
  styleUrls: ['./dash-profile.component.css']
})
export class DashProfileComponent implements OnInit {
  @Input() user:User
  @Input() currentUser:User
  @Output() updateform:EventEmitter<any> =new EventEmitter()
  @Output() upatch:EventEmitter<any> =new EventEmitter()
  constructor() { }

  ngOnInit(): void {}

  userUpdateForm(data:any){
    this.updateform.emit(data)
  }
  userPatch(data){
    this.upatch.emit(data)
  }
}
