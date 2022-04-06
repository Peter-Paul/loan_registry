import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {User}  from 'src/app/modals/users'

@Component({
  selector: 'app-dash-add',
  templateUrl: './dash-add.component.html',
  styleUrls: ['./dash-add.component.css']
})
export class DashAddComponent implements OnInit {
  @Input() user:User
  @Input() currentUser:User
  @Output() upatch:EventEmitter<any>=new EventEmitter()
  @Output() closemodal:EventEmitter<any>=new EventEmitter()
  genders:Array<string>=["Male","Female"]
  roles:Array<string>=["admin","agent","customer"]
  teams:Array<string>=["A","B"]
  isAdmin:boolean=false
  sameUser:boolean=false
  constructor() { }

  ngOnInit(): void {
    console.log(this.user)
    this.isAdmin=this.currentUser.role==="admin"
    this.sameUser=this.currentUser.id===this.user.id
  }
  userPatch(){
    const {...user} = {...this.user,holding:this.user.holding.toString(),dob:JSON.stringify(this.user.dob)}
    console.log(user)
    this.upatch.emit(user)
    this.closemodal.emit()
  }

}
